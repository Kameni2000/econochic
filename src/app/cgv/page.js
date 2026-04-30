import React from 'react';
import Link from 'next/link';

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-4 block">Informations Légales</span>
          <h1 className="text-3xl md:text-5xl font-serif mb-8">Conditions Générales de Vente</h1>
          <p className="text-zinc-500 text-sm font-light">Dernière mise à jour : {new Date().toLocaleDateString('fr-CA')}</p>
        </div>

        <div className="space-y-12 text-zinc-300 font-light leading-relaxed text-sm">
          
          <section>
            <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">1. Application des conditions</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre la boutique Éconochic (située à Québec, QC) et tout client effectuant un achat sur le site internet ou en showroom. En validant une commande, le client accepte sans réserve les présentes conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">2. Prix et Taxes</h2>
            <p>
              Tous nos prix sont indiqués en dollars canadiens (CAD). Les prix n'incluent pas la TPS (5%) et la TVQ (9,975%), qui seront calculées et ajoutées au moment de la validation du panier, conformément aux lois de la province de Québec et du Canada.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">3. Politique de Retour et Remboursement</h2>
            <p>
              En raison de la nature délicate de nos robes de mariée et de bal :
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Achats en ligne :</strong> Les retours sont acceptés dans un délai de 7 jours suivant la réception de la commande. La robe ne doit avoir été ni portée, ni lavée, ni retouchée, et comporter toutes ses étiquettes d'origine.</li>
              <li><strong>Achats et essayages en boutique :</strong> Les ventes conclues physiquement dans notre showroom de Québec sont considérées comme finales. Aucun remboursement n'est accordé, à l'exception d'un échange sous forme de note de crédit dans un délai de 48 heures.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">4. Essayages et Retouches</h2>
            <p>
              Les rendez-vous d'essayage sont gratuits. Si des retouches sont nécessaires, celles-ci font l'objet d'un devis séparé. Les délais de retouche peuvent varier de 2 à 6 semaines selon la complexité du travail et la période de l'année.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-2">5. Confidentialité des données</h2>
            <p>
              Vos informations personnelles (nom, adresse, téléphone, courriel) sont strictement confidentielles. Elles ne seront jamais vendues à des tiers et sont uniquement utilisées pour le traitement de vos commandes et vos rendez-vous.
            </p>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-zinc-500 mb-6">Si vous avez des questions concernant nos conditions, n'hésitez pas à nous écrire.</p>
          <Link href="/contact" className="border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all">
            Nous contacter
          </Link>
        </div>

      </div>
    </div>
  );
}