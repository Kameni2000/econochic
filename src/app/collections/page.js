"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Toutes');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedSize, setSelectedSize] = useState('');

  // Les options de filtres
  const categories = ['Toutes', 'Mariage', 'Bal','Gala', 'Demoiselle'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
        setFilteredProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Logique de filtrage en temps réel
  useEffect(() => {
    let result = products;

    // 1. Filtre par recherche (nom ou description)
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 2. Filtre par catégorie
    if (category !== 'Toutes') {
      result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }

    // 3. Filtre par prix
    result = result.filter(p => p.price <= maxPrice);

    // 4. Filtre par taille (si ton Supabase a une colonne "sizes", sinon on l'ignore pour l'instant)
    // if (selectedSize) {
    //   result = result.filter(p => p.sizes?.includes(selectedSize));
    // }

    setFilteredProducts(result);
  }, [searchTerm, category, maxPrice, selectedSize, products]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      
      {/* En-tête de la page */}
      <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
        <FadeIn>
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4 block">Notre Catalogue</span>
          <h1 className="text-4xl md:text-5xl font-serif">Toutes les Collections</h1>
        </FadeIn>
      </div>

      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-12">
        
        {/* COLONNE GAUCHE : FILTRES (Sidebar) */}
        <div className="w-full lg:w-1/4 space-y-10">
          
          {/* Titre Filtres */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <SlidersHorizontal size={18} className="text-[#D4AF37]" />
            <h2 className="text-[12px] uppercase tracking-[0.2em] font-bold">Filtres</h2>
          </div>

          {/* Recherche */}
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 block">Recherche</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: Robe sirène..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/10 text-white px-4 py-3 pl-10 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
              />
              <Search size={16} className="absolute left-3 top-3.5 text-zinc-500" />
            </div>
          </div>

          {/* Catégories */}
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 block">Catégorie</label>
            <div className="space-y-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center justify-between w-full text-sm py-2 transition-colors ${category === cat ? 'text-[#D4AF37]' : 'text-zinc-400 hover:text-white'}`}
                >
                  <span>{cat}</span>
                  {category === cat && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Budget (Prix) */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Budget Max</label>
              <span className="text-[#D4AF37] text-sm font-serif">{maxPrice} $</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="3000" 
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D4AF37] h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-600 mt-2">
              <span>100 $</span>
              <span>3000 $</span>
            </div>
          </div>

          {/* Tailles */}
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 block">Taille</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size === selectedSize ? '' : size)} // Permet de désélectionner
                  className={`w-10 h-10 border flex items-center justify-center text-[10px] transition-all ${
                    selectedSize === size ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 text-zinc-400 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton Réinitialiser */}
          <button 
            onClick={() => {
              setSearchTerm('');
              setCategory('Toutes');
              setMaxPrice(2000);
              setSelectedSize('');
            }}
            className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-white transition-all"
          >
            Réinitialiser les filtres
          </button>

        </div>

        {/* COLONNE DROITE : GRILLE DE RÉSULTATS */}
        <div className="w-full lg:w-3/4">
          
          <div className="mb-6 flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-sm font-serif text-zinc-400">{filteredProducts.length} pièce(s) trouvée(s)</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-[10px] uppercase tracking-widest text-[#D4AF37]">Chargement des pièces...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-32 bg-zinc-900/20 border border-white/5">
              <p className="text-zinc-400 font-light mb-4">Aucune robe ne correspond à vos critères actuels.</p>
              <button onClick={() => setCategory('Toutes')} className="text-[#D4AF37] text-[10px] uppercase tracking-widest border-b border-[#D4AF37] pb-1">Voir toute la collection</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const imageUrl = Array.isArray(product.image_urls) ? product.image_urls[0] : (typeof product.image_urls === 'string' && product.image_urls.startsWith('[') ? JSON.parse(product.image_urls)[0] : product.image_urls);
                const finalImageUrl = imageUrl || 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1000&auto=format&fit=crop';

                return (
                  <FadeIn key={product.id} direction="up" delay={index * 0.05}>
                    <Link href={`/product/${product.id}`} className="group cursor-pointer block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4 border border-white/5">
                        <img 
                          src={finalImageUrl} 
                          alt={product.name} 
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1000&auto=format&fit=crop'; }}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] border border-[#D4AF37] px-6 py-3 bg-black/50 backdrop-blur-sm">Voir les détails</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-serif text-lg tracking-wide group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                          <p className="text-zinc-500 text-[9px] uppercase tracking-widest mt-1">{product.category}</p>
                        </div>
                        <p className="text-white font-serif">{product.price} $</p>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}