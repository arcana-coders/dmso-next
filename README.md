# DMSO México 2.0

## Pertenece a

- Proyecto padre: [DMSO index](../asistente/projects/dmso/index.md)
- Documento temático principal: [index.md](../asistente/projects/dmso/index.md)
- Sistema general: [project-documentation-system.md](../asistente/docs/project-documentation-system.md)

## Regla de pertenencia

```text
archivo o componente -> dmso-next -> projects/dmso/index.md -> asistente
```

## Papel de este repo

Superficie operativa de la tienda `dmso.com.mx`: frontend Next.js, backend, checkout PayPal, correos, catálogo y despliegue en Vercel.

Reglas:

- `.env`, `.env.local`, logs locales y credenciales no van a Git.
- Si aparece un artefacto recurrente importante, debe quedar documentado también en `projects/dmso/index.md`.

Tienda oficial de DMSO México construida con el [Blueprint Maestro (v1.5) de E-commerce Premium](file:///C:/Asistente/ECOM_BLUEPRINT.md).

## Historial del Proyecto

- **Creación Original:** 27 de diciembre de 2025.
- **Alineación con Blueprint:** Abril 2026.
  - Se reestructuró la tienda para usar el "Muñeco" (Next.js 16 + Neon + Drizzle + Zustand).
  - Se implementó el flujo transaccional con PayPal y Resend.
  - Se actualizaron las tipografías a `Plus Jakarta Sans` y `Playfair Display`.
  - Se implementó la regla "No-Line" y animaciones GSAP.

## Arquitectura

Este proyecto sigue la arquitectura de **Núcleo Rígido + Diseño Flexible**:

- **Framework:** Next.js 16 (App Router)
- **Base de Datos:** Neon (Postgres Serverless) + Drizzle ORM
- **Pagos:** PayPal Integrado (`@paypal/react-paypal-js`)
- **Estado Local:** Zustand (Carrito)
- **UI & Animaciones:** Tailwind CSS 4 + GSAP
- **Transaccional:** Resend

## Setup Local

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Configurar `.env` (ver `.env.example`).
4. Correr servidor de desarrollo: `npm run dev`

---
*Documento mantenido de acuerdo al ECOM_BLUEPRINT de Arturo Carrillo.*
