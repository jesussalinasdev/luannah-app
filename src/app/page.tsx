"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoImg from "../../public/logo.png";

// Mock Data
const validUsers = [
  { email: "aloha@luannaharana.ca", password: "12345", name: "Luannah Arana", memberSince: "August 2022", status: "Premium Serenity Member" },
  { email: "isabella.montes@gmail.com", password: "12345", name: "Isabella Montes", memberSince: "March 2023", status: "Basic Member" },
  { email: "sofia.castillo@gmail.com", password: "12345", name: "Sofia Castillo", memberSince: "November 2021", status: "Premium Serenity Member" }
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = validUsers.find(u => u.email === email && u.password === password);
    if (user) {
      // Set auth state
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen animated-marine-bg absolute inset-0 z-50 animate-fade-out" style={{ animationDelay: '1.8s' }}>
        <div className="text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl stylized-text">Luannah Arana</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen animated-marine-bg p-4 relative overflow-hidden">
      <div className="glass-panel w-full max-w-md p-10 text-center animate-fade-in relative z-10">
        
        {/* Logo and App Name */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-24 h-24 relative mb-4">
            <Image src={logoImg} alt="Luannah Arana Logo" fill className="object-cover" />
          </div>
          <h1 className="text-3xl font-light tracking-wide text-gray-800">Luannah Arana</h1>
        </div>

        <p className="text-gray-500 mb-8 font-medium">Please enter your details to sign in.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input 
            type="email" 
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <div className="text-red-500 bg-red-50/80 backdrop-blur-sm p-3 rounded-xl text-sm border border-red-200">{error}</div>}
          
          <button type="submit" className="btn-primary mt-4">Sign In</button>
        </form>
      </div>
    </div>
  );
}
