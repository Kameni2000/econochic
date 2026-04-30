"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import BookingModal from '@/components/BookingModal';
import { Heart, ChevronDown, ChevronUp, Ruler, Sparkles } from 'lucide-react';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openTab, setOpenTab] = useState(null);

  // Zustand Stores
  const { addToCart } = useCartStore();
  const { toggleWishlist, wishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      // Résolution de params (nécessaire pour Next.js 15)
      const resolvedParams = await params; 
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
        
      if (!error && data) {
        setProduct(data);
      }
    };
    fetchProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-[#D4AF37] uppercase text-[10px] tracking-widest">
        Chargement de la pièce...
      </div>
    );
  }

  // Vérification si le produit est déjà dans les favoris
  const isFavorite = wishlist.some((item) => item.id === product.id);
  
  // Gestion propre de l'URL de l'image
  const imageUrl = Array.isArray(product.image_urls) 
    ? product.image_urls[0] 
    : (typeof product.image_urls === 'string' && product.image_urls.startsWith('[') 
        ? JSON.parse(product.image_urls)[0] 
        : product.image_urls);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Colonne Gauche : Image */}
        <div className="relative aspect-[3/4] bg-zinc-900 border border-white/5 shadow-2xl">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Colonne Droite : Informations */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">
            {product.category || 'Collection Exclusive'}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">{product.name}</h1>
          <p className="text-2xl font-serif mb-10 text-zinc-300">{product.price} $</p>
          <p className="text-zinc-400 font-light leading-relaxed mb-12">
            {product.description || "Cette pièce unique a été conçue pour sublimer votre silhouette. Ses finitions délicates et sa coupe élégante en font le choix parfait pour vos événements les plus prestigieux."}
          </p>

          {/* Sélection des Tailles */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Sélectionner la taille</span>
            </div>
            <div className="flex gap-4 flex-wrap">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 border flex items-center justify-center text-[10px] transition-all duration-300 ${
                    selectedSize === size 
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5' 
                      : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Boutons d'action (Achat & Coup de coeur) */}
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => {
                if(!selectedSize) {
                  alert("Veuillez sélectionner une taille avant d'ajouter au panier.");
                  return;
                }
                addToCart({...product, size: selectedSize, quantity: 1});
              }}
              className="flex-1 bg-white text-black py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-200 active:scale-[0.98] transition-all"
            >
              Ajouter au panier
            </button>
            
            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-16 flex items-center justify-center border transition-colors ${
                isFavorite ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/20 hover:border-white'
              }`}
            >
              <Heart size={20} className={isFavorite ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white"} />
            </button>
          </div>

          {/* Bouton Essayage */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full border border-[#D4AF37]/50 text-[#D4AF37] py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#D4AF37]/10 transition-colors mb-16"
          >
            Réserver un essayage en boutique
          </button>

          {/* Accords d'Expertise (Détails, Tailles) */}
          <div className="border-t border-white/10">
            {/* Onglet Composition */}
            <div className="border-b border-white/10">
              <button 
                onClick={() => setOpenTab(openTab === 'composition' ? null : 'composition')} 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none hover:text-[#D4AF37] transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-4">
                  <Sparkles size={16} className="text-[#D4AF37]"/> Composition & Entretien
                </span>
                {openTab === 'composition' ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out text-sm text-zinc-400 font-light ${openTab === 'composition' ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                Satin duchesse premium et applications de dentelle fine. Nettoyage à sec uniquement. Livré avec une housse de protection protectrice. Éviter le repassage direct sur les perles.
              </div>
            </div>

            {/* Onglet Guide des tailles */}
            <div className="border-b border-white/10">
              <button 
                onClick={() => setOpenTab(openTab === 'tailles' ? null : 'tailles')} 
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none hover:text-[#D4AF37] transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] flex items-center gap-4">
                  <Ruler size={16} className="text-[#D4AF37]"/> Guide des tailles
                </span>
                {openTab === 'tailles' ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out text-sm text-zinc-400 font-light ${openTab === 'tailles' ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                Nos robes taillent normalement et sont conçues pour être facilement retouchées. Si vous êtes entre deux tailles, nous vous conseillons de sélectionner la taille au-dessus pour un ajustement sur-mesure parfait en boutique.
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal de Réservation */}
      {isModalOpen && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          product={product} 
        />
      )}
    </div>
  );
}