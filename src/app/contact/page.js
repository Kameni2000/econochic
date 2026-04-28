"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'un envoi d'e-mail
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* En-tête de la page */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4 block">Restons en contact</span>
          <h1 className="text-4xl md:text-6xl font-serif">Contactez-nous.</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Colonne Gauche : Informations */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-serif mb-6">Notre Boutique</h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Venez découvrir nos collections dans notre showroom privé à Québec. Nos conseillères sont à votre disposition pour vous offrir une expérience d'essayage inoubliable.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-zinc-500 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Adresse</h3>
                  <p className="text-zinc-400 font-light">1234 Rue de la Mode<br />Québec, QC G1V 2M2</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-zinc-500 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Téléphone</h3>
                  <p className="text-zinc-400 font-light">+1 (418) 555-0198</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-zinc-500 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">E-mail</h3>
                  <p className="text-zinc-400 font-light">bonjour@econochic.ca</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-zinc-500 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Heures d'ouverture</h3>
                  <p className="text-zinc-400 font-light">
                    Lundi - Fermé<br />
                    Mardi au Vendredi - 10h00 à 18h00<br />
                    Samedi - 09h00 à 17h00<br />
                    Dimanche - Sur rendez-vous
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Formulaire */}
          <div className="bg-zinc-950 p-8 md:p-12 border border-white/5">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in duration-500">
                <CheckCircle size={48} className="text-white" strokeWidth={1} />
                <h3 className="text-2xl font-serif text-white">Message envoyé</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais (généralement sous 24 à 48 heures).
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-[10px] uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-zinc-400 transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl font-serif mb-8">Envoyez-nous un mot</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Prénom <span className="text-red-500">*</span></label>
                    <input required type="text" className="bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Nom <span className="text-red-500">*</span></label>
                    <input required type="text" className="bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">E-mail <span className="text-red-500">*</span></label>
                  <input required type="email" className="bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors" />
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Sujet <span className="text-red-500">*</span></label>
                  <select required className="bg-zinc-900 border-b border-white/20 py-3 px-2 text-white focus:outline-none focus:border-white transition-colors text-sm font-light cursor-pointer">
                    <option value="" disabled selected>Choisissez un sujet...</option>
                    <option value="rendez-vous">Question sur un essayage</option>
                    <option value="commande">Suivi de commande</option>
                    <option value="produit">Information sur une robe</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Message <span className="text-red-500">*</span></label>
                  <textarea required rows="4" className="bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-white transition-colors resize-none"></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex justify-center items-center ${
                    isSubmitting ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  {!isSubmitting && <Send size={14} className="ml-3" />}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}