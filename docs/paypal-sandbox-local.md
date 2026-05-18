# PayPal Sandbox local

Este modo permite probar el checkout completo sin dinero real. La prueba local debe ejercitar el sistema real: PayPal SDK, create-order, capture, Neon, Resend, pantalla de exito, correo a cliente y correo interno.

Produccion no se toca para afinar. Primero se pasa sandbox local; despues se hace una compra real pequena solo como smoke test.

## Variables locales

Crear o editar `.env.local` con credenciales de la app REST sandbox:

```env
PAYPAL_ENV=sandbox
NEXT_PUBLIC_PAYPAL_ENV=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=pegar_client_id_sandbox
PAYPAL_CLIENT_ID=pegar_client_id_sandbox
PAYPAL_CLIENT_SECRET=pegar_secret_sandbox
SANDBOX_ORDER_EMAIL=tu_correo_para_recibir_pruebas
```

No pegar credenciales live en este archivo de prueba.

## Cuentas sandbox

PayPal Sandbox usa piezas separadas:

| Pieza | Uso |
|---|---|
| Business sandbox | Recibe el pago falso y es duena de la REST API app |
| Personal sandbox | Simula al comprador en el popup PayPal |
| REST API app sandbox | Entrega `Client ID` y `Secret` para `.env.local` |

El email/password de la cuenta personal sandbox no va en variables. Solo se usa para iniciar sesion en el popup de PayPal al pagar.

Para probar tarjeta embebida, la cuenta business sandbox/app debe tener habilitado Advanced/Expanded Credit and Debit Card Payments. Si PayPal no marca elegible la app, la UI debe mostrar aviso y no un hueco vacio.

## Correr local

```bash
npm run build
npm run dev
```

Abrir `http://localhost:3000/checkout` y pagar con la cuenta sandbox personal compradora desde `https://sandbox.paypal.com`.

## Direccion de entrega

El checkout debe capturar direccion mexicana completa:

- Calle y numero exterior.
- Colonia obligatoria.
- Ciudad, estado y codigo postal.
- Referencias opcionales para entrega.

`referencias` no bloquea la compra si viene vacio. `colonia` si debe ser obligatoria antes de habilitar PayPal.

## Que revisar

- PayPal muestra pago sandbox, sin dinero real.
- Se crea una sola orden.
- La orden local usa prefijo `DMSO-SBX-*` para distinguirla de ventas reales.
- La pantalla de exito muestra el numero de orden.
- La direccion guardada conserva colonia y referencias cuando existan.
- El correo interno llega en HTML con tienda, cliente, email, direccion completa, productos, ASIN/SKU, cantidades y total.
- El correo al cliente llega en HTML con numero de pedido, direccion completa, productos, total y proximos pasos.
- Los correos sandbox llegan con prefijo `[SANDBOX]` y aviso de dinero falso.
- PayPal muestra `invoice_id`, `custom_id`, descripcion e items.
- Doble click o reintento no genera orden duplicada.

## Badges de confianza en checkout y producto

El bloque debajo del pago y la pagina de producto deben usar los mismos badges SVG locales. No usar imagenes externas ni copiar assets remotos.

Componente fuente: `src/components/ui/PaymentSealBadges.tsx`.

Patron actual:

- PayPal Verified.
- McAfee Secure.
- Norton Secured.
- Google Trusted.

Responsive:

- Celular: grid 2x2.
- Tablet y desktop: 4 badges en una fila.
- Usar ancho maximo para que en iPad no se inflen como carteles.
- En pagina de producto usar variante compacta para no competir con precio y boton de carrito.

Antes de produccion, revisar si estos nombres se mantienen como claims literales o si se cambian a texto propio. Si no existe certificacion activa de McAfee/Norton/Google, no se debe presentar como certificacion real en copy legal o comercial.

## Criterio para pasar a produccion

No hacer deploy live hasta que esta lista este completa:

- [ ] `npm run build` local pasa.
- [ ] Pago wallet sandbox completo.
- [ ] Pago tarjeta sandbox completo o Card Fields documentado como no elegible por PayPal.
- [ ] Orden `DMSO-SBX-*` guardada.
- [ ] Orden guarda direccion con colonia y referencias si se capturaron.
- [ ] Correo cliente HTML correcto.
- [ ] Correo tienda HTML correcto.
- [ ] Pagina de exito visible con numero de orden.
- [ ] PayPal sandbox muestra contexto operativo.
- [ ] Badges de confianza se ven bien en celular y tablet.
- [ ] Pagina de producto usa los mismos badges que checkout.
- [ ] Claims visuales de badges revisados antes de produccion.
- [ ] No hay orden duplicada por doble submit.

Despues de deploy live, hacer solo una compra real pequena para confirmar que live usa dinero real, correos sin `[SANDBOX]` y PayPal muestra el contexto.
