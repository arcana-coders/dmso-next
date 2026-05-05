/**
 * ADD-REVIEWS  (dos fases)
 *
 * FASE 1 — Playwright: visita cada producto y extrae reviews crudos (en el idioma original).
 *           El browser se cierra cuando termina. Sin Anthropic corriendo en paralelo.
 *
 * FASE 2 — Claude Haiku: traduce los reviews al español mexicano y guarda en BD.
 *
 * Uso:
 *   node add-reviews.js                    ← todos los productos sin reviews
 *   node add-reviews.js --asins B001,B002  ← ASINs específicos
 *   node add-reviews.js --force            ← sobreescribe incluso los que ya tienen reviews
 */

// ─── Cargar .env (raíz del proyecto) ──────────────────────────────────────────
const fs   = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && v.length) process.env[k.trim()] = v.join('=').trim()
  })
}

// ─── Dependencias ─────────────────────────────────────────────────────────────
const { chromium } = require('playwright-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
chromium.use(StealthPlugin())

const { neon }    = require('@neondatabase/serverless')
const { drizzle } = require('drizzle-orm/neon-http')
const {
  pgTable, serial, text, boolean, jsonb, timestamp
} = require('drizzle-orm/pg-core')
const { eq } = require('drizzle-orm')

// ─── Schema (DMSO) ────────────────────────────────────────────────────────────
const productos = pgTable('productos', {
  id:        serial('id').primaryKey(),
  asin:      text('asin').unique(),
  reviews:   jsonb('reviews'),
  activo:    boolean('activo').default(true),
  updatedAt: timestamp('updated_at').defaultNow(),
})

const sql = neon(process.env.DATABASE_URL)
const db  = drizzle(sql)

// ─── User Agents ──────────────────────────────────────────────────────────────
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
]
const randomUA = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]

// ─── Delays ───────────────────────────────────────────────────────────────────
const sleep      = (ms) => new Promise(r => setTimeout(r, ms))
const microDelay = () => sleep(500  + Math.random() * 1500)
const pageDelay  = () => sleep(8000 + Math.random() * 7000)

// ─── Scroll orgánico ──────────────────────────────────────────────────────────
async function scrollHumano(page) {
  await page.evaluate(async () => {
    const total = document.body.scrollHeight
    const step  = window.innerHeight * (0.3 + Math.random() * 0.3)
    let current = 0
    while (current < total) {
      current += step + Math.random() * 150
      window.scrollTo({ top: Math.min(current, total), behavior: 'smooth' })
      await new Promise(r => setTimeout(r, 250 + Math.random() * 600))
    }
    await new Promise(r => setTimeout(r, 500))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

// ─── FASE 1: Extraer reviews crudos desde Amazon ──────────────────────────────
async function extraerReviewsCrudos(page) {

  return await page.evaluate(() => {
    const MAX = 4
    const reviewEls = [...document.querySelectorAll('[data-hook="review"]')]
    const cinco = reviewEls.filter(el => {
      const rating = el.querySelector(
        '[data-hook="review-star-rating"] .a-icon-alt, [data-hook="cmps-review-star-rating"] .a-icon-alt'
      )?.textContent?.trim() || ''
      return rating.startsWith('5')
    })
    return cinco.slice(0, MAX).map(el => ({
      autor: el.querySelector('.a-profile-name')?.textContent?.trim() || 'Cliente verificado',
      titulo: (() => {
        const spans = [...el.querySelectorAll('[data-hook="review-title"] span')]
        const real  = spans.find(s =>
          !s.querySelector('i') && !s.querySelector('svg') &&
          s.textContent.trim() &&
          !s.textContent.trim().match(/^\d+[\.,]\d+\s+de\s+\d+/)
        )
        return real?.textContent?.trim() || ''
      })(),
      texto: (el.querySelector('[data-hook="review-body"] span') || el.querySelector('[data-hook="review-body"]'))?.textContent?.trim() || '',
      fecha: el.querySelector('[data-hook="review-date"]')
               ?.textContent?.replace(/^Reseñado en .+ el /i, '').trim() || '',
    })).filter(r => r.texto.length > 20)
  })
}

// ─── FASE 2: Traducir un review con Claude Haiku ──────────────────────────────
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001'

async function traducirReview(titulo, texto) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Falta ANTHROPIC_API_KEY en .env')
  }

  try {
    const prompt =
      `Traduce al español mexicano el siguiente review de producto.\n` +
      `Si ya está en español, devuélvelo sin cambios.\n` +
      `Reemplaza "Amazon" o "Amazon.com" por "DMSO México".\n` +
      `No cambies nombres de marcas ni productos.\n` +
      `Responde ÚNICAMENTE en este formato exacto (sin explicaciones extra):\n` +
      `TITULO: <título traducido>\n` +
      `TEXTO: <texto traducido>\n\n` +
      `TITULO: ${titulo}\n` +
      `TEXTO: ${texto}`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        temperature: 0.1,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: AbortSignal.timeout(60000),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(`Anthropic API Error: ${res.status} ${JSON.stringify(errData)}`)
    }

    const data = await res.json()
    const respuesta = data.content?.[0]?.text?.trim() || ''

    const tituloMatch = respuesta.match(/TITULO:\s*(.+)/i)
    const textoMatch  = respuesta.match(/TEXTO:\s*([\s\S]+)/i)

    return {
      titulo: tituloMatch?.[1]?.trim() || titulo,
      texto:  textoMatch?.[1]?.trim()  || texto,
    }
  } catch (err) {
    console.error(`\n[Error Traduciendo] ${err.message}`)
    return { titulo, texto }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
;(async () => {
  const args   = process.argv.slice(2)
  const forzar = args.includes('--force')

  // ── Obtener lista de ASINs ────────────────────────────────────────────────
  let registros = []
  const asinsIdx = args.indexOf('--asins')

  if (asinsIdx !== -1 && args[asinsIdx + 1]) {
    const lista = args[asinsIdx + 1].split(',').map(a => a.trim()).filter(Boolean)
    registros = lista.map(asin => ({ asin }))
  } else {
    const todos = await db
      .select({ asin: productos.asin, reviews: productos.reviews })
      .from(productos)
      .where(eq(productos.activo, true))

    registros = forzar
      ? todos.filter(p => p.asin)
      : todos.filter(p => p.asin && (!p.reviews || (Array.isArray(p.reviews) && p.reviews.length === 0)))
  }

  if (!registros.length) {
    console.log('✅ Todos los productos ya tienen reviews. Usa --force para sobreescribir.')
    process.exit(0)
  }

  console.log(`\n⭐ ADD-REVIEWS DMSO México (dos fases)`)
  console.log(`📦 Productos: ${registros.length}${forzar ? ' (--force)' : ' (sin reviews)'}`)
  console.log(`🤖 Modelo Anthropic: ${ANTHROPIC_MODEL}\n`)

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 1 — Playwright: scraping de reviews crudos
  // ══════════════════════════════════════════════════════════════════════════
  console.log(`${'─'.repeat(50)}`)
  console.log(`🌐 FASE 1 — Scraping Amazon`)
  console.log(`${'─'.repeat(50)}`)

  // Usar cookies más recientes (amazon-scrapper-otherseller, abril 2026)
  const authFile  = path.join('C:\\robots\\amazon-scrapper-otherseller\\scripts\\auth', 'amazon-usa-firefox.json')
  const tieneAuth = fs.existsSync(authFile)
  console.log(tieneAuth ? `🍪 Sesión: ${authFile}` : `⚠️  Sin sesión guardada`)

  const userAgent = randomUA()
  console.log(`🕵️  UA: ${userAgent.substring(0, 70)}...\n`)

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check',
      '--no-sandbox',
    ],
  })

  const context = await browser.newContext({
    ...(tieneAuth ? { storageState: authFile } : {}),
    userAgent,
    viewport:          { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    isMobile:          false,
    hasTouch:          false,
    locale:            'en-US',
    timezoneId:        'America/New_York',
    extraHTTPHeaders: {
      'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'es-US,es;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT':             '1',
      'Upgrade-Insecure-Requests': '1',
    },
  })

  const page = await context.newPage()
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
    Object.defineProperty(navigator, 'plugins',   { get: () => [1, 2, 3, 4, 5] })
    Object.defineProperty(navigator, 'languages', { get: () => ['es-MX', 'es', 'en'] })
    window.chrome = { runtime: {} }
  })

  console.log(`🏠 Visitando home de Amazon...`)
  await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded', timeout: 30000 })
  await pageDelay()

  const crudos = []
  const erroresFase1 = []

  for (let i = 0; i < registros.length; i++) {
    const { asin } = registros[i]
    process.stdout.write(`[${i + 1}/${registros.length}] ${asin} ... `)

    try {
      await page.goto(
        `https://www.amazon.com/product-reviews/${asin}?ie=UTF8&reviewerType=all_reviews&filterByStar=five_star&pageNumber=1&language=es_US`,
        { waitUntil: 'domcontentloaded', timeout: 30000 }
      )
      await microDelay()
      await scrollHumano(page)
      await microDelay()

      const title = await page.title()
      if (title.toLowerCase().includes('robot') || title.toLowerCase().includes('captcha')) {
        throw new Error('CAPTCHA')
      }
      const is404 = await page.$('a[href*="cs_404_logo"], a[href*="ref=cs_404"]')
      if (is404) throw new Error('404')
      const sinReviews = await page.$('[data-hook="no-reviews-section"], .a-text-bold')
      const sinReviewsText = await sinReviews?.textContent()
      if (sinReviewsText?.includes('no han sido revisadas') || sinReviewsText?.includes('There are 0 reviews')) throw new Error('sin reviews en Amazon')

      const rawReviews = await extraerReviewsCrudos(page)

      if (rawReviews.length) {
        crudos.push({ asin, reviews: rawReviews })
        console.log(`✅ ${rawReviews.length} reviews`)
      } else {
        console.log(`⚠️  sin reviews 5★`)
      }
    } catch (err) {
      console.log(`❌ ${err.message}`)
      erroresFase1.push({ asin, error: err.message })
    }

    if (i < registros.length - 1) {
      const espera = 5000 + Math.random() * 8000
      await sleep(espera)
    }
  }

  await browser.close()
  console.log(`\n🔒 Browser cerrado. CPU libre para traducción.\n`)

  if (!crudos.length) {
    console.log('⚠️  No se encontraron reviews en ningún producto.')
    process.exit(0)
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FASE 2 — Claude Haiku: traducir y guardar
  // ══════════════════════════════════════════════════════════════════════════
  console.log(`${'─'.repeat(50)}`)
  console.log(`🤖 FASE 2 — Traducción con Claude Haiku (${crudos.length} productos)`)
  console.log(`${'─'.repeat(50)}\n`)

  const okFase2 = []
  const erroresFase2 = []

  for (let i = 0; i < crudos.length; i++) {
    const { asin, reviews: rawReviews } = crudos[i]
    process.stdout.write(`[${i + 1}/${crudos.length}] ${asin} ... `)

    try {
      const traducidos = []
      for (const r of rawReviews) {
        const { titulo, texto } = await traducirReview(r.titulo, r.texto)
        traducidos.push({ autor: r.autor, titulo, texto, fecha: r.fecha })
      }

      await db.update(productos).set({
        reviews:   traducidos,
        updatedAt: new Date(),
      }).where(eq(productos.asin, asin))

      console.log(`✅ ${traducidos.length} reviews guardados`)
      okFase2.push(asin)
    } catch (err) {
      console.log(`❌ ${err.message}`)
      erroresFase2.push({ asin, error: err.message })
    }
  }

  // ── Resumen ───────────────────────────────────────────────────────────────
  const totalErrores = erroresFase1.length + erroresFase2.length
  console.log(`\n${'═'.repeat(50)}`)
  console.log(`📊 RESUMEN FINAL`)
  console.log(`  ✅ Reviews guardados:   ${okFase2.length}`)
  console.log(`  ⚠️  Sin reviews 5★:     ${registros.length - crudos.length - erroresFase1.length}`)
  console.log(`  ❌ Errores scraping:    ${erroresFase1.length}`)
  console.log(`  ❌ Errores traducción:  ${erroresFase2.length}`)
  if (totalErrores) {
    ;[...erroresFase1, ...erroresFase2].forEach(e => console.log(`     - ${e.asin}: ${e.error}`))
  }
  console.log(`${'═'.repeat(50)}\n`)
})()
