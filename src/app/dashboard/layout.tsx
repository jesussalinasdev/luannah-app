"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Headphones, Brain, ShoppingBag, ShoppingCart, Menu, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    router.push("/");
  };

  const navItems = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Podcast", path: "/dashboard/podcast", icon: Headphones },
    { name: "Triggers", path: "/dashboard/master-your-triggers", icon: Brain },
    { name: "Shop", path: "/dashboard/shop", icon: ShoppingBag },
    { name: "Cart", path: "/dashboard/cart", icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col min-h-screen animated-marine-bg relative">
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Image src="/souls-favicon.png" alt="Logo" width={24} height={24} className="object-contain" />
          <h2 className="text-lg font-bold tracking-wide text-[var(--color-accent-blue)]">Soulspectives</h2>
        </div>
        <button onClick={() => setMenuOpen(true)} className="text-gray-600">
          <Menu size={28} />
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col justify-center items-center animate-fade-in">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-4xl text-gray-400 font-light">&times;</button>
          <div className="flex flex-col gap-8 text-2xl text-gray-700">
            <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 hover:text-[var(--color-accent-blue)] transition-colors"><User /> My Profile</Link>
            <button onClick={handleLogout} className="flex items-center gap-4 text-red-500"><LogOut /> Log Out</button>
          </div>
        </div>
      )}

      {/* Desktop Top Navigation (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <Image src="/souls-favicon.png" alt="Logo" width={28} height={28} className="object-contain" />
          <h2 className="text-xl font-bold tracking-wide text-[var(--color-accent-blue)]">Soulspectives Institute</h2>
        </div>

        {/* Center Nav Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all relative overflow-hidden ${isActive ? 'text-[var(--color-accent-blue)] font-semibold shadow-sm' : 'text-gray-500 hover:bg-white hover:shadow-sm'}`}>
                {isActive && (
                  <div className="absolute inset-0 animated-marine-bg opacity-15 -z-10"></div>
                )}
                <Icon size={20} className="z-10" />
                <span className="z-10">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/dashboard/profile" className="flex items-center justify-center p-3 text-gray-500 hover:bg-[var(--color-accent-teal)]/10 hover:text-[var(--color-accent-teal)] rounded-2xl transition-colors" title="My Profile">
            <User size={24} />
          </Link>
          <button onClick={handleLogout} className="flex items-center justify-center p-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-colors" title="Log Out">
            <LogOut size={24} />
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 pb-28 md:pb-12 max-w-5xl w-full mx-auto relative z-0 md:mt-8">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center z-40 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl transition-all relative overflow-hidden ${isActive ? 'text-[var(--color-accent-blue)] shadow-sm' : 'text-gray-400'}`}>
              {isActive && (
                <div className="absolute inset-0 animated-marine-bg opacity-20 -z-10"></div>
              )}
              <Icon size={isActive ? 26 : 24} className="transition-all z-10" />
              <span className="text-[10px] font-medium z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
