import { notFound, permanentRedirect } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductAccordion from '@/components/product/ProductAccordion';
import ProductReviews from '@/components/product/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug } from '@/lib/products';

import { type Metadata } from 'next';
import retiredProductRedirects from '@/data/retiredProductRedirects.json';

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: 'Producto no encontrado' };
    }

    return {
        title: `${product.titulo} - Pureza Garantizada | DMSO México`,
        description: product.descripcion
            ? `${product.descripcion.substring(0, 150)}...`
            : `Adquiere ${product.titulo} de alta pureza. Envío a todo México.`,
        alternates: {
            canonical: `/producto/${product.slug}`,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    if (!product.activo) {
        const destination = retiredProductRedirects[slug as keyof typeof retiredProductRedirects];
        if (destination) permanentRedirect(`/producto/${destination}`);
        notFound();
    }

    const categoryLabel = product.categoria?.nombre || 'Producto DMSO';

    const baseUrl = 'https://www.dmso.com.mx';

    // JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.titulo,
        image: product.imagenes,
        description: product.descripcion,
        brand: {
            '@type': 'Brand',
            name: 'DMSO México'
        },
        offers: {
            '@type': 'Offer',
            price: product.precio,
            priceCurrency: 'MXN',
            availability: (product.stock ?? 0) > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
            url: `${baseUrl}/producto/${product.slug}`
        },
        ...((product.reviews as any[])?.length > 0 ? {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                reviewCount: (product.reviews as any[]).length,
            }
        } : {}),
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Tienda', item: `${baseUrl}/shop` },
            { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${baseUrl}/categoria-producto/${product.categoria?.slug || ''}` },
            { '@type': 'ListItem', position: 4, name: product.titulo, item: `${baseUrl}/producto/${product.slug}` },
        ],
    };

    return (
        <main className="max-w-[1280px] mx-auto px-6 pb-24 pt-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <Breadcrumbs
                items={[
                    { label: 'Inicio', href: '/' },
                    { label: 'Tienda', href: '/shop' },
                    { label: categoryLabel, href: `/categoria-producto/${product.categoria?.slug || ''}` },
                    { label: product.titulo }
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mt-8">
                {/* Left Column: Image */}
                <ProductGallery images={product.imagenes as string[]} alt={product.titulo} />

                {/* Right Column: Details */}
                <div className="flex flex-col">
                    <ProductInfo
                        id={product.id.toString()}
                        slug={product.slug}
                        title={product.titulo}
                        price={product.precio.toString()}
                        asin={product.asin || undefined}
                        imagen={(product.imagenes as string[])?.[0] || ''}
                        reviewsCount={(product.reviews as any[])?.length || 0}
                        stock={product.stock ?? 0}
                    />
                    <ProductAccordion 
                        description={product.descripcion || ''} 
                        detalles={product.detalles as any} 
                    />
                </div>
            </div>

            <ProductReviews reviews={product.reviews as any[]} />
            <RelatedProducts />
        </main>
    );
}
