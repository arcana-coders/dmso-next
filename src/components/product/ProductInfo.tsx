'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Star, Zap } from 'lucide-react';
import TrustBadges from './TrustBadges';
import { cleanupText } from '@/lib/utils';
import { useCartStore } from '@/lib/store';

interface ProductInfoProps {
    id: string;
    slug: string;
    title: string;
    price: string;
    asin?: string;
    imagen?: string;
    reviewsCount?: number;
    stock?: number;
}

export default function ProductInfo({ id, slug, title, price, asin, imagen = '', reviewsCount = 0, stock = 0 }: ProductInfoProps) {
    const envioInmediato = stock > 0;
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((s) => s.addItem);

    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
    const increaseQuantity = () => setQuantity(prev => envioInmediato ? Math.min(stock, prev + 1) : prev + 1);

    const handleAddToCart = () => {
        addItem({ id, slug, titulo: title, precio: parseFloat(price), imagen, cantidad: quantity });
    };

    return (
        <div className="flex flex-col">
            {envioInmediato && (
                <div className="inline-flex items-center gap-1.5 w-fit bg-secondary/10 text-secondary text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
                    <Zap size={13} fill="currentColor" strokeWidth={0} />
                    Servicio Express — Envío al día siguiente
                </div>
            )}
            <h1 className="text-3xl lg:text-4xl font-semibold text-dmso-dark mb-1 tracking-tight">
                {cleanupText(title)}
            </h1>
            
            {asin && (
                <div className="text-sm font-medium text-stone-400 mb-4 tracking-wide uppercase">
                    SKU: <span className="text-stone-600">{asin}</span>
                </div>
            )}
            
            <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={reviewsCount > 0 ? "currentColor" : "none"} strokeWidth={1} />
                    ))}
                </div>
                <span className="text-sm text-stone-500 font-medium">
                    {reviewsCount > 0 ? `(${reviewsCount} reseñas verificadas)` : '(Sin reseñas aún)'}
                </span>
            </div>

            <div className="flex items-baseline gap-2 mb-8 bg-stone-50/50 p-4 rounded-lg border border-stone-100 w-fit">
                <span className="text-4xl font-black text-[#143A2C] tracking-tight">${price}</span>
                <span className="text-sm font-bold text-stone-400">MXN</span>
            </div>

            <div className="mb-2 text-sm font-black text-primary uppercase tracking-widest">Cantidad</div>
            <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:gap-4">
                {/* Quantity Selector */}
                <div className="flex h-14 w-36 items-center overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm sm:w-32">
                    <button
                        onClick={decreaseQuantity}
                        className="px-4 py-2 hover:bg-stone-100 text-primary focus:outline-none w-full h-full flex items-center justify-center transition-all active:scale-90"
                    >
                        <Minus size={18} strokeWidth={3} />
                    </button>
                    <input
                        className="w-full text-center border-none focus:ring-0 p-0 text-primary font-black text-lg h-full bg-transparent outline-none"
                        type="text"
                        value={quantity}
                        readOnly
                    />
                    <button
                        onClick={increaseQuantity}
                        className="px-4 py-2 hover:bg-stone-100 text-primary focus:outline-none w-full h-full flex items-center justify-center transition-all active:scale-90"
                    >
                        <Plus size={18} strokeWidth={3} />
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-base font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 sm:flex-1 sm:text-lg sm:tracking-widest"
                >
                    <ShoppingCart size={22} strokeWidth={2.5} />
                    Agregar al Carrito
                </button>
            </div>

            {/* Shipping Info Box */}
            <div className={`rounded-2xl p-5 mb-8 flex items-center gap-5 border ${envioInmediato ? 'bg-secondary/5 border-secondary/10 text-secondary' : 'bg-primary/5 border-primary/10 text-primary'}`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${envioInmediato ? 'bg-secondary shadow-secondary/20' : 'bg-primary shadow-primary/20'}`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"></path>
                    </svg>
                </div>
                <div>
                    <h4 className={`font-black uppercase tracking-wider text-sm ${envioInmediato ? 'text-secondary' : 'text-primary'}`}>
                        {envioInmediato ? 'Servicio Express — en stock' : 'Envío gratis a todo México'}
                    </h4>
                    <p className={`text-xs font-bold mt-0.5 uppercase tracking-tighter ${envioInmediato ? 'text-secondary/70' : 'text-primary/70'}`}>
                        {envioInmediato ? `Entrega al día siguiente · Máximo ${stock} por cliente` : 'Entrega estimada: 7 - 10 días hábiles'}
                    </p>
                </div>
            </div>

            {/* Trust Badges Section */}
            <TrustBadges />
        </div>
    );
}
