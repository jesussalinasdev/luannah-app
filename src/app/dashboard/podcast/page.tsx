import { podcasts } from "@/lib/data";

export default function PodcastView() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Podcasts & Videos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="glass-panel overflow-hidden">
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${podcast.videoId}`} 
                title={podcast.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{podcast.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
