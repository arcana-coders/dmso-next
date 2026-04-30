import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getProductsByCategory } from '@/lib/products';
import { type Metadata } from 'next';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await getProductsByCategory(slug);

    if (!category) return { title: 'Categoría no encontrada' };

    return {
        title: `Comprar ${category.nombre} — Productos Importados de USA | DMSO México`,
        description: `Explora nuestra selección de ${category.nombre}. Productos de alta pureza y calidad garantizada. Envío a todo México.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = await getProductsByCategory(slug);

    if (!category) notFound();

    const categoryProducts = category.productos as any[];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.dmso.com.mx' },
            { '@type': 'ListItem', position: 2, name: 'Tienda', item: 'https://www.dmso.com.mx/shop' },
            { '@type': 'ListItem', position: 3, name: category.nombre, item: `https://www.dmso.com.mx/categoria-producto/${slug}` },
        ],
    };

    return (
        <main className="max-w-[1280px] mx-auto px-6 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumbs
                items={[
                    { label: 'Inicio', href: '/' },
                    { label: 'Tienda', href: '/shop' },
                    { label: category.nombre },
                ]}
            />

            <h1 className="text-4xl font-bold text-on-surface mb-4 mt-8">{category.nombre}</h1>
            <p className="text-on-surface-variant mb-12 max-w-2xl leading-relaxed">
                {category.descripcion ?? `Explora nuestra selección especializada de ${category.nombre}. Calidad garantizada y pureza verificada.`}
            </p>

            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categoryProducts.map((product) => {
                        const imagenes = product.imagenes as string[];
                        const mainImage = imagenes?.[0] ?? '';
                        const price = Number(product.precio).toLocaleString('es-MX', {
                            style: 'currency',
                            currency: 'MXN',
                        });

                        return (
                            <Link key={product.id} href={`/producto/${product.slug}`} className="group cursor-pointer block">
                                <div className="bg-white h-72 w-full rounded-xl mb-4 overflow-hidden flex items-center justify-center p-6 relative shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <img
                                        alt={product.titulo}
                                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                                        src={mainImage}
                                    />
                                </div>
                                <h3 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                    {product.titulo}
                                </h3>
                                <p className="text-base text-primary mt-1 font-bold">{price}</p>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="p-12 text-center bg-surface-container-low rounded-xl">
                    <p className="text-on-surface-variant text-lg">Próximamente tendremos productos disponibles en esta categoría.</p>
                    <Link href="/shop" className="text-primary font-bold hover:underline mt-4 inline-block">
                        Ver todos los productos
                    </Link>
                </div>
            )}
        </main>
    );
}
