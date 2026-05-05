/**
 * fix-duplicates.js — Resuelve los 3 productos con ASIN duplicado
 * 
 * Los 3 productos (IDs 19, 29, 33) tienen ASINs numéricos que mapean a 
 * ASINs que ya existen en otros productos. Son duplicados del catálogo.
 * 
 * Estrategia: Revisar cuál es el producto "bueno" y marcar/eliminar el duplicado.
 */

require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

const duplicates = [
  { dbId: 19, numericAsin: '1491', realAsin: 'B01LBGIRMY' },
  { dbId: 29, numericAsin: '1555', realAsin: 'B00VDIEOD2' },
  { dbId: 33, numericAsin: '1573', realAsin: 'B0DS66GP71' },
];

async function main() {
  console.log('=== ANÁLISIS DE DUPLICADOS ===\n');

  for (const dup of duplicates) {
    // Find the existing product with the real ASIN
    const existing = await sql`
      SELECT id, asin, titulo, precio
      FROM productos 
      WHERE asin = ${dup.realAsin}
    `;
    
    // Find the duplicate with numeric ASIN
    const duplicate = await sql`
      SELECT id, asin, titulo, precio
      FROM productos 
      WHERE id = ${dup.dbId}
    `;

    console.log(`--- ASIN: ${dup.realAsin} ---`);
    if (existing[0]) {
      console.log(`  ✅ Original (ID:${existing[0].id}): "${existing[0].titulo?.substring(0, 70)}"`);
      console.log(`     Precio: $${existing[0].precio}`);
    }
    if (duplicate[0]) {
      console.log(`  ❌ Duplicado (ID:${duplicate[0].id}): "${duplicate[0].titulo?.substring(0, 70)}"`);
      console.log(`     Precio: $${duplicate[0].precio}`);
      console.log(`     ASIN actual: "${duplicate[0].asin}" (numérico → debería ser ${dup.realAsin})`);
    }
    console.log('');
  }

  // Delete the duplicates — they're the same product imported twice
  console.log('🗑️ Eliminando duplicados...');
  for (const dup of duplicates) {
    try {
      // First delete any reviews for this product
      await sql`DELETE FROM reviews WHERE producto_id = ${dup.dbId}`;
      // Then delete the product
      await sql`DELETE FROM productos WHERE id = ${dup.dbId}`;
      console.log(`  ✅ Eliminado producto ID:${dup.dbId} (duplicado de ${dup.realAsin})`);
    } catch (err) {
      console.error(`  ❌ Error eliminando ID:${dup.dbId}: ${err.message}`);
    }
  }

  // Final check
  const remaining = await sql`
    SELECT COUNT(*) as count FROM productos WHERE asin ~ '^[0-9]+$'
  `;
  const total = await sql`
    SELECT COUNT(*) as count FROM productos
  `;
  console.log(`\n=== RESULTADO FINAL ===`);
  console.log(`  📊 Total productos: ${total[0].count}`);
  console.log(`  🔎 ASINs numéricos restantes: ${remaining[0].count}`);
  console.log(`  ✅ ${remaining[0].count === '0' ? '¡TODOS LOS ASINs ESTÁN CORRECTOS!' : 'Aún quedan ASINs por corregir'}`);
}

main().catch(console.error);
