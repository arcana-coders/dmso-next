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
          <div className="bg-surface-container/30 p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="text-2xl font-black mb-8 text-primary tracking-tighter uppercase">Información de Contacto</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Teléfono / WhatsApp</h3>
                  <a href="tel:+527774087291" className="text-lg font-bold text-on-surface hover:text-primary transition-colors active:scale-95 inline-block">
                    +52 777 408 7291
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Correo Electrónico</h3>
                  <a href="mailto:soporte@dmso.com.mx" className="text-lg font-bold text-on-surface hover:text-primary transition-colors active:scale-95 inline-block">
                    soporte@dmso.com.mx
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Clock size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Horario de Atención</h3>
                  <p className="text-on-surface-variant font-bold text-sm mt-1 uppercase tracking-tighter">
                    Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                    Sábados: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-10 rounded-2xl shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h2 className="text-2xl font-black mb-4 tracking-tighter uppercase">¿Tienes dudas sobre el DMSO?</h2>
            <p className="mb-8 font-medium text-white/80 leading-relaxed uppercase tracking-tight text-sm">
              Nuestro equipo de expertos está listo para responder tus preguntas sobre el uso, dosificación y beneficios de nuestros productos.
            </p>
            <a href="mailto:soporte@dmso.com.mx" className="inline-block bg-white text-primary font-black px-8 py-4 rounded-xl hover:brightness-110 transition-all active:scale-95 shadow-lg uppercase tracking-widest text-xs">
              Escribir a Soporte
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-outline-variant h-fit relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Mail size={120} strokeWidth={1} />
            </div>
          <h2 className="text-2xl font-black mb-8 text-primary tracking-tighter uppercase">Envíanos un Mensaje</h2>

          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-primary mb-3 tracking-tighter uppercase">¡Mensaje enviado!</h3>
              <p className="text-on-surface-variant font-bold text-sm uppercase tracking-tighter">Te contactaremos pronto a <strong>{form.email || 'tu correo'}</strong>.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-primary font-black text-xs hover:underline uppercase tracking-widest active:scale-95">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    className="w-full rounded-xl border-outline-variant shadow-sm focus:border-primary focus:ring-1 focus:ring-primary p-4 border outline-none transition-all font-bold text-on-surface placeholder:text-outline-variant"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest">Teléfono</label>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                    className="w-full rounded-xl border-outline-variant shadow-sm focus:border-primary focus:ring-1 focus:ring-primary p-4 border outline-none transition-all font-bold text-on-surface placeholder:text-outline-variant"
                    placeholder="+52..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl border-outline-variant shadow-sm focus:border-primary focus:ring-1 focus:ring-primary p-4 border outline-none transition-all font-bold text-on-surface placeholder:text-outline-variant"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-primary mb-2 uppercase tracking-widest">Mensaje *</label>
                <textarea
                  required
                  value={form.mensaje}
                  onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
                  className="w-full rounded-xl border-outline-variant shadow-sm focus:border-primary focus:ring-1 focus:ring-primary p-4 border h-40 outline-none transition-all resize-none font-bold text-on-surface placeholder:text-outline-variant"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              {status === 'error' && (
                <p className="text-error text-[10px] font-black uppercase tracking-widest">Hubo un error. Intenta de nuevo o escríbenos directamente.</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-white font-black py-5 rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-sm"
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
