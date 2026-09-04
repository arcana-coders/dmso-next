'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cleanupText } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  slug: string;
  titulo: string;
  precio: string | number;
  imagenes: any;
  categoria?: {
    nombre: string;
  } | null;
  stock?: number | null;
}

export default function ProductsList({ products }: { products: Product[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const addItem = useCartStore((s) => s.addItem);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".product-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleAddToCart = (event: React.MouseEvent, product: Product) => {
        event.preventDefault();
        event.stopPropagation();
        const image = Array.isArray(product.imagenes) && product.imagenes.length > 0 ? (product.imagenes[0] as string) : '';
        addItem({
            id: String(product.id),
            slug: product.slug,
            titulo: product.titulo,
            precio: Number(product.precio),
            imagen: image,
            cantidad: 1,
        });
    };

    return (
        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
                const enStock = (product.stock ?? 0) > 0;
                return (
                    <Link
                        key={product.id}
                        href={`/producto/${product.slug}`}
                        className="product-card group bg-white rounded-2xl p-5 border border-primary/10 hover:border-secondary shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
                    >
                        <div>
                            <div className="relative bg-gradient-to-b from-amber-50/40 to-secondary/5 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4 mb-4 border border-primary/5">
                                {enStock && (
                                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-wider uppercase text-primary bg-white/95 px-2 py-0.5 rounded-md border border-secondary/25 shadow-2xs">
                                        Stock Nacional
                                    </span>
                                )}
                                <img
                                    alt={product.titulo}
                                    className="product-img object-contain h-44 w-auto mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                                    src={Array.isArray(product.imagenes) && product.imagenes.length > 0 ? (product.imagenes[0] as string) : '/images/products/placeholder.jpg'}
                                />
                            </div>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">
                                {product.categoria?.nombre || 'Grado Farmacéutico'}
                            </span>
                            <h3 className="mt-1 font-bold text-primary text-sm leading-snug group-hover:text-secondary transition-colors">
                                {cleanupText(product.titulo)}
                            </h3>
                        </div>

                        <div className="mt-6 pt-3 border-t border-secondary/15 flex items-center justify-between">
                            <div>
                                <span className="text-[9px] text-on-surface-variant font-mono uppercase block font-medium">Precio Oficial</span>
                                <span className="text-base font-extrabold text-primary tracking-tight">
                                    ${Number(product.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })} <span className="text-[10px] text-secondary font-normal">MXN</span>
                                </span>
                            </div>
                            <button
                                onClick={(e) => handleAddToCart(e, product)}
                                aria-label={`Añadir ${product.titulo} al carrito`}
                                className="w-9 h-9 rounded-xl border border-secondary/25 bg-secondary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-colors shadow-2xs"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                            </button>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
