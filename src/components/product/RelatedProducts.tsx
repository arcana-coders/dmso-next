import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { cleanupText } from '@/lib/utils';

export default async function RelatedProducts() {
    // Fetch real products from DB
    const allProducts = await getProducts();
    
    // Get 4 random products or just the first 4 for now
    const related = allProducts.slice(0, 4);

    return (
        <section className="container mx-auto px-4 lg:px-8 py-16 border-t border-stone-200 mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-medium text-dmso-dark">También te podría interesar</h2>
                <Link href="/shop" className="text-xs font-semibold uppercase tracking-wider border border-gray-400 px-4 py-2 rounded text-dmso-dark bg-transparent hover:bg-gray-100 transition">
                    Ver todo
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((product) => (
                    <Link key={product.id} href={`/producto/${product.slug}`} className="group cursor-pointer block">
                        <div className="rounded-lg aspect-square mb-4 flex items-center justify-center p-6 transition group-hover:bg-brand-beige-mid/60 bg-[#F4F2EB]">
                            <img
                                alt={cleanupText(product.titulo)}
                                className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                src={Array.isArray(product.imagenes) && product.imagenes.length > 0 ? (product.imagenes[0] as string) : '/images/products/placeholder.jpg'}
                            />
                        </div>
                        <h3 className="text-[13px] font-semibold text-dmso-dark group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">
                            {cleanupText(product.titulo)}
                        </h3>
                        <p className="text-sm text-stone-500 mt-2">
                            <span className="text-dmso-dark font-bold text-base">${product.precio}</span>
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
