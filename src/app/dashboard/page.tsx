import Image from "next/image";
import Link from "next/link";

export default function HomeView() {
  return (
    <div className="animate-fade-in flex flex-col gap-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6">
        <div className="relative w-36 h-36 mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <Image 
            src="/profile.jpg" 
            alt="Luannah Arana" 
            fill 
            className="object-cover" 
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">Luannah Arana</h2>
        <p className="text-[var(--color-accent-plum)] font-semibold mt-1 tracking-widest uppercase text-sm">Founder</p>
        <p className="text-gray-500 mt-3">Welcome to Soulspectives Institute.</p>
      </div>

      {/* About Me */}
      <div className="glass-panel p-8">
        <h3 className="text-xl font-bold text-[var(--color-accent-pink)] mb-4">About Me</h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          I believe in the power of mindfulness, peace, and natural beauty. This app is your personal gateway to exclusive podcasts, curated products, and a community dedicated to a serene lifestyle. Breathe deeply, relax, and explore.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard/podcast" className="glass-panel p-6 text-center hover:bg-white/90 transition-colors group">
          <h4 className="font-bold text-gray-800 mb-1 group-hover:text-[var(--color-accent-plum)]">Latest Podcast</h4>
          <p className="text-sm text-gray-500">Listen Now</p>
        </Link>
        <Link href="/dashboard/shop" className="glass-panel p-6 text-center hover:bg-white/90 transition-colors group">
          <h4 className="font-bold text-gray-800 mb-1 group-hover:text-[var(--color-accent-plum)]">New Arrivals</h4>
          <p className="text-sm text-gray-500">Shop Now</p>
        </Link>
      </div>
    </div>
  );
}
