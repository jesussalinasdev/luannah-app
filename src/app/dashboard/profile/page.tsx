"use client";

import { useState, useEffect } from "react";
import { User, Mail, Shield, CheckCircle } from "lucide-react";

export default function ProfileView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setName(user.name || "Jane Doe");
      setEmail(user.email || "jane.doe@example.com");
      setMemberSince(user.memberSince || "August 2024");
      setStatus(user.status || "Premium Serenity Member");
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Here we would normally save to the backend, but we'll just update localStorage for the demo
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      user.name = name;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">My Profile</h2>
      
      <div className="glass-panel p-8">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-[var(--color-accent-pink)] to-[var(--color-accent-plum)] rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
            <User size={48} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">
            {isEditing ? (
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="text-center border-b-2 border-[var(--color-accent-plum)] bg-transparent focus:outline-none"
                autoFocus
              />
            ) : (
              name
            )}
          </h3>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <Mail size={16} /> {email}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {isEditing ? (
            <button onClick={handleSave} className="btn-primary w-40 flex justify-center gap-2">
              <CheckCircle size={20} /> Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn-primary w-40">
              Edit Name
            </button>
          )}
        </div>

        {/* Dummy Data Section */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h4 className="text-lg font-medium text-gray-800 mb-4">Account Details</h4>
          
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <Shield className="text-[var(--color-accent-pink)]" />
              <div>
                <p className="font-medium text-gray-800">Subscription Status</p>
                <p className="text-sm text-gray-500">{status}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-4">
              <User className="text-[var(--color-accent-plum)]" />
              <div>
                <p className="font-medium text-gray-800">Member Since</p>
                <p className="text-sm text-gray-500">{memberSince}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
