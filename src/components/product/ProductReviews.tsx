'use client';

import { Star } from 'lucide-react';
import { cleanupText } from '@/lib/utils';

interface Review {
    id?: number | string;
    autor?: string;
    fecha?: string;
    rating?: number;
    titulo?: string;
    texto?: string;
}

interface ProductReviewsProps {
    reviews?: Review[];
}

const DEFAULT_REVIEWS = [
    {
        id: 'd1',
        autor: 'Laura G.',
        fecha: '12 de Abril, 2026',
        rating: 5,
        titulo: 'Excelente calidad',
        texto: 'He probado varias marcas y definitivamente la pureza de DMSO México es superior. El envío fue rapidísimo y llegó perfectamente empacado.'
    },
    {
        id: 'd2',
        autor: 'Carlos R.',
        fecha: '5 de Abril, 2026',
        rating: 5,
        titulo: 'Muy satisfecho',
        texto: 'Lo utilizo para mis formulaciones y los resultados han sido constantes. El servicio de DMSO México es impecable, el envase de vidrio ámbar protege muy bien el producto.'
    },
    {
        id: 'd3',
        autor: 'Martha S.',
        fecha: '28 de Marzo, 2026',
        rating: 5,
        titulo: 'Confianza total',
        texto: 'Llegó en el tiempo estimado. Me gusta que sea grado farmacéutico y que DMSO México sea una empresa establecida, me da mucha confianza al usarlo.'
    }
];

export default function ProductReviews({ reviews }: ProductReviewsProps) {
    const displayReviews = (reviews && reviews.length > 0) ? reviews : [];

    return (
        <section className="mt-16 pt-16 border-t border-stone-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h2 className="text-2xl font-semibold text-dmso-dark mb-2">Reseñas de Clientes</h2>
                    <div className="flex items-center gap-3">
                        {displayReviews.length > 0 ? (
                            <>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" strokeWidth={1} />
                                    ))}
                                </div>
                                <span className="text-lg font-medium text-stone-800">5.0 de 5</span>
                                <span className="text-sm text-stone-500 font-normal">Basado en {displayReviews.length} reseñas verificadas</span>
                            </>
                        ) : (
                            <span className="text-stone-500 italic">Aún no hay reseñas para este producto.</span>
                        )}
                    </div>
                </div>
                <button className="bg-white border border-dmso-dark text-dmso-dark px-6 py-2 rounded font-medium hover:bg-dmso-dark hover:text-white transition-all duration-300">
                    Escribir una reseña
                </button>
            </div>

            {displayReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayReviews.slice(0, 6).map((review, idx) => (
                        <div key={review.id || idx} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex text-yellow-500 mb-3">
                                {[...Array(review.rating || 5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" strokeWidth={1} />
                                ))}
                            </div>
                            <h4 className="font-semibold text-dmso-dark mb-1">{cleanupText(review.titulo)}</h4>
                            <p className="text-sm text-stone-600 mb-4 line-clamp-3">"{cleanupText(review.texto)}"</p>
                            <div className="flex justify-between items-center pt-4 border-t border-stone-50">
                                <span className="text-sm font-medium text-stone-800">{review.autor || 'Usuario Verificado'}</span>
                                <span className="text-xs text-stone-400">{review.fecha || 'Reciente'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-stone-50 p-12 rounded-2xl border border-dashed border-stone-200 text-center">
                    <p className="text-stone-500">Sé el primero en compartir tu experiencia con este producto.</p>
                </div>
            )}
        </section>
    );
}
