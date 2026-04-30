# DMSO México 2.0

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
