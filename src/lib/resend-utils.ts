import { Resend } from 'resend';

const STORE_EMAIL = 'soporte@dmso.com.mx';

export async function sendOrderConfirmationEmail({
  email,
  orderId,
  customerName,
  total,
  items,
  address,
}: {
  email?: string;
  orderId: string;
  customerName?: string;
  total: number;
  items: any[];
  address?: Record<string, any>;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY no configurada — email omitido');
    return { success: false };
  }

  if (!email) {
    console.warn(`[DMSO] Orden ${orderId} sin email de cliente — solo se notificará a tienda.`);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const itemLines = (items ?? [])
    .map((item: any) => `- ${item.titulo} | ASIN/SKU: ${item.asin ?? 'N/A'} | Cantidad: ${item.cantidad} | Precio: $${item.precio}`)
    .join('\n');
  const addressText = address
    ? [address.calle, address.numExt, address.ciudad, address.estado, address.cp].filter(Boolean).join(', ')
    : 'Sin direccion capturada';

  try {
    if (email) {
      const customerEmail = await resend.emails.send({
        from: `DMSO México <${STORE_EMAIL}>`,
        to: [email],
        subject: `Confirmación de Pedido #${orderId} - DMSO México`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a5653;">¡Gracias por tu compra!</h1>
            <p>Hola <strong>${customerName || 'cliente'}</strong>, recibimos tu pago correctamente.</p>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin-top: 0;">Pedido #${orderId}</h2>
              <ul style="list-style-type: none; padding-left: 0;">
                ${items.map(item => `
                  <li style="margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                    <strong>${item.titulo}</strong> x ${item.cantidad} - $${(Number(item.precio) * Number(item.cantidad)).toFixed(2)}
                  </li>
                `).join('')}
              </ul>
              <h3 style="text-align: right; margin-bottom: 0;">Total: $${total.toFixed(2)} MXN</h3>
            </div>

            <p>Tu pedido será procesado a la brevedad. Te enviaremos otro correo cuando sea enviado.</p>

            <p style="color: #6b7280; font-size: 14px;">
              Si tienes alguna duda, responde a este correo o contáctanos en ${STORE_EMAIL}
            </p>
          </div>
        `,
      });

      if (customerEmail.error) {
        throw new Error(`Resend cliente: ${customerEmail.error.message}`);
      }
    }

    const storeEmail = await resend.emails.send({
      from: `DMSO México <${STORE_EMAIL}>`,
      to: [STORE_EMAIL],
      subject: `Nueva venta DMSO: ${orderId}`,
      text: `Tienda: DMSO Mexico
Numero de orden: ${orderId}
Cliente: ${customerName || 'N/A'}
Email cliente: ${email || 'N/A'}
Direccion: ${addressText}
Total: $${total.toFixed(2)} MXN

Productos:
${itemLines || 'Sin productos capturados'}`,
    });

    if (storeEmail.error) {
      throw new Error(`Resend tienda: ${storeEmail.error.message}`);
    }

    return { success: true, data: storeEmail.data };
  } catch (error) {
    console.error('Error enviando correo de confirmación:', error);
    return { success: false, error };
  }
}
