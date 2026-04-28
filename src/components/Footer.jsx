"use client";
import React from 'react';
import { Camera, Video, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Section 1 : Boutiques */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6">Nos Boutiques</h4>
            <div className="space-y-4 text-sm font-light">
              <p>
                <span className="block font-medium">Boutique Sainte-Foy</span>
                Place de la Cité, Québec
              </p>
              <p>
                <span className="block font-medium">Boutique Wilfrid-Hamel</span>
                Boul. Wilfrid-Hamel, Québec
              </p>
            </div>
          </div>

          {/* Section 2 : Logo & Slogan */}
          <div className="text-center">
            <h3 className="text-2xl font-serif tracking-[0.4em] mb-4">ÉCONOCHIC</h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest italic">
              L'élégance à votre portée.
            </p>
          </div>

          {/* Section 3 : Contact & Réseaux */}
          <div className="text-right">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6">Contact</h4>
            <div className="flex justify-end space-x-6 mb-6">
              <a href="#" className="hover:text-zinc-400 transition"><Camera size={18} /></a>
              <a href="#" className="hover:text-zinc-400 transition"><Video size={18} /></a>
              <a href="#" className="hover:text-zinc-400 transition text-[10px] font-bold">TikTok</a>
            </div>
            <p className="text-sm font-light">info@econochic.ca</p>
          </div>
        </div>

        {/* Ligne de copyright */}
        <div className="border-t border-white/5 pt-8 text-center text-[9px] text-zinc-600 uppercase tracking-widest">
          © 2024/2025 Éconochic Québec — Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;