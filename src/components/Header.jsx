"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
  const { cart, openDrawer } = useCartStore();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-black/70 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between relative">
        
        {/* NAVIGATION GAUCHE */}
        <nav className="hidden md:flex space-x-6 z-10">
          {['Accueil', 'Mariage', 'Bal', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Accueil' ? '/' : `/#${item.toLowerCase()}`} 
              className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* LOGO AU CENTRE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <Link href="/" className="text-xl font-serif tracking-[0.4em] text-white hover:opacity-80 transition-opacity">
            ÉCONOCHIC
          </Link>
        </div>

        {/* PANIER À DROITE */}
        <div className="flex items-center space-x-6 z-10">
          <button 
            onClick={openDrawer}
            className="relative text-white hover:text-zinc-300 transition-colors p-2 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;