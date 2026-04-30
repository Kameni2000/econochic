import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (product) => set((state) => {
        const exists = state.wishlist.find((item) => item.id === product.id);
        if (exists) {
          // Si le produit est déjà dans les favoris, on l'enlève
          return { wishlist: state.wishlist.filter((item) => item.id !== product.id) };
        }
        // Sinon, on l'ajoute
        return { wishlist: [...state.wishlist, product] };
      }),
    }),
    {
      name: 'econochic-wishlist', // Le nom de la sauvegarde dans le navigateur
    }
  )
);