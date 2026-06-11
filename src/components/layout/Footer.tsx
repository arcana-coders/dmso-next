import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-outline-variant pt-16 pb-8">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Description */}
                    <div className="md:col-span-1">
                        <div className="text-2xl font-black text-primary tracking-tighter mb-4">
                            DMSO México
                        </div>
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-body-sm">
                            Productos de DMSO de calidad premium para uso clínico y profesional. Envío rápido y pureza garantizada en todo México.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/dmsomexico/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 ease-in-out">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/dmso_mx" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors duration-200 active:scale-95 ease-in-out">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-bold text-on-surface mb-6 font-label-bold uppercase tracking-wide">Tienda</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/shop" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Todos los Productos
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/categoria-producto/dmso-liquido" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    DMSO Líquido
                                </Link>
                            </li>
                            <li>
                                <Link href="/categoria-producto/dmso-gel" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    DMSO en Gel
                                </Link>
                            </li>
                            <li>
                                <Link href="/categoria-producto/dmso-crema" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Cremas con DMSO
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-bold text-on-surface mb-6 font-label-bold uppercase tracking-wide">Soporte</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Artículos y Guías
                                </Link>
                            </li>
                            <li>
                                <Link href="/envios" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Políticas de Envío
                                </Link>
                            </li>
                            <li>
                                <Link href="/devoluciones" className="text-on-surface-variant hover:text-primary text-sm transition-colors duration-200">
                                    Devoluciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-on-surface mb-6 font-label-bold uppercase tracking-wide">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                <Mail size={18} className="mt-0.5 text-primary" />
                                <a href="mailto:soporte@dmso.com.mx" className="hover:text-primary transition-colors">
                                    soporte@dmso.com.mx
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                <Phone size={18} className="mt-0.5 text-primary" />
                                <a href="tel:+527774087291" className="hover:text-primary transition-colors">
                                    +52 777 408 7291
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">location_on</span>
                                <span>
                                    Cuernavaca, Morelos<br />
                                    México
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-on-surface-variant text-sm font-body-sm flex flex-col items-center md:items-start">
                        <span>© {new Date().getFullYear()} DMSO México. Todos los derechos reservados.</span>
                        <a href="https://tecnomata.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-label-caps uppercase tracking-[0.1em] text-outline hover:text-primary transition-colors mt-2 opacity-70 hover:opacity-100 flex items-center gap-1">
                            Desarrollado con ❤️ por Tecnómata
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/aviso-de-privacidad" className="text-on-surface-variant hover:text-primary transition-colors duration-200">Aviso de Privacidad</Link>
                        <Link href="/terminos-y-condiciones" className="text-on-surface-variant hover:text-primary transition-colors duration-200">Términos y Condiciones</Link>
                        <Link href="/politica-de-cookies" className="text-on-surface-variant hover:text-primary transition-colors duration-200">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
