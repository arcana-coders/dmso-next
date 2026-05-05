import 'dotenv/config';
import { db } from './src/lib/db';
import { productos } from './src/lib/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

async function generateFinalReport() {
  try {
    // 1. Get active products from DB
    const dbProducts = await db.query.productos.findMany({
      where: eq(productos.activo, true),
      columns: {
        asin: true,
        titulo: true,
        precio: true
      }
    });

    console.log(`Found ${dbProducts.length} active products in DB.`);

    const priceMap = new Map();

    // Helper to parse CSV with quotes
    function parseCSV(content: string) {
      const lines = content.split('\n');
      const header = lines[0].replace(/^\uFEFF/, '').trim();
      const cols = header.split(',');
      const rows = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const values = [];
        let cur = '';
        let q = false;
        for (let c of line) {
          if (c === '"') q = !q;
          else if (c === ',' && !q) { values.push(cur); cur = ''; }
          else cur += c;
        }
        values.push(cur);
        rows.push(values);
      }
      return { cols, rows };
    }

    // 2. Load Source 1: Recent Importer (April 2026)
    const src1Path = 'c:/robots/dmso-importer/data/productos_importados.csv';
    if (fs.existsSync(src1Path)) {
      const { cols, rows } = parseCSV(fs.readFileSync(src1Path, 'utf8'));
      const asinIdx = cols.indexOf('asin');
      const costoIdx = cols.indexOf('costo_usd');
      const precioMxIdx = cols.indexOf('precio_mxn');
      for (const row of rows) {
        if (row[asinIdx]) {
          priceMap.set(row[asinIdx], {
            amazon_price: row[costoIdx] ? `$${row[costoIdx]} USD` : row[precioMxIdx],
            source: 'Importer (Apr 2026)'
          });
        }
      }
    }

    // 3. Load Source 2: Old Scraper (Aug 2025)
    const src2Path = 'c:/robots/dmso-scraper/scripts/DMSO-20250825-0824.csv';
    if (fs.existsSync(src2Path)) {
      const { cols, rows } = parseCSV(fs.readFileSync(src2Path, 'utf8'));
      const skuIdx = cols.indexOf('SKU');
      const priceIdx = cols.indexOf('Price');
      for (const row of rows) {
        const asin = row[skuIdx];
        if (asin && !priceMap.has(asin)) {
          priceMap.set(asin, {
            amazon_price: row[priceIdx],
            source: 'Scraper (Aug 2025)'
          });
        }
      }
    }

    // 4. Load Source 3: Store Export (Dec 2025)
    const src3Path = 'D:/proyectos-web/dmso2/Productos-Export-2025-December-28-1548.csv';
    if (fs.existsSync(src3Path)) {
      const { cols, rows } = parseCSV(fs.readFileSync(src3Path, 'utf8'));
      const skuIdx = cols.indexOf('Sku');
      const priceIdx = cols.indexOf('Regular Price');
      for (const row of rows) {
        const asin = row[skuIdx];
        if (asin && !priceMap.has(asin)) {
          priceMap.set(asin, {
            amazon_price: row[priceIdx],
            source: 'Export (Dec 2025)'
          });
        }
      }
    }

    // 5. Generate final CSV
    let csv = 'ASIN,Titulo,Precio Amazon (Encontrado),Precio Publicado (Sitio),Fuente\n';
    let matched = 0;

    for (const p of dbProducts) {
      const data = priceMap.get(p.asin);
      const amzPrice = data ? data.amazon_price : 'N/A';
      const source = data ? data.source : 'N/A';
      const cleanTitle = p.titulo.replace(/,/g, '');
      csv += `${p.asin},"${cleanTitle}",${amzPrice},${p.precio},${source}\n`;
      if (data) matched++;
    }

    fs.writeFileSync('reporte_precios_dmso.csv', csv);
    console.log(`Report generated: reporte_precios_dmso.csv`);
    console.log(`Matched ${matched}/${dbProducts.length} products.`);

  } catch (err: any) {
    console.error('Error:', err.message);
  }
  process.exit(0);
}

generateFinalReport();
