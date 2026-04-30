import React from 'react';

export default function TrustBar() {
  return (
    <div className="w-full bg-surface border-y border-outline-variant py-8">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
        <div className="flex flex-col items-center gap-stack-sm">
          <span className="material-symbols-outlined text-primary-container text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <span className="font-label-bold text-label-bold text-on-background">100% Original</span>
        </div>
        
        <div className="flex flex-col items-center gap-stack-sm">
          <span className="material-symbols-outlined text-primary-container text-[32px]">local_shipping</span>
          <span className="font-label-bold text-label-bold text-on-background">Entrega en 7-9 días</span>
        </div>
        
        <div className="flex flex-col items-center gap-stack-sm">
          <span className="material-symbols-outlined text-primary-container text-[32px]">receipt_long</span>
          <span className="font-label-bold text-label-bold text-on-background">Facturación Disponible</span>
        </div>
        
        <div className="flex flex-col items-center gap-stack-sm">
          <span className="material-symbols-outlined text-primary-container text-[32px]">gavel</span>
          <span className="font-label-bold text-label-bold text-on-background">Importación Legal</span>
        </div>
      </div>
    </div>
  );
}
