import React from 'react';
import { ShieldCheck, Lock, CreditCard, RotateCcw } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'PayPal Verified',
      description: 'Pagos 100% Protegidos'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'SSL 256-bit',
      description: 'Encriptación Bancaria'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Compra Protegida',
      description: 'Garantía de Entrega'
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: 'Garantía 30 días',
      description: 'Satisfacción Total'
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
