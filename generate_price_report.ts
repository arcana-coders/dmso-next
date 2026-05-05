import 'dotenv/config';
import { db } from './src/lib/db';
import { productos } from './src/lib/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

async function generateReport() {
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

    // 2. Load imported products data from robots folder
    const csvPath = 'c:/robots/dmso-importer/data/productos_importados.csv';
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV not found at ${csvPath}`);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n');
    const importedData = new Map();

    // Skip BOM and header
    const header = lines[0].replace(/^\uFEFF/, '');
    const columns = header.split(',');
    
    const asinIdx = columns.indexOf('asin');
    const costoIdx = columns.indexOf('costo_usd');
    const precioMxIdx = columns.indexOf('precio_mxn');

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Basic CSV parsing (handles quotes)
      const values = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          values.push(current);
          current = '';
        } else current += char;
      }
      values.push(current);

      if (values[asinIdx]) {
        importedData.set(values[asinIdx], {
          costo_usd: values[costoIdx],
          precio_mxn: values[precioMxIdx]
        });
      }
    }

    console.log(`Loaded ${importedData.size} records from ${csvPath}`);

    // 3. Generate report
    let report = 'ASIN,Titulo,Amazon Price (USD),Calculated MXN (Scraper),Published Price (Site)\n';
    
    let matchCount = 0;
    for (const p of dbProducts) {
      const imported = importedData.get(p.asin);
      const amazonUSD = imported ? imported.costo_usd : 'N/A';
      const calcMXN = imported ? imported.precio_mxn : 'N/A';
      
      const cleanTitle = p.titulo.replace(/,/g, '');
      report += `${p.asin},"${cleanTitle}",${amazonUSD},${calcMXN},${p.precio}\n`;
      if (imported) matchCount++;
    }

    fs.writeFileSync('dmso_product_price_report.csv', report);
    console.log(`Report generated: dmso_product_price_report.csv`);
    console.log(`Matched ${matchCount}/${dbProducts.length} products.`);

    const unmatched = dbProducts.filter(p => !importedData.has(p.asin));
    if (unmatched.length > 0) {
      console.log(`Unmatched ASINs: ${unmatched.map(p => p.asin).join(', ')}`);
    }

  } catch (error: any) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

generateReport();
