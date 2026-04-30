import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | DMSO México',
  description: 'Conoce cómo utilizamos las cookies para mejorar tu experiencia en DMSO México.',
}

export default function CookiesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-8">Política de Cookies</h1>
      
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">1. ¿Qué son las Cookies?</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Las cookies son pequeños archivos de texto que se almacenan en su navegador para recordar sus preferencias y mejorar su experiencia de navegación.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">2. ¿Para qué las usamos?</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Utilizamos cookies para mantener su carrito de compras activo, analizar el tráfico del sitio y personalizar el contenido.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">3. Gestión de Cookies</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Usted puede desactivar las cookies en cualquier momento a través de la configuración de su navegador. Sin embargo, esto podría afectar la funcionalidad de algunas secciones de la tienda.
          </p>
        </section>
      </div>
    </main>
  )
}
