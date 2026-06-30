import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { productos, categorias } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { articles } from '@/data/dmso-articles';

export const revalidate = 3600; // Sitemap se regenera máximo 1 vez por hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.dmso.com.mx';

  // Fetch active categories and products from DB — si la BD falla, el sitemap sigue con las rutas estáticas
  let dbCategories: typeof categorias.$inferSelect[] = [];
  let dbProducts: typeof productos.$inferSelect[] = [];
  try {
    [dbCategories, dbProducts] = await Promise.all([
      db.select().from(categorias).where(eq(categorias.activa, true)),
      db.select().from(productos).where(eq(productos.activo, true)),
    ]);
  } catch (e) {
    console.error('sitemap: DB unavailable, returning static-only sitemap', e);
  }

  const categoryEntries = dbCategories.map((cat) => ({
    url: `${baseUrl}/categoria-producto/${cat.slug}`,
    lastModified: cat.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const productEntries = dbProducts.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const blogEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aviso-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...blogEntries,
    ...categoryEntries,
    ...productEntries,
  ];
}
