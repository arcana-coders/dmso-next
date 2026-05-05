'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Facebook, Instagram } from 'lucide-react';
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
            <div className="bg-primary text-white text-xs py-2 text-center px-4 relative z-[60] font-label-bold tracking-wide">
                <p>Envío Gratis a Todo México en Pedidos Superiores a $999 MXN (Entrega 7-10 días hábiles)</p>
            </div>

            {/* MainHeader */}
            <header className="bg-surface sticky top-0 z-50 transition-all duration-300 border-b border-outline-variant font-label-bold text-sm tracking-wide">
                <div className="max-w-[1280px] mx-auto flex justify-between items-center px-6 h-20 relative">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-[60] relative">
                        <span className={`text-2xl font-black tracking-tighter cursor-pointer transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-primary'}`}>
                            DMSO México
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 items-center h-full overflow-x-auto no-scrollbar">
                        {navLinks.map((item, index) => (
                            <Link 
                                key={item.name} 
                                href={item.href} 
                                className={`h-full flex items-center px-2 active:scale-95 duration-150 ease-in-out transition-colors whitespace-nowrap ${
                                    index === 0 
                                    ? 'text-primary font-bold border-b-2 border-primary' 
                                    : 'text-on-surface-variant font-medium hover:text-primary hover:bg-surface-container'
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
                                className="relative hover:bg-surface-container p-2 rounded-full transition-colors duration-200 active:scale-95 ease-in-out hidden sm:flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#003f87] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </button>
                            
                            {/* Mobile/Tablet Menu Button */}
                            <button
                                className={`md:hidden p-2 rounded-full transition-colors duration-300 hover:bg-surface-container active:scale-95 flex items-center justify-center ${isMenuOpen ? 'text-white hover:bg-white/20' : 'text-primary'}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-primary z-50 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden flex flex-col pt-24`}
            >
                {/* Decorative Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none"></div>

                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/20 transition-colors duration-200 active:scale-95 z-10"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <span className="material-symbols-outlined text-[32px]">close</span>
                </button>

                {/* Menu Content */}
                <div className="flex-1 flex flex-col justify-center px-10 pb-12 space-y-4 relative overflow-y-auto">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((item) => (
                            <div key={item.name} className="group pb-2 border-b border-white/10">
                                <Link
                                    href={item.href}
                                    className="text-white text-xl font-bold tracking-widest flex items-center justify-between group-hover:text-primary-container transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </nav>

                     {/* Mobile Search */}
                        <div className="flex gap-4 sm:hidden justify-center">
                            <SearchModal products={products as any} />
                        </div>

                        {/* Mobile Only Quick Actions */}
                        <div className="flex gap-4 pt-4 sm:hidden justify-center">
                        <button
                            onClick={() => { setIsMenuOpen(false); openCart(); }}
                            className="bg-white/10 text-white hover:bg-white/20 p-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 flex-1"
                        >
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <span>Carrito{cartCount > 0 ? ` (${cartCount})` : ''}</span>
                        </button>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <Link
                            href="/contact"
                            className="block w-full text-center bg-white text-primary px-8 py-4 rounded-full text-lg font-bold uppercase tracking-wide hover:bg-surface-container transition-colors shadow-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            CONTACTO
                        </Link>
                    </div>
                </div>

                {/* Footer / Socials within Menu */}
                <div className="px-10 py-10 relative bg-black/20">
                    <div className="flex gap-8 justify-center text-white/80">
                        <a href="https://www.facebook.com/dmsomexico/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-transform hover:scale-110"><Facebook size={24} /></a>
                        <a href="https://www.instagram.com/dmso_mx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-transform hover:scale-110"><Instagram size={24} /></a>
                    </div>
                    <div className="text-center mt-6 text-white/40 text-xs">
                        © DMSO México 2025
                    </div>
                </div>
            </div>
        </>
    );
}
