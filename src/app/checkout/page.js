"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { supabase } from '@/lib/supabase'; // IMPORT SUPABASE
import { ChevronLeft, Lock, CreditCard, Truck, Store, ShieldCheck, ChevronDown, ChevronUp, ShoppingCart, Wallet } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore(); // ON AJOUTE CLEARCART
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); 
  const [cardNumber, setCardNumber] = useState('');
  const [cardBrand, setCardBrand] = useState(null);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tps = subtotal * 0.05;      
  const tvq = subtotal * 0.09975;   
  const shippingCost = shippingMethod === 'standard' ? 15 : 0;
  const total = subtotal + tps + tvq + shippingCost;

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      router.push('/');
    }
  }, [cart, orderComplete, router]);

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
    if (value.startsWith('4')) setCardBrand('visa');
    else if (/^5[1-5]/.test(value) || /^2[2-7]/.test(value)) setCardBrand('mastercard');
    else if (/^3[47]/.test(value)) setCardBrand('amex');
    else setCardBrand(null);
  };

  // NOUVELLE LOGIQUE D'ENVOI À SUPABASE
  const handlePayment = async (e) => {
    e.preventDefault(); 
    setIsProcessing(true);

    // 1. Récupérer les données du formulaire
    const formData = new FormData(e.target);
    
    // 2. Préparer l'objet à envoyer dans Supabase
    const orderData = {
      customer_firstname: formData.get('firstname'),
      customer_lastname: formData.get('lastname'),
      customer_email: formData.get('email'),
      customer_phone: formData.get('phone'),
      shipping_address: formData.get('address'),
      shipping_city: formData.get('city'),
      shipping_zip: formData.get('zip'),
      shipping_method: shippingMethod,
      payment_method: paymentMethod,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tps: parseFloat(tps.toFixed(2)),
      tvq: parseFloat(tvq.toFixed(2)),
      shipping_cost: parseFloat(shippingCost.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      cart_items: cart // Le JSON de tout le panier !
    };

    // 3. Envoi vers Supabase
    const { error } = await supabase.from('orders').insert([orderData]);

    if (error) {
      console.error("Erreur lors de la commande:", error);
      alert("Une erreur est survenue lors de l'enregistrement de votre commande.");
      setIsProcessing(false);
    } else {
      // Succès ! On vide le panier et on affiche la confirmation
      clearCart();
      setIsProcessing(false);
      setOrderComplete(true);
    }
  };

  if (cart.length === 0 && !orderComplete) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-serif uppercase tracking-widest">Redirection...</div>;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white text-center p-8">
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Merci pour votre commande.</h1>
        <p className="text-zinc-400 max-w-md mb-10 font-light">Votre commande a bien été enregistrée dans notre système.</p>
        <Link href="/" className="text-[10px] border border-white/30 px-8 py-4 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Retour à l'accueil</Link>
      </div>
    );
  }

  const renderCartItems = () => (
    <div className="space-y-6 mb-10">
      {cart.map((item, index) => {
        const imageUrl = Array.isArray(item.image_urls) ? item.image_urls[0] : (typeof item.image_urls === 'string' && item.image_urls.startsWith('[') ? JSON.parse(item.image_urls)[0] : item.image_urls);
        return (
          <div key={index} className="flex gap-4">
            <div className="relative w-16 h-20 bg-zinc-900 flex-shrink-0"><img src={imageUrl} alt={item.name} className="w-full h-full object-cover" /><span className="absolute -top-2 -right-2 bg-zinc-800 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full border border-black">{item.quantity}</span></div>
            <div className="flex-1 py-1"><h4 className="text-sm font-serif text-white">{item.name}</h4><p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Taille: {item.size}</p></div>
            <p className="text-sm font-serif py-1 text-white">{item.price * item.quantity} $</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* (Le résumé mobile reste identique) */}
      <div className="lg:hidden bg-zinc-900 border-b border-white/10 sticky top-20 z-10"><button onClick={() => setIsSummaryOpen(!isSummaryOpen)} className="w-full p-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]"><span className="flex items-center text-zinc-300"><ShoppingCart size={14} className="mr-2" />{isSummaryOpen ? 'Masquer' : 'Afficher'}</span><span className="text-sm font-serif font-bold text-white">{total.toFixed(2)} $</span></button>
        <div className={`overflow-hidden transition-all px-6 ${isSummaryOpen ? 'max-h-[1000px] py-6' : 'max-h-0 py-0'}`}>{renderCartItems()}</div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <div className="w-full lg:w-3/5 p-8 md:p-16 border-r border-white/10 overflow-y-auto">
          <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors mb-12 hidden lg:flex"><ChevronLeft size={14} className="mr-2" /> Retour</Link>
          
          <form onSubmit={handlePayment} className="space-y-12">
            <div>
              <h2 className="text-xl font-serif tracking-wide mb-8">Informations de livraison</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* AJOUT DES ATTRIBUTS NAME="" */}
                  <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Prénom <span className="text-red-500">*</span></label><input name="firstname" required type="text" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                  <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Nom <span className="text-red-500">*</span></label><input name="lastname" required type="text" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">E-mail <span className="text-red-500">*</span></label><input name="email" required type="email" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                  <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Téléphone <span className="text-red-500">*</span></label><input name="phone" required type="tel" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                </div>
                <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Adresse complète <span className="text-red-500">*</span></label><input name="address" required type="text" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Ville <span className="text-red-500">*</span></label><input name="city" required type="text" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                  <div className="flex flex-col"><label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Code Postal <span className="text-red-500">*</span></label><input name="zip" required type="text" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white transition-colors" /></div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-10">
              <h2 className="text-xl font-serif tracking-wide mb-8">Méthode d'expédition</h2>
              <div className="space-y-4">
                <label className={`flex items-center justify-between p-4 border cursor-pointer ${shippingMethod === 'standard' ? 'border-white bg-white/5' : 'border-white/20'}`}><div className="flex items-center"><input type="radio" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="mr-4 accent-white" /><Truck size={18} className="mr-3" /><span>Livraison Standard</span></div><span>15.00 $</span></label>
                <label className={`flex items-center justify-between p-4 border cursor-pointer ${shippingMethod === 'pickup' ? 'border-white bg-white/5' : 'border-white/20'}`}><div className="flex items-center"><input type="radio" value="pickup" checked={shippingMethod === 'pickup'} onChange={() => setShippingMethod('pickup')} className="mr-4 accent-white" /><Store size={18} className="mr-3" /><span>Retrait Boutique</span></div><span>Gratuit</span></label>
              </div>
            </div>

            <div className="border-t border-white/10 pt-10">
              <h2 className="text-xl font-serif tracking-wide mb-8">Méthode de paiement</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div onClick={() => setPaymentMethod('credit_card')} className={`flex flex-col items-center p-4 border cursor-pointer ${paymentMethod === 'credit_card' ? 'border-white bg-white/10' : 'border-white/20'}`}><CreditCard size={24} className="mb-2" /><span className="text-[10px] uppercase">Carte de crédit</span></div>
                <div onClick={() => setPaymentMethod('paypal')} className={`flex flex-col items-center p-4 border cursor-pointer ${paymentMethod === 'paypal' ? 'border-white bg-[#003087]/40' : 'border-white/20'}`}><Wallet size={24} className="mb-2" /><span className="text-[10px] uppercase">PayPal</span></div>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="bg-zinc-900/50 p-6 border border-white/10 space-y-6 mb-8">
                  <div className="flex flex-col"><label className="text-[9px] uppercase text-zinc-500 mb-2">Numéro de carte</label><input required type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white font-mono" /></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col"><label className="text-[9px] uppercase text-zinc-500 mb-2">Expiration</label><input required type="text" placeholder="MM/AA" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white font-mono" /></div>
                    <div className="flex flex-col"><label className="text-[9px] uppercase text-zinc-500 mb-2">CVC</label><input required type="password" placeholder="***" className="bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white font-mono" /></div>
                  </div>
                </div>
              )}
              {paymentMethod === 'paypal' && (
                <div className="bg-[#003087]/10 p-6 border border-[#003087]/30 text-center mb-8"><Wallet size={32} className="mx-auto mb-4 text-[#0079C1]" /><p>Paiement via PayPal</p></div>
              )}

              <div className="flex items-start mb-8"><input required type="checkbox" id="terms" className="mt-1 mr-3 w-4 h-4 accent-white cursor-pointer" /><label htmlFor="terms" className="text-[11px] text-zinc-400">J'accepte les Conditions de Vente.</label></div>

              <button type="submit" disabled={isProcessing} className={`w-full py-5 text-[10px] font-bold uppercase transition-all flex justify-center items-center ${isProcessing ? 'bg-zinc-800 text-zinc-500' : (paymentMethod === 'paypal' ? 'bg-[#FFC439] text-black' : 'bg-white text-black')}`}>
                {isProcessing ? 'Enregistrement...' : `Payer ${total.toFixed(2)} $`}
              </button>
            </div>
          </form>
        </div>

        {/* Résumé droite */}
        <div className="w-full lg:w-2/5 p-8 md:p-16 bg-zinc-950 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto hidden lg:block">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-10">Résumé</h3>
          {renderCartItems()}
          <div className="border-t border-white/10 pt-6 space-y-3">
            <div className="flex justify-between text-zinc-400 text-sm"><span>Total CAD</span><span className="text-white">{total.toFixed(2)} $</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}