import 'dotenv/config';
import { asc, eq } from 'drizzle-orm';
import fs from 'fs';
import { db } from './src/lib/db';
import { categorias, productos } from './src/lib/schema';

const OUTPUT_FILE = 'revision_articulos_publicados.csv';
const STORE_URL = 'https://www.dmso.com.mx';

function csvCell(value: unknown) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

async function generateReviewCsv() {
  const rows = await db
    .select({
      id: productos.id,
      asin: productos.asin,
      titulo: productos.titulo,
      slug: productos.slug,
      precio: productos.precio,
      categoria: categorias.nombre,
      destacado: productos.destacado,
      stock: productos.stock,
      reviews: productos.reviews,
      imagenes: productos.imagenes,
    })
    .from(productos)
    .leftJoin(categorias, eq(productos.categoriaId, categorias.id))
    .where(eq(productos.activo, true))
    .orderBy(asc(categorias.nombre), asc(productos.titulo));

  const header = [
    'ID',
    'ASIN',
    'Título',
    'Categoría',
    'Precio publicado (MXN)',
    'Destacado actualmente',
    'Stock',
    'Reseñas',
    'Enlace en tienda',
    'Imagen principal',
    'Decisión (CONSERVAR/DESACTIVAR)',
    '¿Destacar? (SÍ/NO)',
    'Notas',
  ];

  const lines = rows.map((product) => {
    const images = Array.isArray(product.imagenes) ? product.imagenes : [];
    const reviews = Array.isArray(product.reviews) ? product.reviews : [];

    return [
      product.id,
      product.asin,
      product.titulo,
      product.categoria ?? 'Sin categoría',
      product.precio,
      product.destacado ? 'SÍ' : 'NO',
      product.stock ?? 0,
      reviews.length,
      `${STORE_URL}/producto/${product.slug}`,
      images[0] ?? '',
      'CONSERVAR',
      product.destacado ? 'SÍ' : 'NO',
      '',
    ].map(csvCell).join(',');
  });

  // BOM lets Excel recognize UTF-8 accented product names correctly.
  fs.writeFileSync(OUTPUT_FILE, `\ufeff${header.map(csvCell).join(',')}\n${lines.join('\n')}\n`);
  console.log(`${rows.length} productos exportados a ${OUTPUT_FILE}`);
}

generateReviewCsv().catch((error) => {
  console.error('No se pudo generar el CSV:', error);
  process.exitCode = 1;
});
