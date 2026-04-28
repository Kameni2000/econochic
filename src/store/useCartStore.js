import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [], 
  isDrawerOpen: false, 

  // Contrôle visuel du tiroir
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  // Logique métier du panier
  addToCart: (product, size) => set((state) => {
    // Vérifier si la cliente a déjà cette robe dans cette taille précise
    const existingItem = state.cart.find(
      (item) => item.id === product.id && item.size === size
    );

    if (existingItem) {
      // Si oui, on augmente la quantité (utile si elle veut acheter pour ses demoiselles d'honneur)
      return {
        cart: state.cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    
    // Sinon, on l'ajoute comme nouvel article
    return { cart: [...state.cart, { ...product, size, quantity: 1 }] };
  }),

  removeFromCart: (productId, size) => set((state) => ({
    cart: state.cart.filter((item) => !(item.id === productId && item.size === size)),
  })),
  // NOUVELLE FONCTION À AJOUTER :
  clearCart: () => set({ cart: [] }),
}));