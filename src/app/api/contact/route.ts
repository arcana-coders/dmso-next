import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { db } from '@/lib/db'
import { contactos } from '@/lib/schema'

export async function POST(request: Request) {
  try {
    const { nombre, email, telefono, mensaje } = await request.json()

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son obligatorios' },
        { status: 400 }
      )
    }

    await db.insert(contactos).values({ nombre, email, telefono: telefono || null, mensaje })

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'DMSO México <soporte@dmso.com.mx>',
        to: ['soporte@dmso.com.mx'],
        subject: `[Contacto] Mensaje de ${nombre}`,
        text: `Nuevo mensaje de contacto:\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || 'N/A'}\n\nMensaje:\n${mensaje}`,
      }).catch(err => console.error('Resend contact error:', err))
    }

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido. Te contactaremos pronto.'
    })
  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error al procesar el mensaje. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
