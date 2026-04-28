"use client";

import React from 'react';

const collections = [
  {
    title: "Mariage",
    location: "Boutique Sainte-Foy",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1000", // Image de robe de mariée
    link: "#mariage"
  },
  {
    title: "Bal",
    location: "Boutique Wilfrid-Hamel",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000", // Image de robe de soirée
    link: "#bal"
  }
];

const Collections = () => {
  return (
    <section className="flex flex-col md:flex-row w-full h-[80vh] bg-black">
      {collections.map((item, index) => (
        <div 
          key={index} 
          className="relative flex-1 group overflow-hidden cursor-pointer border-collapse border-white/5 border-[0.5px]"
        >
          {/* Image de fond */}
          <img 
            src={item.image} 
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
          />
          
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

          {/* Contenu texte */}
          <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8">
            <span className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-70">
              {item.location}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-8">
              Collection {item.title}
            </h2>
            <div className="overflow-hidden">
              <span className="inline-block py-2 border-b border-white text-[10px] uppercase tracking-[0.2em] font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                Explorer
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Collections;