"use client"; // Indispensable pour les composants interactifs dans Next.js

import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* 1. Header Discret */}
      

      {/* 2. Background Cinématique */}
      <div className="absolute inset-0">
        {/* On utilise une image temporaire de haute qualité pour le test */}
        <img 
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000" 
          alt="Robe élégante"
          className="h-full w-full object-cover opacity-70"
        />
        {/* Overlay pour garantir la lisibilité du texte en bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* 3. Contenu (Placé dans le quart inférieur pour ne pas masquer les visages) */}
      <div className="absolute bottom-0 left-0 w-full px-8 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight tracking-tight">
            L'élégance à <br /> votre portée.
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-10 font-light tracking-wide max-w-md uppercase">
            Découvrez nos collections exclusives de robes de bal et de mariée à Québec.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <button className="px-10 py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-all duration-300">
              Découvrir la Collection
            </button>
            <button className="px-10 py-4 border border-white/30 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-300">
              Réserver un essayage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;