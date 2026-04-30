import React from 'react';
import Link from 'next/link';

export default function ProcessSection() {
  return (
    <section className="w-full bg-surface border-y border-outline-variant py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">El Proceso de Importación Segura</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[700px]">
            Eliminamos los riesgos de aduana y falsificaciones. Nuestro protocolo garantiza que recibas exactamente lo que el laboratorio estadounidense envasó.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Process Card */}
          <div className="md:col-span-2 bg-white border border-outline-variant rounded-xl p-8 flex flex-col justify-between">
            <div className="mb-8">
              <span className="material-symbols-outlined text-secondary text-[40px] mb-4">verified</span>
              <h3 className="font-headline-md text-headline-md text-on-background mb-2">Cadena de Custodia Clínica</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Desde el laboratorio en USA hasta tu puerta en México, mantenemos trazabilidad documental completa. Cada lote cruza la frontera bajo protocolos legales de importación.
              </p>
            </div>
            
            <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-lg flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary mt-1">info</span>
              <div>
                <p className="font-label-bold text-label-bold text-on-background">Certificado de Autenticidad</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Se incluye documentación de origen con cada pedido.</p>
              </div>
            </div>
          </div>
          
          {/* Support Card */}
          <div className="bg-primary-container text-on-primary rounded-xl p-8 flex flex-col justify-center">
            <span className="material-symbols-outlined text-[40px] mb-4 opacity-80">local_hospital</span>
            <h3 className="font-headline-md text-headline-md mb-2">Asesoría Profesional</h3>
            <p className="font-body-md text-body-md opacity-90 mb-6">
              Respaldamos nuestras ventas con soporte técnico sobre concentraciones y protocolos de uso seguro.
            </p>
            <Link href="/contact" className="bg-on-primary text-primary-container font-label-bold text-label-bold px-6 py-3 rounded-lg hover:bg-surface transition-colors w-fit text-center">
              Contactar Soporte
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
