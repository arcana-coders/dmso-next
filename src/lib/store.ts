import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  slug: string;
  titulo: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            isOpen: true,
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad } : i
            ),
          };
        }
        return { isOpen: true, items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, cantidad) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, cantidad: Math.max(1, cantidad) } : i
        ),
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0),
    }),
    {
      name: 'dmso-cart-storage',
    }
  )
);
