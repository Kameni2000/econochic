"use client";
import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Scissors, Gem } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      
      {/* 1. HERO VIDEO (Cinématique Silencieuse) */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden mb-32 border-b border-[#D4AF37]/20">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          {/* Vidéo libre de droits d'une mariée/tissu fluide */}
          <source src="https://cdn.pixabay.com/video/2020/05/26/40251-424888204_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto mt-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Notre Maison</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">L'art de sublimer chaque femme.</h1>
        </div>
      </section>

      {/* 2. LE MOT DU FONDATEUR (Le Visage de la Marque) */}
      <section className="max-w-7xl mx-auto px-8 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border border-[#D4AF37]/20 translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" 
              alt="Le Fondateur" 
              className="w-full h-[500px] object-cover grayscale relative z-10"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block">L'Origine</span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">"Le luxe n'est pas un prix, c'est une expérience."</h2>
            <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-sm">
              <p>
                L'idée d'Éconochic est née d'un constat simple au cœur de Québec : la recherche de la robe parfaite était trop souvent synonyme de compromis. Sacrifier la qualité pour le budget, ou le rêve pour la raison.
              </p>
              <p>
                J'ai voulu briser ce plafond de verre. Notre mission n'est pas seulement de vous habiller avec des soieries et des dentelles choisies avec rigueur, mais de révéler votre confiance pour les moments les plus précieux de votre vie.
              </p>
            </div>
            <div className="pt-8">
              <p className="font-serif text-3xl text-[#D4AF37] italic">Yvan Kameni</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-2">Fondateur & Directeur Artistique</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LES COULISSES & LE SAVOIR-FAIRE (Galerie Asymétrique) */}
      <section className="bg-zinc-950 py-32 border-y border-[#D4AF37]/10 mb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4 block">Savoir-Faire</span>
            <h2 className="text-3xl md:text-4xl font-serif">Dans l'intimité de la création.</h2>
            <p className="text-zinc-400 font-light mt-6 text-sm leading-relaxed">
              Nous parcourons les ateliers pour dénicher des coupes impeccables et des finitions haute couture, que nous ajustons ensuite à votre morphologie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="group relative overflow-hidden h-96">
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop" alt="Croquis" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#D4AF37] font-serif italic text-lg">01.</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white">Le Dessin</p>
              </div>
            </div>
            <div className="group relative overflow-hidden h-[450px]">
              <img 
                src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop" 
                alt="La Soierie" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" 
              />
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-sm p-4 border border-[#D4AF37]/20">
                <p className="text-[#D4AF37] font-serif italic text-lg">02.</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white">La Soierie</p>
              </div>
            </div>
            <div className="group relative overflow-hidden h-96 md:-mt-12">
              <img src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=800&auto=format&fit=crop" alt="Détails" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[#D4AF37] font-serif italic text-lg">03.</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white">L'Ajustement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LES VALEURS DE LA MARQUE */}
      <section className="py-20 mb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <Gem size={24} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg mb-3 text-white">Qualité Absolue</h3>
              <p className="text-zinc-500 font-light text-xs leading-relaxed">Satin duchesse, organza et dentelle fine pour un tombé irréprochable.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <Heart size={24} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg mb-3 text-white">Service Intimiste</h3>
              <p className="text-zinc-500 font-light text-xs leading-relaxed">Des essayages privés dans un écrin de douceur avec une conseillère dédiée.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <Scissors size={24} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg mb-3 text-white">Savoir-Faire</h3>
              <p className="text-zinc-500 font-light text-xs leading-relaxed">Coupes pensées pour sublimer toutes les morphologies et retouches sur-mesure.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <Sparkles size={24} strokeWidth={1} />
              </div>
              <h3 className="font-serif text-lg mb-3 text-white">Luxe Accessible</h3>
              <p className="text-zinc-500 font-light text-xs leading-relaxed">L'élégance des grandes maisons avec une politique de prix transparente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ILS PARLENT DE NOUS (La Presse) */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 mb-12 block">Reconnus par</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <h4 className="text-2xl font-serif tracking-widest text-white">VOGUE</h4>
            <h4 className="text-2xl font-sans font-bold tracking-tight text-white">ELLE</h4>
            <h4 className="text-xl font-serif italic text-white">Mariage Québec</h4>
            <h4 className="text-2xl font-mono tracking-widest text-white">L'OFFICIEL</h4>
          </div>
        </div>
      </section>

      {/* APPEL À L'ACTION */}
      <section className="border-t border-[#D4AF37]/20 bg-black py-32 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-3xl font-serif mb-6">Faites partie de l'histoire.</h2>
          <p className="text-zinc-400 font-light mb-10">
            Prenez rendez-vous dans notre showroom de Québec pour découvrir nos collections en toute intimité.
          </p>
          <Link href="/contact" className="inline-block bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-5 hover:bg-white transition-colors">
            Réserver un essayage
          </Link>
        </div>
      </section>

    </div>
  );
}