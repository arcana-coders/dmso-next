'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, Suspense } from 'react'
import { gsap } from 'gsap'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || 'DMSO-PREVIEW'

  useEffect(() => {
    const tl = gsap.timeline()
    tl.from('.success-card', { scale: 0.9, opacity: 0, duration: 1, ease: 'power4.out' })
      .from('.success-icon', { scale: 0, rotate: -45, duration: 0.8, ease: 'back.out(2)' }, '-=0.5')
      .from('.success-text', { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, '-=0.4')
  }, [])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 py-20">
      <div className="success-card max-w-2xl w-full bg-surface rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,56,108,0.12)] border border-outline-variant/20 text-center relative overflow-hidden">

        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c1ebb5]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="success-icon w-24 h-24 bg-[#c1ebb5]/30 text-[#43673c] rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-surface shadow-sm">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="success-text text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-6 font-headline">
            ¡Gracias por tu compra!
          </h1>

          <p className="success-text text-on-surface-variant text-lg mb-10 max-w-md mx-auto leading-relaxed font-body">
            Tu pedido ha sido procesado con éxito. Pronto recibirás un correo con los detalles y el seguimiento de tu envío.
          </p>

          <div className="success-text bg-surface-container rounded-2xl p-6 mb-12 border border-outline-variant/20 inline-block px-10">
            <span className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.25em] mb-2">Número de Pedido</span>
            <span className="text-2xl font-black text-primary tracking-tight">{orderNumber}</span>
          </div>

          <div className="success-text grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="bg-primary text-on-primary px-8 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/shop"
              className="bg-surface text-on-surface border-2 border-outline-variant/30 px-8 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:border-primary transition-all"
            >
              Seguir Comprando
            </Link>
          </div>

          <p className="success-text mt-12 text-[11px] font-bold text-on-surface-variant leading-tight max-w-xs mx-auto">
            ¿Dudas sobre tu pedido? Escríbenos a{' '}
            <span className="text-primary">soporte@dmso.com.mx</span>{' '}
            con tu número de pedido.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
