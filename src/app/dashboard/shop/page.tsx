"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import Image from "next/image";

export default function ShopView() {
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const handleAddToCart = (id: number) => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    
    // Simulate adding to cart in local storage
    const currentCart = JSON.parse(localStorage.getItem('dummy_cart') || '[]');
    if (!currentCart.includes(id)) {
      localStorage.setItem('dummy_cart', JSON.stringify([...currentCart, id]));
    }
    
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

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
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">{product.description}</p>
              )}
              <p className="text-[var(--color-accent-plum)] font-bold text-lg mb-6">{product.price}</p>
              
              <button 
                className={`mt-auto ${addedItems[product.id] ? 'w-full py-4 rounded-2xl text-white font-bold bg-green-500 shadow-lg shadow-green-200 transition-all' : 'btn-primary'}`}
                onClick={() => handleAddToCart(product.id)}
              >
                {addedItems[product.id] ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
