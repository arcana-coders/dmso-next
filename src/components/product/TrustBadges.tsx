import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Pureza Garantizada',
      description: '99.9% Grado Farmacéutico'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Pago Seguro',
      description: 'Encriptación SSL de 256 bits'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Envío Asegurado',
      description: 'Cobertura nacional en México'
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: 'Devolución Fácil',
      description: 'Garantía de satisfacción'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl bg-stone-50 border border-stone-100 transition-hover hover:shadow-sm">
          <div className="mb-2 text-dmso-green">
            {badge.icon}
          </div>
          <h4 className="text-[11px] font-bold text-dmso-dark uppercase tracking-wider leading-tight">
            {badge.title}
          </h4>
          <p className="text-[10px] text-stone-500 mt-1 leading-tight">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}
