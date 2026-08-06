import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  ExternalLink,
  Film,
  Building2,
  Tag,
  Loader2,
} from "lucide-react";
import { getSystemDesignTopicById } from "../services/systemDesignService.js";

function getYouTubeId(url) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : "";
}

function getYouTubeThumbnail(url) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

// ── Main Detail Page Component ────────────────────────────────

export default function SystemDesignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSystemDesignTopicById(id)
      .then((data) => {
        setTopic(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Topic not found or failed to load.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <span className="text-xs text-zinc-400 font-mono">Loading System Design Topic...</span>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 p-8 max-w-4xl mx-auto">
        <Link
          to="/system-design"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to System Design</span>
        </Link>
        <div className="p-8 rounded-2xl border border-zinc-800 bg-[#0c0c0e] text-center space-y-3">
          <p className="text-zinc-300 text-sm font-medium">{error || "Topic not found"}</p>
          <button
            onClick={() => navigate("/system-design")}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-800 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            to="/system-design"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to System Design</span>
          </Link>
        </div>

        {/* Topic Info Header Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] shadow-xl space-y-6">
          <div className="space-y-3">
            {/* Category / Subcategory Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold ${
                topic.category === 'HLD'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
              }`}>
                {topic.category || "HLD"}
              </span>
              {topic.subcategory && (
                <span className="text-xs px-2.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono flex items-center gap-1">
                  <Tag className="w-3 h-3 text-zinc-400" />
                  <span>{topic.subcategory}</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {topic.title}
            </h1>
          </div>

          {/* Companies Section */}
          {topic.companies && topic.companies.length > 0 && (
            <div className="pt-4 border-t border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Companies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.companies.map((company, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-200"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Videos Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800">
            <Film className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              🎥 Recommended Videos
            </h2>
          </div>

          {/* Videos Grid */}
          {topic.videos && topic.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topic.videos.map((video, idx) => {
                const thumbnailUrl = getYouTubeThumbnail(video.url);
                const isHindi = video.language?.toLowerCase().includes("hindi");

                return (
                  <div
                    key={idx}
                    className="group rounded-2xl border border-zinc-800 bg-[#0c0c0e] hover:border-zinc-700 transition-all duration-200 overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    {/* Thumbnail Container (Link to YouTube) */}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      className="relative aspect-video w-full bg-zinc-900 overflow-hidden block"
                    >
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600">
                          <Film className="w-10 h-10" />
                        </div>
                      )}

                      {/* Dark Gradient Overlay & Centered Play Button */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Language Badge on top right of thumbnail */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase font-mono shadow-md backdrop-blur ${
                            isHindi
                              ? "bg-amber-500/90 text-zinc-950 border border-amber-400/50"
                              : "bg-cyan-500/90 text-zinc-950 border border-cyan-400/50"
                          }`}
                        >
                          {video.language || "English"}
                        </span>
                      </div>
                    </a>

                    {/* Card Details */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              isHindi
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            }`}
                          >
                            {video.language || "English"}
                          </span>
                        </div>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-sm sm:text-base font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug"
                        >
                          {video.title}
                        </a>
                      </div>

                      {/* Watch Video External Link Button */}
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-200 border border-blue-500/20 hover:border-blue-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-zinc-500 border border-zinc-800 rounded-2xl font-mono text-xs">
              No recommended videos available for this topic.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
