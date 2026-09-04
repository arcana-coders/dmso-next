import React from 'react';

export default function TrustBar({ hasEnvioInmediato = false }: { hasEnvioInmediato?: boolean }) {
  return (
    <section className="py-14 bg-white border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-secondary/10 px-3 py-1 rounded-full">Calidad Farmacéutica Superior</span>
          <h2 className="text-2xl font-bold text-primary mt-2">Por qué elegir DMSO México para tu salud</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-surface border border-primary/10 hover:border-secondary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-3">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">Pureza Analítica</span>
            <h3 className="text-sm font-bold text-primary mt-1">99.9% Grado Farmacéutico</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">Libre de metales pesados, sin aditivos artificiales ni restos de solventes industriales.</p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-primary/10 hover:border-secondary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-3">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">Logística Nacional</span>
            <h3 className="text-sm font-bold text-primary mt-1">
              {hasEnvioInmediato ? 'Servicio Express disponible' : 'Despacho en 7-9 días'}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              {hasEnvioInmediato
                ? 'Productos seleccionados con stock en México, listos para salir al día siguiente.'
                : 'Envíos directos a todo México con rastreo desde la confirmación de tu orden.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-primary/10 hover:border-secondary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-3">
              <span className="material-symbols-outlined text-[24px]">receipt_long</span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">Facturación</span>
            <h3 className="text-sm font-bold text-primary mt-1">CFDI Disponible</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">Factura fiscal mexicana disponible para consultorios, clínicas y personas físicas.</p>
          </div>

          <div className="p-5 rounded-2xl bg-surface border border-primary/10 hover:border-secondary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-3">
              <span className="material-symbols-outlined text-[24px]">shield</span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold">Importación Legal</span>
            <h3 className="text-sm font-bold text-primary mt-1">100% Transparencia</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">Origen y trazabilidad verificables en cada envío que sale de nuestra bodega.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
