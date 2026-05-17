import { ShieldCheck, Lock, CreditCard, RotateCcw } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      Icon: CreditCard,
      title: 'PayPal Verified',
      description: 'Pagos 100% Protegidos'
    },
    {
      Icon: Lock,
      title: 'SSL 256-bit',
      description: 'Encriptación Bancaria'
    },
    {
      Icon: ShieldCheck,
      title: 'Compra Protegida',
      description: 'Garantía de Entrega'
    },
    {
      Icon: RotateCcw,
      title: 'Garantía 30 días',
      description: 'Satisfacción Total'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-outline-variant">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container/50 border border-outline-variant transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group">
          <div className="mb-3 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
            <badge.Icon size={22} strokeWidth={2.5} />
          </div>
          <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.15em] leading-tight">
            {badge.title}
          </h4>
          <p className="text-[10px] text-on-surface-variant font-bold mt-1.5 leading-tight uppercase tracking-tighter opacity-70">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
}
