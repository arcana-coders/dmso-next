import Link from 'next/link';
import { articles } from '@/data/dmso-articles';
import { ArrowRight } from 'lucide-react';

export default function DmsoFactsPage() {
    return (
        <main className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-dmso-dark mb-4 text-center">Todo sobre DMSO</h1>
            <p className="text-center text-stone-600 max-w-2xl mx-auto mb-16 text-lg">
                La fuente de información más confiable sobre Dimetilsulfóxido.
                Descubre sus usos, protocolos de seguridad y beneficios respaldados por la ciencia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {articles.map((article) => (
                    <Link key={article.slug} href={`/dmso-facts/${article.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100">
                        {/* Image Container */}
                        <div className="h-64 overflow-hidden relative">
                            <div className="absolute inset-0 bg-dmso-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col">
                            <h2 className="text-2xl font-bold text-dmso-dark mb-4 group-hover:text-dmso-green transition-colors leading-tight">
                                {article.title}
                            </h2>
                            <p className="text-stone-600 mb-6 flex-1 leading-relaxed">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center text-dmso-green font-bold text-sm tracking-wide uppercase group-hover:translate-x-2 transition-transform">
                                Leer artículo completo <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
