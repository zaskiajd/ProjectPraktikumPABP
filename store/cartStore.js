// store/cartStore.js
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const existing = get().items.find(i => i.id === product.id);
    if (existing) {
      set(state => ({
        items: state.items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }));
    } else {
      set(state => ({ items: [...state.items, { ...product, qty: 1 }] }));
    }
  },

  removeItem: (id) =>
    set(state => ({ items: state.items.filter(i => i.id !== id) })),

  updateQty: (id, qty) => {
    if (qty <= 0) {
      get().removeItem(id);
      return;
    }
    set(state => ({
      items: state.items.map(i => i.id === id ? { ...i, qty } : i)
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2),
}));

export default useCartStore;