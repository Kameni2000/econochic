"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Star, Quote, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NOUVEAU : État pour gérer le filtre actif
  const [activeCategory, setActiveCategory] = useState('Toutes'); 

  useEffect(() => {
    const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').limit(4);      if (!error) setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // NOUVEAU : Logique de filtrage des produits
  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'Toutes') return true;
    return product.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
            alt="Éconochic Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <FadeIn delay={0.2}>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Nouvelle Collection {new Date().getFullYear()}</span>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">L'élégance à votre portée.</h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto font-light">Découvrez nos collections exclusives de robes de bal et de mariée à Québec. Des coupes parfaites pour vos moments inoubliables.</p>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#collections" className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-5 hover:bg-white transition-all text-center">
                Découvrir la collection
              </a>
              <Link href="/contact" className="border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-5 hover:bg-[#D4AF37]/10 transition-all text-center">
                Nous contacter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. SECTION EXPÉRIENCE */}
      <section className="py-32 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn direction="right">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4 block">Notre Promesse</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">L'expérience d'un essayage privé.</h2>
                <p className="text-zinc-400 font-light leading-relaxed mb-8">
                  Chez Éconochic, nous croyons que chaque femme mérite de se sentir exceptionnelle. Notre boutique de Québec vous offre un cadre intimiste où nos conseillères vous guident pour trouver la robe qui sublimera votre silhouette.
                </p>
                <Link href="/a-propos" className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37] hover:border-white pb-1">
                  En savoir plus sur nous <ArrowRight size={14} className="ml-2" />
                </Link>
              </FadeIn>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FadeIn direction="up" delay={0.2}>
                <img src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=1000&auto=format&fit=crop" alt="Essayage Robe" className="w-full h-64 object-cover" />
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <img src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1000&auto=format&fit=crop" alt="Détails Perles" className="w-full h-64 object-cover mt-8" />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION COLLECTIONS */}
      <section id="collections" className="py-32 bg-black border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-8">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Nos Pièces Maîtresses</h2>
              <p className="text-zinc-500 font-light max-w-xl mx-auto">Filtrer par catégorie pour trouver la tenue idéale.</p>
              
              {/* NOUVEAU : Boutons de filtres dynamiques */}
              <div className="flex justify-center gap-8 mt-10">
                {['Toutes', 'Mariage', 'Bal'].map((category) => (
                  <button 
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                      activeCategory === category 
                        ? 'text-[#D4AF37] border-b border-[#D4AF37] pb-1' 
                        : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {loading ? (
            <div className="flex justify-center py-20 text-[10px] uppercase tracking-widest text-[#D4AF37]">Chargement des collections...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* NOUVEAU : Utilisation de filteredProducts au lieu de products */}
              {filteredProducts.map((product, index) => {
                const imageUrl = Array.isArray(product.image_urls) ? product.image_urls[0] : (typeof product.image_urls === 'string' && product.image_urls.startsWith('[') ? JSON.parse(product.image_urls)[0] : product.image_urls);
                
                // Image par défaut chic si l'URL est vide
                const finalImageUrl = imageUrl || 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1000&auto=format&fit=crop';

                return (
                  <FadeIn key={product.id} direction="up" delay={index * 0.1}>
                    <Link href={`/product/${product.id}`} className="group cursor-pointer block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-6 border border-white/5">
                        <img 
                          src={finalImageUrl} 
                          alt={product.name} 
                          // NOUVEAU : Remplacement par une belle image si le lien est cassé
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1000&auto=format&fit=crop';
                          }}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] border border-[#D4AF37] px-6 py-3 bg-black/50 backdrop-blur-sm">Voir le produit</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-serif text-lg tracking-wide group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                          <p className="text-zinc-500 text-[9px] uppercase tracking-widest mt-2">{product.category}</p>
                        </div>
                        <p className="text-white font-serif">{product.price} $</p>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
          
          {/* Message si aucun produit ne correspond au filtre */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20 text-zinc-500 text-sm font-light">
              Aucune pièce trouvée dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </section>

      {/* 4. SECTION TÉMOIGNAGES */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-8">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-4 block">Mots Doux</span>
              <h2 className="text-3xl md:text-4xl font-serif">Elles ont dit oui.</h2>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-black p-10 border border-[#D4AF37]/10 relative hover:border-[#D4AF37]/30 transition-colors duration-500">
                <Quote className="absolute top-8 right-8 text-[#D4AF37]/10" size={48} />
                <div className="flex text-[#D4AF37] mb-8">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="text-zinc-300 font-light text-sm leading-relaxed mb-8 relative z-10">
                  "Une expérience incroyable. La conseillère a tout de suite compris ce que je cherchais. J'ai trouvé LA robe pour mon bal de finissants du premier coup. Je recommande à 100%."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">— Léa S.</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="bg-black p-10 border border-[#D4AF37]/10 relative hover:border-[#D4AF37]/30 transition-colors duration-500">
                <Quote className="absolute top-8 right-8 text-[#D4AF37]/10" size={48} />
                <div className="flex text-[#D4AF37] mb-8">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="text-zinc-300 font-light text-sm leading-relaxed mb-8 relative z-10">
                  "J'étais très stressée pour trouver ma robe de mariée avec mon petit budget. Éconochic m'a prouvé qu'on pouvait avoir de la qualité sans se ruiner. Merci pour votre patience !"
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">— Sophie T.</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <div className="bg-black p-10 border border-[#D4AF37]/10 relative hover:border-[#D4AF37]/30 transition-colors duration-500">
                <Quote className="absolute top-8 right-8 text-[#D4AF37]/10" size={48} />
                <div className="flex text-[#D4AF37] mb-8">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} className="text-zinc-800" fill="currentColor" />
                </div>
                <p className="text-zinc-300 font-light text-sm leading-relaxed mb-8 relative z-10">
                  "Superbe sélection de robes. La boutique de Québec est très jolie et intime. J'ai adoré pouvoir faire des essayages privés avec mes demoiselles d'honneur."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">— Amélie M.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. SECTION NEWSLETTER */}
      <section className="py-32 bg-black text-center border-t border-[#D4AF37]/10">
        <FadeIn direction="up">
          <div className="max-w-2xl mx-auto px-8">
            <Mail className="mx-auto mb-8 text-[#D4AF37]/50" size={40} strokeWidth={1} />
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Rejoignez le cercle privé.</h2>
            <p className="text-zinc-400 font-light mb-12 text-sm leading-relaxed">
              Inscrivez-vous pour recevoir nos nouvelles collections en avant-première et des invitations exclusives à nos ventes privées.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre adresse e-mail" 
                className="bg-zinc-900 border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors w-full sm:w-2/3"
                required
              />
              <button type="submit" className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-white transition-all w-full sm:w-auto">
                S'inscrire
              </button>
            </form>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}