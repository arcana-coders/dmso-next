import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Políticas de Envío | DMSO México',
  description: 'Información sobre tiempos de entrega y costos de envío en DMSO México.',
}

export default function ShippingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-8">Políticas de Envío</h1>
      
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">1. Cobertura</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Realizamos envíos a toda la República Mexicana a través de las principales empresas de logística (FedEx, DHL, Estafeta).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">2. Tiempos de Entrega</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            El tiempo de entrega estimado es de 7 a 10 días hábiles después de confirmado el pago. Esto se debe a que nuestros productos son importados directamente para garantizar la máxima pureza.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">3. Costos de Envío</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Ofrecemos envío gratuito en compras superiores a $999 MXN. Para pedidos menores, el costo de envío se calculará al momento de realizar el pago.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">4. Seguimiento del Pedido</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Una vez que su pedido sea enviado, recibirá un correo electrónico con el número de guía para que pueda rastrear su paquete en tiempo real.
          </p>
        </section>
      </div>
    </main>
  )
}
