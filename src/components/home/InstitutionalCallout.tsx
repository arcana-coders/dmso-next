import Link from 'next/link';

export default function InstitutionalCallout() {
    return (
        <section className="bg-primary text-white py-16 border-t border-primary-container">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border border-secondary/30 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-primary-container/40 via-primary to-primary/95 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
                    <div aria-hidden className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="space-y-3 max-w-2xl relative z-10">
                        <div className="inline-flex items-center gap-2 text-secondary text-xs font-semibold tracking-wider uppercase bg-white/10 px-3 py-1 rounded-full border border-secondary/20">
                            <span className="material-symbols-outlined text-[16px]">support_agent</span>
                            Soporte Especializado · Consultorios, Clínicas y Pacientes
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                            ¿Requieres certificados analíticos (COA) de lote o asesoría de uso?
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed font-normal">
                            Nuestro equipo facilita fichas técnicas, certificados analíticos por lote y cotizaciones directas con facturación fiscal mexicana (CFDI). Te respondemos en minutos.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto flex-shrink-0 relative z-10">
                        <a
                            href="mailto:soporte@dmso.com.mx"
                            className="px-6 py-3.5 bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-white font-bold rounded-xl text-center text-xs tracking-wide transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            <span>Contactar a un Asesor</span>
                        </a>
                        <Link
                            href="/shop"
                            className="px-6 py-3.5 border border-white/30 hover:bg-white/10 text-white font-semibold rounded-xl text-center text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                            <span>Ver Todo el Catálogo</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
