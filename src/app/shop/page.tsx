import { getProducts } from '@/lib/products';
import ShopGrid from '@/components/shop/ShopGrid';

export const revalidate = 600; // Revalidate every 10 minutes

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="bg-surface py-16">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-4">Catálogo Clínico</h1>
                    <p className="text-on-surface-variant font-body-lg max-w-2xl">
                        Explore nuestra gama completa de {products.length} productos DMSO de grado farmacéutico disponibles hoy.
                    </p>
                </div>

                <ShopGrid products={products as any} />
            </div>
        </main>
    );
}
