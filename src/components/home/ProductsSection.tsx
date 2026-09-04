import Link from 'next/link';
import { getFeaturedProducts, getProducts } from '@/lib/products';
import ProductsList from './ProductsList';

export default async function ProductsSection() {
    const [featuredProducts, allProducts] = await Promise.all([
        getFeaturedProducts(4),
        getProducts(),
    ]);

    return (
        <section className="py-16 sm:py-20 bg-surface" id="catalogo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-primary/10">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary/10 px-3 py-1 rounded-full">
                            Formulaciones Certificadas
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mt-3">
                            Catálogo Integral de Soluciones
                        </h2>
                        <p className="mt-2 text-on-surface-variant text-sm max-w-xl font-normal">
                            Línea completa disponible para compra individual y órdenes especializadas con garantía de autenticidad.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-primary bg-white px-3 py-1.5 rounded-full border border-primary/10 shadow-2xs flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span> {allProducts.length} Formulaciones Disponibles
                        </span>
                    </div>
                </div>

                <ProductsList products={featuredProducts} />

                <div className="mt-10 flex justify-center">
                    <Link
                        href="/shop"
                        className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                    >
                        Ver Catálogo Completo
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
