import Link from 'next/link';

type SuccessPageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const orderNumber = params.order || 'DMSO-PREVIEW';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 py-20">
      <div className="max-w-2xl w-full bg-surface rounded-[3rem] p-10 md:p-16 shadow-[0_30px_100px_-20px_rgba(0,56,108,0.12)] border border-outline-variant/20 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c1ebb5]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-[#c1ebb5]/30 text-[#43673c] rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-surface shadow-sm">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-6 font-headline">
            ¡Gracias por tu compra!
          </h1>

          <p className="text-on-surface-variant text-lg mb-10 max-w-md mx-auto leading-relaxed font-body">
            Tu pedido ha sido procesado con éxito. Pronto recibirás un correo con los detalles y el seguimiento de tu envío.
          </p>

          <div className="bg-surface-container rounded-2xl p-6 mb-12 border border-outline-variant/20 inline-block px-10">
            <span className="block text-[10px] font-black text-on-surface-variant uppercase tracking-[0.25em] mb-2">Número de Pedido</span>
            <span className="text-2xl font-black text-primary tracking-tight">{orderNumber}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="bg-primary text-on-primary px-8 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/shop"
              className="bg-surface text-on-surface border-2 border-outline-variant/30 px-8 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:border-primary transition-all"
            >
              Seguir Comprando
            </Link>
          </div>

          <p className="mt-12 text-[11px] font-bold text-on-surface-variant leading-tight max-w-xs mx-auto">
            ¿Dudas sobre tu pedido? Escríbenos a{' '}
            <span className="text-primary">soporte@dmso.com.mx</span>{' '}
            con tu número de pedido.
          </p>
        </div>
      </div>
    </main>
  );
}
