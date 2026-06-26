"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Headphones, ShoppingBag, ShoppingCart, Menu, LogOut, User } from "lucide-react";
import Link from "next/link";

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
    { name: "Shop", path: "/dashboard/shop", icon: ShoppingBag },
    { name: "Cart", path: "/dashboard/cart", icon: ShoppingCart },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen animated-marine-bg relative">
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-5 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <h2 className="text-xl font-medium tracking-wide text-[var(--color-accent-blue)]">Luannah</h2>
        <button onClick={() => setMenuOpen(true)} className="text-gray-600">
          <Menu size={28} />
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col justify-center items-center animate-fade-in">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-4xl text-gray-400 font-light">&times;</button>
          <div className="flex flex-col gap-8 text-2xl text-gray-700">
            <button onClick={() => setMenuOpen(false)} className="flex items-center gap-4"><User /> My Profile</button>
            <button onClick={handleLogout} className="flex items-center gap-4 text-red-500"><LogOut /> Log Out</button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-screen z-10">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[var(--color-accent-blue)]">Luannah</h2>
        </div>
        <div className="flex flex-col flex-1 px-4 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${isActive ? 'bg-[var(--color-accent-teal)]/10 text-[var(--color-accent-teal)] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}>
                <Icon size={24} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="p-4 mb-4">
          <button onClick={handleLogout} className="flex items-center gap-4 p-4 w-full text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors">
            <LogOut size={24} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 p-4 pb-28 md:pb-8 max-w-6xl w-full mx-auto relative z-0">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center z-40 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[var(--color-accent-teal)]' : 'text-gray-400'}`}>
              <Icon size={isActive ? 28 : 24} className="transition-all" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
