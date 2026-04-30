import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-dmso-dark mb-12 text-center">Contáctanos</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Information Column */}
                <div className="space-y-8">
                    <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
                        <h2 className="text-2xl font-semibold mb-6 text-dmso-dark">Información de Contacto</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-dmso-green">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Teléfono / WhatsApp</h3>
                                    <a href="tel:+527774087291" className="text-stone-600 hover:text-dmso-green mt-1 block">
                                        +52 777 408 7291
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-dmso-green">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Correo Electrónico</h3>
                                    <a href="mailto:soporte@dmso.com.mx" className="text-stone-600 hover:text-dmso-green mt-1 block">
                                        soporte@dmso.com.mx
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-full shadow-sm text-dmso-green">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Horario de Atención</h3>
                                    <p className="text-stone-600 mt-1">
                                        Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                                        Sábados: 9:00 AM - 2:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dmso-green text-white p-8 rounded-xl">
                        <h2 className="text-2xl font-semibold mb-4">¿Tienes dudas sobre el DMSO?</h2>
                        <p className="mb-6 opacity-90 leading-relaxed">
                            Nuestro equipo de expertos está listo para responder tus preguntas sobre el uso, dosificación y beneficios de nuestros productos.
                        </p>
                        <a href="mailto:soporte@dmso.com.mx" className="inline-block bg-white text-dmso-dark font-bold px-6 py-3 rounded-lg hover:bg-stone-100 transition-colors">
                            Escribir a Soporte
                        </a>
                    </div>
                </div>

                {/* Information form */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 h-fit">
                    <h2 className="text-2xl font-semibold mb-6 text-dmso-dark">Envíanos un Mensaje</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input type="text" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border outline-none transition-all" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input type="tel" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border outline-none transition-all" placeholder="+52..." />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border outline-none transition-all" placeholder="tu@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                            <textarea className="w-full rounded-lg border-gray-300 shadow-sm focus:border-dmso-green focus:ring-dmso-green p-3 border h-32 outline-none transition-all resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                        </div>
                        <button className="w-full bg-dmso-dark text-white font-bold py-4 rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
