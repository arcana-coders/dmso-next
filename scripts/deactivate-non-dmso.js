/**
 * deactivate-non-dmso.js — Desactiva productos que NO pertenecen al nicho DMSO
 * 
 * Estrategia:
 * 1. Carga todos los productos activos
 * 2. Clasifica por keywords en el título
 * 3. Desactiva (activo = false) los que NO son DMSO
 * 
 * Los productos no se borran — pueden reactivarse para otra tienda (CPAP-México)
 */

require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

// Keywords que identifican un producto DMSO o relacionado legítimamente
const DMSO_KEYWORDS = [
  'dmso',
  'dimetil',
  'dimethyl',
  'sulfoxide',
  'sulfóxido',
  'sulfoxido',
  'arnica',
  'árnica',
];

// Keywords complementarios — productos que pueden pertenecer al nicho bienestar/DMSO
const NICHE_KEYWORDS = [
  'aloe vera',
  'roll-on',
  'roll on',
  'crema',
  'cream',
  'gel ',
  'ungüento',
  'ointment',
  'lavanda',
  'lavender',
  'magnesio',
  'magnesium',
  'msm',
  'neuropat',
  'ciática',
  'sciatica',
  'articulacion',
  'joint',
  'muscle',
  'muscul',
];

// Keywords que DEFINITIVAMENTE no son DMSO
const BLACKLIST_KEYWORDS = [
  'cpap',
  'resmed',
  'airsense',
  'airmini',
  'dreamstation',
  'bipap',
  'apnea',
  'ronquido',
  'antironquido',
  'barbilla',
  'mascarilla cpap',
  'arnés',
  'casco cpap',
  'manguera cpap',
  'tubo cpap',
  'boroscopio',
  'vidriera',
  'atrapasol',
  'cámara de',
  'gomitas de cáñamo',
  'masajeador shiatsu',
  'almohadilla térmica',
  'papel de filtro',
  'botella de leche',
  'botellas de leche',
  'juguete educativo',
  'panel solar',
  'batería cpap',
  'pilot-24',
  'pilot 24',
  'pilot flex',
  'medistrom',
  'agua destilada',
  'charlotte\'s web',
  'espuma de alivio articular',
  'colgante de vidriera',
  'antimareos',
  'vitamina e |',
  'bálsamo de temporada',
];

function isDMSO(titulo) {
  const lower = titulo.toLowerCase();
  
  // If blacklisted → definitely NOT DMSO
  for (const kw of BLACKLIST_KEYWORDS) {
    if (lower.includes(kw)) return false;
  }
  
  // If contains DMSO keywords → IS DMSO
  for (const kw of DMSO_KEYWORDS) {
    if (lower.includes(kw)) return true;
  }
  
  // If contains niche keywords (crema, gel, etc.) without DMSO keyword,
  // it's likely a complementary product but could be generic.
  // Be conservative: only keep if it also has secondary DMSO-adjacent terms
  // For now, mark as NOT DMSO if no DMSO keyword is found
  return false;
}

async function main() {
  console.log('🔍 Cargando todos los productos activos...\n');
  
  const products = await sql`
    SELECT id, asin, titulo, activo, categoria_id
    FROM productos
    WHERE activo = true
    ORDER BY id
  `;
  
  console.log(`📊 Total productos activos: ${products.length}\n`);
  
  const dmsoProducts = [];
  const nonDmsoProducts = [];
  
  for (const p of products) {
    if (isDMSO(p.titulo)) {
      dmsoProducts.push(p);
    } else {
      nonDmsoProducts.push(p);
    }
  }
  
  console.log(`✅ DMSO (se quedan activos): ${dmsoProducts.length}`);
  console.log(`❌ NO-DMSO (se desactivarán): ${nonDmsoProducts.length}\n`);
  
  // Show what will be deactivated
  console.log('=== PRODUCTOS A DESACTIVAR ===\n');
  for (const p of nonDmsoProducts) {
    console.log(`  ❌ ID:${p.id} | ASIN:${p.asin} | ${p.titulo.substring(0, 80)}...`);
  }
  
  // Confirm
  console.log(`\n🔄 Desactivando ${nonDmsoProducts.length} productos...\n`);
  
  const ids = nonDmsoProducts.map(p => p.id);
  
  if (ids.length === 0) {
    console.log('✅ No hay productos que desactivar.');
    return;
  }
  
  // Batch deactivate
  const result = await sql`
    UPDATE productos 
    SET activo = false, updated_at = NOW()
    WHERE id = ANY(${ids})
  `;
  
  console.log(`✅ Desactivados: ${nonDmsoProducts.length} productos`);
  
  // Verification
  const remaining = await sql`
    SELECT COUNT(*) as count FROM productos WHERE activo = true
  `;
  console.log(`\n📊 Productos activos restantes: ${remaining[0].count}`);
  
  // Show category breakdown of remaining
  const catBreakdown = await sql`
    SELECT 
      COALESCE(c.nombre, 'Sin categoría') as categoria,
      COUNT(*) as count
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.activo = true
    GROUP BY c.nombre
    ORDER BY count DESC
  `;
  
  console.log('\n📋 Distribución por categoría (productos activos):');
  for (const row of catBreakdown) {
    console.log(`  ${row.categoria}: ${row.count}`);
  }
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
