import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(email: string, orderId: string, total: number, items: any[]) {
  try {
    const data = await resend.emails.send({
      from: 'DMSO México <ventas@dmso.com.mx>', // Asegúrate de verificar este dominio en Resend
      to: email,
      subject: `Confirmación de Pedido #${orderId} - DMSO México`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h1 style="color: #1a5653;">¡Gracias por tu compra!</h1>
          <p>Hemos recibido tu pedido correctamente. Aquí tienes los detalles:</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Pedido #${orderId}</h2>
            <ul style="list-style-type: none; padding-left: 0;">
              ${items.map(item => `
                <li style="margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
                  <strong>${item.titulo}</strong> x ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
                </li>
              `).join('')}
            </ul>
            <h3 style="text-align: right; margin-bottom: 0;">Total: $${total.toFixed(2)} MXN</h3>
          </div>

          <p>Tu pedido será procesado a la brevedad. Te enviaremos otro correo cuando sea enviado.</p>
          
          <p style="color: #6b7280; font-size: 14px;">
            Si tienes alguna duda, responde a este correo o contáctanos en soporte@dmso.com.mx
          </p>
        </div>
      `,

    });

    return { success: true, data };
  } catch (error) {
    console.error('Error enviando correo de confirmación:', error);
    return { success: false, error };
  }
}
