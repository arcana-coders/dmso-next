import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ordenes, productos } from '@/lib/schema';
import { capturePayPalOrder } from '@/lib/paypal';
import { sendOrderConfirmationEmail } from '@/lib/resend-utils';
import { and, eq, inArray } from 'drizzle-orm';

type CartItem = {
  id?: string | number;
  cantidad?: number;
};

function normalizeCart(items: CartItem[]) {
  const quantities = new Map<number, number>();

  for (const item of items) {
    const id = Number(item.id);
    if (!Number.isInteger(id) || id < 1) {
      throw new Error('Producto inválido en carrito');
    }

    const quantity = Number(item.cantidad);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error('Cantidad inválida en carrito');
    }

    quantities.set(id, (quantities.get(id) ?? 0) + quantity);
  }

  return quantities;
}

async function buildSecureOrderItems(items: CartItem[]) {
  const quantities = normalizeCart(items);
  const ids = Array.from(quantities.keys());
  const dbProducts = await db
    .select({
      id: productos.id,
      asin: productos.asin,
      titulo: productos.titulo,
      precio: productos.precio,
      imagenes: productos.imagenes,
    })
    .from(productos)
    .where(and(inArray(productos.id, ids), eq(productos.activo, true)));

  if (dbProducts.length !== ids.length) {
    throw new Error('Producto no disponible');
  }

  const secureItems = dbProducts.map((product) => {
    const quantity = quantities.get(product.id) ?? 0;
    const images = Array.isArray(product.imagenes) ? product.imagenes : [];

    return {
      productoId: product.id,
      asin: product.asin,
      titulo: product.titulo,
      precio: Number(product.precio),
      cantidad: quantity,
      imagen: images[0] ?? null,
    };
  });

  const total = secureItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  if (total <= 0) {
    throw new Error('Total inválido');
  }

  return { secureItems, total };
}

function getCapturedAmount(captureData: any) {
  return Number(captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? NaN);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderID: string }> }
) {
  try {
    const { orderID } = await params;
    const { clienteData, items } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
    }

    const { secureItems, total } = await buildSecureOrderItems(items);

    const captureData = await capturePayPalOrder(orderID);

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Pago no completado', detail: captureData }, { status: 400 });
    }

    // Guardar orden confirmada en BD
    const ordenId = `DMSO-${Date.now()}`;
    const captureId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? orderID;
    const capturedAmount = getCapturedAmount(captureData);

    if (!Number.isFinite(capturedAmount) || Math.abs(capturedAmount - total) > 0.01) {
      console.error('Monto PayPal no coincide con total servidor', { orderID, capturedAmount, total });
      return NextResponse.json({ error: 'Monto de pago inválido' }, { status: 409 });
    }

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
      items: secureItems,
    });

    try {
      await sendOrderConfirmationEmail({
        email: clienteData?.email,
        orderId: ordenId,
        customerName: [clienteData?.nombre, clienteData?.apellidos].filter(Boolean).join(' '),
        total: Number(total ?? 0),
        items: secureItems,
      });
    } catch (emailErr) {
      console.error('Error enviando emails de confirmación:', emailErr);
    }

    return NextResponse.json({ ...captureData, numeroOrden: ordenId });
  } catch (error: any) {
    console.error('API Orders Capture POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
