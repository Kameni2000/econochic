"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, Ruler, Calendar } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';

// Import de notre nouveau système de panier global
import { useCartStore } from '@/store/useCartStore';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // États locaux pour l'interface
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  // Récupération des actions du store Zustand
  const { addToCart, openDrawer } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Erreur Supabase :", error.message);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // NOUVELLE FONCTION PROFESSIONNELLE D'AJOUT AU PANIER
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille avant d'ajouter au panier.");
      return;
    }
    
    setIsAdding(true);
    
    // 1. On enregistre le produit dans la mémoire globale
    addToCart(product, selectedSize);
    
    // 2. Simulation de chargement (UX Premium) puis ouverture du tiroir
    setTimeout(() => {
      setIsAdding(false);
      openDrawer(); 
    }, 500); 
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-serif uppercase tracking-widest">Chargement...</div>;
  
  if (!product) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 text-center">
      <p className="mb-4 text-xl font-serif">Désolé, cette robe n'est plus disponible.</p>
      <Link href="/" className="text-[10px] border border-white/30 px-6 py-3 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Retour à l'accueil</Link>
    </div>
  );

  // Gestion sécurisée des images
  const images = Array.isArray(product.image_urls) 
    ? product.image_urls 
    : (typeof product.image_urls === 'string' && product.image_urls.startsWith('[') 
        ? JSON.parse(product.image_urls) 
        : [product.image_urls]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* BOUTON RETOUR FIXE */}
      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center text-[10px] uppercase tracking-[0.2em] hover:text-gray-400 transition bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
        <ChevronLeft size={16} className="mr-2" /> Retour
      </Link>

      <div className="flex flex-col md:flex-row min-h-screen">
        
        {/* PARTIE GAUCHE : IMAGE */}
        <div className="w-full md:w-3/5 h-[60vh] md:h-screen sticky top-0 bg-zinc-900">
          <img 
            src={images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PARTIE DROITE : INFORMATIONS */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">Collection {product.category}</span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">{product.name}</h1>
          <p className="text-2xl font-serif mb-10">{product.price} $</p>
          
          <div className="border-t border-white/10 pt-8 mb-10 font-light">
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">{product.description}</p>
            <div className="space-y-4">
              <div className="flex items-center text-[10px] uppercase tracking-widest text-zinc-300">
                <Ruler size={14} className="mr-3" /> Guide des tailles en boutique
              </div>
              <div className="flex items-center text-[10px] uppercase tracking-widest text-zinc-300">
                <Calendar size={14} className="mr-3" /> Essayage sur rendez-vous
              </div>
            </div>
          </div>

          {/* SÉLECTEUR DE TAILLES */}
          <div className="mb-10">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-4">Choisir une taille</h4>
            <div className="flex flex-wrap gap-3">
              {['34', '36', '38', '40', '42', '44'].map((taille) => (
                <button
                  key={taille}
                  onClick={() => setSelectedSize(taille)}
                  className={`w-12 h-12 border text-[10px] flex items-center justify-center transition-all duration-300 ${
                    selectedSize === taille 
                      ? 'border-white bg-white text-black font-bold scale-105' 
                      : 'border-white/20 text-white hover:border-white/60'
                  }`}
                >
                  {taille}
                </button>
              ))}
            </div>
            <p className="text-[9px] text-zinc-500 mt-4 italic uppercase tracking-wider">
              * Tailles standards européennes. Des ajustements sur mesure sont possibles en boutique.
            </p>
          </div>

          {/* BOUTONS D'ACTION */}
          <div className="flex flex-col space-y-4">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center ${
                isAdding 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98]'
              }`}
            >
              {isAdding ? 'Ajout en cours...' : 'Ajouter au panier'}
            </button>
            
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              Réserver un essayage à Québec
            </button>
          </div>
          
        </div>
      </div>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        product={product} 
      />
    </div>
  );
}