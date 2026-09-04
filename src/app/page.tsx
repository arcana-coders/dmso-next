import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import ProductsSection from '@/components/home/ProductsSection';
import ProcessSection from '@/components/home/ProcessSection';
import InstitutionalCallout from '@/components/home/InstitutionalCallout';
import { getEnvioInmediatoProducts } from '@/lib/products';
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

export default async function Home() {
  const productosEnStock = await getEnvioInmediatoProducts(3);
  const hasEnvioInmediato = productosEnStock.length > 0;

  return (
    <main>
      <Hero hasEnvioInmediato={hasEnvioInmediato} productosEnStock={productosEnStock as any} />
      <TrustBar hasEnvioInmediato={hasEnvioInmediato} />
      <ProductsSection />
      <ProcessSection />
      <InstitutionalCallout />
    </main>
  );
}
