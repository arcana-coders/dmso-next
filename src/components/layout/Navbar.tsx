'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Facebook, Instagram, Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import SearchModal from './SearchModal';

interface Category {
    nombre: string;
    slug: string;
}

interface Product {
    id: number;
    titulo: string;
    slug: string;
    precio: string;
    imagenes: string[];
    categoria?: { nombre: string; slug: string } | null;
}

export default function Navbar({ categories = [], products = [] }: { categories?: Category[]; products?: Product[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const cartItems = useCartStore((s) => s.items);
    const openCart = useCartStore((s) => s.openCart);
    const cartCount = cartItems.reduce((sum, i) => sum + i.cantidad, 0);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    // Handle Resize to close menu if switching to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md breakpoint for this new design
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '/', hasDropdown: false },
        { name: 'Productos', href: '/shop', hasDropdown: false },
        { name: 'Blog', href: '/blog', hasDropdown: false },
        ...categories.map(cat => ({
            name: cat.nombre,
            href: `/categoria-producto/${cat.slug}`,
            hasDropdown: false
        })),
        { name: 'Nosotros', href: '/about', hasDropdown: false },
        { name: 'Contacto', href: '/contact', hasDropdown: false },
    ];

    return (
        <>
            {/* TopBar */}
            <div className="bg-primary text-white text-[10px] py-2 text-center px-4 relative z-[60] font-black uppercase tracking-[0.15em]">
                <p>Envío Gratis a Todo México en Pedidos Superiores a $999 MXN</p>
            </div>

            {/* MainHeader */}
            <header className="bg-surface sticky top-0 z-50 transition-all duration-300 border-b border-outline-variant font-bold text-xs tracking-widest uppercase">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center px-6 h-20 relative">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-[60] relative active:scale-95 transition-transform">
                        <span className={`text-2xl font-black tracking-tighter cursor-pointer transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-primary'}`}>
                            DMSO México
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex gap-6 items-center h-full overflow-x-auto no-scrollbar">
                        {navLinks.map((item, index) => (
                            <Link 
                                key={item.name} 
                                href={item.href} 
                                className={`h-full flex items-center px-2 active:scale-95 duration-150 ease-in-out transition-all border-b-2 border-transparent hover:text-primary ${
                                    index === 0 
                                    ? 'text-primary border-primary' 
                                    : 'text-on-surface-variant'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons & Hamburger */}
                    <div className="flex items-center gap-2 z-[60]">
                        {/* Search */}
                        <div className="hidden sm:block">
                            <SearchModal products={products as any} />
                        </div>
                        
                        {/* Desktop & Mobile Icons */}
                        <div className="flex items-center gap-2 text-primary">
                            <button
                                onClick={openCart}
                                aria-label="Abrir carrito"
                                className="relative hover:bg-primary/5 p-2 rounded-full transition-all duration-200 active:scale-90 ease-in-out hidden sm:flex items-center justify-center border border-transparent hover:border-primary/10"
                            >
                                <ShoppingCart size={22} strokeWidth={2.5} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center leading-none shadow-lg shadow-primary/20">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </button>
                            
                            {/* Mobile/Tablet Menu Button */}
                            <button
                                className={`lg:hidden p-2 rounded-full transition-all duration-300 hover:bg-surface-container active:scale-90 flex items-center justify-center ${isMenuOpen ? 'text-white hover:bg-white/20' : 'text-primary'}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-primary z-50 transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    } lg:hidden flex flex-col pt-24`}
            >
                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-[#001a33] pointer-events-none opacity-90"></div>

                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 active:scale-90 z-10"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <X size={32} strokeWidth={2.5} />
                </button>

                {/* Menu Content */}
                <div className="flex-1 flex flex-col justify-center px-10 pb-12 space-y-6 relative overflow-y-auto z-10">
                    <nav className="flex flex-col space-y-2">
                        {navLinks.map((item) => (
                            <div key={item.name} className="group">
                                <Link
                                    href={item.href}
                                    className="text-white text-2xl font-black tracking-tighter py-3 flex items-center justify-between group-hover:pl-4 transition-all duration-300 active:scale-95"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                    <X className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity -rotate-45" />
                                </Link>
                                <div className="h-px bg-white/10 w-full"></div>
                            </div>
                        ))}
                    </nav>

                     {/* Mobile Search */}
                        <div className="flex gap-4 sm:hidden justify-center py-4">
                            <SearchModal products={products as any} />
                        </div>

                        {/* Mobile Only Quick Actions */}
                        <div className="flex gap-4 pt-4 sm:hidden justify-center">
                        <button
                            onClick={() => { setIsMenuOpen(false); openCart(); }}
                            aria-label="Abrir carrito"
                            className="bg-white text-primary hover:bg-stone-50 p-5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 flex-1 font-black uppercase tracking-widest active:scale-95 shadow-xl"
                        >
                            <ShoppingCart size={24} strokeWidth={3} />
                            <span>Carrito ({cartCount})</span>
                        </button>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                        <Link
                            href="/contact"
                            className="block w-full text-center bg-secondary text-white px-8 py-5 rounded-2xl text-lg font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-secondary/20 active:scale-95"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CONTACTO
                        </Link>
                    </div>
                </div>

                {/* Footer / Socials within Menu */}
                <div className="px-10 py-12 relative bg-black/30 backdrop-blur-md">
                    <div className="flex gap-10 justify-center text-white/60">
                        <a href="https://www.facebook.com/dmsomexico/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-125 active:scale-90"><Facebook size={28} /></a>
                        <a href="https://www.instagram.com/dmso_mx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-125 active:scale-90"><Instagram size={28} /></a>
                    </div>
                    <div className="text-center mt-8 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                        © DMSO México 2026
                    </div>
                </div>
            </div>
        </>
    );
}
