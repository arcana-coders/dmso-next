import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { productos, categorias } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.dmso.com.mx';

  // Fetch active categories and products from DB
  const dbCategories = await db.select().from(categorias).where(eq(categorias.activa, true));
  const dbProducts = await db.select().from(productos).where(eq(productos.activo, true));

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
    ...categoryEntries,
    ...productEntries,
  ];
}
