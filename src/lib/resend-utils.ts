import { Resend } from 'resend';

const STORE_EMAIL = 'soporte@dmso.com.mx';
const PAYPAL_ENV = process.env.PAYPAL_ENV || (process.env.NODE_ENV === 'production' ? 'live' : 'sandbox');
const IS_SANDBOX = PAYPAL_ENV !== 'live';
const SANDBOX_ORDER_EMAIL = process.env.SANDBOX_ORDER_EMAIL || STORE_EMAIL;

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatMoney(value: number) {
  return `$${Number(value || 0).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}

function productRows(items: any[]) {
  return (items ?? []).map((item: any) => {
    const quantity = Number(item.cantidad || 0);
    const price = Number(item.precio || 0);
    const lineTotal = price * quantity;

    return `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;">
          <div style="font-weight:700;color:#111827;line-height:1.45;">${escapeHtml(item.titulo || 'Producto')}</div>
          <div style="font-size:12px;color:#6b7280;margin-top:5px;">ASIN/SKU: ${escapeHtml(item.asin || 'N/A')}</div>
        </td>
        <td style="padding:16px 12px;border-bottom:1px solid #e5e7eb;text-align:center;color:#111827;font-weight:700;">${quantity}</td>
        <td style="padding:16px 0;border-bottom:1px solid #e5e7eb;text-align:right;color:#111827;font-weight:700;white-space:nowrap;">${formatMoney(lineTotal)}</td>
      </tr>
    `;
  }).join('');
}

function customerEmailHtml({
  orderId,
  customerName,
  phone,
  total,
  items,
  addressText,
}: {
  orderId: string;
  customerName?: string;
  phone?: string;
  total: number;
  items: any[];
  addressText: string;
}) {
  return `
    <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
      <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
        ${IS_SANDBOX ? `
          <div style="background:#fff7ed;color:#9a3412;border:1px solid #fed7aa;border-radius:12px;padding:12px 16px;margin-bottom:16px;font-size:13px;font-weight:700;">
            MODO SANDBOX: pago de prueba, no dinero real.
          </div>
        ` : ''}

        <div style="background:#143A2C;color:#ffffff;border-radius:18px 18px 0 0;padding:24px;">
          <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;opacity:.85;">DMSO Mexico</div>
          <div style="font-size:28px;font-weight:900;margin-top:8px;">Gracias por tu compra</div>
          <div style="font-size:15px;line-height:1.6;margin-top:10px;opacity:.9;">
            Hola ${escapeHtml(customerName || 'cliente')}, recibimos tu pago correctamente.
          </div>
        </div>

        <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 18px 18px;padding:24px;">
          <div style="display:block;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:18px;margin-bottom:22px;">
            <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Numero de pedido</div>
            <div style="font-size:22px;color:#143A2C;font-weight:800;margin-top:4px;">${escapeHtml(orderId)}</div>
          </div>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:22px;">
            <tr>
              <td style="vertical-align:top;">
                <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;">Direccion de envio</div>
                <div style="font-size:14px;color:#374151;line-height:1.5;margin-top:6px;">${escapeHtml(addressText)}</div>
                <div style="font-size:14px;color:#374151;line-height:1.5;margin-top:6px;"><strong>Telefono:</strong> ${escapeHtml(phone || 'N/A')}</div>
              </td>
            </tr>
          </table>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th align="left" style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;padding-bottom:8px;border-bottom:2px solid #e5e7eb;">Producto</th>
                <th align="center" style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;padding-bottom:8px;border-bottom:2px solid #e5e7eb;">Cant.</th>
                <th align="right" style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;padding-bottom:8px;border-bottom:2px solid #e5e7eb;">Importe</th>
              </tr>
            </thead>
            <tbody>
              ${productRows(items) || '<tr><td colspan="3" style="padding:16px 0;color:#6b7280;">Sin productos capturados</td></tr>'}
            </tbody>
          </table>

          <div style="margin-top:22px;background:#ecfdf5;border:1px solid #bbf7d0;border-radius:14px;padding:18px;text-align:right;">
            <div style="font-size:12px;color:#047857;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Total pagado</div>
            <div style="font-size:28px;color:#10B981;font-weight:900;margin-top:4px;">${formatMoney(total)}</div>
          </div>

          <div style="margin-top:22px;border-top:1px solid #e5e7eb;padding-top:18px;color:#374151;font-size:14px;line-height:1.7;">
            Tu pedido será procesado a la brevedad. Te enviaremos la información de seguimiento cuando esté listo para envío.
            <br />
            Si tienes alguna duda, responde a este correo o contáctanos en <strong>${STORE_EMAIL}</strong>.
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function sendOrderConfirmationEmail({
  email,
  phone,
  orderId,
  customerName,
  total,
  items,
  address,
}: {
  email?: string;
  phone?: string;
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
  const subjectPrefix = IS_SANDBOX ? '[SANDBOX] ' : '';
  const storeRecipientEmail = IS_SANDBOX ? SANDBOX_ORDER_EMAIL : STORE_EMAIL;
  const itemLines = (items ?? [])
    .map((item: any) => `- ${item.titulo} | ASIN/SKU: ${item.asin ?? 'N/A'} | Cantidad: ${item.cantidad} | Precio: $${item.precio}`)
    .join('\n');
  const addressText = address
    ? [
      [address.calle, address.numExt].filter(Boolean).join(' '),
      address.colonia ? `Col. ${address.colonia}` : '',
      address.ciudad,
      address.estado,
      address.cp ? `CP ${address.cp}` : '',
      address.referencias ? `Referencias: ${address.referencias}` : '',
    ].filter(Boolean).join(', ')
    : 'Sin direccion capturada';

  try {
    if (email) {
      const customerEmail = await resend.emails.send({
        from: `DMSO México <${STORE_EMAIL}>`,
        to: [email],
        subject: `${subjectPrefix}Confirmación de Pedido #${orderId} - DMSO México`,
        html: customerEmailHtml({ orderId, customerName, phone, total, items, addressText }),
        text: `${IS_SANDBOX ? 'MODO SANDBOX: pago de prueba, no dinero real.\n\n' : ''}Gracias por tu compra en DMSO Mexico.

Numero de pedido: ${orderId}
Cliente: ${customerName || 'N/A'}
Telefono: ${phone || 'N/A'}
Direccion: ${addressText}
Total: ${formatMoney(total)}

Productos:
${itemLines || 'Sin productos capturados'}

Tu pedido sera procesado a la brevedad. Si tienes dudas, responde este correo.`,
      });

      if (customerEmail.error) {
        throw new Error(`Resend cliente: ${customerEmail.error.message}`);
      }
    }

    const storeEmail = await resend.emails.send({
      from: `DMSO México <${STORE_EMAIL}>`,
      to: [storeRecipientEmail],
      subject: `${subjectPrefix}Nueva venta DMSO: ${orderId}`,
      html: `
        <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
          <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
            ${IS_SANDBOX ? `
              <div style="background:#fff7ed;color:#9a3412;border:1px solid #fed7aa;border-radius:12px;padding:12px 16px;margin-bottom:16px;font-size:13px;font-weight:700;">
                MODO SANDBOX: pago de prueba, no dinero real.
              </div>
            ` : ''}

            <div style="background:#143A2C;color:#ffffff;border-radius:18px 18px 0 0;padding:22px 24px;">
              <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;opacity:.85;">DMSO Mexico</div>
              <div style="font-size:24px;font-weight:800;margin-top:6px;">Nueva venta recibida</div>
            </div>

            <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 18px 18px;padding:24px;">
              <div style="display:block;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:18px;margin-bottom:22px;">
                <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Numero de orden</div>
                <div style="font-size:22px;color:#143A2C;font-weight:800;margin-top:4px;">${escapeHtml(orderId)}</div>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:22px;">
                <tr>
                  <td style="width:50%;vertical-align:top;padding:0 8px 12px 0;">
                    <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;">Cliente</div>
                    <div style="font-size:16px;color:#111827;font-weight:700;margin-top:4px;">${escapeHtml(customerName || 'N/A')}</div>
                    <div style="font-size:14px;color:#374151;margin-top:4px;">${escapeHtml(email || 'N/A')}</div>
                    <div style="font-size:14px;color:#374151;margin-top:4px;">${escapeHtml(phone || 'N/A')}</div>
                  </td>
                  <td style="width:50%;vertical-align:top;padding:0 0 12px 8px;">
                    <div style="font-size:12px;color:#6b7280;font-weight:700;text-transform:uppercase;">Direccion</div>
                    <div style="font-size:14px;color:#374151;line-height:1.5;margin-top:4px;">${escapeHtml(addressText)}</div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <thead>
                  <tr>
                    <th align="left" style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;padding-bottom:8px;border-bottom:2px solid #e5e7eb;">Producto</th>
                    <th align="center" style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;padding-bottom:8px;border-bottom:2px solid #e5e7eb;">Cant.</th>
                    <th align="right" style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em;padding-bottom:8px;border-bottom:2px solid #e5e7eb;">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows(items) || '<tr><td colspan="3" style="padding:16px 0;color:#6b7280;">Sin productos capturados</td></tr>'}
                </tbody>
              </table>

              <div style="margin-top:22px;background:#ecfdf5;border:1px solid #bbf7d0;border-radius:14px;padding:18px;text-align:right;">
                <div style="font-size:12px;color:#047857;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Total pagado</div>
                <div style="font-size:28px;color:#10B981;font-weight:900;margin-top:4px;">${formatMoney(total)}</div>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `${IS_SANDBOX ? 'MODO SANDBOX: pago de prueba, no dinero real.\n\n' : ''}Tienda: DMSO Mexico
Numero de orden: ${orderId}
Cliente: ${customerName || 'N/A'}
Email cliente: ${email || 'N/A'}
Telefono cliente: ${phone || 'N/A'}
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
