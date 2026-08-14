# Depuración de catálogo y redirecciones

La tienda se depura mediante una hoja de revisión sin borrar productos de la base de datos. Los artículos que se retiran cambian a `activo = false`, desaparecen de la tienda y del sitemap, pero conservan su URL para poder redirigirla permanentemente.

## Revisión aplicada el 13 de agosto de 2026

- 81 productos activos revisados.
- 40 productos desactivados.
- 41 productos permanecen publicados.
- 40 URLs retiradas redirigen con HTTP 301 a un producto activo.

El detalle de cada destino está en [`../redirecciones_articulos_retirados.csv`](../redirecciones_articulos_retirados.csv). El mapa que usa la aplicación está en [`../src/data/retiredProductRedirects.json`](../src/data/retiredProductRedirects.json).

Las URLs históricas detectadas por Google Search Console se documentan en [`auditoria-indexacion-2026-08-14.md`](auditoria-indexacion-2026-08-14.md). Sus redirecciones confirmadas viven por separado en [`../src/data/legacyRedirects.json`](../src/data/legacyRedirects.json) y se aplican antes de consultar la base de datos.

## Cómo repetir el proceso

1. Exportar los productos activos con `npm run export:review`.
2. Abrir `revision_articulos_publicados.csv` en LibreOffice o Excel y actualizar las columnas:
   - `Decisión (CONSERVAR/DESACTIVAR)`
   - `¿Destacar? (SÍ/NO)`
3. Guardar como `.ods` y exportar a CSV desde LibreOffice.
4. Ejecutar primero una simulación:

   ```bash
   node scripts/apply-product-review.mjs /ruta/a/revision_articulos_publicados.csv
   ```

5. Revisar `redirecciones_articulos_retirados.csv`. Cada destino se elige priorizando formato, concentración, volumen, categoría y similitud del título.
6. Aplicar los cambios:

   ```bash
   node scripts/apply-product-review.mjs /ruta/a/revision_articulos_publicados.csv --apply
   ```

7. Desplegar la aplicación para activar las redirecciones 301. La desactivación de productos se aplica inmediatamente a la base de datos.

## Regla SEO

Las URLs de productos retirados se redirigen solo a un sustituto relacionado. Una URL sin destino en el mapa devuelve 404 real; no debe redirigirse al inicio ni a un producto no relacionado.
