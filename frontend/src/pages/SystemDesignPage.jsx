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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-800 pb-20">
      
      {/* Top Header Banner */}
      <div className="border-b border-zinc-800 bg-[#0c0c0e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5 font-mono">
                <Link to="/" className="hover:text-zinc-200 transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-zinc-200 font-medium">System Design</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <Film className="w-7 h-7 text-blue-500" />
                <span>System Design Video Lessons</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                Master High-Level Design (HLD) and Low-Level Design (LLD) questions asked in top tech companies with curated video lessons.
              </p>
            </div>

            {/* Overall Progress Meter */}
            <div className="hidden md:flex items-center gap-4 p-3 rounded-xl border border-zinc-800 bg-zinc-900/60 shrink-0">
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
                    className="text-blue-500 transition-all duration-500"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold text-white">{progressPct}%</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Progress</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {studiedCount}/{totalTopics} completed
                </div>
                {streak.count > 0 && (
                  <div className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium mt-0.5 font-mono">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>{streak.count}d streak</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Category Filters & Search Input */}
      <div className="sticky top-0 z-30 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setCategoryFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                categoryFilter === "ALL"
                  ? "bg-blue-600 text-white shadow-sm font-semibold"
                  : "bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span>All Topics</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                categoryFilter === "ALL" ? "bg-blue-700 text-white" : "bg-zinc-700 text-zinc-300"
              }`}>
                {totalTopics}
              </span>
            </button>

            <button
              onClick={() => setCategoryFilter("HLD")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                categoryFilter === "HLD"
                  ? "bg-blue-600 text-white shadow-sm font-semibold"
                  : "bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span>HLD</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                categoryFilter === "HLD" ? "bg-blue-700 text-white" : "bg-zinc-700 text-zinc-300"
              }`}>
                {hldCount}
              </span>
            </button>

            <button
              onClick={() => setCategoryFilter("LLD")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                categoryFilter === "LLD"
                  ? "bg-purple-600 text-white shadow-sm font-semibold"
                  : "bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span>LLD</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                categoryFilter === "LLD" ? "bg-purple-700 text-white" : "bg-zinc-700 text-zinc-300"
              }`}>
                {lldCount}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search topics, companies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-800 bg-[#0c0c0e] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>

        </div>
      </div>

      {/* Main Table View */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#0c0c0e] text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Status</th>
                  <th className="py-3.5 px-4">Topic / System</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Companies</th>
                  <th className="py-3.5 px-4 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-500 font-mono">
                      Loading system design topics...
                    </td>
                  </tr>
                ) : filteredTopics.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-500">
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
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => toggleStudied(t.id, e)}
                            className={`w-5 h-5 mx-auto rounded border flex items-center justify-center transition-all ${
                              isStudied
                                ? "bg-emerald-500 border-emerald-500 text-zinc-950"
                                : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
                            }`}
                            title={isStudied ? "Marked as completed" : "Mark as completed"}
                          >
                            {isStudied && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                        </td>

                        {/* Problem Title & Subcategory */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-zinc-200 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                            <span className="text-zinc-500 font-mono text-xs">{idx + 1}.</span>
                            <span className="text-sm font-semibold">{t.title}</span>
                          </div>
                          {t.subcategory && (
                            <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                              {t.subcategory}
                            </div>
                          )}
                        </td>

                        {/* Category Badge */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold ${
                            t.category === 'HLD'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}>
                            {t.category}
                          </span>
                        </td>

                        {/* Companies */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {t.companies?.map((comp, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 text-[10px] font-medium"
                              >
                                {comp}
                              </span>
                            )) || <span className="text-zinc-600">—</span>}
                          </div>
                        </td>

                        {/* Video Action Button */}
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            to={`/system-design/${t.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all border border-blue-500/20 inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-sm"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Watch Video</span>
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
