'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".hero-text", 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 }
            );
            gsap.fromTo(".hero-image",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.3 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="bg-surface relative overflow-hidden">
            {/* Background pattern/skew */}
            <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left z-0"></div>
            
            <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Content */}
                    <div>
                        <div className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase mb-6 border border-primary/10 backdrop-blur-sm">
                            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            Grado Farmacéutico
                        </div>
                        
                        <h1 className="hero-text text-4xl md:text-5xl lg:text-7xl font-black text-on-surface tracking-tighter leading-[1.05] mb-6">
                            DMSO Puro para<br />Excelencia Clínica.
                        </h1>
                        
                        <p className="hero-text text-lg md:text-xl text-on-surface-variant mb-10 font-body-lg leading-relaxed max-w-[540px]">
                            Experimenta la pureza más alta en Dimetilsulfóxido (99.9%). Desarrollado para aplicaciones profesionales donde la calidad sin concesiones es esencial.
                        </p>
                        
                        <div className="hero-text flex flex-col sm:flex-row gap-4">
                            <Link href="/shop" className="bg-primary hover:bg-primary-container text-white px-10 py-5 rounded-xl font-bold transition-all duration-300 active:scale-95 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg">
                                Comprar Ahora
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link href="/blog" className="bg-white text-on-surface border border-outline-variant hover:bg-surface-container-low px-10 py-5 rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-lg shadow-sm">
                                Ir al Blog
                            </Link>
                        </div>
                        
                        <div className="hero-text mt-12 flex items-center gap-8 text-xs text-on-surface-variant font-black uppercase tracking-widest">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                99.9% Puro
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                </div>
                                Envío Rápido
                            </div>
                        </div>
                    </div>
                    
                    {/* Image */}
                    <div className="relative hero-image">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl"></div>
                        <img 
                            alt="DMSO Pharmaceutical Grade Product Lineup" 
                            className="relative z-10 w-full h-auto rounded-2xl clinical-shadow border border-white/20 object-cover aspect-square md:aspect-[4/3] bg-white" 
                            src="/images/ui/hero-dmso.png" 
                        />
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
