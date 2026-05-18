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
  colonia?: string;
  ciudad: string;
  estado: string;
  cp: string;
  referencias?: string;
}

type PayPalItem = {
  asin?: string | null;
  titulo?: string | null;
  precio: number;
  cantidad: number;
};

type PayPalOrderMetadata = {
  storeName: string;
  orderNumber: string;
};

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const EXPLICIT_PAYPAL_ENV = process.env.PAYPAL_ENV;
const PAYPAL_ENV = EXPLICIT_PAYPAL_ENV || (process.env.NODE_ENV === 'production' ? 'live' : 'sandbox');
const PAYPAL_API_URLS = {
  live: 'https://api-m.paypal.com',
  sandbox: 'https://api-m.sandbox.paypal.com',
} as const;

const BASE_URL = EXPLICIT_PAYPAL_ENV
  ? PAYPAL_API_URLS[PAYPAL_ENV === 'live' ? 'live' : 'sandbox']
  : process.env.PAYPAL_API_URL || PAYPAL_API_URLS[PAYPAL_ENV === 'live' ? 'live' : 'sandbox'];

export function getPayPalEnvironment() {
  return PAYPAL_ENV === 'live' ? 'live' : 'sandbox';
}

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

function buildPurchaseUnit(items: PayPalItem[], total: number, metadata?: PayPalOrderMetadata) {
  const paypalItems = items.map((item) => ({
    name: String(item.titulo || 'Producto').slice(0, 127),
    sku: String(item.asin || item.titulo || 'producto').slice(0, 127),
    quantity: String(item.cantidad),
    unit_amount: {
      currency_code: 'MXN',
      value: Number(item.precio).toFixed(2),
    },
  }));

  const itemTotal = items.reduce((sum, item) => sum + Number(item.precio) * Number(item.cantidad), 0);
  const discount = Math.max(itemTotal - total, 0);
  const description = `${metadata?.storeName || 'DMSO Mexico'} - ${paypalItems.map((item) => item.name).join(', ')}`;

  return {
    ...(metadata?.orderNumber && { invoice_id: metadata.orderNumber }),
    ...(metadata?.storeName && { custom_id: `${metadata.storeName} ${metadata.orderNumber}`.slice(0, 127) }),
    description: description.slice(0, 127),
    amount: {
      currency_code: 'MXN',
      value: total.toFixed(2),
      breakdown: {
        item_total: {
          currency_code: 'MXN',
          value: itemTotal.toFixed(2),
        },
        ...(discount > 0 && {
          discount: {
            currency_code: 'MXN',
            value: discount.toFixed(2),
          },
        }),
      },
    },
    items: paypalItems,
  };
}

export async function createPayPalOrder(items: PayPalItem[], subtotal: number, clienteData?: ClienteData, metadata?: PayPalOrderMetadata) {
  const accessToken = await getPayPalAccessToken();

  const body: any = {
    intent: 'CAPTURE',
    application_context: {
      shipping_preference: 'NO_SHIPPING', // Address is handled directly in our form/billing
    },
    purchase_units: [
      buildPurchaseUnit(items, subtotal, metadata),
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
        address_line_2: [clienteData.colonia, clienteData.referencias].filter(Boolean).join(' | ').slice(0, 300),
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
