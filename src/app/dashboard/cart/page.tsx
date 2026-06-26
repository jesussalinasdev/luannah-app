"use client";

import { useState, useEffect } from "react";
import { products } from "@/lib/data";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartView() {
  const [cartItems, setCartItems] = useState<typeof products>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('dummy_cart') || '[]');
    let items = products.filter(p => storedCart.includes(p.id));
    
    // Auto-populate for demo if empty
    if (items.length === 0) {
      items = [products[0]];
    }
    setCartItems(items);
  }, []);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      localStorage.removeItem('dummy_cart');
      setCartItems([]);
    }, 2000);
  };

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Your Cart</h2>
      
      {checkoutSuccess ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center">
          <div className="text-6xl mb-6">✨</div>
          <h3 className="text-2xl font-bold text-gray-800">Thank you for your order!</h3>
          <p className="text-gray-500 mt-2">Your serenity items are on their way.</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center">
          <ShoppingBag size={64} className="text-gray-300 mb-6" />
          <h3 className="text-xl font-semibold text-gray-500">Your cart is empty</h3>
        </div>
      ) : (
        <div className="glass-panel p-6">
          {cartItems.map((item, index) => (
            <div key={index} className={`flex items-center gap-4 py-4 ${index !== cartItems.length -1 ? 'border-b border-gray-100' : ''}`}>
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
              <div className="font-bold text-[var(--color-accent-blue)]">{item.price}</div>
            </div>
          ))}
          
          <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
            <div className="flex justify-between items-center mb-6 text-xl font-bold text-gray-800">
              <span>Total</span>
              <span className="text-[var(--color-accent-blue)]">${total.toFixed(2)}</span>
            </div>
            
            <button 
              className="btn-primary" 
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
