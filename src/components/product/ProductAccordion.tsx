'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cleanupText } from '@/lib/utils';

interface AccordionItemProps {
    title: string;
    isOpen?: boolean;
    children: React.ReactNode;
}

function AccordionItem({ title, isOpen = false, children }: AccordionItemProps) {
    const [open, setOpen] = useState(isOpen);

    return (
        <div className="border-b border-gray-200">
            <button
                className="w-full py-4 flex items-center justify-between text-left group focus:outline-none"
                onClick={() => setOpen(!open)}
            >
                <span className="font-medium text-stone-800">{title}</span>
                <ChevronDown
                    size={18}
                    className={`text-stone-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[800px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-sm text-stone-600 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface ProductAccordionProps {
    description?: string;
    detalles?: Record<string, string>;
}

export default function ProductAccordion({ description, detalles }: ProductAccordionProps) {

    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium text-dmso-dark mb-4">Detalles del Producto</h3>
            <div className="border-t border-stone-200">
                <AccordionItem title="Descripción" isOpen={true}>
                    <div className="space-y-4 whitespace-pre-line">
                        {cleanupText(description) || 'DMSO Puro 99.9% - Solución de Dimetilsulfóxido de alta pureza y calidad farmacéutica.'}
                    </div>
                </AccordionItem>
                
                {detalles && Object.keys(detalles).length > 0 && (
                    <AccordionItem title="Especificaciones Técnicas">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.entries(detalles).map(([key, value]) => (
                                <div key={key} className="contents">
                                    <span className="font-medium text-stone-800 py-1 border-b border-stone-50">{key}:</span>
                                    <span className="text-stone-600 py-1 border-b border-stone-50">{cleanupText(typeof value === 'object' ? JSON.stringify(value) : value)}</span>
                                </div>
                            ))}
                        </div>
                    </AccordionItem>
                )}

                <AccordionItem title="Beneficios">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Alta pureza (99.9%)</li>
                        <li>Solvente universal potente</li>
                        <li>Grado farmacéutico</li>
                        <li>Envasado en vidrio ámbar para preservar integridad</li>
                    </ul>
                </AccordionItem>
                
                <AccordionItem title="Modo de Uso">
                    <p>
                        Se recomienda utilizar en un área ventilada. Asegúrese de que la piel esté limpia y libre de otros productos químicos antes de la aplicación si se usa tópicamente bajo supervisión profesional.
                        Nota: El DMSO puro se cristaliza a temperaturas inferiores a 18°C. Si esto sucede, coloque la botella en un lugar cálido (baño maría tibio) hasta que vuelva a ser líquido.
                    </p>
                </AccordionItem>
                
                <AccordionItem title="Seguridad">
                    <p>
                        Mantener fuera del alcance de los niños. Evitar contacto con ojos y ropa. En caso de contacto, lavar con abundante agua.
                    </p>
                </AccordionItem>
            </div>
        </div>
    );
}
