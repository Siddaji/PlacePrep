import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  Search,
  Flame,
  Play,
  ChevronRight,
  Film,
} from "lucide-react";

import { getSystemDesignTopics } from "../services/systemDesignService.js";

const STUDIED_KEY = "placeprep-sd-studied";
const STREAK_KEY  = "placeprep-sd-streak";

// ── Streak helpers ───────────────────────────────────────────

function loadStreak() {
  try {
    const saved = localStorage.getItem(STREAK_KEY);
    return saved ? JSON.parse(saved) : { count: 0, lastDate: null, longest: 0 };
  } catch {
    return { count: 0, lastDate: null, longest: 0 };
  }
}

function saveStreak(streak) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

function updateStreak() {
  const today     = new Date().toDateString();
  const streak    = loadStreak();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (streak.lastDate === today) return streak;
  const newCount = streak.lastDate === yesterday ? streak.count + 1 : 1;
  const updated  = { count: newCount, lastDate: today, longest: Math.max(newCount, streak.longest) };
  saveStreak(updated);
  return updated;
}

// ── Main System Design Page ──────────────────────────────────

export default function SystemDesignPage() {
  const navigate = useNavigate();
  const [topics, setTopics]                 = useState([]);
  const [loading, setLoading]               = useState(true);
  const [streak, setStreak]                 = useState(loadStreak);
  const [searchQuery, setSearchQuery]       = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [studiedIds, setStudiedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STUDIED_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    getSystemDesignTopics()
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  function toggleStudied(id, e) {
    if (e) e.stopPropagation();
    setStudiedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        const updated = updateStreak();
        setStreak(updated);
      }
      localStorage.setItem(STUDIED_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      const matchesCategory = categoryFilter === "ALL" || t.category === categoryFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        (t.summary && t.summary.toLowerCase().includes(query)) ||
        (t.subcategory && t.subcategory.toLowerCase().includes(query)) ||
        (t.companies && t.companies.some(c => c.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [topics, categoryFilter, searchQuery]);

  const studiedCount = studiedIds.size;
  const totalTopics  = topics.length;
  const progressPct  = totalTopics > 0 ? Math.round((studiedCount / totalTopics) * 100) : 0;

  const hldCount = topics.filter(t => t.category === "HLD").length;
  const lldCount = topics.filter(t => t.category === "LLD").length;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans pb-20">
      
      {/* Top Header Banner */}
      <div className="border-b border-[#27272A] bg-[#0B0B0B]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-sm text-zinc-400 mb-2 font-mono">
                <Link to="/" className="hover:text-zinc-200 transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-200 font-medium">System Design</span>
              </div>
              <h1 className="text-3xl sm:text-[36px] font-bold tracking-tight text-[#F5F5F5] flex items-center gap-3">
                <Film className="w-7 h-7 text-zinc-300" />
                <span>System Design Video Lessons</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-3xl leading-relaxed">
                Master High-Level Design (HLD) and Low-Level Design (LLD) concepts asked in technical interviews with curated video lessons.
              </p>
            </div>

            {/* Overall Progress Meter */}
            <div className="hidden md:flex items-center gap-4 p-4 rounded-xl border border-[#27272A] bg-[#121212] shrink-0">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-zinc-800"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={120}
                    strokeDashoffset={120 - (120 * progressPct) / 100}
                    className="text-white transition-all duration-300"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-xs font-mono font-bold text-white">{progressPct}%</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Progress</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">
                  {studiedCount}/{totalTopics} completed
                </div>
                {streak.count > 0 && (
                  <div className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium mt-0.5 font-mono">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{streak.count}d streak</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Category Filters & Search Input */}
      <div className="sticky top-[64px] z-20 border-b border-[#27272A] bg-[#0B0B0B]/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setCategoryFilter("ALL")}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                categoryFilter === "ALL"
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "bg-[#121212] text-zinc-300 border border-[#27272A] hover:text-white hover:border-zinc-700"
              }`}
            >
              <span>All Topics</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                categoryFilter === "ALL" ? "bg-zinc-700 text-white" : "bg-zinc-900 text-zinc-400"
              }`}>
                {totalTopics}
              </span>
            </button>

            <button
              onClick={() => setCategoryFilter("HLD")}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                categoryFilter === "HLD"
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "bg-[#121212] text-zinc-300 border border-[#27272A] hover:text-white hover:border-zinc-700"
              }`}
            >
              <span>HLD</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                categoryFilter === "HLD" ? "bg-zinc-700 text-white" : "bg-zinc-900 text-zinc-400"
              }`}>
                {hldCount}
              </span>
            </button>

            <button
              onClick={() => setCategoryFilter("LLD")}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                categoryFilter === "LLD"
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "bg-[#121212] text-zinc-300 border border-[#27272A] hover:text-white hover:border-zinc-700"
              }`}
            >
              <span>LLD</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                categoryFilter === "LLD" ? "bg-zinc-700 text-white" : "bg-zinc-900 text-zinc-400"
              }`}>
                {lldCount}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search topics, companies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#27272A] bg-[#121212] text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

        </div>
      </div>

      {/* Main Table View */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8">
        <div className="rounded-xl border border-[#27272A] bg-[#121212] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#27272A] bg-zinc-900/80 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Status</th>
                  <th className="py-3.5 px-4">Topic / System</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Companies</th>
                  <th className="py-3.5 px-4 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A] text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-400 font-mono">
                      Loading system design topics...
                    </td>
                  </tr>
                ) : filteredTopics.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-400">
                      No system design topics match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredTopics.map((t, idx) => {
                    const isStudied = studiedIds.has(t.id);
                    return (
                      <tr
                        key={t.id}
                        onClick={() => navigate(`/system-design/${t.id}`)}
                        className="hover:bg-zinc-800/40 transition-colors group cursor-pointer"
                      >
                        {/* Status Checkbox */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={(e) => toggleStudied(t.id, e)}
                            className={`w-5 h-5 mx-auto rounded border flex items-center justify-center transition-all ${
                              isStudied
                                ? "bg-emerald-600 border-emerald-500 text-white"
                                : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                            }`}
                            title={isStudied ? "Marked as completed" : "Mark as completed"}
                          >
                            {isStudied && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        </td>

                        {/* Title & Subcategory */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-zinc-200 group-hover:text-white transition-colors flex items-center gap-2">
                            <span className="text-zinc-500 font-mono text-xs sm:text-sm">{idx + 1}.</span>
                            <span className="text-base sm:text-[17px]">{t.title}</span>
                          </div>
                          {t.subcategory && (
                            <div className="text-[13px] text-zinc-400 font-sans font-normal mt-1 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                              <span>{t.subcategory}</span>
                            </div>
                          )}
                        </td>

                        {/* Category Badge */}
                        <td className="py-4 px-4">
                          <span className="inline-block px-3 py-1 rounded text-xs font-mono font-medium bg-zinc-800 text-zinc-200 border border-zinc-700/60">
                            {t.category}
                          </span>
                        </td>

                        {/* Companies */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {t.companies?.map((comp, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded-md bg-zinc-800/60 text-zinc-300 border border-zinc-700/40 text-xs font-medium"
                              >
                                {comp}
                              </span>
                            )) || <span className="text-zinc-500">—</span>}
                          </div>
                        </td>

                        {/* Video Action Button */}
                        <td className="py-4 px-4 text-center">
                          <Link
                            to={`/system-design/${t.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Watch</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
