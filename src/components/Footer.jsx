import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Colonne 1 : Marque */}
        <div className="flex flex-col">
          <Link href="/" className="text-xl font-serif tracking-[0.4em] mb-6">ÉCONOCHIC</Link>
          <p className="text-zinc-500 text-sm font-light leading-relaxed">
            L'élégance à votre portée. Découvrez nos collections exclusives de robes de mariée et de bal à Québec.
          </p>
        </div>

        {/* Colonne 2 : Liens Rapides */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-300 mb-2">Navigation</h4>
          <Link href="/#collections" className="text-zinc-500 hover:text-white text-sm transition-colors">Nos Collections</Link>
          <Link href="/a-propos" className="text-zinc-500 hover:text-white text-sm transition-colors">À Propos</Link>
          <Link href="/contact" className="text-zinc-500 hover:text-white text-sm transition-colors">Contact</Link>
        </div>

        {/* Colonne 3 : Service Client */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-300 mb-2">Service Client</h4>
          <Link href="/faq" className="text-zinc-500 hover:text-white text-sm transition-colors">FAQ</Link>
          <Link href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">Livraison & Retours</Link>
          <Link href="/cgv" className="text-zinc-500 hover:text-white text-sm transition-colors">Conditions de Vente</Link>
        </div>

        {/* Colonne 4 : Boutique */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-300 mb-2">Boutique</h4>
          <p className="text-zinc-500 text-sm font-light">1234 Rue de la Mode<br />Québec, QC G1V 2M2</p>
          <p className="text-zinc-500 text-sm font-light mt-2">Sur rendez-vous uniquement.</p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600">
          {/* Ligne de droits d'auteur stylisée */}
          <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col items-center justify-center text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">
              &copy; {new Date().getFullYear()} <span className="text-white font-serif tracking-[0.2em]">Onyx <span className="text-[#D4AF37] font-light italic">&</span> Soie</span>
            </p>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mt-2 opacity-80">
              By Kameni • Tous droits réservés
            </p>
          </div>        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
          <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;