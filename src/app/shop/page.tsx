import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { cleanupText } from '@/lib/utils';

export const revalidate = 600; // Revalidate every 10 minutes

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="bg-surface py-16">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-4">Catálogo Clínico</h1>
                    <p className="text-on-surface-variant font-body-lg max-w-2xl">
                        Explore nuestra gama completa de productos DMSO de grado farmacéutico.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link key={product.id} href={`/producto/${product.slug}`} className="group cursor-pointer block text-left">
                            <div className="bg-surface-container-low rounded-2xl p-8 mb-6 relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-1 flex items-center justify-center h-72">
                                <div className="aspect-square flex items-center justify-center w-full h-full relative">
                                    <img
                                        alt={product.titulo}
                                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                                        src={Array.isArray(product.imagenes) && product.imagenes.length > 0 ? (product.imagenes[0] as string) : '/images/products/placeholder.jpg'}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                                    {cleanupText(product.titulo)}
                                </h3>
                            </div>
                            
                            <p className="text-on-surface-variant text-sm font-body-sm mb-4">
                                {product.categoria?.nombre || 'Grado Farmacéutico'}
                            </p>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-black text-on-surface">${product.precio}</span>
                                <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors duration-200" aria-label="Añadir al carrito">
                                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
