"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const faqs = [
    {
      question: "Faut-il prendre rendez-vous pour essayer une robe ?",
      answer: "Oui, afin de vous garantir une expérience personnalisée et exclusive, nous recevons uniquement sur rendez-vous. Vous pouvez réserver votre créneau directement depuis la page de la robe qui vous intéresse."
    },
    {
      question: "Combien de temps dure un essayage privé ?",
      answer: "Un essayage privé dure en moyenne 1h30. Cela nous laisse le temps de discuter de vos envies, de sélectionner les modèles et de réaliser les essayages en toute tranquillité avec vos proches."
    },
    {
      question: "Proposez-vous des services de retouche ?",
      answer: "Absolument. Nous travaillons avec des couturières expérimentées à Québec pour ajuster parfaitement votre robe à votre silhouette. Les frais de retouche sont évalués sur mesure lors de votre essayage."
    },
    {
      question: "Quels sont les délais de livraison pour une commande en ligne ?",
      answer: "Pour les articles en stock, la livraison standard au Québec prend généralement 3 à 5 jours ouvrables. Vous pouvez également opter pour le retrait gratuit en boutique."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* En-tête de la page */}
        <div className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4 block">Restons en contact</span>
          <h1 className="text-4xl md:text-6xl font-serif">Nous sommes là pour vous.</h1>
        </div>

        {/* SECTION PRINCIPALE : CONTACT & FORMULAIRE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          
          {/* Colonne Gauche : Image + Informations */}
          <div className="flex flex-col">
            {/* NOUVELLE IMAGE DE BOUTIQUE/SHOWROOM */}
            <div className="w-full h-64 md:h-80 relative mb-12 border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop" 
                alt="Intérieur de la boutique" 
                className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="text-zinc-500 mr-4 mt-1" size={18} />
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Notre Showroom</h3>
                    <p className="text-zinc-400 font-light text-sm">1234 Rue de la Mode<br />Québec, QC G1V 2M2</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-zinc-500 mr-4 mt-1" size={18} />
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Ouverture</h3>
                    <p className="text-zinc-400 font-light text-sm">
                      Mar - Ven : 10h - 18h<br />
                      Sam : 09h - 17h<br />
                      Dim - Lun : Sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start">
                  <Phone className="text-zinc-500 mr-4 mt-1" size={18} />
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Appelez-nous</h3>
                    <p className="text-zinc-400 font-light text-sm">+1 (418) 555-0198</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-zinc-500 mr-4 mt-1" size={18} />
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-zinc-300 mb-1">Écrivez-nous</h3>
                    <p className="text-zinc-400 font-light text-sm">bonjour@econochic.ca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Formulaire */}
          <div className="bg-zinc-950 p-8 md:p-12 border border-white/5 shadow-2xl h-fit">
            {isSuccess ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                <CheckCircle size={48} className="text-white" strokeWidth={1} />
                <h3 className="text-2xl font-serif text-white">Message envoyé</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <button onClick={() => setIsSuccess(false)} className="mt-4 text-[10px] uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-zinc-400 transition-colors">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl font-serif mb-2">Envoyez-nous un mot</h2>
                <p className="text-zinc-500 text-sm font-light mb-8">Une question spécifique ? Remplissez le formulaire ci-dessous.</p>
                
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
                  <select required defaultValue="" className="bg-zinc-900 border-b border-white/20 py-3 px-2 text-white focus:outline-none focus:border-white transition-colors text-sm font-light cursor-pointer">
                    <option value="" disabled>Choisissez un sujet...</option>
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

                <button type="submit" disabled={isSubmitting} className={`w-full py-5 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex justify-center items-center ${isSubmitting ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200 active:scale-[0.98]'}`}>
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  {!isSubmitting && <Send size={14} className="ml-3" />}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* SECTION SECONDAIRE : FAQ (Foire Aux Questions) */}
        <div className="max-w-3xl mx-auto border-t border-white/10 pt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">Questions Fréquentes</h2>
            <p className="text-zinc-500 font-light">Trouvez rapidement les réponses à vos questions.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/10 bg-zinc-950 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif text-lg text-white">{faq.question}</span>
                  {openFaq === index ? <ChevronUp className="text-zinc-500" size={20} /> : <ChevronDown className="text-zinc-500" size={20} />}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                    openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}