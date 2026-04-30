"use client";
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  // Remplace par ton vrai numéro WhatsApp (avec le code pays, sans le +, sans espace)
  const phoneNumber = "14185550198"; 
  const defaultMessage = "Bonjour Éconochic ! J'aimerais avoir des conseils sur vos robes.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a 
      href={whatsappLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700"
    >
      {/* Petit texte qui apparaît au survol */}
      <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900 text-white text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 shadow-xl">
        Parler à une styliste
      </span>
      
      {/* Le bouton en lui-même */}
      <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300">
        <MessageCircle size={24} strokeWidth={1.5} />
      </div>
    </a>
  );
};

export default WhatsAppButton;