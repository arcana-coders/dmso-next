const standards = [
    'Pureza Farmacéutica 99.9%',
    'Certificado de Análisis (CoA)',
    'Envasado en vidrio ámbar (líquidos)',
    'Libre de Metales Pesados',
    'Sin Olores Añadidos',
    'Grado Ph. Eur / USP',
    'Libre de BPA (Geles y Cremas)',
    'Producido bajo normas GMP',
    'Soporte Técnico Especializado'
];

export default function QualitySection() {
    return (
        <section className="py-24 bg-dmso-beige">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-medium text-gray-900 mb-12">Estándares de Calidad y Seguridad</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 text-gray-800">
                    {standards.map((item, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                            <span className="text-lg font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
