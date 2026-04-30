'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import {
  PayPalButtons,
  PayPalScriptProvider,
  PayPalCardFieldsProvider,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from '@paypal/react-paypal-js';
import Link from 'next/link';

// Debe ser componente separado porque usePayPalCardFields() solo funciona
// dentro del árbol de PayPalCardFieldsProvider.
function CardSubmitButton({ formValid }: { formValid: boolean }) {
  const { cardFieldsForm } = usePayPalCardFields();

  return (
    <button
      disabled={!formValid}
      onClick={async () => {
        if (!cardFieldsForm) return;
        try {
          await cardFieldsForm.submit();
        } catch (err) {
          console.error('Card submit error:', err);
        }
      }}
      className="w-full bg-[#191c1e] text-white py-4 rounded-lg font-bold text-base tracking-wide hover:bg-[#2d3133] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
    >
      Pagar con Tarjeta
    </button>
  );
}

function CheckoutTrustBadges() {
  return (
    <div className="mt-6 pt-5">
      <p className="text-center text-[11px] text-gray-500 mb-3 font-semibold tracking-widest uppercase">
        Pago 100% Seguro · Encriptación SSL
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg px-3 py-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#003087">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.828l-1.516 9.607h3.885c.46 0 .851-.334.924-.79l.038-.197.737-4.67.047-.258a.932.932 0 0 1 .921-.79h.58c3.759 0 6.701-1.528 7.558-5.948.36-1.845.174-3.386-.78-4.549z" />
          </svg>
          <span className="text-[10px] font-bold text-gray-700">PayPal Verified</span>
        </div>
        <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg px-3 py-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#006c4a">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <span className="text-[10px] font-bold text-gray-700">SSL 256-bit</span>
        </div>
        <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg px-3 py-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#003f87">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
          <span className="text-[10px] font-bold text-gray-700">Compra Protegida</span>
        </div>
        <div className="flex items-center gap-1.5 bg-stone-50 rounded-lg px-3 py-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#003f87">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
          </svg>
          <span className="text-[10px] font-bold text-gray-700">Garantía 30 días</span>
        </div>
      </div>
    </div>
  );
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-lg bg-stone-50 focus:ring-2 focus:ring-primary/30 focus:bg-white outline-none transition-all text-gray-900 text-base';

const LABEL_CLASS = 'block text-sm font-medium text-gray-700 mb-1';

export default function CheckoutClient() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const total = getTotal();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    calle: '',
    numExt: '',
    ciudad: '',
    estado: '',
    cp: '',
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setFormValid(Object.values(formData).every((val) => val.trim() !== ''));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createOrder = async () => {
    setOrderError('');
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, clienteData: formData }),
    });
    const orderData = await response.json();
    if (orderData.id) return orderData.id;
    const errorDetail = orderData?.details?.[0];
    throw new Error(
      errorDetail ? `${errorDetail.issue} ${errorDetail.description}` : JSON.stringify(orderData)
    );
  };

  const onApprove = async (data: any) => {
    const response = await fetch(`/api/orders/${data.orderID}/capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const orderData = await response.json();
    const errorDetail = orderData?.details?.[0];
    if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
      throw new Error('Instrumento de pago rechazado. Intenta con otro método.');
    }
    if (errorDetail) throw new Error(errorDetail.description);
    clearCart();
    setOrderSuccess(true);
  };

  if (!mounted) return null;

  if (orderSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">¡Pedido Confirmado!</h2>
        <p className="text-gray-600 mb-2 text-lg">Recibirás un correo con los detalles de tu pedido.</p>
        <p className="text-gray-500 mb-8 text-sm">Tiempo de entrega estimado: 7–10 días hábiles.</p>
        <Link
          href="/shop"
          className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
        >
          Seguir Comprando
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
        <Link
          href="/shop"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-bold"
        >
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
    currency: 'MXN',
    intent: 'capture',
    components: 'buttons,card-fields',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Formulario de Envío */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Datos de Envío</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Nombre(s)</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={INPUT_CLASS} required />
            </div>
            <div>
              <label className={LABEL_CLASS}>Apellidos</label>
              <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} className={INPUT_CLASS} required />
            </div>
          </div>
          <div>
            <label className={LABEL_CLASS}>Correo Electrónico</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={INPUT_CLASS} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className={LABEL_CLASS}>Calle</label>
              <input type="text" name="calle" value={formData.calle} onChange={handleChange} className={INPUT_CLASS} required />
            </div>
            <div>
              <label className={LABEL_CLASS}>Núm. Ext.</label>
              <input type="text" name="numExt" value={formData.numExt} onChange={handleChange} className={INPUT_CLASS} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Ciudad</label>
              <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className={INPUT_CLASS} required />
            </div>
            <div>
              <label className={LABEL_CLASS}>Estado</label>
              <input type="text" name="estado" value={formData.estado} onChange={handleChange} className={INPUT_CLASS} required />
            </div>
          </div>
          <div>
            <label className={LABEL_CLASS}>Código Postal</label>
            <input type="text" name="cp" value={formData.cp} onChange={handleChange} className={INPUT_CLASS} required />
          </div>
        </form>
      </div>

      {/* Resumen y Pago — SIN overflow-y-auto ni max-h en este div raíz */}
      <div className="bg-white p-8 rounded-xl shadow-sm h-fit">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>

        {/* Listado de productos — solo este bloque puede tener scroll */}
        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center p-2 shrink-0">
                  <img src={item.imagen} alt={item.titulo} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">{item.titulo}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Cant: {item.cantidad}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900 shrink-0 ml-3">
                ${(item.precio * item.cantidad).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center py-4 rounded-xl bg-stone-50 px-4 mb-6">
          <span className="text-base font-semibold text-gray-900">Total (MXN)</span>
          <span className="text-2xl font-bold text-dmso-green">${total.toFixed(2)}</span>
        </div>

        {orderError && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
            {orderError}
          </div>
        )}

        {formValid ? (
          <PayPalScriptProvider options={initialOptions}>
            {/* Botón PayPal Wallet */}
            <PayPalButtons
              fundingSource="paypal"
              style={{ layout: 'horizontal', shape: 'rect', height: 48 }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={() => setOrderError('Error al procesar el pago con PayPal. Intenta de nuevo.')}
            />

            {/* Divisor */}
            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">o paga con tarjeta</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Card Fields — siempre visible, CardSubmitButton dentro del Provider */}
            <PayPalCardFieldsProvider
              createOrder={createOrder}
              onApprove={onApprove}
              onError={() => setOrderError('Error al procesar el pago con tarjeta. Verifica tus datos e intenta de nuevo.')}
            >
              <div className="space-y-3">
                <PayPalNumberField />
                <div className="grid grid-cols-2 gap-3">
                  <PayPalExpiryField />
                  <PayPalCVVField />
                </div>
                <CardSubmitButton formValid={formValid} />
              </div>
            </PayPalCardFieldsProvider>
          </PayPalScriptProvider>
        ) : (
          <div className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm text-center font-medium">
            Completa los datos de envío para habilitar el pago.
          </div>
        )}

        <CheckoutTrustBadges />
      </div>
    </div>
  );
}
