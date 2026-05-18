'use client';

import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import {
  PayPalButtons,
  PayPalScriptProvider,
  PayPalCardFieldsProvider,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import Link from 'next/link';
import PaymentSealBadges from '@/components/ui/PaymentSealBadges';

// Debe ser componente separado porque usePayPalCardFields() solo funciona
// dentro del árbol de PayPalCardFieldsProvider.
function CardSubmitButton({ formValid, isProcessing }: { formValid: boolean; isProcessing: boolean }) {
  const { cardFieldsForm } = usePayPalCardFields();

  return (
    <button
      disabled={!formValid || isProcessing}
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
      {isProcessing ? 'Procesando...' : 'Pagar con Tarjeta'}
    </button>
  );
}

function CheckoutTrustBadgesOld() {
  const badges = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: 'PayPal',
      detail: 'Pago procesado por PayPal',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      title: 'SSL',
      detail: 'Checkout cifrado',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
        </svg>
      ),
      title: 'Verificado',
      detail: 'Total validado',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      title: 'Correo',
      detail: 'Confirmación enviada',
      color: 'bg-primary/10 text-primary'
    }
  ];

  return (
    <div className="mt-8 rounded-2xl border border-[#dfe7ef] bg-[#f7fafc] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Pago seguro</p>
        <p className="text-xs font-bold text-dmso-green">MXN</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((badge, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-white px-3 py-3 shadow-[0_8px_20px_rgba(0,63,135,0.05)]">
            <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${badge.color}`}>
              {badge.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-black leading-snug text-gray-900">{badge.title}</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-snug text-gray-500">{badge.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardPaymentSection({
  createOrder,
  onApprove,
  onError,
  formValid,
  isProcessing,
}: {
  createOrder: () => Promise<string>;
  onApprove: (data: any) => Promise<void>;
  onError: () => void;
  formValid: boolean;
  isProcessing: boolean;
}) {
  const [{ isResolved }] = usePayPalScriptReducer();
  const [cardEligibility, setCardEligibility] = useState<'checking' | 'eligible' | 'ineligible'>('checking');

  useEffect(() => {
    if (!isResolved) return;

    try {
      const paypal = (window as any).paypal;
      const cardFields = paypal?.CardFields?.({ createOrder, onApprove, onError });
      setCardEligibility(cardFields?.isEligible?.() ? 'eligible' : 'ineligible');
    } catch (error) {
      console.warn('PayPal card fields eligibility check failed:', error);
      setCardEligibility('ineligible');
    }
  }, [isResolved, createOrder, onApprove, onError]);

  if (cardEligibility === 'checking') {
    return (
      <div className="rounded-lg border border-gray-100 bg-stone-50 px-4 py-3 text-center text-sm font-medium text-gray-500">
        Cargando pago con tarjeta...
      </div>
    );
  }

  if (cardEligibility === 'ineligible') {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
        PayPal no habilitó el pago con tarjeta para esta cuenta sandbox. Puedes probar el pago con PayPal arriba, o activar
        Advanced Credit and Debit Card Payments en la cuenta business sandbox.
      </div>
    );
  }

  return (
    <PayPalCardFieldsProvider createOrder={createOrder} onApprove={onApprove} onError={onError}>
      <div className="space-y-3">
        <PayPalNumberField />
        <div className="grid grid-cols-2 gap-3">
          <PayPalExpiryField />
          <PayPalCVVField />
        </div>
        <CardSubmitButton formValid={formValid} isProcessing={isProcessing} />
      </div>
    </PayPalCardFieldsProvider>
  );
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-lg bg-stone-50 focus:ring-2 focus:ring-primary/30 focus:bg-white outline-none transition-all text-gray-900 text-base';

const LABEL_CLASS = 'block text-sm font-medium text-gray-700 mb-1';

export default function CheckoutClient() {
  const { items, getTotal, clearCart, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentInFlightRef = useRef(false);
  const total = getTotal();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    calle: '',
    numExt: '',
    colonia: '',
    ciudad: '',
    estado: '',
    cp: '',
    referencias: '',
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const requiredFields = ['nombre', 'apellidos', 'email', 'telefono', 'calle', 'numExt', 'colonia', 'ciudad', 'estado', 'cp'] as const;
    setFormValid(requiredFields.every((field) => formData[field].trim() !== ''));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createOrder = async () => {
    if (paymentInFlightRef.current) {
      throw new Error('Ya estamos procesando tu pago.');
    }

    paymentInFlightRef.current = true;
    setIsProcessing(true);
    setOrderError('');
    try {
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error creando la orden de PayPal';
      setOrderError(message);
      paymentInFlightRef.current = false;
      setIsProcessing(false);
      throw error;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await fetch(`/api/orders/${data.orderID}/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteData: formData, items, total }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al procesar el pago. Por favor contacta a soporte.');
      }

      const orderData = await response.json();

      clearCart();
      // Redirigir a la página de éxito con el número de orden real
      router.push(`/checkout/exitoso?order=${orderData.numeroOrden}`);
    } catch (error: any) {
      console.error('Error en onApprove:', error);
      setOrderError(error.message);
      paymentInFlightRef.current = false;
      setIsProcessing(false);
    }
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

  const explicitPayPalEnv = process.env.NEXT_PUBLIC_PAYPAL_ENV;
  const paypalEnvironment: 'sandbox' | 'production' =
    explicitPayPalEnv === 'live'
      ? 'production'
      : explicitPayPalEnv === 'sandbox' || process.env.NODE_ENV !== 'production'
        ? 'sandbox'
        : 'production';

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: 'MXN',
    intent: 'capture',
    components: 'buttons,card-fields',
    environment: paypalEnvironment,
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
          <div>
            <label className={LABEL_CLASS}>Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={INPUT_CLASS}
              autoComplete="tel"
              inputMode="tel"
              required
            />
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
          <div>
            <label className={LABEL_CLASS}>Colonia</label>
            <input type="text" name="colonia" value={formData.colonia} onChange={handleChange} className={INPUT_CLASS} required />
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
          <div>
            <label className={LABEL_CLASS}>Referencias <span className="text-gray-400 font-normal">(opcional)</span></label>
            <input
              type="text"
              name="referencias"
              value={formData.referencias}
              onChange={handleChange}
              className={INPUT_CLASS}
              placeholder="Entre calles, color de casa, indicaciones de entrega"
            />
          </div>
        </form>
      </div>

      {/* Resumen y Pago — SIN overflow-y-auto ni max-h en este div raíz */}
      <div className="bg-white p-8 rounded-xl shadow-sm h-fit">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>

        {/* Listado de productos — solo este bloque puede tener scroll */}
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1 no-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 py-4 border-b border-gray-50 last:border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0 border border-gray-100">
                    <img src={item.imagen} alt={item.titulo} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 mb-1">{item.titulo}</h3>
                    <p className="text-xs font-bold text-dmso-green">${item.precio.toFixed(2)} c/u</p>
                  </div>
                </div>
                <p className="text-sm font-black text-gray-900 shrink-0 ml-3">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-1">
                {/* Selector de Cantidad */}
                <div className="flex items-center bg-stone-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white rounded-md transition-all active:scale-90"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-700">{item.cantidad}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-white rounded-md transition-all active:scale-90"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>

                {/* Botón Eliminar */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-95 group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Eliminar</span>
                </button>
              </div>
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
              disabled={isProcessing}
              fundingSource="paypal"
              style={{ layout: 'horizontal', shape: 'rect', height: 48 }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={() => {
                paymentInFlightRef.current = false;
                setIsProcessing(false);
                setOrderError('Error al procesar el pago con PayPal. Intenta de nuevo.');
              }}
            />

            {/* Divisor */}
            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">o paga con tarjeta</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <CardPaymentSection
              createOrder={createOrder}
              onApprove={onApprove}
              onError={() => {
                paymentInFlightRef.current = false;
                setIsProcessing(false);
                setOrderError('Error al procesar el pago con tarjeta. Verifica tus datos e intenta de nuevo.');
              }}
              formValid={formValid}
              isProcessing={isProcessing}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm text-center font-medium">
            Completa los datos de envío para habilitar el pago.
          </div>
        )}

        <PaymentSealBadges />
      </div>
    </div>
  );
}
