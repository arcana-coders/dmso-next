export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { productos } from '@/lib/schema'
import { eq, and, ilike, or } from 'drizzle-orm'
import Link from 'next/link'
import { cleanupText } from '@/lib/utils'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function BuscarPage({ searchParams }: Props) {
  const { q = '' } = await searchParams
  const query = q.trim()

  const results = query
    ? await db.select({
        id: productos.id,
        titulo: productos.titulo,
        slug: productos.slug,
        precio: productos.precio,
        imagenes: productos.imagenes,
        asin: productos.asin,
      })
        .from(productos)
        .where(
          and(
            eq(productos.activo, true),
            or(
              ilike(productos.titulo, `%${query}%`),
              ilike(productos.asin, `%${query}%`)
            )
          )
        )
        .limit(48)
    : []

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-12">
      <nav className="text-xs text-stone-500 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-dmso-green transition-colors">Inicio</Link>
        <span>/</span>
        <span className="text-stone-800 font-medium">Búsqueda</span>
      </nav>

      <h1 className="text-3xl font-medium text-dmso-dark mb-2">
        {query ? `Resultados para "${query}"` : 'Buscar productos'}
      </h1>
      {results.length > 0 && (
        <p className="text-sm text-stone-500 mb-8">
          {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
        </p>
      )}

      {!query && (
        <p className="text-stone-500 mt-6">Ingresa un término en la barra de búsqueda.</p>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-20 text-stone-500">
          <div className="text-6xl mb-6">🔍</div>
          <p className="font-medium text-xl text-dmso-dark">Sin resultados para &quot;{query}&quot;</p>
          <p className="text-sm mt-2">Intenta con otras palabras o explora nuestra tienda.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block text-dmso-green font-semibold hover:underline text-sm border border-dmso-green px-5 py-2 rounded-md"
          >
            Ver todos los productos
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((p) => {
            const imagen = Array.isArray(p.imagenes) && p.imagenes.length > 0
              ? (p.imagenes[0] as string)
              : '/images/placeholder.jpg'
            return (
              <Link key={p.id} href={`/producto/${p.slug}`} className="group block">
                <div className="bg-white h-52 w-full rounded-lg mb-3 overflow-hidden flex items-center justify-center p-4 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                  <img
                    alt={cleanupText(p.titulo)}
                    src={imagen}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-stone-800 line-clamp-2 leading-snug group-hover:text-dmso-green transition-colors">
                  {cleanupText(p.titulo)}
                </h3>
                <p className="text-sm text-dmso-dark font-bold mt-1">
                  ${Number(p.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
