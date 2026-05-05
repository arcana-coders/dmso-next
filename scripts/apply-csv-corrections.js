/**
 * apply-csv-corrections.js
 *
 * Aplica las correcciones del archivo reporte_precios_dmso.csv:
 *   - ELIMINAR → activo = false
 *   - Precio corregido (USD) → fórmula del importer + mínimo $799 MXN
 *   - Notas de título → actualiza titulo en BD
 *
 * Uso:
 *   node apply-csv-corrections.js          ← dry-run (muestra cambios sin aplicar)
 *   node apply-csv-corrections.js --apply  ← aplica los cambios
 */

const fs   = require('fs')
const path = require('path')

// Cargar .env del proyecto
const envPath = path.join(__dirname, '..', '.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=')
    if (k && v.length) process.env[k.trim()] = v.join('=').trim()
  })
}

const { neon } = require('@neondatabase/serverless')
const sql = neon(process.env.DATABASE_URL)

const CSV_PATH  = path.join(__dirname, '..', 'reporte_precios_dmso.csv')
const DRY_RUN   = !process.argv.includes('--apply')

// Fórmula del dmso-importer
const TAX_TEXAS   = 1.08
const IMPORT_FEE  = 1.25
const TC_USD_MXN  = 19
const ENVIO_MXN   = 250
const GANANCIA    = 1.30
const PRECIO_MIN  = 799

const calcularPrecio = (costoUSD) =>
  Math.max(PRECIO_MIN, (costoUSD * TAX_TEXAS * IMPORT_FEE * TC_USD_MXN + ENVIO_MXN) * GANANCIA)

// ─── Parser CSV simple (maneja comillas) ──────────────────────────────────────
function parseCSVLine(line) {
  const fields = []
  let current  = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (c === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += c
    }
  }
  fields.push(current.trim())
  return fields
}

;(async () => {
  if (DRY_RUN) {
    console.log('\n🔍 DRY-RUN — no se aplican cambios. Usa --apply para ejecutar.\n')
  } else {
    console.log('\n✏️  MODO APPLY — aplicando cambios en BD...\n')
  }

  const lines   = fs.readFileSync(CSV_PATH, 'utf8').split('\n').filter(Boolean)
  const header  = parseCSVLine(lines[0])

  // Índices de columnas
  const iAsin      = 0   // ASIN
  const iTitulo    = 1   // Titulo
  const iSitio     = 3   // Precio Publicado (Sitio)
  const iCorregido = 5   // corregido
  const iUnit      = 6   // usd / blank
  const iNotas     = 7   // notas de título

  const eliminar = []
  const precios  = []
  const titulos  = []

  for (let i = 1; i < lines.length; i++) {
    const f          = parseCSVLine(lines[i])
    const asin       = f[iAsin]?.trim()
    const corregido  = f[iCorregido]?.trim()
    const unit       = f[iUnit]?.trim().toLowerCase()
    const notas      = f[iNotas]?.trim()
    const tituloActual = f[iTitulo]?.trim()
    const precioSitio  = parseFloat(f[iSitio]) || 0

    if (!asin) continue

    if (corregido === 'ELIMINAR') {
      eliminar.push({ asin, titulo: tituloActual })
    } else if (corregido && !isNaN(parseFloat(corregido)) && unit === 'usd') {
      const costoUSD    = parseFloat(corregido)
      const nuevoPrecio = parseFloat(calcularPrecio(costoUSD).toFixed(2))
      precios.push({ asin, costoUSD, precioAnterior: precioSitio, nuevoPrecio, titulo: tituloActual })
    }

    if (notas && notas.startsWith('Agregar:')) {
      const extra = notas.replace(/^Agregar:\s*/i, '').trim()
      titulos.push({ asin, tituloActual, extra })
    }
  }

  // ── ELIMINAR ────────────────────────────────────────────────────────────────
  console.log(`${'─'.repeat(60)}`)
  console.log(`🗑️  ELIMINAR (${eliminar.length} productos)`)
  console.log(`${'─'.repeat(60)}`)
  for (const p of eliminar) {
    console.log(`  ❌ ${p.asin} — ${p.titulo.substring(0, 60)}`)
    if (!DRY_RUN) {
      await sql`UPDATE productos SET activo = false WHERE asin = ${p.asin}`
    }
  }

  // ── PRECIOS ─────────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`💱 PRECIOS (${precios.length} productos)`)
  console.log(`  Fórmula: (USD × ${TAX_TEXAS} × ${IMPORT_FEE} × ${TC_USD_MXN} + ${ENVIO_MXN}) × ${GANANCIA}  | mín $${PRECIO_MIN}`)
  console.log(`${'─'.repeat(60)}`)
  for (const p of precios) {
    const tag = p.nuevoPrecio === PRECIO_MIN ? ' [mín]' : ''
    console.log(`  ${p.asin} | $${p.costoUSD} USD → $${p.nuevoPrecio} MXN${tag}  (antes: $${p.precioAnterior})`)
    if (!DRY_RUN) {
      await sql`UPDATE productos SET precio = ${p.nuevoPrecio}, updated_at = NOW() WHERE asin = ${p.asin}`
    }
  }

  // ── TÍTULOS ─────────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`📝 TÍTULOS (${titulos.length} productos)`)
  console.log(`${'─'.repeat(60)}`)
  for (const t of titulos) {
    const nuevoTitulo = `${t.tituloActual} — ${t.extra}`
    console.log(`  ${t.asin}`)
    console.log(`    Antes:  ${t.tituloActual}`)
    console.log(`    Después: ${nuevoTitulo}`)
    if (!DRY_RUN) {
      await sql`UPDATE productos SET titulo = ${nuevoTitulo}, updated_at = NOW() WHERE asin = ${t.asin}`
    }
  }

  // ── RESUMEN ─────────────────────────────────────────────────────────────────
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`📊 RESUMEN${DRY_RUN ? ' (DRY-RUN)' : ''}`)
  console.log(`  🗑️  Eliminados:        ${eliminar.length}`)
  console.log(`  💱  Precios actualizados: ${precios.length}`)
  console.log(`  📝  Títulos actualizados: ${titulos.length}`)
  if (DRY_RUN) console.log(`\n  ▶  Ejecuta con --apply para aplicar los cambios.`)
  console.log(`${'═'.repeat(60)}\n`)
})()
