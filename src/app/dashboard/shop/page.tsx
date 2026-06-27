"use client";

import { products } from "@/lib/data";
import Image from "next/image";

export default function ShopView() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--color-accent-plum)] mb-6 pb-4 border-b border-gray-200">Serenity Shop</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="glass-panel flex flex-col overflow-hidden">
            <div className="relative w-full h-80 shrink-0 bg-white/40 p-4">
              <Image 
                src={product.image} 
                alt={product.title} 
                fill 
                className="object-contain p-2" 
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-[var(--color-accent-plum)] mb-2">{product.title}</h3>
              {product.description && (
                <p className="text-[var(--color-text-light)] text-sm mb-4 line-clamp-4 leading-relaxed">{product.description}</p>
              )}
              <p className="text-[var(--color-accent-plum)] font-bold text-lg mb-6">{product.price}</p>
              
              <a 
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-auto text-center block"
              >
                {product.buttonLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
