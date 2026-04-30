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
                        <div className="hero-text inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
                            <span className="material-symbols-outlined text-[14px]">science</span>
                            Grado Farmacéutico
                        </div>
                        
                        <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tighter leading-tight mb-6">
                            DMSO Puro para<br />Excelencia Clínica.
                        </h1>
                        
                        <p className="hero-text text-lg md:text-xl text-on-surface-variant mb-8 font-body-lg leading-relaxed">
                            Experimenta la pureza más alta en Dimetilsulfóxido (99.9%). Desarrollado para aplicaciones profesionales donde la calidad sin concesiones es esencial.
                        </p>
                        
                        <div className="hero-text flex flex-col sm:flex-row gap-4">
                            <Link href="/shop" className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-lg font-bold transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2">
                                Comprar Ahora
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </Link>
                            <Link href="/dmso-facts" className="bg-white text-on-surface border border-outline-variant hover:bg-surface-container-low px-8 py-4 rounded-lg font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                                Ver Certificados
                            </Link>
                        </div>
                        
                        <div className="hero-text mt-10 flex items-center gap-6 text-sm text-on-surface-variant font-medium">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                                99.9% Puro
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
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
                            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        />
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
