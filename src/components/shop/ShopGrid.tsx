'use client';

import { useState, useMemo, type MouseEvent } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, X } from 'lucide-react';
import { cleanupText } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

interface Product {
    id: number;
    titulo: string;
    slug: string;
    precio: string;
    imagenes: any[];
    categoria?: { nombre: string; slug: string } | null;
    stock?: number | null;
}

interface ShopGridProps {
    products: Product[];
}

export default function ShopGrid({ products }: ShopGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [soloEnvioInmediato, setSoloEnvioInmediato] = useState(false);
    const addItem = useCartStore((s) => s.addItem);

    const envioInmediatoCount = useMemo(
        () => products.filter((p) => (p.stock ?? 0) > 0).length,
        [products]
    );

    // Extract unique categories from products
    const categories = useMemo(() => {
        const catMap = new Map<string, { nombre: string; slug: string; count: number }>();
        for (const p of products) {
            if (p.categoria) {
                const existing = catMap.get(p.categoria.slug);
                if (existing) {
                    existing.count++;
                } else {
                    catMap.set(p.categoria.slug, { 
                        nombre: p.categoria.nombre, 
                        slug: p.categoria.slug, 
                        count: 1 
                    });
                }
            }
        }
        return Array.from(catMap.values()).sort((a, b) => b.count - a.count);
    }, [products]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        let result = products;

        // Category filter
        if (activeCategory) {
            result = result.filter(p => p.categoria?.slug === activeCategory);
        }

        // Envío inmediato filter
        if (soloEnvioInmediato) {
            result = result.filter(p => (p.stock ?? 0) > 0);
        }

        // Search filter
        if (searchQuery.trim()) {
            const normalizedQuery = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            result = result.filter(p => {
                const normalizedTitle = p.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                return normalizedTitle.includes(normalizedQuery);
            });
        }

        return result;
    }, [products, activeCategory, searchQuery, soloEnvioInmediato]);

    const clearFilters = () => {
        setSearchQuery('');
        setActiveCategory(null);
        setSoloEnvioInmediato(false);
    };

    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, product: Product) => {
        event.preventDefault();
        event.stopPropagation();

        const image = Array.isArray(product.imagenes) && product.imagenes.length > 0 ? (product.imagenes[0] as string) : '';

        addItem({
            id: String(product.id),
            slug: product.slug,
            titulo: product.titulo,
            precio: parseFloat(product.precio),
            imagen: image,
            cantidad: 1,
        });
    };

    const hasFilters = searchQuery || activeCategory || soloEnvioInmediato;

    return (
        <>
            {/* Search & Filters Bar */}
            <div className="mb-10 space-y-6">
                {/* Search Input */}
                <div className="relative max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar productos DMSO..."
                        className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low rounded-xl text-on-surface text-base outline-none border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 placeholder:text-on-surface-variant/60 font-body-md"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 rounded-md transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Category Pills */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                !activeCategory
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                            }`}
                        >
                            Todos ({products.length})
                        </button>
                        {envioInmediatoCount > 0 && (
                            <button
                                onClick={() => setSoloEnvioInmediato((prev) => !prev)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    soloEnvioInmediato
                                        ? 'bg-secondary text-white shadow-md'
                                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                }`}
                            >
                                Servicio Express ({envioInmediatoCount})
                            </button>
                        )}
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    activeCategory === cat.slug
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                }`}
                            >
                                {cat.nombre} ({cat.count})
                            </button>
                        ))}
                    </div>
                )}

                {/* Results Count */}
                {hasFilters && (
                    <div className="flex items-center justify-between">
                        <p className="text-on-surface-variant text-sm">
                            Mostrando <span className="font-bold text-on-surface">{filteredProducts.length}</span> de {products.length} productos
                            {activeCategory && (
                                <span> en <span className="font-medium text-primary">{categories.find(c => c.slug === activeCategory)?.nombre}</span></span>
                            )}
                            {searchQuery && (
                                <span> para &quot;{searchQuery}&quot;</span>
                            )}
                        </p>
                        <button
                            onClick={clearFilters}
                            className="text-primary text-sm font-medium hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">search_off</span>
                    <p className="text-on-surface-variant text-lg mb-2">No se encontraron productos</p>
                    <p className="text-on-surface-variant/60 text-sm mb-6">Intenta con otro término de búsqueda o categoría</p>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Ver todos los productos
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
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
                                {product.categoria?.nombre || 'DMSO'}
                            </p>
                            
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <span className="text-xl font-black text-on-surface">${product.precio}</span>
                                <button
                                    onClick={(event) => handleAddToCart(event, product)}
                                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-lg shadow-primary/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-primary/95 group-hover:shadow-primary/30 sm:h-10 sm:w-10 sm:rounded-full sm:px-0 sm:shadow-none"
                                    aria-label="Añadir al carrito"
                                >
                                    <ShoppingCart size={18} strokeWidth={2.6} />
                                    <span className="sm:hidden">Agregar al carrito</span>
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
