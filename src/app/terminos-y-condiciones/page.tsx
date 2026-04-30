import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | DMSO México',
  description: 'Términos y condiciones de uso del sitio web y compra de productos en DMSO México.',
}

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-8">Términos y Condiciones</h1>
      
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">1. Aceptación de Términos</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Al acceder y utilizar este sitio web (dmso.com.mx), usted acepta estar sujeto a los términos y condiciones aquí descritos. Si no está de acuerdo, por favor absténgase de utilizar el sitio.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">2. Uso de los Productos</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            El DMSO (Dimetilsulfóxido) es un solvente de grado farmacéutico. El comprador reconoce que el uso de este producto es bajo su propia responsabilidad y que debe consultar a un profesional de la salud antes de cualquier aplicación terapéutica.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">3. Propiedad Intelectual</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Todo el contenido de este sitio (textos, imágenes, logotipos) es propiedad de DMSO México y está protegido por las leyes de propiedad intelectual en México.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">4. Limitación de Responsabilidad</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            DMSO México no se hace responsable por el mal uso de los productos adquiridos ni por reacciones adversas derivadas de aplicaciones sin supervisión médica.
          </p>
        </section>
      </div>
    </main>
  )
}
