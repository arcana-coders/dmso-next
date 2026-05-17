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
          <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 shadow-lg shadow-secondary/20 transition-transform group-hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .892-.612 1.657-1.428 2.062a4.501 4.501 0 00-2.316 4.148c0 1.611.85 3.02 2.138 3.824a.75.75 0 01.356.634v1.734a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25v-1.734a.75.75 0 01.356-.634c1.288-.804 2.138-2.213 2.138-3.824a4.501 4.501 0 00-2.316-4.148c-.816-.405-1.428-1.17-1.428-2.062V3.104" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25h.008v.008H15V8.25zM9 8.25h.008v.008H9V8.25zM12 11.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-3">Pureza 99.9%</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Nuestro DMSO es de grado farmacéutico, libre de contaminantes y BPA. Ideal para quienes buscan la máxima eficacia sin riesgos.
            </p>
          </div>

          {/* Origin Card */}
          <div className="bg-white border border-outline-variant rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-background mb-3">Origen Certificado</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Importamos directamente de laboratorios líderes en EE.UU., manteniendo una cadena de custodia estricta hasta tu hogar.
            </p>
          </div>

          {/* Support Card */}
          <div className="bg-primary text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur-sm transition-transform group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.865 5.25 5.25 0 00.84-2.798C3.266 15.79 2.25 13.996 2.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <h3 className="font-headline-md text-headline-md mb-3">Soporte Experto</h3>
              <p className="font-body-md text-body-md opacity-90 mb-8">
                ¿Tienes dudas sobre el uso o concentraciones? Nuestro equipo técnico está listo para asesorarte personalmente.
              </p>
            </div>
            <Link href="/contact" className="bg-white text-primary font-bold px-6 py-4 rounded-xl hover:bg-stone-50 transition-all active:scale-95 w-full text-center shadow-md">
              Contactar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
