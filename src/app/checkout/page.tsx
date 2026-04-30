import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Finalizar Compra | DMSO México',
  description: 'Procesa tu compra de productos DMSO de forma segura.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-3xl font-serif font-medium text-gray-900 mb-8">Finalizar Compra</h1>
        <CheckoutClient />
      </div>
    </div>
  );
}
