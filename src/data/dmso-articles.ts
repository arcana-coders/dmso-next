export interface Article {
    title: string;
    slug: string;
    image: string;
    content: string; // Markdown-like or just text
    excerpt: string;
}

export const articles: Article[] = [
    {
        title: "¿Qué es el DMSO? Usos, riesgos y evidencia (2025)",
        slug: "que-es-el-dmso-usos-riesgos-y-evidencia-2025",
        image: "https://dmso.com.mx/wp-content/uploads/2025/08/Captura-de-pantalla-2025-08-25-165719.png",
        excerpt: "DMSO significa dimetil sulfóxido, un compuesto orgánico líquido e incoloro. Descubre sus propiedades y cómo funciona.",
        content: `
## DMSO en pocas palabras
DMSO significa dimetil sulfóxido, un compuesto orgánico líquido e incoloro. Se clasifica como disolvente aprótico polar con gran capacidad para disolver y transportar sustancias (carrier transdérmico).

## ¿Cómo funciona?
Interacciona con proteínas, lípidos y agua de manera eficiente, permeando membranas biológicas mejor que la mayoría de solventes. Esto ayuda a que otras moléculas crucen la piel, actuando como acarreador.

## Usos y Evidencia
- **Aprobado**: Cistitis intersticial por instilación vesical.
- **Investigado**: Dolor en tejidos blandos y articulaciones, antiinflamatorio tópico.
- **Laboratorio**: Criopreservación celular y solvente estándar.

## Seguridad y Pureza
Es crítico usar grado farmacéutico para uso humano para evitar el arrastre de impurezas industriales. Puede causar olor a ajo en el aliento y reacciones cutáneas locales.
        `
    },
    {
        title: "¿Para qué sirve el DMSO? Usos, dosis y seguridad (2025)",
        slug: "para-que-sirve-el-dmso-usos-dosis-y-seguridad-2025",
        image: "https://dmso.com.mx/wp-content/uploads/2025/08/citamedica.webp",
        excerpt: "Explora la realidad clínica del DMSO, sus aplicaciones comunes en dolor y cicatrización, y las buenas prácticas para su uso.",
        content: `
## Realidad Clínica
La única indicación aprobada por autoridades regulatorias en humanos es el DMSO al 50% para la cistitis intersticial, aplicado por profesionales.

## Aplicaciones Comunes
- **Dolor muscular y articular**: Propiedades antiinflamatorias que pueden ayudar en dolores crónicos y osteoartritis.
- **Extravasación por quimioterapia**: Uso hospitalario para prevenir daño cutáneo.
- **Cicatrización**: Existe interés clínico en su apoyo para el postoperatorio.

## Buenas Prácticas
Se recomienda realizar pruebas de parche en zonas pequeñas y asegurar una limpieza escrupulosa de la piel antes de la aplicación para evitar el transporte de contaminantes.
        `
    },
    {
        title: "DMSO uso humano: beneficios, aplicaciones y seguridad",
        slug: "dmso-uso-humano-beneficios-aplicaciones-y-seguridad",
        image: "https://dmso.com.mx/wp-content/uploads/2025/09/dmso-laboratorio.webp",
        excerpt: "El DMSO despierta interés por sus propiedades analgésicas. Conoce las diferencias entre grados y su experiencia de uso en México.",
        content: `
## Beneficios en la Salud Humana
El DMSO despierta interés por sus propiedades analgésicas y antioxidantes. Se utiliza para el alivio del dolor neuropático y el apoyo en procesos de cicatrización regenerativa.

## Diferencias de Grados
- **Industrial**: No apto para personas.
- **Veterinario**: Puede contener impurezas no seguras para humanos.
- **Alimenticio/Farmacéutico**: El estándar de pureza necesario para uso humano responsable.

## Experiencia en México
Muchos profesionales en México lo recomiendan como apoyo postquirúrgico y para el manejo de inflamaciones crónicas, siempre priorizando la transparencia en la trazabilidad del producto.
        `
    },
    {
        title: "DMSO gel: qué es, para qué sirve y cómo se usa",
        slug: "dmso-gel-que-es-para-que-sirve-y-como-se-usa",
        image: "https://dmso.com.mx/wp-content/uploads/2025/09/dmsogel1.webp",
        excerpt: "El formato en gel facilita la aplicación tópica. Aprende sobre sus ventajas, aplicaciones principales y cómo usarlo correctamente.",
        content: `
## Ventajas del Formato Gel
El DMSO gel es una de las presentaciones más prácticas para facilitar la aplicación tópica local, siendo más cómodo y seguro de manipular que la versión líquida.

## Aplicaciones Principales
- **Veterinaria**: Tratamiento de inflamaciones en animales de alto rendimiento como caballos.
- **Uso Médico**: Versiones de grado médico son utilizadas tras intervenciones quirúrgicas para reducir la rigidez y favorecer la recuperación de tejidos.

## Aplicación Correcta
Debe aplicarse una capa fina y uniforme sobre la piel limpia. Se debe evitar el uso en heridas abiertas y estar atento a posibles efectos secundarios como enrojecimiento o ardor.
        `
    }
];
