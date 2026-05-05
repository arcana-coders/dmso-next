import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ordenes } from '@/lib/schema';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderID: string }> }
) {
  try {
    const { orderID } = await params;
    const { clienteData, items, total } = await request.json();

    const response = await fetch(
      `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    const captureData = await response.json();

    if (!response.ok) {
      throw new Error(captureData.message || 'Error al capturar la orden en PayPal');
    }

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Pago no completado', detail: captureData }, { status: 400 });
    }

    // Guardar orden confirmada en BD
    const ordenId = `DMSO-${Date.now()}`;
    const captureId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? orderID;

    await db.insert(ordenes).values({
      id: ordenId,
      paypalOrderId: captureId,
      total: String(total ?? 0),
      estado: 'COMPLETED',
      cliente: {
        nombre: clienteData?.nombre ?? '',
        apellidos: clienteData?.apellidos ?? '',
        email: clienteData?.email ?? '',
      },
      direccion: {
        calle: clienteData?.calle ?? '',
        numExt: clienteData?.numExt ?? '',
        ciudad: clienteData?.ciudad ?? '',
        estado: clienteData?.estado ?? '',
        cp: clienteData?.cp ?? '',
      },
      items: items ?? [],
    });

    // Email de confirmación — no bloqueante
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'DMSO México <pedidos@dmso.com.mx>',
            to: [clienteData?.email],
            subject: `✅ Pedido confirmado — ${ordenId}`,
            html: `
              <div style="font-family:sans-serif;max-width:520px;margin:auto">
                <h2 style="color:#006c4a">¡Tu pedido está confirmado!</h2>
                <p>Hola <strong>${clienteData?.nombre}</strong>, recibimos tu pago correctamente.</p>
                <p><strong>Número de pedido:</strong> ${ordenId}</p>
                <p><strong>Total:</strong> $${Number(total).toFixed(2)} MXN</p>
                <p>Tiempo de entrega estimado: <strong>7–10 días hábiles</strong>.</p>
                <p>Cualquier duda escríbenos a <a href="mailto:soporte@dmso.com.mx">soporte@dmso.com.mx</a></p>
                <p style="color:#666;font-size:13px;margin-top:32px">DMSO México · dmso.com.mx</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('Error enviando email de confirmación:', emailErr);
      }
    } else {
      console.warn(`[DMSO] Orden ${ordenId} completada — RESEND_API_KEY no configurado.`);
    }

    return NextResponse.json({ ...captureData, numeroOrden: ordenId });
  } catch (error: any) {
    console.error('API Orders Capture POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
