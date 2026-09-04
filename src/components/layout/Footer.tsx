import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0d271e] text-emerald-100/80 text-xs py-14 border-t border-primary-container/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                {/* Brand & Description */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30">
                            <span className="material-symbols-outlined text-[18px]">spa</span>
                        </div>
                        <span className="text-xl font-extrabold text-white tracking-tight">DMSO</span>
                        <span className="text-[9px] font-mono tracking-[0.25em] text-secondary uppercase font-bold">México</span>
                    </div>
                    <p className="text-emerald-200/80 text-xs leading-relaxed font-light">
                        Productos de DMSO de calidad premium para uso clínico y profesional. Envío rápido y pureza garantizada en todo México.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/dmsomexico/" target="_blank" rel="noopener noreferrer" className="text-emerald-200/70 hover:text-white transition-colors duration-200 active:scale-95 ease-in-out">
                            <Facebook size={18} />
                        </a>
                        <a href="https://www.instagram.com/dmso_mx" target="_blank" rel="noopener noreferrer" className="text-emerald-200/70 hover:text-white transition-colors duration-200 active:scale-95 ease-in-out">
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>

                {/* Shop Links */}
                <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3 text-secondary">Tienda</h3>
                    <ul className="space-y-2.5 text-emerald-100/70 font-normal">
                        <li><Link href="/shop" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Todos los Productos</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Blog</Link></li>
                        <li><Link href="/categoria-producto/dmso-liquido" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> DMSO Líquido</Link></li>
                        <li><Link href="/categoria-producto/dmso-gel" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> DMSO en Gel</Link></li>
                        <li><Link href="/categoria-producto/dmso-crema" className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Cremas con DMSO</Link></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3 text-secondary">Soporte</h3>
                    <ul className="space-y-2.5 text-emerald-100/70 font-normal">
                        <li><Link href="/about" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Artículos y Guías</Link></li>
                        <li><Link href="/envios" className="hover:text-white transition-colors">Políticas de Envío</Link></li>
                        <li><Link href="/devoluciones" className="hover:text-white transition-colors">Devoluciones</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-3 text-secondary">Atención Personalizada</h3>
                    <ul className="space-y-2.5">
                        <li className="flex items-start gap-3 text-emerald-100/70">
                            <Mail size={16} className="mt-0.5 text-secondary" />
                            <a href="mailto:soporte@dmso.com.mx" className="hover:text-white transition-colors">soporte@dmso.com.mx</a>
                        </li>
                        <li className="flex items-start gap-3 text-emerald-100/70">
                            <Phone size={16} className="mt-0.5 text-secondary" />
                            <a href="tel:+527774087291" className="hover:text-white transition-colors">+52 777 408 7291</a>
                        </li>
                        <li className="flex items-start gap-3 text-emerald-100/70">
                            <span className="material-symbols-outlined text-[16px] mt-0.5 text-secondary">location_on</span>
                            <span>Cuernavaca, Morelos<br />México</span>
                        </li>
                    </ul>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-emerald-200 bg-emerald-900/50 px-3 py-1 rounded-full border border-secondary/20">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span>Envíos activos a toda la República</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-primary-container/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-emerald-200/60 font-light">
                <div className="flex flex-col items-center sm:items-start">
                    <span>© {new Date().getFullYear()} DMSO México. Todos los derechos reservados.</span>
                    <a href="https://tecnomata.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.1em] text-emerald-300/50 hover:text-secondary transition-colors mt-2 flex items-center gap-1">
                        Desarrollado con ❤️ por Tecnómata
                    </a>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link href="/aviso-de-privacidad" className="hover:text-secondary transition-colors">Aviso de Privacidad</Link>
                    <Link href="/terminos-y-condiciones" className="hover:text-secondary transition-colors">Términos y Condiciones</Link>
                    <Link href="/politica-de-cookies" className="hover:text-secondary transition-colors">Cookies</Link>
                </div>
            </div>
        </footer>
    );
}
