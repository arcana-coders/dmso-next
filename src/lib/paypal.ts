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

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const BASE_URL = process.env.PAYPAL_API_URL || (
  process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'
);

export async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error('Faltan credenciales de PayPal');
  }

  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Error obteniendo token de PayPal');
  }

  return data.access_token;
}

export async function createPayPalOrder(items: any[], subtotal: number, clienteData?: ClienteData) {
  const accessToken = await getPayPalAccessToken();

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
    const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error_description || 'Error al capturar la orden en PayPal');
  }

  return data;
}
