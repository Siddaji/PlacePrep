import { Link } from "react-router-dom";

const OS_VIDEOS = [
  {
    id: "3obEP8eLsCw",
    title: "Operating System Complete Course in One Shot",
    channel: "Gate Smashers",
    duration: "10h 30m",
    url: "https://youtu.be/3obEP8eLsCw?si=NesRJl8P-DCUAdyv",
    description: "Complete Operating Systems full course covering OS basics, process management, CPU scheduling, synchronization, deadlocks, memory management, and file systems."
  },
  {
    id: "8XBtAjKwCm4",
    title: "Operating Systems (OS) Placement Preparation",
    channel: "CodeHelp by Love Babbar",
    duration: "4h 15m",
    url: "https://youtu.be/8XBtAjKwCm4?si=5YWZcfE0tEPRxi6h",
    description: "In-depth Operating Systems placement preparation course focusing on top technical interview questions and core OS concepts."
  },
  {
    id: "xw_OuOhjauw",
    title: "Operating Systems Full Course for Beginners",
    channel: "Knowledge Gate",
    duration: "6h 45m",
    url: "https://youtu.be/xw_OuOhjauw?si=HYHtELrOe4Rl24JX",
    description: "Comprehensive Operating System course covering hardware abstraction, process control, paging, segmentation, and disk scheduling algorithms."
  }
];

function OsVideosPage() {
  return (
    <div className="bg-black min-h-screen text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/os"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to OS Roadmap
          </Link>
          <span className="text-xs font-medium text-zinc-500">
            Curated Video Lectures
          </span>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-zinc-800">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            OS Video Resources
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            High-yield video lectures and comprehensive full courses from top educators to build deep conceptual clarity for Operating Systems in placement interviews.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OS_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="bg-zinc-950/80 border border-zinc-900 rounded-xl overflow-hidden flex flex-col hover:border-zinc-800 transition-colors"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-video bg-zinc-950 overflow-hidden group">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Duration Overlay */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/85 text-zinc-200 text-xs font-medium px-2 py-0.5 rounded border border-zinc-800">
                  {video.duration}
                </div>

                {/* Play Icon Badge */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center pl-0.5 shadow-lg transform group-hover:scale-105 transition-transform">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2">
                    <span>{video.channel}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">Video Lecture</span>
                  </div>

                  <h3 className="text-base font-semibold text-white leading-snug">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors shadow-xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch on YouTube</span>
                  </a>

                  <span className="text-xs font-medium text-zinc-500">
                    Opens YouTube
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default OsVideosPage;
