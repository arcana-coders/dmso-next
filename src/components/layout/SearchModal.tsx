'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

interface Product {
    id: number;
    titulo: string;
    slug: string;
    precio: string;
    imagenes: string[];
    categoria?: { nombre: string; slug: string } | null;
}

interface SearchModalProps {
    products: Product[];
}

export default function SearchModal({ products }: SearchModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Keyboard shortcut: Ctrl+K or Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    // Search with debounce
    const search = useCallback((searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        const normalizedQuery = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        const filtered = products.filter(p => {
            const normalizedTitle = p.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return normalizedTitle.includes(normalizedQuery);
        }).slice(0, 8); // Limit results

        setResults(filtered);
    }, [products]);

    useEffect(() => {
        const timer = setTimeout(() => search(query), 200);
        return () => clearTimeout(timer);
    }, [query, search]);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="hover:bg-surface-container p-2 rounded-full transition-colors duration-200 active:scale-95 ease-in-out flex items-center justify-center text-primary"
                aria-label="Buscar productos"
                title="Buscar (Ctrl+K)"
            >
                <span className="material-symbols-outlined">search</span>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
                    onClick={handleBackdropClick}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
                        style={{ 
                            animation: 'searchModalIn 0.2s ease-out',
                        }}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-outline-variant">
                            <Search className="w-5 h-5 text-on-surface-variant flex-shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Buscar productos DMSO..."
                                className="flex-1 bg-transparent text-on-surface text-lg outline-none placeholder:text-on-surface-variant/60 font-body-md"
                                autoComplete="off"
                            />
                            <div className="flex items-center gap-2">
                                {query && (
                                    <button
                                        onClick={() => setQuery('')}
                                        className="text-on-surface-variant hover:text-on-surface p-1 rounded-md"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-on-surface-variant bg-surface-container rounded-md border border-outline-variant">
                                    ESC
                                </kbd>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {query && results.length === 0 && (
                                <div className="px-6 py-12 text-center">
                                    <p className="text-on-surface-variant text-sm">
                                        No se encontraron productos para &quot;{query}&quot;
                                    </p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="py-2">
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/producto/${product.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-4 px-6 py-3 hover:bg-surface-container transition-colors duration-150"
                                        >
                                            <div className="w-12 h-12 bg-surface-container-low rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={Array.isArray(product.imagenes) && product.imagenes.length > 0 ? (product.imagenes[0] as string) : '/images/products/placeholder.jpg'}
                                                    alt=""
                                                    className="w-full h-full object-contain mix-blend-multiply"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-on-surface text-sm font-medium truncate">
                                                    {product.titulo}
                                                </p>
                                                <p className="text-on-surface-variant text-xs mt-0.5">
                                                    {product.categoria?.nombre || 'DMSO'}
                                                </p>
                                            </div>
                                            <span className="text-on-surface font-bold text-sm flex-shrink-0">
                                                ${product.precio}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {!query && (
                                <div className="px-6 py-8 text-center">
                                    <p className="text-on-surface-variant text-sm">
                                        Escriba para buscar en nuestro catálogo DMSO
                                    </p>
                                    <p className="text-on-surface-variant/60 text-xs mt-2">
                                        Ejemplo: &quot;gel&quot;, &quot;crema&quot;, &quot;roll-on&quot;, &quot;líquido&quot;
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {results.length > 0 && (
                            <div className="px-6 py-3 border-t border-outline-variant bg-surface-container-low">
                                <Link
                                    href="/shop"
                                    onClick={() => setIsOpen(false)}
                                    className="text-primary text-xs font-medium hover:underline"
                                >
                                    Ver todos los productos →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes searchModalIn {
                    from {
                        opacity: 0;
                        transform: translateY(-12px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </>
    );
}
