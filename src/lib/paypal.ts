/**
 * PayPal Server Utilities
 * Handles the server-side validation and order creation for PayPal integration.
 */

interface ClienteData {
  nombre: string;
  apellidos: string;
  email: string;
  calle: string;
  numExt: string;
  ciudad: string;
  estado: string;
  cp: string;
}

export async function createPayPalOrder(items: any[], subtotal: number, clienteData?: ClienteData) {
  // TODO: Validate subtotal against DB prices using lib/db.ts
  // For now, using the provided subtotal

  const body: any = {
    intent: 'CAPTURE',
    application_context: {
      shipping_preference: 'NO_SHIPPING', // Address is handled directly in our form/billing
    },
    purchase_units: [
      {
        amount: {
          currency_code: 'MXN',
          value: subtotal.toFixed(2),
        },
      },
    ],
  };

  if (clienteData) {
    body.payer = {
      name: {
        given_name: clienteData.nombre,
        surname: clienteData.apellidos,
      },
      email_address: clienteData.email,
      address: {
        address_line_1: `${clienteData.calle} ${clienteData.numExt}`,
        admin_area_2: clienteData.ciudad,
        admin_area_1: clienteData.estado,
        postal_code: clienteData.cp,
        country_code: 'MX',
      },
    };
  }

  try {
    const response = await fetch(`${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al crear la orden en PayPal');
    }

    return data;
  } catch (error) {
    console.error('PayPal Create Order Error:', error);
    throw error;
  }
}
