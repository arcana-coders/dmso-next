/**
 * fix-asins.js — Corrige los 44 productos con ASINs numéricos (inválidos)
 * 
 * Estrategia:
 * 1. Lee el CSV original y extrae los campos ID y Sku (ASIN real)
 * 2. Busca en la BD los productos cuyo ASIN es numérico  
 * 3. Para cada uno, el ASIN numérico actual = ID del CSV → busca el Sku correspondiente
 * 4. Actualiza la BD con el ASIN correcto
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

// Path al CSV original
const CSV_PATH = path.join(__dirname, '..', '..', 'Productos-Export-2025-December-28-1548.csv');

/**
 * Simple CSV line parser that handles quoted fields with commas
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

async function main() {
  // 1. Leer el CSV
  console.log('📂 Leyendo CSV:', CSV_PATH);
  if (!fs.existsSync(CSV_PATH)) {
    console.error('❌ CSV no encontrado en:', CSV_PATH);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  // Split by lines, but we need to handle multi-line quoted fields
  // Simple approach: split entire content and find rows that start with a number (ID)
  const allLines = csvContent.split('\n');
  
  // Get header to find ID and Sku column indices
  const header = parseCSVLine(allLines[0]);
  const idIdx = header.indexOf('ID');
  const skuIdx = header.indexOf('Sku');
  const titleIdx = header.indexOf('Title');
  
  console.log(`  Header: ID=${idIdx}, Sku=${skuIdx}, Title=${titleIdx}`);

  // 2. Build map: wordpress_id → sku (ASIN real)
  // Since CSV has multi-line fields, we need to reassemble complete records
  const csvMap = {};
  let currentRecord = '';
  let recordCount = 0;

  for (let i = 1; i < allLines.length; i++) {
    currentRecord += (currentRecord ? '\n' : '') + allLines[i];
    
    // Check if the record is complete (even number of quotes means balanced)
    const quoteCount = (currentRecord.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) continue; // Still inside a quoted field
    
    // Parse complete record
    const fields = parseCSVLine(currentRecord);
    currentRecord = '';
    
    if (fields.length > Math.max(idIdx, skuIdx)) {
      const id = fields[idIdx]?.trim();
      const sku = fields[skuIdx]?.trim();
      const title = fields[titleIdx]?.trim()?.substring(0, 60);
      
      // Only keep if SKU looks like a valid Amazon ASIN (B followed by 9 alphanumeric)
      if (id && sku && /^B[A-Z0-9]{9}$/i.test(sku)) {
        csvMap[id] = { asin: sku, title: title };
        recordCount++;
      }
    }
  }
  
  console.log(`📊 CSV tiene ${recordCount} productos con ASIN válido en Sku`);

  // 3. Buscar productos con ASIN numérico en la BD
  const badProducts = await sql`
    SELECT id, asin, titulo 
    FROM productos 
    WHERE asin ~ '^[0-9]+$' 
    ORDER BY id
  `;

  console.log(`\n🔍 Encontrados ${badProducts.length} productos con ASIN numérico en BD\n`);

  if (badProducts.length === 0) {
    console.log('✅ ¡No hay ASINs que corregir!');
    return;
  }

  // 4. Match y actualizar
  let fixed = 0;
  let notFound = 0;
  let errors = 0;
  const results = [];

  for (const product of badProducts) {
    const currentAsin = product.asin; // Este es el ID numérico del CSV
    const csvEntry = csvMap[currentAsin];

    if (csvEntry) {
      try {
        await sql`
          UPDATE productos 
          SET asin = ${csvEntry.asin}
          WHERE id = ${product.id}
        `;
        
        results.push({
          id: product.id,
          oldAsin: currentAsin,
          newAsin: csvEntry.asin,
          titulo: product.titulo.substring(0, 60),
          status: '✅'
        });
        fixed++;
      } catch (err) {
        results.push({
          id: product.id,
          oldAsin: currentAsin,
          newAsin: csvEntry.asin,
          titulo: product.titulo.substring(0, 60),
          status: `❌ ${err.message.substring(0, 80)}`
        });
        errors++;
      }
    } else {
      results.push({
        id: product.id,
        oldAsin: currentAsin,
        titulo: product.titulo.substring(0, 60),
        status: '⚠️ SIN MATCH'
      });
      notFound++;
    }
  }

  // 5. Reporte
  console.log('=== REPORTE DE CORRECCIÓN ===\n');
  for (const r of results) {
    console.log(`  ${r.status} | ID:${r.id} | ${r.oldAsin} → ${r.newAsin || '?'} | ${r.titulo}`);
  }

  console.log(`\n=== RESUMEN ===`);
  console.log(`  ✅ Corregidos: ${fixed}`);
  console.log(`  ⚠️ Sin match: ${notFound}`);
  console.log(`  ❌ Errores: ${errors}`);
  console.log(`  📊 Total procesados: ${badProducts.length}`);

  // 6. Verificación post-fix
  const remaining = await sql`
    SELECT COUNT(*) as count 
    FROM productos 
    WHERE asin ~ '^[0-9]+$'
  `;
  console.log(`\n  🔎 ASINs numéricos restantes en BD: ${remaining[0].count}`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
