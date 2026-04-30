import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Políticas de Devolución | DMSO México',
  description: 'Conoce nuestras políticas de cambios y devoluciones para tus compras en DMSO México.',
}

export default function ReturnsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-8">Devoluciones y Reembolsos</h1>
      
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">1. Condiciones de Devolución</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Dada la naturaleza de nuestros productos (insumos terapéuticos y químicos), solo se aceptan devoluciones en caso de defectos de fabricación o si el producto llega dañado. El sello de seguridad debe estar intacto.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">2. Plazo para Reclamaciones</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Usted cuenta con 7 días naturales a partir de la recepción del producto para reportar cualquier anomalía o daño al correo <a href="mailto:soporte@dmso.com.mx" className="text-primary font-bold hover:underline">soporte@dmso.com.mx</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">3. Proceso de Reembolso</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Una vez aprobada la devolución, el reembolso se procesará a través del mismo método de pago utilizado en la compra (PayPal) en un plazo de 5 a 10 días hábiles.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">4. Gastos de Envío por Devolución</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Si la devolución es por error nuestro o daño de origen, DMSO México cubrirá los gastos de recolección y reenvío.
          </p>
        </section>
      </div>
    </main>
  )
}
