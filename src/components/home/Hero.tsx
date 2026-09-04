'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { cleanupText } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

interface ProductoEnStock {
    id: number;
    slug: string;
    titulo: string;
    descripcion: string | null;
    precio: string | number;
    imagenes: any;
    stock?: number | null;
    reviews?: any[] | null;
    categoria?: { nombre: string } | null;
}

function formatoPrecio(precio: string | number): string {
    return Number(precio).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Hero({ hasEnvioInmediato = false, productosEnStock = [] }: { hasEnvioInmediato?: boolean; productosEnStock?: ProductoEnStock[] }) {
    const heroRef = useRef<HTMLElement>(null);
    const addItem = useCartStore((s) => s.addItem);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".hero-text",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 }
            );
            gsap.fromTo(".hero-card",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12, delay: 0.4 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, producto: ProductoEnStock) => {
        event.preventDefault();
        event.stopPropagation();
        const imagen = Array.isArray(producto.imagenes) && producto.imagenes.length > 0 ? (producto.imagenes[0] as string) : '';
        addItem({
            id: String(producto.id),
            slug: producto.slug,
            titulo: producto.titulo,
            precio: Number(producto.precio),
            imagen,
            cantidad: 1,
        });
    };

    const mostrarVitrina = hasEnvioInmediato && productosEnStock.length > 0;

    return (
        <section ref={heroRef} className="relative bg-wellness-radial pt-12 sm:pt-16 pb-20 border-b border-primary/10 overflow-hidden">
            {/* Resplandores decorativos */}
            <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-200/30 via-amber-100/25 to-transparent blur-3xl pointer-events-none"></div>
            <div aria-hidden className="absolute top-20 left-10 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none"></div>
            <div aria-hidden className="absolute top-32 right-10 w-80 h-80 rounded-full bg-amber-300/15 blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Eyebrow + Titular */}
                <div className="hero-text text-center max-w-3xl mx-auto mb-12">
                    {mostrarVitrina && (
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-white/90 backdrop-blur-md text-xs font-semibold tracking-wide text-primary shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            <span>Servicio Express en México · Despacho al día siguiente</span>
                        </div>
                    )}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.12]">
                        Recupera tu Bienestar. <br className="hidden sm:inline" />
                        <span className="font-editorial italic font-normal text-secondary">Pureza clínica con entrega express.</span>
                    </h1>
                    <p className="mt-4 text-on-surface-variant text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
                        Dimetilsulfóxido (DMSO) de grado farmacéutico certificado al 99.9%. Directo a tu hogar o consultorio, con la pureza y trazabilidad que exige el uso clínico y profesional.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs font-medium text-on-surface-variant">
                        <span className="inline-flex items-center gap-1 text-primary font-semibold bg-secondary/10 px-3 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[16px] text-secondary">verified</span> 99.9% Pureza
                        </span>
                        <span className="inline-flex items-center gap-1 text-primary font-semibold bg-secondary/10 px-3 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[16px] text-secondary">health_and_safety</span> Grado Farmacéutico
                        </span>
                        <span className="inline-flex items-center gap-1 text-amber-900 font-semibold bg-amber-100/80 px-3 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[16px] text-amber-700">shield</span> Envase de Vidrio, Pureza Máxima
                        </span>
                        {mostrarVitrina && (
                            <span className="inline-flex items-center gap-1 text-primary font-semibold bg-white/90 px-3 py-1 rounded-full border border-primary/10 shadow-2xs">
                                <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span> Entrega al Día Siguiente
                            </span>
                        )}
                    </div>
                </div>

                {/* Vitrina de los productos con envío inmediato */}
                {mostrarVitrina && (
                    <>
                        <div className="hero-text text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight">
                                ¡Ya tenemos stock con servicio express!
                            </h2>
                            <a
                                href="#vitrina-productos"
                                className="mt-3 inline-flex items-center gap-1.5 text-secondary font-bold text-sm hover:underline"
                            >
                                Ver productos
                                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                            </a>
                        </div>

                        <div id="vitrina-productos" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto scroll-mt-24">
                            {productosEnStock.map((producto, idx) => {
                                const destacado = productosEnStock.length === 3 && idx === 1;
                                const imagen = Array.isArray(producto.imagenes) && producto.imagenes.length > 0 ? (producto.imagenes[0] as string) : '/images/products/placeholder.jpg';
                                const totalReseñas = producto.reviews?.length ?? 0;
                                const descripcionCorta = producto.descripcion ? cleanupText(producto.descripcion).slice(0, 130).trim() : '';

                                return (
                                    <Link
                                        key={producto.id}
                                        href={`/producto/${producto.slug}`}
                                        className={`hero-card group bg-white rounded-2xl wellness-card-glow transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${destacado ? 'border-2 border-secondary shadow-xl md:scale-[1.02] z-20' : 'border border-primary/10'}`}
                                    >
                                        {destacado && (
                                            <div className="bg-gradient-to-r from-amber-500 to-secondary text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 text-center flex items-center justify-center gap-1.5 shadow-sm">
                                                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                                <span>El Más Elegido · Máxima Pureza</span>
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-secondary/15 text-[11px] font-semibold">
                                                <span className="text-primary flex items-center gap-1.5 bg-secondary/10 px-2.5 py-1 rounded-full">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                                                    Servicio Express
                                                </span>
                                                <span className="text-on-surface-variant font-mono text-[10px] bg-surface-container-low px-2 py-0.5 rounded">
                                                    {producto.categoria?.nombre || 'DMSO'}
                                                </span>
                                            </div>
                                            <div className="relative bg-gradient-to-b from-amber-50/60 to-secondary/5 rounded-xl aspect-[4/3] flex items-center justify-center p-4 overflow-hidden mb-5 border border-primary/5">
                                                <img
                                                    alt={producto.titulo}
                                                    className="product-img h-44 w-auto object-contain mix-blend-multiply drop-shadow-md"
                                                    src={imagen}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                                                    <span>{totalReseñas > 0 ? '★★★★★' : '☆☆☆☆☆'}</span>
                                                    <span className="text-on-surface-variant text-[11px] font-medium ml-1">
                                                        {totalReseñas > 0 ? `${totalReseñas} reseñas verificadas` : 'Sin reseñas aún'}
                                                    </span>
                                                </div>
                                                <h3 className="text-base font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                                                    {cleanupText(producto.titulo)}
                                                </h3>
                                                {descripcionCorta && (
                                                    <p className="mt-2 text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                                                        {descripcionCorta}…
                                                    </p>
                                                )}
                                                <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                                                    <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                                                    <span>Máximo {producto.stock} por cliente</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 bg-secondary/5 border-t border-secondary/15 flex items-center justify-between">
                                            <div>
                                                <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Precio</span>
                                                <span className="text-xl font-extrabold text-primary tracking-tight">${formatoPrecio(producto.precio)} <span className="text-[10px] font-bold text-secondary">MXN</span></span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleAddToCart(e, producto)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-md shadow-primary/20 hover:scale-[1.02]"
                                            >
                                                <span>Comprar Ahora</span>
                                                <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                                            </button>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Franja de confianza bajo la vitrina */}
                        <div className="hero-text mt-10 pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant max-w-6xl mx-auto gap-4">
                            <div className="flex items-center gap-2 text-primary font-semibold">
                                <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                                <span>Empaque térmico inerte con sello inviolable. Certificado de análisis disponible a solicitud.</span>
                            </div>
                            <Link href="/shop" className="text-primary hover:text-secondary font-bold text-xs inline-flex items-center gap-1 hover:underline">
                                <span>Ver todas las formulaciones disponibles</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </>
                )}

                {/* Fallback: sin productos en stock inmediato, CTA genérico */}
                {!mostrarVitrina && (
                    <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop" className="bg-primary hover:bg-primary-container text-white px-10 py-5 rounded-xl font-bold transition-all duration-300 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg">
                            Comprar Ahora
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </Link>
                        <Link href="/blog" className="bg-white text-on-surface border border-outline-variant hover:bg-surface-container-low px-10 py-5 rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-lg shadow-sm">
                            Ir al Blog
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
