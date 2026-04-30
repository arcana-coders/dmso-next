export default function FAQSection() {
    const faqs = [
        { question: '¿Qué es el DMSO?', answer: 'El DMSO (Dimetilsulfóxido) es un compuesto orgánico sulfurado utilizado ampliamente como disolvente y con propiedades que facilitan la absorción de otras sustancias a través de membranas biológicas.' },
        { question: '¿Cómo se usa el DMSO?', answer: 'Se aplica tópicamente sobre la piel limpia. Se recomienda comenzar con pequeñas cantidades y asegurar que la zona de aplicación esté libre de otros químicos.' },
        { question: '¿Es seguro?', answer: 'Sí, cuando se utiliza correctamente y en las concentraciones adecuadas. Siempre recomendamos consultar con un especialista antes de iniciar su uso.' },
        { question: '¿Tiempos de envío?', answer: 'Los envíos estándar toman de 7 a 10 días hábiles en todo México. Envíos exprés disponibles en el checkout.' }
    ];

    return (
        <section className="py-24 bg-dmso-green text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Title & CTA */}
                    <div>
                        <h2 className="text-3xl font-medium mb-6">Preguntas Frecuentes</h2>
                        <button className="bg-[#0d2b22] text-white px-6 py-2 text-sm font-medium rounded-md border border-white/20 hover:opacity-90 transition-colors">
                            Ver todas
                        </button>
                    </div>
                    {/* Right: Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group border-b pb-4 cursor-pointer border-[#2a4f44]">
                                <summary className="flex justify-between items-center font-medium text-lg list-none [&::-webkit-details-marker]:hidden">
                                    {faq.question}
                                    <span className="text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                                </summary>
                                <div className="pt-3 text-gray-300 text-sm leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
