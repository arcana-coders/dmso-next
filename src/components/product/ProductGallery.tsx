'use client';

import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0] || '/images/products/placeholder.jpg');

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-[#f9f8f4] rounded-2xl overflow-hidden group border border-stone-100 shadow-sm aspect-square md:aspect-[4/5] flex items-center justify-center p-8">
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-stone-50 transition z-10 shadow-sm text-stone-600">
                    <ZoomIn size={20} />
                </button>
                <div className="relative w-full h-full">
                    {/* Using standard img for now as configured before, but configured for contain */}
                    <img
                        alt={alt}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
                        src={mainImage}
                    />
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setMainImage(img)}
                            className={`rounded-lg overflow-hidden border-2 aspect-square flex items-center justify-center bg-[#f9f8f4] p-2 transition-all cursor-pointer ${mainImage === img ? 'border-dmso-green opacity-100 ring-2 ring-dmso-green/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <img src={img} alt={`${alt} - view ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
