import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categorias } from '@/lib/schema'
import { asc, eq } from 'drizzle-orm'

export const revalidate = 600;

export async function GET() {
  try {
    const result = await db.select()
      .from(categorias)
      .where(eq(categorias.activa, true))
      .orderBy(asc(categorias.orden), asc(categorias.nombre))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
