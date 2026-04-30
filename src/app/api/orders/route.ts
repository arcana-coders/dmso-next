import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';

export async function POST(request: Request) {
  try {
    const { items, clienteData } = await request.json();

    // Calcular el subtotal real
    const subtotal = items.reduce((total: number, item: any) => total + (item.precio * item.cantidad), 0);

    const orderData = await createPayPalOrder(items, subtotal, clienteData);
    
    return NextResponse.json(orderData);
  } catch (error: any) {
    console.error('API Orders POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
