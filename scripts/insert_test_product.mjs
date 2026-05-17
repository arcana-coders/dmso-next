import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { pgTable, serial, text, decimal, boolean, jsonb } from 'drizzle-orm/pg-core'
import { eq } from 'drizzle-orm'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '../.env')

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=')
    if (key && value.length) {
      let val = value.join('=').trim()
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1)
      process.env[key.trim()] = val
    }
  })
}

const categorias = pgTable('categorias', {
  id: serial('id').primaryKey(),
})

const productos = pgTable('productos', {
  id: serial('id').primaryKey(),
  asin: text('asin').unique(),
  titulo: text('titulo').notNull(),
  slug: text('slug').unique().notNull(),
  descripcion: text('descripcion'),
  precio: decimal('precio', { precision: 10, scale: 2 }).notNull(),
  categoriaId: serial('categoria_id'),
  imagenes: jsonb('imagenes'),
  activo: boolean('activo').default(true),
})

const sql = neon(process.env.DATABASE_URL)
const db = drizzle(sql)

async function main() {
  console.log('🚀 Insertando producto de prueba ($30 MXN) en DMSO-Next...')
  
  // Obtener primera categoría
  const [cat] = await db.select().from(categorias).limit(1)
  if (!cat) {
    console.error('❌ No se encontraron categorías.')
    process.exit(1)
  }

  const testProduct = {
    asin: 'TEST-PAGO-30',
    titulo: 'Producto de Prueba (Pago Test)',
    slug: 'producto-prueba-pago-test',
    descripcion: 'Este es un producto de prueba para validar la pasarela de pagos. Precio: $30 MXN.',
    precio: '30.00',
    categoriaId: cat.id,
    imagenes: ['/images/products/test-product.png'],
    activo: true
  }

  try {
    const [existente] = await db.select().from(productos).where(eq(productos.asin, testProduct.asin)).limit(1)
    
    if (existente) {
      await db.update(productos).set(testProduct).where(eq(productos.asin, testProduct.asin))
      console.log('✅ Producto actualizado correctamente.')
    } else {
      await db.insert(productos).values(testProduct)
      console.log('✅ Producto insertado correctamente.')
    }
  } catch (err) {
    console.error('❌ Error:', err.message)
  }

  process.exit(0)
}

main()
