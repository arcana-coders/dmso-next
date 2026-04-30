import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import ProductsList from './ProductsList';

export default async function ProductsSection() {
    const featuredProducts = await getFeaturedProducts(4);

    return (
        <section className="bg-white py-24 border-b border-outline-variant relative overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter mb-4">
                            Productos Clínicos
                        </h2>
                        <p className="text-on-surface-variant font-body-lg max-w-2xl leading-relaxed">
                            Nuestra línea de DMSO grado farmacéutico, fabricada bajo estrictos estándares de control de calidad para uso profesional.
                        </p>
                    </div>
                    <Link href="/shop" className="bg-surface-container hover:bg-surface-container-high text-on-surface px-6 py-3 rounded-lg font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap shadow-sm">
                        Ver Catálogo Completo
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </Link>
                </div>

                <ProductsList products={featuredProducts} />
            </div>
        </section>
    );
}
