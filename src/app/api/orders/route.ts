import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';
import { db } from '@/lib/db';
import { productos } from '@/lib/schema';
import { inArray } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { items, clienteData } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
    }

    // SEGURIDAD: Validar precios desde la base de datos
    const ids = items.map((i: any) => parseInt(i.id));
    const dbProducts = await db
      .select({ id: productos.id, precio: productos.precio })
      .from(productos)
      .where(inArray(productos.id, ids));

    let subtotal = 0;
    items.forEach((cartItem: any) => {
      const dbProduct = dbProducts.find((p) => p.id === parseInt(cartItem.id));
      if (dbProduct) subtotal += Number(dbProduct.precio) * cartItem.cantidad;
    });

    const order = await createPayPalOrder(items, subtotal, clienteData);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('API Orders POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
