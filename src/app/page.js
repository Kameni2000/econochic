"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Star, Quote, Mail } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
            alt="Éconochic Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-300 mb-6 block">Nouvelle Collection {new Date().getFullYear()}</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">L'élégance à votre portée.</h1>
          <p className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto font-light">Découvrez nos collections exclusives de robes de bal et de mariée à Québec. Des coupes parfaites pour vos moments inoubliables.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#collections" className="bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-5 hover:bg-zinc-200 transition-all text-center">
              Découvrir la collection
            </a>
            <Link href="/contact" className="border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-5 hover:bg-white hover:text-black transition-all text-center">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION EXPÉRIENCE */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 block">Notre Promesse</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">L'expérience d'un essayage privé.</h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Chez Éconochic, nous croyons que chaque femme mérite de se sentir exceptionnelle. Notre boutique de Québec vous offre un cadre intimiste où nos conseillères vous guident pour trouver la robe qui sublimera votre silhouette.
              </p>
              <Link href="/a-propos" className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] hover:text-zinc-400 transition-colors border-b border-white pb-1">
                En savoir plus sur nous <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1000&auto=format&fit=crop" alt="Essayage Robe" className="w-full h-64 object-cover" />
              <img src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1000&auto=format&fit=crop" alt="Détails Perles" className="w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION COLLECTIONS */}
      <section id="collections" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Nos Pièces Maîtresses</h2>
            <p className="text-zinc-500 font-light max-w-xl mx-auto">Filtrer par catégorie pour trouver la tenue idéale.</p>
            
            <div className="flex justify-center gap-6 mt-8">
              <button className="text-[10px] uppercase tracking-[0.2em] border-b border-white pb-1">Toutes</button>
              <button className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Mariage</button>
              <button className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Bal</button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-[10px] uppercase tracking-widest text-zinc-500">Chargement des collections...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const imageUrl = Array.isArray(product.image_urls) ? product.image_urls[0] : (typeof product.image_urls === 'string' && product.image_urls.startsWith('[') ? JSON.parse(product.image_urls)[0] : product.image_urls);
                return (
                  <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
                      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-[10px] uppercase tracking-[0.2em] border border-white px-6 py-3">Voir le produit</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-serif text-lg tracking-wide">{product.name}</h3>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">{product.category}</p>
                      </div>
                      <p className="text-white font-serif">{product.price} $</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. SECTION TÉMOIGNAGES */}
      <section className="py-24 bg-zinc-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4 block">Mots Doux</span>
            <h2 className="text-3xl md:text-4xl font-serif">Elles ont dit oui.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 border border-white/5 relative">
              <Quote className="absolute top-8 right-8 text-white/10" size={40} />
              <div className="flex text-white mb-6">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-zinc-300 font-light text-sm leading-relaxed mb-6">
                "Une expérience incroyable. La conseillère a tout de suite compris ce que je cherchais. J'ai trouvé LA robe pour mon bal de finissants du premier coup. Je recommande à 100%."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">— Léa S.</p>
            </div>

            <div className="bg-black p-8 border border-white/5 relative">
              <Quote className="absolute top-8 right-8 text-white/10" size={40} />
              <div className="flex text-white mb-6">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-zinc-300 font-light text-sm leading-relaxed mb-6">
                "J'étais très stressée pour trouver ma robe de mariée avec mon petit budget. Éconochic m'a prouvé qu'on pouvait avoir de la qualité sans se ruiner. Merci pour votre patience !"
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">— Sophie T.</p>
            </div>

            <div className="bg-black p-8 border border-white/5 relative">
              <Quote className="absolute top-8 right-8 text-white/10" size={40} />
              <div className="flex text-white mb-6">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} className="text-zinc-700" fill="currentColor" />
              </div>
              <p className="text-zinc-300 font-light text-sm leading-relaxed mb-6">
                "Superbe sélection de robes. La boutique de Québec est très jolie et intime. J'ai adoré pouvoir faire des essayages privés avec mes demoiselles d'honneur."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">— Amélie M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION NEWSLETTER */}
      <section className="py-24 bg-black text-center">
        <div className="max-w-2xl mx-auto px-8">
          <Mail className="mx-auto mb-6 text-white/50" size={32} strokeWidth={1} />
          <h2 className="text-2xl md:text-3xl font-serif mb-4">Rejoignez le cercle.</h2>
          <p className="text-zinc-400 font-light mb-10">
            Inscrivez-vous pour recevoir nos nouvelles collections en avant-première et des invitations à nos ventes privées.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Votre adresse e-mail" 
              className="bg-zinc-900 border border-white/20 text-white px-6 py-4 focus:outline-none focus:border-white transition-colors w-full sm:w-2/3"
              required
            />
            <button type="submit" className="bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-zinc-200 transition-all w-full sm:w-auto">
              S'inscrire
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}