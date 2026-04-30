"use client";
import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
  const { cart, openDrawer } = useCartStore();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Définition explicite des liens pour éviter les erreurs d'URL
  const menuItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-black/70 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between relative">
        
        {/* NAVIGATION GAUCHE */}
        <nav className="hidden md:flex space-x-6 z-10">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-[#D4AF37] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* LOGO AU CENTRE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <Link href="/" className="flex flex-col items-center justify-center group relative">
            {/* Halo lumineux subtil qui apparaît au survol */}
            <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>

            {/* Titre Principal Onyx & Soie */}
            <span className="text-2xl md:text-4xl font-serif tracking-[0.2em] text-white uppercase transition-all duration-500 group-hover:tracking-[0.25em]">
              Onyx <span className="text-[#D4AF37] font-light italic mx-1">&</span> Soie
            </span>

            {/* Signature encadrée avec lignes de fondu */}
            <div className="flex items-center gap-3 mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
              <span className="text-[9px] md:text-[11px] tracking-[0.4em] text-[#D4AF37] uppercase font-light">
                By Kameni
              </span>
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
            </div>
          </Link>
        </div>

        {/* PANIER À DROITE */}
        <div className="flex items-center space-x-6 z-10">
          <button 
            onClick={openDrawer}
            className="relative text-white hover:text-[#D4AF37] transition-colors duration-300 p-2 cursor-pointer"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
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