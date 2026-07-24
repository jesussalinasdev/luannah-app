"use client";

import { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X } from "lucide-react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if prompt was caught early by layout.tsx script
    if ((window as any).pwaDeferredPrompt) {
      setDeferredPrompt((window as any).pwaDeferredPrompt);
    }

    // Listen for beforeinstallprompt in case it fires later
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).pwaDeferredPrompt = e;
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    const prompt = deferredPrompt || (window as any).pwaDeferredPrompt;

    if (!prompt) {
      // If prompt isn't available, maybe they already installed it, or browser doesn't support it.
      // We show a simple alert as fallback so the button does something visibly.
      alert("App installation is either not supported in this browser, or it's already installed on your device.");
      return;
    }

    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      (window as any).pwaDeferredPrompt = null;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="w-full mt-3 py-3 px-4 rounded-2xl font-medium text-[var(--color-accent-plum)] bg-white border border-[var(--color-accent-plum)]/30 hover:bg-[var(--color-accent-plum)]/5 transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download App
      </button>

      {/* Trademark Legal Text */}
      <p className="mt-2 text-[10px] leading-tight text-gray-400 text-center px-2 font-light">
        Downloadable computer application software for mobile phones, portable media players, handheld computers, namely, software featuring coaching in meditation.
      </p>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in" style={{ animationDuration: '0.3s' }}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative shadow-2xl animate-fade-in" style={{ animationDuration: '0.4s' }}>
            <button 
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6 mt-2">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Install on iPhone</h3>
              <p className="text-gray-500 text-sm">
                To download and install the app on your iPhone, please follow these steps:
              </p>
            </div>
            
            <div className="space-y-4 bg-gray-50 rounded-2xl p-4 mb-6 text-left">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm mt-1 text-blue-500 shrink-0">
                  <Share className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">1. Tap Share</p>
                  <p className="text-sm text-gray-500">Tap the share icon at the bottom of Safari.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm mt-1 text-gray-700 shrink-0">
                  <PlusSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">2. Add to Home Screen</p>
                  <p className="text-sm text-gray-500">Scroll down and tap "Add to Home Screen".</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowIOSModal(false)}
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-black transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
