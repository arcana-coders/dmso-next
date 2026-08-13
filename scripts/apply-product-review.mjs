/**
 * Applies the choices exported from revision_articulos_publicados.ods.
 *
 * Usage:
 *   node scripts/apply-product-review.mjs /path/to/revision.csv          # dry-run
 *   node scripts/apply-product-review.mjs /path/to/revision.csv --apply # deactivate and update featured products
 *
 * The script also generates the permanent URL redirect map used by the app.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
const apply = process.argv.includes('--apply');
const decisionColumn = 'Decisión (CONSERVAR/DESACTIVAR)';
const featuredColumn = '¿Destacar? (SÍ/NO)';

if (!input) throw new Error('Indica el CSV exportado desde LibreOffice.');

const envPath = path.join(root, '.env');
for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const separator = line.indexOf('=');
  if (separator > 0) process.env[line.slice(0, separator).trim()] ||= line.slice(separator + 1).trim();
}

function parseCsv(text) {
  const rows = []; let row = []; let value = ''; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { value += '"'; i++; }
      else if (char === '"') quoted = false;
      else value += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(value); value = ''; }
    else if (char === '\n') { row.push(value.replace(/\r$/, '')); rows.push(row); row = []; value = ''; }
    else value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}

const stopWords = new Set(['con', 'para', 'una', 'uno', 'grado', 'puro', 'pureza', 'alta', 'bajo', 'botella', 'botellas', 'dmso', 'dimetilsulfoxido', 'sulfoxido', 'liquido', 'topico', 'fabricado', 'estados', 'unidos', 'oz', 'onzas', 'fl', 'ml', 'pack', 'paquete', 'botes', 'bote', 'cada']);
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const tokens = (title) => new Set(normalize(title).replace(/[^a-z0-9]+/g, ' ').split(' ').filter((word) => word.length > 2 && !stopWords.has(word)));
const match = (title, expression) => normalize(title).match(expression)?.[1];

function productFeatures(title) {
  return {
    concentration: match(title, /\b(\d{2}(?:[.,]\d+)?)\s*%/),
    volume: match(title, /\b(\d+(?:[.,]\d+)?)\s*(?:oz|onzas|ml)\b/),
    form: match(title, /\b(crema|gel|rollo|roll-on|spray|liquido)\b/),
  };
}

function productType(title) {
  const normalized = normalize(title);
  if (/\b(kit|paquete|juego|bundle)\b/.test(normalized)) return 'kit';
  if (/\b(crema|cream)\b/.test(normalized)) return 'crema';
  if (/\bgel\b/.test(normalized)) return 'gel';
  if (/\b(rollo|roll-on|roll on)\b/.test(normalized)) return 'roll-on';
  return 'liquido';
}

function similarity(source, candidate) {
  let score = source.category === candidate.category ? 18 : 0;
  const sourceType = productType(source.title);
  const candidateType = productType(candidate.title);
  score += sourceType === candidateType ? 24 : -10;
  const sourceTokens = tokens(source.title);
  const candidateTokens = tokens(candidate.title);
  for (const token of sourceTokens) if (candidateTokens.has(token)) score += 3;

  const a = productFeatures(source.title);
  const b = productFeatures(candidate.title);
  if (a.concentration && a.concentration === b.concentration) score += 8;
  if (a.volume && a.volume === b.volume) score += 7;
  if (a.form && a.form === b.form) score += 7;
  return score;
}

const [header, ...rawRows] = parseCsv(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
const col = (name) => {
  const index = header.indexOf(name);
  if (index === -1) throw new Error(`No existe la columna: ${name}`);
  return index;
};
const id = col('ID'); const title = col('Título'); const category = col('Categoría');
const link = col('Enlace en tienda'); const decision = col(decisionColumn); const featured = col(featuredColumn);
const products = rawRows.filter((row) => row.length > 1).map((row) => ({
  id: Number(row[id]), title: row[title], category: row[category],
  slug: row[link].replace(/^.*\/producto\//, ''),
  deactivate: normalize(row[decision]) === 'desactivar',
  featured: normalize(row[featured]) === 'si',
}));
const removed = products.filter((product) => product.deactivate);
const retained = products.filter((product) => !product.deactivate);
if (!removed.length || !retained.length) throw new Error('El archivo debe tener al menos un producto retirado y uno conservado.');

const redirects = removed.map((source) => {
  const ranked = retained.map((candidate) => ({ candidate, score: similarity(source, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.id - b.candidate.id);
  return { source, target: ranked[0].candidate, score: ranked[0].score };
});

const redirectMap = Object.fromEntries(redirects.map(({ source, target }) => [source.slug, target.slug]));
const reportHeader = 'Producto retirado,Redirige a,Puntaje de similitud\n';
const quote = (value) => `"${String(value).replace(/"/g, '""')}"`;
const report = redirects.map(({ source, target, score }) => [source.title, target.title, score].map(quote).join(',')).join('\n');
fs.writeFileSync(path.join(root, 'src/data/retiredProductRedirects.json'), `${JSON.stringify(redirectMap, null, 2)}\n`);
fs.writeFileSync(path.join(root, 'redirecciones_articulos_retirados.csv'), `${reportHeader}${report}\n`);

console.log(`${removed.length} productos se desactivarán; ${retained.length} permanecerán activos.`);
for (const { source, target, score } of redirects) console.log(`[${score}] ${source.title}  →  ${target.title}`);

if (apply) {
  const sql = neon(process.env.DATABASE_URL);
  for (const product of removed) await sql`UPDATE productos SET activo = false, updated_at = NOW() WHERE id = ${product.id}`;
  for (const product of retained) await sql`UPDATE productos SET destacado = ${product.featured}, updated_at = NOW() WHERE id = ${product.id}`;
  console.log(`\nCambios aplicados: ${removed.length} desactivados y ${retained.filter((product) => product.featured).length} destacados.`);
} else {
  console.log('\nDRY-RUN: no se modificó la base de datos.');
}
