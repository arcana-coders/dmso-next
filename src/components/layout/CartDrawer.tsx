'use client'

import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { cleanupText } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()

  const formatPrice = (n: number) =>
    n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })

  const subtotal = items.reduce((sum, i) => sum + (Number(i.precio) * i.cantidad), 0)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closeCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
          <div>
            <h2 className="text-xl font-bold text-on-surface font-headline tracking-tight">Tu Carrito</h2>
            <p className="text-xs text-on-surface-variant mt-0.5 font-body">
              {items.length} {items.length === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <span className="material-symbols-outlined text-[56px] text-on-surface-variant/30 mb-4">shopping_cart</span>
              <p className="font-bold text-on-surface text-lg font-headline">Carrito vacío</p>
              <p className="text-sm text-on-surface-variant mt-1 font-body">Agrega productos para continuar.</p>
              <button
                onClick={closeCart}
                className="mt-6 text-primary font-bold text-sm border-b border-primary pb-0.5 hover:opacity-70 transition-opacity"
              >
                Ver productos
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-18 h-18 flex-shrink-0 bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 flex items-center justify-center p-2">
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={cleanupText(item.titulo)}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-on-surface line-clamp-2 leading-snug mb-1 font-body">
                    {cleanupText(item.titulo)}
                  </p>
                  <p className="text-sm font-bold text-primary">{formatPrice(Number(item.precio))}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/20">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface text-sm font-bold text-primary transition-all"
                      >−</button>
                      <span className="w-6 text-center text-xs font-bold text-on-surface">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-surface text-sm font-bold text-primary transition-all"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider hover:text-error transition-colors ml-auto"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-outline-variant space-y-4 bg-surface-container-low">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider font-label-bold">Subtotal</span>
              <span className="text-2xl font-bold text-on-surface font-headline">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex items-center gap-3 py-3 px-4 bg-[#c1ebb5]/20 rounded-xl border border-[#c1ebb5]/30">
              <span className="material-symbols-outlined text-[#43673c] text-[20px]">local_shipping</span>
              <p className="text-xs text-on-surface font-bold leading-tight font-body">
                Envío gratis en pedidos superiores a $999 MXN
              </p>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 bg-primary hover:bg-primary/90 text-on-primary font-bold rounded-xl text-center text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-body"
            >
              Proceder al Pago
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
