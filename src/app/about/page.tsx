import { CheckCircle, Factory, Gavel, Truck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-6 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#f2f4f6] px-4 py-2 rounded-full border border-[#c2c6d4]">
              <CheckCircle className="text-[#003f87] w-4 h-4" />
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#424752]">Precisión Científica</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#191c1e]">
              Proveyendo DMSO Auténtico y de Alta Calidad a México.
            </h1>
            <p className="text-lg leading-relaxed text-[#424752] max-w-xl">
              Nuestra misión es cerrar la brecha en suministros de grado clínico, garantizando un acceso directo, seguro y conforme a la ley para adquirir DMSO premium de Estados Unidos, entregado directamente a su puerta con total transparencia.
            </p>
          </div>
          <div className="relative h-[500px] w-full rounded-xl overflow-hidden border border-[#c2c6d4] shadow-sm">
            <Image 
              src="/images/ui/about-lab.png"
              alt="Laboratorio clínico moderno"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="bg-[#f2f4f6] py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-[#191c1e] mb-4">Nuestro Proceso</h2>
            <p className="text-base text-[#424752] max-w-2xl mx-auto">
              Un viaje fluido y documentado desde fabricantes confiables de EE. UU. hasta su consultorio en México.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-[#c2c6d4] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#d7e2ff] text-[#001a40] rounded-lg flex items-center justify-center mb-6">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-[#191c1e] mb-4">Suministro de EE. UU.</h3>
              <p className="text-base text-[#424752]">
                Nos abastecemos exclusivamente de fabricantes certificados de primer nivel en los Estados Unidos, garantizando la pureza y consistencia de grado clínico en cada lote.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white border border-[#c2c6d4] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#85f8c4] text-[#002114] rounded-lg flex items-center justify-center mb-6">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-[#191c1e] mb-4">Despacho Aduanero</h3>
              <p className="text-base text-[#424752]">
                Nuestro equipo de logística dedicado maneja todas las complejas regulaciones de importación, aranceles y papeleo, garantizando un tránsito fluido a través de la frontera.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white border border-[#c2c6d4] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#dae2fd] text-[#131b2e] rounded-lg flex items-center justify-center mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-[#191c1e] mb-4">Entrega Local</h3>
              <p className="text-base text-[#424752]">
                En asociación con mensajerías nacionales confiables, aseguramos una entrega segura y puntual directamente a sus instalaciones o residencia en México.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="bg-white border border-[#c2c6d4] rounded-xl p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d7e2ff] opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <h2 className="text-3xl font-bold text-[#191c1e] mb-6">Cumplimiento Legal y Transparencia</h2>
              <p className="text-base text-[#424752] mb-8 leading-relaxed">
                Operamos con absoluta transparencia. Cada importación está meticulosamente documentada, cumple con los impuestos y es totalmente trazable. Proporcionamos facturación oficial (Facturación) para todos los pedidos, brindándole tranquilidad y un estricto cumplimiento legal.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-[#f7f9fb] p-4 rounded-lg border border-[#c2c6d4]">
                  <CheckCircle className="text-[#006c4a] w-5 h-5" />
                  <span className="text-sm font-semibold text-[#191c1e]">100% Cumplimiento Fiscal (SAT)</span>
                </div>
                <div className="flex items-center gap-4 bg-[#f7f9fb] p-4 rounded-lg border border-[#c2c6d4]">
                  <CheckCircle className="text-[#006c4a] w-5 h-5" />
                  <span className="text-sm font-semibold text-[#191c1e]">Documentación de Origen de EE. UU. Verificada</span>
                </div>
                <div className="flex items-center gap-4 bg-[#f7f9fb] p-4 rounded-lg border border-[#c2c6d4]">
                  <CheckCircle className="text-[#006c4a] w-5 h-5" />
                  <span className="text-sm font-semibold text-[#191c1e]">Facturación Oficial Disponible</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f7f9fb] p-6 rounded-xl border border-[#c2c6d4] text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center aspect-square">
                  <ShieldCheck className="w-10 h-10 text-[#003f87] mb-4" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#191c1e]">Control de Calidad Estricto</span>
                </div>
                <div className="bg-[#f7f9fb] p-6 rounded-xl border border-[#c2c6d4] text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center aspect-square mt-8">
                  <div className="w-10 h-10 text-[#003f87] mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1a.3.3 0 1 0 .2-.3" />
                      <path d="M13 15h8" />
                      <path d="M15 11h6" />
                      <path d="M13 19h8" />
                      <path d="M3 14h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#191c1e]">Grado Profesional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
