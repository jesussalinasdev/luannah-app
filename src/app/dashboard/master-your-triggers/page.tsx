import { masterYourTriggers } from "@/lib/data";

export default function MasterYourTriggersView() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-[var(--color-accent-plum)] mb-6 pb-4 border-b border-gray-200">Master Your Triggers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {masterYourTriggers.map((video) => (
          <div key={video.id} className="glass-panel overflow-hidden">
            <div className="relative pb-[56.25%] h-0 bg-black/5">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.videoId}`} 
                title={video.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[var(--color-accent-plum)]">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
