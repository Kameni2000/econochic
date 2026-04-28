"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // IMPORT SUPABASE
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, product }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !product) return null;

  // NOUVELLE LOGIQUE D'ENVOI À SUPABASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      alert("Veuillez choisir une heure pour votre essayage.");
      return;
    }
    
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    const appointmentData = {
      product_id: product.id,
      product_name: product.name,
      appointment_date: formData.get('date'),
      appointment_time: selectedTime,
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      customer_phone: formData.get('phone')
    };

    const { error } = await supabase.from('appointments').insert([appointmentData]);

    if (error) {
      console.error("Erreur lors de la réservation:", error);
      alert("Une erreur est survenue.");
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setTimeout(() => { setIsSuccess(false); setSelectedTime(null); }, 300);
    onClose();
  };

  const imageUrl = Array.isArray(product.image_urls) ? product.image_urls[0] : (typeof product.image_urls === 'string' && product.image_urls.startsWith('[') ? JSON.parse(product.image_urls)[0] : product.image_urls);
  const timeSlots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 shadow-2xl flex flex-col md:flex-row z-10">
        
        <button onClick={handleClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white z-20"><X size={20} /></button>

        <div className="hidden md:block w-2/5 bg-zinc-900 relative">
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <h3 className="text-2xl font-serif text-white mb-1">{product.name}</h3>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 md:p-12">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <CheckCircle size={64} className="text-white" />
              <h2 className="text-3xl font-serif text-white">Rendez-vous confirmé</h2>
              <button onClick={handleClose} className="mt-8 border border-white/30 text-white text-[10px] uppercase px-8 py-4">Fermer</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className="text-2xl font-serif text-white mb-8">Réserver un essayage</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col">
                  <label className="text-[9px] uppercase text-zinc-500 mb-3"><Calendar size={12} className="inline mr-2" /> Date</label>
                  {/* AJOUT NAME="date" */}
                  <input name="date" required type="date" className="bg-transparent border-b border-white/20 py-2 text-white" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[9px] uppercase text-zinc-500 mb-3"><Clock size={12} className="inline mr-2" /> Heure</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`py-3 text-[11px] border ${selectedTime === time ? 'border-white bg-white text-black' : 'border-white/10 text-zinc-400'}`}>{time}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                {/* AJOUT NAME="name" ET NAME="phone" */}
                <div className="flex flex-col"><label className="text-[9px] uppercase text-zinc-500 mb-2">Prénom & Nom</label><input name="name" required type="text" className="bg-transparent border-b border-white/20 py-2 text-white" /></div>
                <div className="flex flex-col"><label className="text-[9px] uppercase text-zinc-500 mb-2">Téléphone</label><input name="phone" required type="tel" className="bg-transparent border-b border-white/20 py-2 text-white" /></div>
              </div>
              
              <div className="flex flex-col"><label className="text-[9px] uppercase text-zinc-500 mb-2">E-mail</label><input name="email" required type="email" className="bg-transparent border-b border-white/20 py-2 text-white" /></div>

              <button type="submit" disabled={isSubmitting} className="w-full py-5 mt-4 text-[10px] font-bold uppercase bg-white text-black">
                {isSubmitting ? 'Confirmation...' : 'Confirmer le rendez-vous'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;