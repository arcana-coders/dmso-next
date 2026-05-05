import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import ProductsSection from '@/components/home/ProductsSection';
import ProcessSection from '@/components/home/ProcessSection';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMSO México - Tienda Oficial | Pureza Farmacéutica',
  description: 'Compra DMSO (Dimetilsulfóxido) de alta pureza 99.9% en México. Grado farmacéutico, libre de BPA. Envíos gratis a todo el país.',
  openGraph: {
    title: 'DMSO México - Pureza que Transforma',
    description: 'El estándar de oro en DMSO para uso humano y laboratorio. Envíos seguros y rápidos.',
    images: ['/images/ui/hero-dmso.png'],
  }
};

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ProductsSection />
      <ProcessSection />
    </main>
  );
}
