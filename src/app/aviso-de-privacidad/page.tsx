import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | DMSO México',
  description: 'Conoce cómo protegemos tus datos personales en DMSO México.',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-8">Aviso de Privacidad</h1>
      
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">1. Identidad y Domicilio del Responsable</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            DMSO México, con domicilio en la Ciudad de México, es el responsable del uso y protección de sus datos personales.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">2. Finalidades del Tratamiento</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant font-body">
            <li>Procesar sus pedidos de DMSO y productos relacionados.</li>
            <li>Realizar el envío de productos a su domicilio.</li>
            <li>Brindar atención al cliente y soporte técnico.</li>
            <li>Gestionar garantías y devoluciones.</li>
            <li>Dar cumplimiento a obligaciones fiscales (facturación).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">3. Datos Personales Recabados</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Para las finalidades antes mencionadas, requerimos obtener los siguientes datos personales: nombre completo, dirección de envío, colonia, referencias de entrega si usted las proporciona, correo electrónico, teléfono y datos de facturación (RFC).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary tracking-tight">4. Derechos ARCO</h2>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal (Rectificación); que la eliminemos de nuestros registros (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).
          </p>
          <p className="text-on-surface-variant font-body leading-relaxed">
            Para ejercer cualquiera de los derechos ARCO, usted deberá enviar una solicitud por escrito al correo electrónico: <a href="mailto:soporte@dmso.com.mx" className="text-primary font-bold hover:underline">soporte@dmso.com.mx</a>
          </p>
        </section>
      </div>
    </main>
  )
}
