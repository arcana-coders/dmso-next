# Auditoría de indexación y plan de redirecciones 301

**Sitio:** dmso.com.mx

Elaborado a partir de Google Search Console — 14 de agosto de 2026

> Estado de implementación: `sitemap.xml` fue enviado a Google Search Console. Las 40 rutas únicas marcadas con confianza **Alta** se incorporaron como redirecciones HTTP 301. Las rutas marcadas **Media** o **Revisar** permanecen pendientes de validación comercial.

## 1. Resumen ejecutivo

Hoy Google tiene indexadas solo 4 páginas de dmso.com.mx (la home, el checkout, una ficha de producto y la página de contacto), de 126 URLs conocidas. Hace tres meses (mediados de mayo de 2026) el sitio tenía cerca de 50 páginas indexadas; la caída ha sido constante desde entonces.

Se identificaron dos causas raíz técnicas, ambas corregibles:

El sitemap registrado en Search Console (sitemap_index.xml) devuelve error 404 desde el 2 de mayo de 2026. Google no tiene, desde entonces, un mapa vigente del sitio. El sitemap correcto y funcional (sitemap.xml) sí existe y está actualizado, pero nunca se envió a Search Console.

Cuando la base de datos del sitio (alojada en Neon) se vació por un problema de espacio y se volvió a poblar, los productos se recrearon con URLs (slugs) distintas a las originales. Muchas de las páginas que Google tenía indexadas ya no existen bajo esa dirección; existen bajo otra. Adicionalmente, el generador de slugs actual elimina las vocales acentuadas en vez de convertirlas (ej. "líquido" → "lquido"), lo cual conviene corregir para que esto no se repita.

El tráfico orgánico actual (258 clics en los últimos 3 meses) llega en un 90% a la página de inicio, a través de búsquedas de marca ("dmso donde comprar", "dmso mexico"). Prácticamente no hay tráfico orgánico a fichas de producto específicas, porque casi ninguna está indexada.

Este documento incluye el listado completo de las 55 URLs que hoy devuelven error 404, con una propuesta de redirección 301 para cada una, además del resto de hallazgos de la auditoría y un plan de acción priorizado.

## 2. Estado de indexación (Google Search Console → Indexación → Páginas)

| Motivo | Fuente | Páginas | Estado |
| --- | --- | --- | --- |
| Indexadas | — | 4 | OK |
| No se ha encontrado (404) | Sitio web | 55 | Sin indexar |
| Rastreada: actualmente sin indexar | Sistemas de Google | 46 | Sin indexar |
| Bloqueada por robots.txt | Sitio web | 9 | Sin indexar |
| Página con redirección | Sitio web | 6 | Sin indexar |
| Duplicada sin versión canónica | Sitio web | 5 | Sin indexar |
| Excluida por etiqueta "noindex" | Sitio web | 1 | Sin indexar |

4 páginas indexadas + 122 sin indexar = 126 URLs conocidas por Google. "Página alternativa con etiqueta canónica adecuada" y "Descubierta: actualmente sin indexar" no tienen páginas afectadas (0) y se omiten de la tabla.

### 2.1 Causa raíz 1 — Sitemap roto

En Search Console → Sitemaps aparece enviado https://dmso.com.mx/sitemap_index.xml, con estado "No se ha podido obtener" y última lectura exitosa el 2 de mayo de 2026. Verificado directamente: esa URL da error 404 hoy.

El sitemap real del sitio, con las URLs vigentes y actualizado ayer mismo, vive en https://dmso.com.mx/sitemap.xml — y es justamente el que el propio robots.txt del sitio declara como el sitemap oficial ("Sitemap: https://www.dmso.com.mx/sitemap.xml"). Es decir: el sitio ya "sabe" cuál es su sitemap correcto; solo falta dárselo a Search Console.

### 2.2 Causa raíz 2 — Cambio de slugs de producto tras la reconstrucción de la base de datos

Ejemplo: la URL indexada históricamente para "2 Botellas DMSO 99.9% Heiltropfen" era /producto/2-botellas-dmso-99-9-heiltropfen/. Hoy el mismo producto vive en /producto/2-botellas-dmso-999-heiltropfen-1390 (perdió los puntos decimales del slug y ganó un ID numérico). Este patrón se repite en la mayoría de los productos: no es que el producto haya desaparecido, es que cambió de dirección.

### 2.3 Tráfico orgánico actual (Rendimiento, últimos 3 meses)

258 clics totales, 7,090 impresiones, CTR 3.6%, posición media 8.1.

| Consulta | Clics |
| --- | --- |
| dmso donde comprar | 19 |
| dmso mexico | 16 |
| dmso | 15 |
| dmso grado farmacéutico | 9 |
| dmso farmaceutico | 7 |
| dmso grado farmaceutico | 4 |

| Página | Clics (3 meses) |
| --- | --- |
| / (home) | 231 |
| /dmso-gel-que-es-para-que-sirve-y-como-se-usa/ | 5 |
| /dmso-facts | 4 |
| /dmso-uso-humano-beneficios-aplicaciones-y-seguridad/ | 2 |
| /shop | 2 |

El 90% del tráfico orgánico llega a la home por búsquedas de marca. Ninguna ficha de producto individual aparece entre las páginas con tráfico relevante — confirma que la falta de indexación de productos es hoy una oportunidad no capturada, más que una pérdida repentina de ventas.

## 3. Las 55 URLs con error 404 — plan de redirecciones 301

Metodología: cada URL antigua se comparó contra el sitemap vigente del sitio para identificar si corresponde al mismo producto (solo cambió el slug) o si el producto ya no existe en el catálogo actual.

Confianza "Alta" (41 de 55): coincide el contenido/descripción casi textualmente con un producto vigente — es prácticamente seguro que es el mismo producto con otro slug, o se trata de una categoría/paginación/artículo con equivalente directo. Redirigir 1:1.

Confianza "Media" (1 de 55): no hay equivalente exacto; el destino sugerido es una categoría relacionada, razonable pero no automática.

Confianza "Revisar" (13 de 55): no se encontró el mismo producto en el catálogo vigente (parece ser de los productos dados de baja). Se sugiere el producto más parecido disponible como redirección "a un producto similar", tal como se venía haciendo, pero conviene confirmarlo contra el catálogo real antes de aplicarlo, ya que la comparación se hizo por texto/descripción, no por inventario.

Los destinos marcados como "Producto ID ####" se refieren a la tabla de catálogo vigente del Anexo A, al final de este documento, con el nombre y la URL completa de cada producto.

| # | URL actual con error 404 (relativa a dmso.com.mx) | Tipo | Redirigir 301 a | Confianza |
| --- | --- | --- | --- | --- |
| 1 | /producto/dmso-roll-on-70-30-aloe-plast-3-oz-liquido/ | Producto (posible baja) | Producto ID 1464 — Dr. Robaina DMSO Roll-On /producto/dr-robaina-dmso-roll-on-cuidado-de-la-piel-de-rpida-absorcin-con-rnica-magnesio-aloe-vera-y-vitamina-e-frmula-no-grasa-para-comodidad-muscular-y-articular-fabricado-en-los-estados-unidos-1464 | Revisar |
| 2 | /producto/dmso-gel-70-30-sin-fragancia-4-oz-99-dmso-puro-naturess-gift/ | Producto (posible baja) | Producto ID 1558 — DMSO 70/30 16 oz Gel /producto/dmso-7030-16-oz-gel-con-agua-destilada-99995-puro-dmso-de-bajo-olor-grado-farmacutico-dimetilsulfxido-1558 | Revisar |
| 3 | /categoria-producto/roll-on/ | Categoría (ya no existe) | /categoria-producto/dmso-liquido | Alta |
| 4 | /producto/gotas-liquidas-dmso-con-pipeta-1-7-fl-oz-sulfoxido-de-dimetilo-99-9-dmso-puro-grado-farmaceutico-actuacion-rapida-topica-new-roots-herbal/ | Producto (posible baja) | Producto ID 1510 — DMSO Pipeta + Spray Heiltropfen 3.4 oz /producto/dmso-dimetilsulfxido-pipeta-spray-34-oz-34-fl-oz-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1510 | Revisar |
| 5 | /etiqueta-producto/dmso-99-9/ | Etiqueta (ya no existe) | /shop | Alta |
| 6 | /etiqueta-producto/dmso-16-onzas/ | Etiqueta (ya no existe) | /shop | Alta |
| 7 | /shop/page/3/ | Paginación de tienda | /shop | Alta |
| 8 | /categoria-producto/liquido/ | Categoría (renombrada) | /categoria-producto/dmso-liquido | Alta |
| 9 | /producto/dmso-70-30-16-oz-gel-con-agua-destilada-99-995-puro-dmso-de-bajo-olor-grado-farmaceutico-dimetilsulfoxido/ | Producto (mismo, cambió slug) | Producto ID 1558 — DMSO 70/30 16 oz Gel /producto/dmso-7030-16-oz-gel-con-agua-destilada-99995-puro-dmso-de-bajo-olor-grado-farmacutico-dimetilsulfxido-1558 | Alta |
| 10 | /producto/dr-robaina-dmso-gel-99-9-de-grado-farmaceutico-puro-formula-de-alivio-de-la-piel-con-magnesio-zechstein-arnica-aloe-vera-vitamina-e-comodidad-muscular-y-articular-4-onzas-fabricado-en/ | Producto (mismo, cambió slug) | Producto ID 1542 — Dr. Robaina DMSO Gel 4 oz /producto/dr-robaina-dmso-gel-999-de-grado-farmacutico-puro-frmula-de-alivio-de-la-piel-con-magnesio-zechstein-rnica-aloe-vera-vitamina-e-comodidad-muscular-y-articular-4-onzas-fabricado-en-1542 | Alta |
| 11 | /producto/dmso-3-oz-roll-on-5-botellas-especiales-99-995-de-bajo-olor-grado-farmaceutico-liquido-sin-bpa-contenedor/ | Producto (posible baja) | Producto ID 1464 — Dr. Robaina DMSO Roll-On /producto/dr-robaina-dmso-roll-on-cuidado-de-la-piel-de-rpida-absorcin-con-rnica-magnesio-aloe-vera-y-vitamina-e-frmula-no-grasa-para-comodidad-muscular-y-articular-fabricado-en-los-estados-unidos-1464 | Revisar |
| 12 | /producto/stellar-chemical-dmso-dimetilsulfoxido-1-galon-99-99-de-alta-pureza-fabricado-en-estados-unidos/ | Producto (posible baja, otra marca) | Producto ID 1656 — DMSO 1 Galón (128 oz) /producto/dmso-un-galn-128-onzas-puro-99995-lquido-de-grado-farmacutico-sin-olor-1656 | Revisar |
| 13 | /categoria-producto/gel/ | Categoría (renombrada) | /categoria-producto/dmso-gel | Alta |
| 14 | /producto/dmso-gel-contenedor-sin-bpa-de-grado-farmaceutico-99-995-sin-diluir-99-995-de-bajo-olor/ | Producto (posible baja) | Producto ID 1567 — DMSO Gel con Aloe Vera 16 oz /producto/dmso-gel-con-aloe-vera-mezcla-de-dimetilsulfxido-de-grado-farmacutico-7030-tarro-de-plstico-sin-bpa-de-16-onzas-1-libra-1567 | Revisar |
| 15 | /etiqueta-producto/dmso-para-dolor/ | Etiqueta (ya no existe) | /shop | Alta |
| 16 | /etiqueta-producto/dmsostore/ | Etiqueta (ya no existe) | /shop | Alta |
| 17 | /para-que-sirve-el-dmso-usos-dosis-y-seguridad-2025/ | Artículo de blog (URL antigua) | /blog/para-que-sirve-el-dmso-usos-dosis-y-seguridad-2026 | Alta |
| 18 | /producto/earth-harmony-dmso-grado-farmaceutico-99-9-sulfoxido-de-dimetilo-pureza-dmso-liquido-99-9-puro-con-cuentagotas-2-onzas/ | Producto (mismo, cambió slug) | Producto ID 1453 — Earth Harmony DMSO líquido 2 oz /producto/earth-harmony-dmso-grado-farmacutico-999-sulfxido-de-dimetilo-pureza-dmso-lquido-999-puro-con-cuentagotas-2-onzas-1453 | Alta |
| 19 | /producto/crema-dmso-dr-robaina-114-gramos/ | Producto (mismo, cambió slug) | Producto ID 1383 — Crema DMSO Dr. Robaina 114g /producto/crema-dmso-dr-robaina-114-gramos-1383 | Alta |
| 20 | /producto/99-9-dmso-puro-en-una-botella-de-vidrio-dimetilsulfoxido-liquido-puro-de-16-9-onzas-no-diluido-bajo-olor/ | Producto (mismo, cambió slug) | Producto ID 1605 — DMSO puro 16.9 oz botella de vidrio /producto/dmso-puro-en-una-botella-de-vidrio-dimetil-sulfxido-lquido-puro-169-onzas-no-diluido-bajo-olor-1605 | Alta |
| 21 | /dmso-gel-que-es-para-que-sirve-y-como-se-usa/ | Artículo de blog (URL antigua) | /blog/dmso-gel-que-es-para-que-sirve-y-como-se-usa | Alta |
| 22 | /etiqueta-producto/dmso-y-aloe-vera/ | Etiqueta (ya no existe) | /categoria-producto/dmso-gel | Media |
| 23 | /dmso-uso-humano-beneficios-aplicaciones-y-seguridad/ | Artículo de blog (URL antigua) | /blog/dmso-uso-humano-beneficios-aplicaciones-y-seguridad | Alta |
| 24 | /producto/dmso-crema-con-aloe-vera-aroma-de-rosa-4-oz-4-un-solo-color/ | Producto (posible baja) | Producto ID 1383 — Crema DMSO Dr. Robaina 114g /producto/crema-dmso-dr-robaina-114-gramos-1383 | Revisar |
| 25 | /producto/dmso-grado-farmaceutico-con-99-9-de-pureza-y-bajo-olor-botella-de-vidrio-de-3-38-onzas-sulfoxido-de-dimetilo-con-cuentagotas/ | Producto (mismo, cambió slug) | Producto ID 1528 — DMSO 3.38 oz con cuentagotas /producto/dmso-grado-farmacutico-con-999-de-pureza-y-bajo-olor-botella-de-vidrio-de-338-onzas-sulfxido-de-dimetilo-con-cuentagotas-1528 | Alta |
| 26 | /producto/dmso-gel-con-aloe-vera-4-onzas/ | Producto (posible baja, otra talla) | Producto ID 1567 — DMSO Gel con Aloe Vera 16 oz /producto/dmso-gel-con-aloe-vera-mezcla-de-dimetilsulfxido-de-grado-farmacutico-7030-tarro-de-plstico-sin-bpa-de-16-onzas-1-libra-1567 | Revisar |
| 27 | /brand/heiltropfen/ | Marca (ya no existe) | /shop | Alta |
| 28 | /producto/dmso-99-9-grado-farmaceutico-dimetilsulfoxido-liquido-puro-8-onzas-liquidas-en-botella-de-vidrio-sin-diluir-de-bajo-olor/ | Producto (mismo, cambió slug) | Producto ID b0ds66gp71 — DMSO 99.9% líquido 8 oz (variante ASIN) /producto/dmso-99-9-grado-farmaceutico-dimetilsulfoxido-liquido-puro-8-onzas-liquidas-en-b-b0ds66gp71 | Alta |
| 29 | /categoria-producto/liquido-2/ | Categoría (duplicada) | /categoria-producto/dmso-liquido | Alta |
| 30 | /shop/page/2/ | Paginación de tienda | /shop | Alta |
| 31 | /mi-cuenta/ | Página de cuenta de usuario | Confirmar con desarrollo si existe equivalente; si no, redirigir a / | Revisar |
| 32 | /producto/dmso-sulfoxido-de-dimetilo-99-9-grado-farmaceutico-8-45oz-botella-de-vidrio/ | Producto (mismo, cambió slug) | Producto ID 1640 — DMSO 8.45 oz botella de vidrio /producto/dmso-sulfxido-de-dimetilo-999-grado-farmacutico-845oz-botella-de-vidrio-1640 | Alta |
| 33 | /que-es-el-dmso-usos-riesgos-y-evidencia-2025/ | Artículo de blog (URL antigua) | /blog/que-es-el-dmso-usos-riesgos-y-evidencia-2026 | Alta |
| 34 | /brand/natures-gift/ | Marca (descontinuada) | /shop | Alta |
| 35 | /producto/dmso-liquido-botella-de-vidrio-8-fl-oz-natures-gift-99-9/ | Producto (posible baja, otra marca) | Producto ID 1580 — Dimetil Sulfóxido 8 oz alta calidad /producto/dimetil-sulfxido-dmso-9995-lquido-puro-8-oz-dmso-grado-farmacutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad-1580 | Revisar |
| 36 | /brand/dmsostore/ | Marca (ya no existe como archivo) | /shop | Alta |
| 37 | /shop/page/6/ | Paginación de tienda | /shop | Alta |
| 38 | /producto/frasco-de-3-oz-de-dimetilsulfoxido-dmso-de-grado-farmaceutico-999995-no-diluido-inodoro-sin-bpa/ | Producto (mismo, cambió slug) | Producto ID 1431 — Frasco 3 oz DMSO sin BPA /producto/frasco-de-3-oz-de-dimetilsulfxido-dmso-de-grado-farmacutico-999995-no-diluido-inodoro-sin-bpa-1431 | Alta |
| 39 | /producto/mezcla-de-aceite-dmso-y-magnesio-por-el-dr-hartmut-fischer-3-4-onzas-ingredientes-de-grado-farmaceutico-alta-pureza-bajo-olor-heiltropfen/ | Producto (mismo, cambió slug) | Producto ID 1518 — Mezcla DMSO y Magnesio Dr. Hartmut Fischer /producto/mezcla-de-aceite-dmso-y-magnesio-por-el-dr-hartmut-fischer-34-onzas-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1518 | Alta |
| 40 | /etiqueta-producto/dmso-y-vitamina-e/ | Etiqueta (ya no existe) | /shop | Alta |
| 41 | /producto/dmso-puro-en-una-botella-de-vidrio-dimetil-sulfoxido-liquido-puro-16-9-onzas-no-diluido-bajo-olor/ | Producto (mismo, duplicado de #20) | Producto ID 1605 — DMSO puro 16.9 oz botella de vidrio /producto/dmso-puro-en-una-botella-de-vidrio-dimetil-sulfxido-lquido-puro-169-onzas-no-diluido-bajo-olor-1605 | Alta |
| 42 | /producto/dr-robaina-crema-dmso-de-lavanda-99-9-de-grado-farmaceutico-puro-formula-nutritiva-para-la-piel-con-magnesio-zechstein-arnica-aloe-vera-vitamina-e-4-onzas-fabricado-en-esta/ | Producto (mismo, cambió slug) | Producto ID 1535 — Dr. Robaina Crema DMSO de Lavanda /producto/dr-robaina-crema-dmso-de-lavanda-999-de-grado-farmacutico-puro-frmula-nutritiva-para-la-piel-con-magnesio-zechstein-rnica-aloe-vera-vitamina-e-4-onzas-fabricado-en-estados-unidos-1535 | Alta |
| 43 | /producto/dimetil-sulfoxido-dmso-99-95-liquido-puro-8-oz-dmso-grado-farmaceutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad/ | Producto (mismo, cambió slug) | Producto ID 1580 — Dimetil Sulfóxido 8 oz alta calidad /producto/dimetil-sulfxido-dmso-9995-lquido-puro-8-oz-dmso-grado-farmacutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad-1580 | Alta |
| 44 | /producto/dmso-gel-con-aloe-vera-mezcla-de-dimetilsulfoxido-de-grado-farmaceutico-70-30-tarro-de-plastico-sin-bpa-de-16-onzas-1-libra/ | Producto (mismo, cambió slug) | Producto ID 1567 — DMSO Gel con Aloe Vera 16 oz /producto/dmso-gel-con-aloe-vera-mezcla-de-dimetilsulfxido-de-grado-farmacutico-7030-tarro-de-plstico-sin-bpa-de-16-onzas-1-libra-1567 | Alta |
| 45 | /producto/dmso-3-oz-rollo-en-4-botellas-especial-no-diluido-99-995-liquido-de-bajo-olor-grado-farmaceutico-en-un-recipiente-sin-bpa/ | Producto (posible baja) | Producto ID 1464 — Dr. Robaina DMSO Roll-On /producto/dr-robaina-dmso-roll-on-cuidado-de-la-piel-de-rpida-absorcin-con-rnica-magnesio-aloe-vera-y-vitamina-e-frmula-no-grasa-para-comodidad-muscular-y-articular-fabricado-en-los-estados-unidos-1464 | Revisar |
| 46 | /producto/dimetil-sulfoxido-dmso-99-95-liquido-puro-8-oz-dmso-grado-farmaceutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad/?add-to-cart=1431 | Producto (duplicado de #43, con parámetro) | Producto ID 1580 — Dimetil Sulfóxido 8 oz alta calidad /producto/dimetil-sulfxido-dmso-9995-lquido-puro-8-oz-dmso-grado-farmacutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad-1580 | Alta |
| 47 | /producto/dmso-dimetil-sulfoxido-liquido-de-8-onzas-empaquetado-en-una-botella-esteril-sin-bpa-sin-diluir-ultra-alta-pureza-99-995-de-bajo-olor-grado-farmaceutico-fabricado-por-dmso-store/ | Producto (mismo, título regenerado) | Producto ID 1588 — DMSO 8 oz botella estéril (DMSO México) /producto/dmso-8-oz-lquido-en-una-botella-de-vidrio-estril-puro-99995-grado-farmacutico-no-diluido-bajo-olor-dimetilsulfxido-fabricado-por-dmso-store-1588 | Alta |
| 48 | /producto/dmso-dimetilsulfoxido-pipeta-spray-3-4-oz-3-4-fl-oz-ingredientes-de-grado-farmaceutico-alta-pureza-bajo-olor-heiltropfen/ | Producto (mismo, cambió slug) | Producto ID 1510 — DMSO Pipeta + Spray Heiltropfen 3.4 oz /producto/dmso-dimetilsulfxido-pipeta-spray-34-oz-34-fl-oz-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1510 | Alta |
| 49 | /producto/dmso/ | Producto (mismo, cambió slug) | Producto ID 1428 — DMSO (genérico, 4 oz Belle Chemical) /producto/dmso-1428 | Alta |
| 50 | /producto/solucion-dmso-pharma-grade-48-onzas-9999-absolutamente-inodora/ | Producto (posible baja) | Producto ID 1656 — DMSO 1 Galón (128 oz) /producto/dmso-un-galn-128-onzas-puro-99995-lquido-de-grado-farmacutico-sin-olor-1656 | Revisar |
| 51 | /producto/dmso-crema-rosa-70-30-aloe-4-oz/ | Producto (posible baja) | Producto ID 1383 — Crema DMSO Dr. Robaina 114g /producto/crema-dmso-dr-robaina-114-gramos-1383 | Revisar |
| 52 | /etiqueta-producto/dmso-crema/ | Etiqueta (ya no existe) | /categoria-producto/dmso-crema | Alta |
| 53 | /producto/dmso-liquid-1-jarra-de-vidrio-puro-99-995-grado-farmaceutico-no-diluida-bajo-olor-dimetilsulfoxido/ | Producto (mismo, cambió slug) | Producto ID 1664 — DMSO Liquid 1 Jarra de vidrio /producto/dmso-liquid-1-jarra-de-vidrio-puro-99995-grado-farmacutico-no-diluida-bajo-olor-dimetilsulfxido-1664 | Alta |
| 54 | /producto/dmso-8-oz-liquido-en-una-botella-de-vidrio-esteril-puro-99-995-grado-farmaceutico-no-diluido-bajo-olor-dimetilsulfoxido-fabricado-por-dmso-store/ | Producto (mismo, duplicado de #47) | Producto ID 1588 — DMSO 8 oz botella estéril (DMSO México) /producto/dmso-8-oz-lquido-en-una-botella-de-vidrio-estril-puro-99995-grado-farmacutico-no-diluido-bajo-olor-dimetilsulfxido-fabricado-por-dmso-store-1588 | Alta |
| 55 | /etiqueta-producto/dmso-liquido/ | Etiqueta (ya no existe) | /categoria-producto/dmso-liquido | Alta |

## 4. Otros hallazgos técnicos (prioridad menor)

### 4.1 Bloqueadas por robots.txt (9 páginas)

Son todas URLs con parámetro ?add-to-cart=XXXX — remanentes de enlaces "agregar al carrito" de la plataforma de tienda anterior. El robots.txt actual no las bloquea explícitamente, pero tampoco existen ya en el sitio nuevo. No requieren redirección: son URLs que nunca debieron ser indexables y se irán descartando solas del rastreo de Google.

### 4.2 Páginas con redirección (6 páginas)

En su mayoría es normalización de barra final (ej. /shop/ redirige a /shop). Comportamiento esperado y saludable, sin acción urgente. Incluye una ficha de producto descontinuado (crema-70-dmso-...) que ya redirige a otra — confirma que la práctica de redirigir productos de baja hacia uno similar ya se ha aplicado antes.

### 4.3 Contenido duplicado sin versión canónica (5 páginas)

Google encontró 5 fichas de producto vigentes muy similares entre sí (mismo texto base con pequeñas variaciones) y no tiene indicada cuál es la versión "oficial" de cada grupo. Se resuelve agregando una etiqueta <link rel="canonical"> auto-referenciada en cada ficha de producto — una tarea técnica única que además previene que este problema reaparezca con nuevos productos.

### 4.4 Excluida por etiqueta "noindex" (1 página)

Es /cart/ (el carrito de compras). Es correcto que esta página no se indexe — no requiere ninguna acción.

### 4.5 Rastreada pero actualmente sin indexar (46 páginas)

Es la segunda bolsa más grande después de los 404. Google llegó a rastrear estas páginas pero decidió no indexarlas, típicamente por percibir el contenido como poco diferenciado entre sí (varias fichas de producto describen variantes muy parecidas de DMSO). Es razonable esperar que una parte relevante de estas páginas se resuelva sola una vez corregido el sitemap y los redirects de la Sección 3, ya que hoy Google ni siquiera tiene un mapa confiable del sitio para decidir qué indexar. Si tras 3-4 semanas persisten, conviene diferenciar más el contenido/descripciones entre productos similares.

## 5. Plan de acción priorizado

### Crítico — esta semana

En Search Console → Sitemaps, dar de baja o ignorar sitemap_index.xml y enviar https://dmso.com.mx/sitemap.xml (el que sí funciona y ya referencia el propio robots.txt del sitio).

Implementar las redirecciones 301 de la Sección 3, empezando por las 41 marcadas "Alta" — son mapeos prácticamente confirmados al mismo producto.

### Alto — próximas 2 semanas

Confirmar contra el catálogo real las 13 redirecciones marcadas "Revisar" (productos aparentemente dados de baja) antes de aplicarlas, y ajustar el destino si el producto sugerido no es el más adecuado.

Corregir el bug de generación de slugs que elimina las vocales acentuadas, para que no se rompa de nuevo la próxima vez que se actualice o repueble el catálogo.

Agregar etiqueta canonical auto-referenciada en las fichas de producto (resuelve el punto 4.3 y previene que reaparezca).

### Medio — primer mes

Una vez aplicados los puntos anteriores, usar "Inspección de URLs" en Search Console para solicitar indexación manual de los 8-10 productos más vendidos (hay límite diario de solicitudes).

Revisar y diferenciar el contenido de fichas de producto muy similares, para ayudar a resolver las 46 páginas "rastreadas pero sin indexar".

Confirmar con desarrollo si /mi-cuenta/ tiene página equivalente en el sitio nuevo; si no la tiene, decidir si se redirige a inicio o se retiran los enlaces que apuntan ahí.

### Continuo

Revisar el reporte Indexación → Páginas cada 1-2 semanas para confirmar que el número de páginas indexadas empieza a subir desde 4.

Revisar Rendimiento mensualmente para detectar qué búsquedas de producto específico (no solo de marca) empiezan a generar clics, y reforzar esas fichas.

## 6. Recomendaciones complementarias (fuera del alcance de esta auditoría)

Estas sugerencias no fueron verificadas a fondo en esta revisión; se anotan como posibles siguientes pasos para la estrategia comercial general, más allá de la indexación orgánica:

Evaluar Google Merchant Center / Shopping Ads como canal de ventas independiente de la indexación orgánica — no depende de que Google indexe las fichas y puede dar resultados más inmediatos.

Agregar datos estructurados (schema.org Product: precio, disponibilidad, reseñas) en las fichas de producto, para mejorar su presentación en resultados de Google.

Revisar Core Web Vitals / velocidad de carga del sitio (disponible en el menú de Search Console).

Dado que casi todo el tráfico actual es de marca, considerar contenido adicional (comparativas, guías de uso, preguntas frecuentes) orientado a búsquedas de producto específico para captar demanda que hoy no te encuentra.

## Anexo A — Catálogo de productos vigentes (referencia)

Tomado de https://dmso.com.mx/sitemap.xml el 14 de agosto de 2026. Usado como referencia para los destinos de redirección de la Sección 3.

| ID | Producto | URL completa vigente (relativa) |
| --- | --- | --- |
| 1383 | Crema DMSO Dr. Robaina 114g | /producto/crema-dmso-dr-robaina-114-gramos-1383 |
| 1390 | 2 Botellas DMSO 99.9% Heiltropfen | /producto/2-botellas-dmso-999-heiltropfen-1390 |
| 1394 | DMSO Líquido 99.995% Botella Vidrio | /producto/dmso-lquido-al-99995-botella-vidrio-1394 |
| 1428 | DMSO (genérico, 4 oz Belle Chemical) | /producto/dmso-1428 |
| 1431 | Frasco 3 oz DMSO sin BPA | /producto/frasco-de-3-oz-de-dimetilsulfxido-dmso-de-grado-farmacutico-999995-no-diluido-inodoro-sin-bpa-1431 |
| 1453 | Earth Harmony DMSO líquido 2 oz | /producto/earth-harmony-dmso-grado-farmacutico-999-sulfxido-de-dimetilo-pureza-dmso-lquido-999-puro-con-cuentagotas-2-onzas-1453 |
| 1464 | Dr. Robaina DMSO Roll-On | /producto/dr-robaina-dmso-roll-on-cuidado-de-la-piel-de-rpida-absorcin-con-rnica-magnesio-aloe-vera-y-vitamina-e-frmula-no-grasa-para-comodidad-muscular-y-articular-fabricado-en-los-estados-unidos-1464 |
| 1471 | 70% DMSO Heiltropfen 3.4 oz | /producto/70-dmso-ingredientes-de-grado-farmacutico-dimetilsulfxido-lquido-34-oz-34-fl-oz-alta-pureza-bajo-olor-heiltropfen-dmso-liquid-7030-1471 |
| 1483 | DMSO 70/30 3.38 oz con cuentagotas | /producto/dmso-70-con-agua-desmineralizada-30-botella-de-vidrio-338oz-con-cuentagotas-1483 |
| 1510 | DMSO Pipeta + Spray Heiltropfen 3.4 oz | /producto/dmso-dimetilsulfxido-pipeta-spray-34-oz-34-fl-oz-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1510 |
| 1518 | Mezcla DMSO y Magnesio Dr. Hartmut Fischer | /producto/mezcla-de-aceite-dmso-y-magnesio-por-el-dr-hartmut-fischer-34-onzas-ingredientes-de-grado-farmacutico-alta-pureza-bajo-olor-heiltropfen-1518 |
| 1528 | DMSO 3.38 oz con cuentagotas | /producto/dmso-grado-farmacutico-con-999-de-pureza-y-bajo-olor-botella-de-vidrio-de-338-onzas-sulfxido-de-dimetilo-con-cuentagotas-1528 |
| 1535 | Dr. Robaina Crema DMSO de Lavanda | /producto/dr-robaina-crema-dmso-de-lavanda-999-de-grado-farmacutico-puro-frmula-nutritiva-para-la-piel-con-magnesio-zechstein-rnica-aloe-vera-vitamina-e-4-onzas-fabricado-en-estados-unidos-1535 |
| 1542 | Dr. Robaina DMSO Gel 4 oz | /producto/dr-robaina-dmso-gel-999-de-grado-farmacutico-puro-frmula-de-alivio-de-la-piel-con-magnesio-zechstein-rnica-aloe-vera-vitamina-e-comodidad-muscular-y-articular-4-onzas-fabricado-en-1542 |
| 1549 | Dr. Robaina DMSO Lavender Roll-On | /producto/dr-robaina-dmso-lavender-roll-on-alivio-definitivo-del-dolor-y-nutricin-de-la-piel-999-de-grado-farmacutico-puro-con-rnica-magnesio-aloe-vera-vitamina-e-fabricado-en-los-estados-unidos-1549 |
| 1558 | DMSO 70/30 16 oz Gel | /producto/dmso-7030-16-oz-gel-con-agua-destilada-99995-puro-dmso-de-bajo-olor-grado-farmacutico-dimetilsulfxido-1558 |
| 1567 | DMSO Gel con Aloe Vera 16 oz | /producto/dmso-gel-con-aloe-vera-mezcla-de-dimetilsulfxido-de-grado-farmacutico-7030-tarro-de-plstico-sin-bpa-de-16-onzas-1-libra-1567 |
| 1580 | Dimetil Sulfóxido 8 oz alta calidad | /producto/dimetil-sulfxido-dmso-9995-lquido-puro-8-oz-dmso-grado-farmacutico-sin-diluir-sin-diluir-e-inodoro-contenido-en-botella-de-vidrio-de-alta-calidad-1580 |
| 1588 | DMSO 8 oz botella estéril (DMSO México) | /producto/dmso-8-oz-lquido-en-una-botella-de-vidrio-estril-puro-99995-grado-farmacutico-no-diluido-bajo-olor-dimetilsulfxido-fabricado-por-dmso-store-1588 |
| 1595 | DMSO Pharma Grade 8.45 fl oz (Alemania) | /producto/dmso-pharma-grade-999-ph-eur-845-fl-oz-85-fl-oz-dmso-lquido-puro-en-botella-de-vidrio-mbar-sin-diluir-e-inodoro-fabricado-en-alemania-1595 |
| 1605 | DMSO puro 16.9 oz botella de vidrio | /producto/dmso-puro-en-una-botella-de-vidrio-dimetil-sulfxido-lquido-puro-169-onzas-no-diluido-bajo-olor-1605 |
| 1640 | DMSO 8.45 oz botella de vidrio | /producto/dmso-sulfxido-de-dimetilo-999-grado-farmacutico-845oz-botella-de-vidrio-1640 |
| 1656 | DMSO 1 Galón (128 oz) | /producto/dmso-un-galn-128-onzas-puro-99995-lquido-de-grado-farmacutico-sin-olor-1656 |
| 1664 | DMSO Liquid 1 Jarra de vidrio | /producto/dmso-liquid-1-jarra-de-vidrio-puro-99995-grado-farmacutico-no-diluida-bajo-olor-dimetilsulfxido-1664 |
| b0c57h1nsq | Paquete 2 unidades DMSO + Gel Aloe Vera | /producto/paquete-juego-de-2-unidades-dmso-99-9-3-4-fl-oz-gel-dmso-con-aloe-vera-5-oz-heil-b0c57h1nsq |
| b0ds66gp71 | DMSO 99.9% líquido 8 oz (variante ASIN) | /producto/dmso-99-9-grado-farmaceutico-dimetilsulfoxido-liquido-puro-8-onzas-liquidas-en-b-b0ds66gp71 |
