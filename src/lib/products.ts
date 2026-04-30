import { db } from './db';
import { productos, categorias } from './schema';
import { eq, desc } from 'drizzle-orm';

export async function getProducts() {
  try {
    const allProducts = await db.query.productos.findMany({
      where: eq(productos.activo, true),
      orderBy: [desc(productos.id)],
      with: {
        categoria: true
      }
    });
    return allProducts;
  } catch (error) {
    console.error('Error fetching products from DB:', error);
    return [];
  }
}

export async function getFeaturedProducts(limit = 4) {
  try {
    const featured = await db.query.productos.findMany({
      where: eq(productos.activo, true),
      limit: limit,
      with: {
        categoria: true
      }
    });
    return featured;
  } catch (error) {
    console.error('Error fetching featured products from DB:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await db.query.productos.findFirst({
      where: eq(productos.slug, slug),
      with: {
        categoria: true
      }
    });
    return product;
  } catch (error) {
    console.error('Error fetching product by slug from DB:', error);
    return null;
  }
}
export async function getMenuCategories() {
  try {
    const activeCats = await db.query.categorias.findMany({
      where: eq(categorias.activa, true),
      orderBy: [desc(categorias.orden)]
    });
    return activeCats;
  } catch (error) {
    console.error('Error fetching categories from DB:', error);
    return [];
  }
}

export async function getProductsByCategory(slug: string) {
  try {
    const category = await db.query.categorias.findFirst({
      where: eq(categorias.slug, slug),
      with: {
        productos: true,
      },
    });
    if (!category) return null;
    return {
      ...category,
      productos: (category.productos as any[]).filter((p) => p.activo),
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return null;
  }
}
