import Link from 'next/link';

export default function Mission() {
    return (
        <section className="py-24 bg-dmso-beige">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                            Comprometidos con su<br />Salud y Bienestar.
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-base">
                            En DMSO México, nuestra misión es facilitar el acceso al Dimetilsulfóxido (DMSO) de la más alta pureza.
                            Creemos en el poder de este solvente orgánico para transformar vidas, ofreciendo una alternativa natural y efectiva.
                            Trabajamos bajo estrictos estándares de calidad para garantizar que cada gota que recibes sea segura y efectiva.
                        </p>
                        <Link href="/blog" className="bg-dmso-green text-white px-8 py-3 text-sm font-medium rounded-full hover:opacity-90 transition-colors mt-4 inline-block shadow-md">
                            Leer blog
                        </Link>
                    </div>
                    <div className="space-y-10">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                            <h3 className="text-xl mb-3 text-dmso-green font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-dmso-green"></span>
                                Nuestra Misión
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Ser la fuente más confiable de DMSO en México, educando sobre sus beneficios y proporcionando productos que cumplen rigurosamente con los estándares farmacéuticos (Ph. Eur / USP).
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
                            <h3 className="text-xl mb-3 text-dmso-green font-bold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-dmso-green"></span>
                                Nuestra Visión
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Convertirnos en el referente nacional de bienestar natural e integridad científica, donde la salud de nuestros clientes es siempre nuestra prioridad número uno.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
