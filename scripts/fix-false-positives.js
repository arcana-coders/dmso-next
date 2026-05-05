require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

async function main() {
  // Check for false positives - DMSO products that got deactivated
  const inactive = await sql`SELECT id, asin, titulo FROM productos WHERE activo = false ORDER BY id`;
  
  const dmsoKeywords = ['dmso', 'dimetil', 'sulfóxido', 'sulfoxide', 'dimethyl'];
  
  const falsePositives = inactive.filter(p => {
    const t = p.titulo.toLowerCase();
    return dmsoKeywords.some(kw => t.includes(kw));
  });
  
  console.log('Falsos positivos (contienen DMSO en titulo pero desactivados):');
  for (const p of falsePositives) {
    console.log(`  ID:${p.id} | ${p.asin} | ${p.titulo.substring(0, 90)}`);
  }
  console.log(`\nTotal falsos positivos: ${falsePositives.length}`);
  
  if (falsePositives.length > 0) {
    const ids = falsePositives.map(p => p.id);
    await sql`UPDATE productos SET activo = true, updated_at = NOW() WHERE id = ANY(${ids})`;
    console.log(`\n✅ Reactivados ${ids.length} productos DMSO`);
  }
  
  // Also check generic products that shouldn't have been kept
  // B001E0XPZW = "Gel 70/30 Aloe" — this IS a DMSO product (DMSO Gel with Aloe)
  // B00CQ7RI3M = "Dmso Gel 70/30" — IS DMSO
  
  // Reactivate known DMSO products that got caught
  const knownDmso = ['B001E0XPZW', 'B00CQ7RI3M'];
  const knownProducts = await sql`SELECT id, asin, titulo, activo FROM productos WHERE asin = ANY(${knownDmso})`;
  for (const p of knownProducts) {
    if (!p.activo) {
      await sql`UPDATE productos SET activo = true, updated_at = NOW() WHERE id = ${p.id}`;
      console.log(`  ✅ Reactivado: ${p.asin} | ${p.titulo.substring(0, 60)}`);
    }
  }
  
  // Final count
  const count = await sql`SELECT COUNT(*) as count FROM productos WHERE activo = true`;
  console.log(`\n📊 Productos activos finales: ${count[0].count}`);
}

main().catch(err => { console.error(err); process.exit(1); });
