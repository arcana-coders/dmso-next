import React from 'react';
import Link from 'next/link';

export default function ProcessSection() {
  return (
    <section className="w-full bg-surface border-y border-outline-variant py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">Compromiso de Pureza y Calidad</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[800px]">
            No solo vendemos DMSO; entregamos confianza. Cada gota de nuestro producto pasa por rigurosos controles de calidad para asegurar que recibas el estándar de oro en pureza farmacéutica.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Purity Card */}
          <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-dmso-green text-[48px] mb-6">science</span>
            <h3 className="font-headline-md text-headline-md text-on-background mb-3">Pureza 99.9%</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Nuestro DMSO es de grado farmacéutico, libre de contaminantes y BPA. Ideal para quienes buscan la máxima eficacia sin riesgos.
            </p>
          </div>

          {/* Origin Card */}
          <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-primary text-[48px] mb-6">workspace_premium</span>
            <h3 className="font-headline-md text-headline-md text-on-background mb-3">Origen Certificado</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Importamos directamente de laboratorios líderes en EE.UU., manteniendo una cadena de custodia estricta hasta tu hogar.
            </p>
          </div>

          {/* Support Card */}
          <div className="bg-primary text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[48px] mb-6 text-primary-container">support_agent</span>
              <h3 className="font-headline-md text-headline-md mb-3">Soporte Experto</h3>
              <p className="font-body-md text-body-md opacity-90 mb-8">
                ¿Tienes dudas sobre el uso o concentraciones? Nuestro equipo técnico está listo para asesorarte personalmente.
              </p>
            </div>
            <Link href="/contact" className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors w-full text-center">
              Contactar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
