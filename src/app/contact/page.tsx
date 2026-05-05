'use client'

import { useState } from 'react'
import { Mail, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ nombre: '', email: '', telefono: '', mensaje: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-dmso-dark mb-12 text-center">Contáctanos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Information Column */}
        <div className="space-y-8">
          <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
            <h2 className="text-2xl font-semibold mb-6 text-dmso-dark">Información de Contacto</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-dmso-green">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Teléfono / WhatsApp</h3>
                  <a href="tel:+527774087291" className="text-stone-600 hover:text-dmso-green mt-1 block">
                    +52 777 408 7291
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-dmso-green">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Correo Electrónico</h3>
                  <a href="mailto:soporte@dmso.com.mx" className="text-stone-600 hover:text-dmso-green mt-1 block">
                    soporte@dmso.com.mx
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm text-dmso-green">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Horario de Atención</h3>
                  <p className="text-stone-600 mt-1">
                    Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                    Sábados: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dmso-green text-white p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">¿Tienes dudas sobre el DMSO?</h2>
            <p className="mb-6 opacity-90 leading-relaxed">
              Nuestro equipo de expertos está listo para responder tus preguntas sobre el uso, dosificación y beneficios de nuestros productos.
            </p>
            <a href="mailto:soporte@dmso.com.mx" className="inline-block bg-white text-dmso-dark font-bold px-6 py-3 rounded-lg hover:bg-stone-100 transition-colors">
              Escribir a Soporte
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 h-fit">
          <h2 className="text-2xl font-semibold mb-6 text-dmso-dark">Envíanos un Mensaje</h2>

          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-dmso-green/10 text-dmso-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dmso-dark mb-2">¡Mensaje enviado!</h3>
              <p className="text-stone-500 text-sm">Te contactaremos pronto a <strong>{form.email || 'tu correo'}</strong>.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-dmso-green font-semibold text-sm hover:underline">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border outline-none transition-all"
                    placeholder="+52..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea
                  required
                  value={form.mensaje}
                  onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border h-32 outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-600 text-sm">Hubo un error. Intenta de nuevo o escríbenos directamente.</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-dmso-dark text-white font-bold py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
