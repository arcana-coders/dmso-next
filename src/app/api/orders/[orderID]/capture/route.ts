import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderID: string }> }
) {
  try {
    const { orderID } = await params;

    const response = await fetch(`${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al capturar la orden en PayPal');
    }

    // TODO: Guardar la orden en la base de datos (Neon/Drizzle)
    // TODO: Enviar correo de confirmación con Resend

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API Orders Capture POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
