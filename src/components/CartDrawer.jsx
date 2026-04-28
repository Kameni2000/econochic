"use client";
import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { X, Trash2 } from 'lucide-react';
import Link from 'next/link';

const CartDrawer = () => {
  // On récupère tout ce dont on a besoin depuis notre Store global
  const { cart, isDrawerOpen, closeDrawer, removeFromCart } = useCartStore();

  // Calcul du sous-total automatique
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      {/* 1. L'Overlay (Le fond noir semi-transparent qui masque le site) */}
      <div 
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 cursor-pointer ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* 2. Le Tiroir Latéral */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-zinc-950 border-l border-white/10 z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* En-tête du tiroir */}
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white">Votre Panier</h2>
          <button 
            onClick={closeDrawer} 
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        {/* Corps du tiroir (Liste des produits) */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em]">Votre panier est vide.</p>
            </div>
          ) : (
            cart.map((item, index) => {
              // Gestion sécurisée de l'image comme sur la page produit
              const imageUrl = Array.isArray(item.image_urls) 
                ? item.image_urls[0] 
                : (typeof item.image_urls === 'string' && item.image_urls.startsWith('[') 
                    ? JSON.parse(item.image_urls)[0] 
                    : item.image_urls);

              return (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-6">
                  {/* Image du produit */}
                  <div className="w-24 h-32 bg-zinc-900 flex-shrink-0">
                    <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Infos du produit */}
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-white text-sm font-serif tracking-wide">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-zinc-600 hover:text-white transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Taille : {item.size}</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Qté : {item.quantity}</p>
                    </div>
                    <p className="text-white text-sm font-serif">{item.price} $</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pied du tiroir (Total et Bouton d'achat) */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-zinc-950">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Sous-total</span>
              <span className="text-xl font-serif text-white">{subtotal} $</span>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-6 text-center">
              Taxes et frais de port calculés à l'étape suivante.
            </p>
            <Link 
              href="/checkout"
              onClick={closeDrawer} // On ferme le tiroir quand on change de page
              className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 active:scale-[0.98] transition-all duration-300 text-center block"
            >
              Passer à la caisse
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;