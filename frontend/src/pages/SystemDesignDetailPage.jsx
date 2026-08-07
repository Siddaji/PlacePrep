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
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
        <span className="text-sm text-zinc-400 font-mono">Loading System Design Topic...</span>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] p-8 max-w-4xl mx-auto">
        <Link
          to="/system-design"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to System Design</span>
        </Link>
        <div className="p-8 rounded-xl border border-[#27272A] bg-[#121212] text-center space-y-4">
          <p className="text-zinc-300 text-base font-semibold">{error || "Topic not found"}</p>
          <button
            onClick={() => navigate("/system-design")}
            className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-sm font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            to="/system-design"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121212] border border-[#27272A] text-sm font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to System Design</span>
          </Link>
        </div>

        {/* Topic Info Header Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-[#27272A] bg-[#121212] space-y-6">
          <div className="space-y-3">
            {/* Category / Subcategory Badge */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded text-xs sm:text-sm font-mono font-medium bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                {topic.category || "HLD"}
              </span>
              {topic.subcategory && (
                <span className="text-xs sm:text-sm px-3 py-1 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 font-sans font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{topic.subcategory}</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-[36px] font-bold tracking-tight text-white leading-snug">
              {topic.title}
            </h1>
          </div>

          {/* Companies Section */}
          {topic.companies && topic.companies.length > 0 && (
            <div className="pt-5 border-t border-[#27272A] space-y-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                <Building2 className="w-4 h-4 text-zinc-400" />
                <span>Companies Asking This</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.companies.map((company, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-medium text-zinc-300"
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
          <div className="flex items-center gap-3 pb-3 border-b border-[#27272A]">
            <Film className="w-5 h-5 text-zinc-300" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recommended Videos
            </h2>
          </div>

          {/* Videos Grid */}
          {topic.videos && topic.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topic.videos.map((video, idx) => {
                const thumbnailUrl = getYouTubeThumbnail(video.url);

                return (
                  <div
                    key={idx}
                    className="group rounded-xl border border-[#27272A] bg-[#121212] hover:border-zinc-700 transition-colors overflow-hidden flex flex-col justify-between"
                  >
                    {/* Thumbnail Container */}
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

                      {/* Overlay & Centered Play Button */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Language Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded text-xs font-medium tracking-wide font-mono bg-zinc-950/90 text-zinc-200 border border-zinc-800">
                          {video.language || "English"}
                        </span>
                      </div>
                    </a>

                    {/* Card Details */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-base sm:text-[17px] font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-2 leading-snug"
                        >
                          {video.title}
                        </a>
                      </div>

                      {/* Watch External Link Button */}
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700/60 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 text-center text-zinc-400 border border-[#27272A] rounded-xl font-mono text-sm">
              No recommended videos available for this topic.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
