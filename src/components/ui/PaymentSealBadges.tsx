type PaymentSealBadgesProps = {
  className?: string;
  compact?: boolean;
};

export default function PaymentSealBadges({ className = '', compact = false }: PaymentSealBadgesProps) {
  const padding = compact ? 'px-3 py-3' : 'px-4 py-4';
  const titleMargin = compact ? 'mb-3' : 'mb-4';
  const maxWidth = compact ? 'max-w-[520px]' : 'max-w-[620px]';

  return (
    <div className={`rounded-2xl border border-[#dfe7ef] bg-white ${padding} shadow-[0_12px_28px_rgba(0,63,135,0.06)] ${className}`}>
      <p className={`${titleMargin} text-center text-[11px] font-black uppercase tracking-[0.18em] text-gray-500`}>
        Compra protegida
      </p>
      <div className={`mx-auto grid ${maxWidth} grid-cols-2 gap-2.5 md:grid-cols-4`}>
        <svg viewBox="0 0 180 72" role="img" aria-label="PayPal Verified" className="h-auto w-full rounded-xl bg-[#fff8cc] shadow-sm">
          <defs>
            <path id="paypalSealShared" d="M90 6l5 5 7-3 4 6 8-1 2 7 7 1-1 8 6 4-3 7 5 5-5 5 3 7-6 4 1 8-7 1-2 7-8-1-4 6-7-3-5 5-5-5-7 3-4-6-8 1-2-7-7-1 1-8-6-4 3-7-5-5 5-5-3-7 6-4-1-8 7-1 2-7 8 1 4-6 7 3z" />
          </defs>
          <use href="#paypalSealShared" fill="#ffe16b" />
          <use href="#paypalSealShared" fill="none" stroke="#f0c83a" strokeWidth="2" />
          <text x="90" y="34" textAnchor="middle" fontSize="23" fontWeight="900" fill="#003087" fontStyle="italic">PayPal</text>
          <text x="90" y="51" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0070ba" letterSpacing="3">VERIFIED</text>
        </svg>

        <svg viewBox="0 0 180 72" role="img" aria-label="McAfee Secure" className="h-auto w-full rounded-xl bg-white shadow-sm">
          <path d="M26 14l23 7v15c0 15-9 22-23 28C12 58 3 51 3 36V21l23-7z" fill="#c41230" stroke="#9f9f9f" strokeWidth="2" />
          <path d="M15 25l11-3 11 3v12c0 8-4 13-11 17-7-4-11-9-11-17V25z" fill="#fff" opacity=".95" />
          <text x="26" y="45" textAnchor="middle" fontSize="26" fontWeight="900" fill="#c41230">M</text>
          <text x="62" y="32" fontSize="23" fontWeight="900" fill="#111">McAfee</text>
          <text x="62" y="54" fontSize="22" fontWeight="900" fill="#111">SECURE</text>
        </svg>

        <svg viewBox="0 0 180 72" role="img" aria-label="Norton Secured" className="h-auto w-full rounded-xl bg-white shadow-sm">
          <circle cx="35" cy="36" r="23" fill="#fff" stroke="#f4c400" strokeWidth="8" />
          <path d="M24 35l8 10 19-25" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="68" y="32" fontSize="22" fontWeight="900" fill="#111">Norton</text>
          <text x="68" y="52" fontSize="18" fontWeight="800" fill="#777">SECURED</text>
        </svg>

        <svg viewBox="0 0 180 72" role="img" aria-label="Google Trusted" className="h-auto w-full rounded-xl bg-white shadow-sm">
          <circle cx="32" cy="36" r="20" fill="#fff" stroke="#e5e7eb" strokeWidth="3" />
          <path d="M23 36l7 7 13-17" fill="none" stroke="#34a853" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 27a20 20 0 0114-11" fill="none" stroke="#4285f4" strokeWidth="4" strokeLinecap="round" />
          <path d="M33 16a20 20 0 0116 10" fill="none" stroke="#fbbc05" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 28a20 20 0 01-1 18" fill="none" stroke="#ea4335" strokeWidth="4" strokeLinecap="round" />
          <text x="62" y="31" fontSize="16" fontWeight="800" fill="#777">Google</text>
          <text x="62" y="53" fontSize="23" fontWeight="900" fill="#6b7280">Trusted</text>
        </svg>
      </div>
    </div>
  );
}
