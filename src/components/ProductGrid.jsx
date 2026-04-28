"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link'; // Déjà présent dans ton code, super !

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (!error) setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = filter === 'Tous' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section className="bg-black py-20 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Barre de Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['Tous', 'Mariage', 'Bal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em] font-semibold transition-all ${
                filter === cat
                  ? 'border-white bg-white text-black'
                  : 'border-white/20 text-gray-400 hover:border-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => {
            // Logique pour l'image
            const imageUrl = Array.isArray(product.image_urls)
              ? product.image_urls[0]
              : product.image_urls;

            return (
              /* --- MODIFICATION ICI : On enrobe avec Link --- */
              <Link 
                href={`/product/${product.id}`} 
                key={product.id} 
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
                  <img 
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between items-start pt-2">
                  <div>
                    <h3 className="text-white text-[11px] font-light uppercase tracking-wider">{product.name}</h3>
                    <p className="text-zinc-500 text-[9px] uppercase mt-1 tracking-tight">{product.category}</p>
                  </div>
                  <p className="text-white text-sm font-serif">{product.price} $</p>
                </div>
              </Link>
              /* --- FIN DE LA MODIFICATION --- */
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;