import 'dotenv/config';
import { db } from './src/lib/db';
import { productos } from './src/lib/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs';

async function generateCSV() {
  try {
    const allProducts = await db.query.productos.findMany({
      where: eq(productos.activo, true),
      columns: {
        asin: true,
        titulo: true,
        precio: true,
        detalles: true
      }
    });

    console.log(`Processing ${allProducts.length} products...`);

    let csvContent = 'ASIN,Titulo,Precio Amazon (aprox),Precio Publicado\n';

    for (const p of allProducts) {
      // Try to find amazon price in details or elsewhere
      // If we don't have it, we might just put "N/A" or try to find it in the CSV later
      const amazonPrice = (p.detalles as any)?.amazonPrice || (p.detalles as any)?.originalPrice || 'N/A';
      
      // Escape commas in title
      const cleanTitle = p.titulo.replace(/,/g, '');
      
      csvContent += `${p.asin || 'N/A'},${cleanTitle},${amazonPrice},${p.precio}\n`;
    }

    fs.writeFileSync('productos_publicados.csv', csvContent);
    console.log('CSV generated: productos_publicados.csv');

  } catch (error: any) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}

generateCSV();
