import React from 'react';

export default function TrustBar() {
  return (
    <div className="w-full bg-surface border-y border-outline-variant py-8">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center group">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-on-surface uppercase tracking-wider">100% Original</span>
          <p className="text-[10px] text-on-surface-variant mt-1 font-medium">Grado Farmacéutico</p>
        </div>
        
        <div className="flex flex-col items-center text-center group">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <span className="font-bold text-sm text-on-surface uppercase tracking-wider">Envío Express</span>
          <p className="text-[10px] text-on-surface-variant mt-1 font-medium">Todo México (7-9 días)</p>
        </div>
        
        <div className="flex flex-col items-center text-center group">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-on-surface uppercase tracking-wider">Facturación</span>
          <p className="text-[10px] text-on-surface-variant mt-1 font-medium">CFDI disponible</p>
        </div>
        
        <div className="flex flex-col items-center text-center group">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-on-surface uppercase tracking-wider">Importación Legal</span>
          <p className="text-[10px] text-on-surface-variant mt-1 font-medium">100% Transparencia</p>
        </div>
      </div>
    </div>
  );
}
