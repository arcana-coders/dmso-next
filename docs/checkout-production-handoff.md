# Checkout production handoff

Este documento resume el cambio que se prepara para produccion y el patron que debe replicarse en las demas tiendas.

## Alcance del cambio

- PayPal Sandbox local queda como paso obligatorio antes de tocar produccion.
- `PAYPAL_ENV` controla sandbox/live y tiene prioridad sobre `PAYPAL_API_URL`.
- Ordenes sandbox usan prefijo `DMSO-SBX-*`.
- `create-order` genera numero de orden estable y manda `invoice_id`, `custom_id`, `description`, `amount.breakdown` e `items` a PayPal.
- `capture` reconstruye carrito desde Neon, valida total contra PayPal y solo inserta/enviar correo si el pago queda `COMPLETED`.
- El checkout bloquea doble submit durante el pago.
- La pagina `/checkout/exitoso` renderiza el numero de orden sin depender de animaciones fragiles.
- Correos de cliente y tienda son HTML con fallback `text`.
- Direccion Mexico: `colonia` obligatoria y `referencias` opcional en formulario, DB, PayPal y correos.
- Badges de confianza: SVG locales PayPal/McAfee/Norton/Google, 2x2 en movil y 4 columnas desde tablet.
- Checkout y pagina de producto deben usar el mismo patron visual. En este repo el componente reusable vive en `src/components/ui/PaymentSealBadges.tsx`; `src/components/product/TrustBadges.tsx` solo lo envuelve en modo compacto.

## Variables esperadas

Sandbox local:

```env
PAYPAL_ENV=sandbox
NEXT_PUBLIC_PAYPAL_ENV=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=client_id_sandbox
PAYPAL_CLIENT_ID=client_id_sandbox
PAYPAL_CLIENT_SECRET=secret_sandbox
SANDBOX_ORDER_EMAIL=correo_interno_para_pruebas
```

Produccion:

```env
PAYPAL_ENV=live
NEXT_PUBLIC_PAYPAL_ENV=live
NEXT_PUBLIC_PAYPAL_CLIENT_ID=client_id_live
PAYPAL_CLIENT_ID=client_id_live
PAYPAL_CLIENT_SECRET=secret_live
```

No hardcodear credenciales en codigo, docs o scripts.

Nota 2026-05-18: DMSO Store ya tiene credenciales Live propias. No se documentan valores secretos aqui. Para produccion, Arturo debe cargar en Vercel Production el par Live de DMSO Store en `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` y `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, manteniendo `PAYPAL_ENV=live` y `NEXT_PUBLIC_PAYPAL_ENV=live`.

## Pruebas antes de deploy

- `npm run build`.
- Carrito probado en local: agregar producto debe abrir drawer con producto y el header/menu debe reabrirlo. Si se usa `127.0.0.1`, confirmar `allowedDevOrigins` en `next.config.ts`.
- Compra sandbox wallet completada.
- Compra sandbox tarjeta completada o Card Fields documentado como no elegible.
- Correo cliente HTML recibido.
- Correo tienda HTML recibido.
- Pantalla de exito con numero real.
- Orden sandbox distinguible.
- Direccion completa conservada, incluyendo colonia y referencias si existen.
- Badges revisados en celular y tablet.
- Pagina de producto revisada con los mismos badges que checkout.

## Pase a produccion 2026-05-18

- Prueba sandbox confirmada por Arturo: pago sandbox completado correctamente despues de los ajustes visuales moviles.
- Root cause de fallo rapido con tarjeta live: produccion estaba en modo live, pero el token OAuth fallaba con `Client Authentication failed` / `invalid_client`, consistente con credenciales PayPal del ambiente equivocado o no correspondientes a DMSO Store.
- Accion definida: reemplazar en Vercel Production las credenciales PayPal por las Live propias de DMSO Store; no requiere cambio de codigo.
- Root cause adicional local/live: el frontend forzaba `sandbox` cuando `NODE_ENV !== 'production'`, aun con `NEXT_PUBLIC_PAYPAL_ENV=live`. Resultado: cargaba `https://www.sandbox.paypal.com/sdk/js` con un Client ID Live. La regla correcta es que `NEXT_PUBLIC_PAYPAL_ENV=live` debe cargar SDK produccion incluso en `next dev`.
- Validacion obligatoria al cambiar a Live local: verificar que el SDK cargue desde `https://www.paypal.com/sdk/js`, que OAuth live devuelva token y que `/api/orders` cree orden PayPal Live antes de intentar tarjeta.
- Telefono del cliente queda obligatorio para operar envios. Debe viajar en `clienteData`, validarse antes de crear orden, guardarse en `ordenes.cliente.telefono` y aparecer en correo cliente/tienda.
- `.env.local` queda en modo live para la siguiente revision local contra PayPal produccion:
  - `PAYPAL_ENV=live`
  - `NEXT_PUBLIC_PAYPAL_ENV=live`
- Cambios UI incluidos en este pase:
  - CTA de catalogo movil mas visible y funcional; agrega al carrito desde `/shop` sin navegar.
  - CTA de producto movil debajo del selector de cantidad y de ancho completo.
  - Badges de pago contenidos en su grid, incluyendo PayPal Verified.
- Validacion local antes de subir: `npm run build`, `/shop` HTTP 200, `/checkout` HTTP 200 y prueba Playwright movil de agregar al carrito desde catalogo.
- Siguiente verificacion en produccion: esperar deploy de Vercel desde GitHub, abrir `/shop`, `/producto/...` y `/checkout`, y ejecutar una sola compra real pequena como smoke test.

## Deploy

1. Confirmar que las variables de Vercel Production estan en modo live.
2. Subir commit a GitHub.
3. Deployar en Vercel.
4. Verificar `/checkout` en produccion.
5. Hacer una sola compra real pequena como smoke test.
6. Confirmar:
   - un solo cobro,
   - una sola orden,
   - telefono guardado y visible para operar envio,
   - correo cliente sin `[SANDBOX]`,
   - correo tienda sin `[SANDBOX]`,
   - PayPal Live con tienda, orden, descripcion e items.

## Nota sobre badges

Los badges tipo McAfee, Norton y Google deben revisarse antes de produccion si se van a presentar como certificaciones reales. Si no hay certificacion activa, deben tratarse como recurso visual o reemplazarse por texto propio no certificante.
