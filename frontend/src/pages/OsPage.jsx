import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { getOsModules, getCachedOsModules } from "../services/osService.js";
import { progressService } from "../services/progressService.js";
import { useAuth } from "../context/AuthContext.jsx";

const SOLVED_STORAGE_KEY = "placeprep-os-solved-topics";

const LEVEL_STYLES = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Easy: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

function getLevelBadge(level) {
  const normalized = level || "Beginner";
  const styleClass = LEVEL_STYLES[normalized] || "bg-zinc-800 text-zinc-300 border-zinc-700";
  return (
    <span
      className={`text-[11px] font-medium px-2.5 py-0.5 rounded border whitespace-nowrap ${styleClass}`}
    >
      {normalized}
    </span>
  );
}

/**
 * Memoized Single Topic Row with Staggered Left-to-Right Slide-in Animation
 */
const OsTopicRow = memo(function OsTopicRow({ topic, isSolved, onToggleSolved, index }) {
  return (
    <div
      style={{ animationDelay: `${index * 30}ms` }}
      className={`animate-slide-in-row flex items-center justify-between px-4 sm:px-6 py-3.5 transition-colors ${
        isSolved ? "bg-emerald-950/10 hover:bg-emerald-950/20" : "hover:bg-zinc-800/30"
      }`}
    >
      {/* Column 1: Checkbox + Topic Name */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-4">
        {/* Solved Check Toggle Button */}
        <button
          type="button"
          onClick={() => onToggleSolved(topic.id)}
          className="shrink-0 p-0.5 rounded-full transition-transform active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
          aria-label={isSolved ? "Mark as unsolved" : "Mark as solved"}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
              isSolved
                ? "bg-emerald-600 border-emerald-500 text-white shadow-xs"
                : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
            }`}
          >
            {isSolved && (
              <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </div>
        </button>

        {/* Topic Title */}
        <span
          onClick={() => onToggleSolved(topic.id)}
          className={`text-sm sm:text-[15px] font-medium leading-normal cursor-pointer transition-colors break-words ${
            isSolved ? "text-zinc-500 line-through" : "text-zinc-200 hover:text-white"
          }`}
        >
          {topic.title}
        </span>
      </div>

      {/* Column 2: Level */}
      <div className="w-28 sm:w-36 shrink-0 flex items-center">
        {getLevelBadge(topic.difficulty)}
      </div>

      {/* Column 3: Action (Read Article) */}
      <div className="w-32 sm:w-36 shrink-0 flex items-center justify-end">
        {topic.articleUrl ? (
          <a
            href={topic.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 transition-colors"
          >
            <span>Read Article</span>
            <svg
              className="w-3.5 h-3.5 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        ) : (
          <span className="text-xs text-zinc-600 font-medium">—</span>
        )}
      </div>
    </div>
  );
});

/**
 * Memoized Module Section Component displaying all topics in a clean table-style list
 */
const OsModuleSection = memo(function OsModuleSection({
  module,
  isExpanded,
  onToggle,
  solvedTopicIds,
  onToggleSolved,
}) {
  const topics = module.topics || [];
  const moduleTotal = topics.length;
  const moduleSolved = topics.filter((t) => solvedTopicIds.has(t.id)).length;
  const isCompleted = moduleSolved === moduleTotal && moduleTotal > 0;

  return (
    <div className="rounded-xl border border-[#27272A] bg-[#121212] overflow-hidden transition-colors">
      {/* Module Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-[#121212] hover:bg-[#18181B] transition-colors duration-150 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600"
      >
        <div className="flex items-center gap-3 min-w-0 pr-3">
          <span className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight truncate">
            {module.title}
          </span>
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
            ({moduleTotal} {moduleTotal === 1 ? "Topic" : "Topics"})
          </span>
        </div>

        <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
          <span
            className={`font-mono text-sm sm:text-base font-semibold ${
              isCompleted ? "text-emerald-400" : "text-zinc-300"
            }`}
          >
            {moduleSolved}/{moduleTotal}
          </span>

          <div
            className={`text-zinc-400 transition-transform duration-200 ease-in-out ${
              isExpanded ? "rotate-180 text-zinc-100" : ""
            }`}
          >
            <svg
              className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </button>

      {/* Module Topics Table List */}
      <div
        className={`grid transition-[grid-template-rows] duration-250 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#27272A] bg-[#0E0E11]/60">
            {/* Table wrapper with smooth horizontal scroll container if screen is very small */}
            <div className="w-full overflow-x-auto [scrollbar-width:thin] [scrollbar-color:#27272A_transparent]">
              <div className="min-w-[520px] sm:min-w-0">
                {/* Column Headers */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#16161A]/80 border-b border-[#27272A] text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  <div className="flex-1 min-w-0 pr-4">Topic</div>
                  <div className="w-28 sm:w-36 shrink-0">Level</div>
                  <div className="w-32 sm:w-36 shrink-0 text-right">Action</div>
                </div>

                {/* Topics Rows */}
                {topics.length === 0 ? (
                  <p className="text-xs sm:text-sm text-zinc-500 py-4 px-6 italic text-center">
                    No topics found matching current search query.
                  </p>
                ) : (
                  <div className="divide-y divide-[#27272A]/70">
                    {topics.map((topic, index) => {
                      const isSolved = solvedTopicIds.has(topic.id);
                      return (
                        <OsTopicRow
                          key={topic.id}
                          topic={topic}
                          isSolved={isSolved}
                          onToggleSolved={onToggleSolved}
                          index={index}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function OsPage() {
  const { isAuthenticated } = useAuth();
  const [modules, setModules] = useState(() => getCachedOsModules() || []);
  const [loading, setLoading] = useState(() => !getCachedOsModules()?.length);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track open/collapsed modules. Map module.id -> boolean
  const [expandedModules, setExpandedModules] = useState(() => {
    const initial = {};
    const cached = getCachedOsModules();
    if (Array.isArray(cached)) {
      cached.forEach((mod) => {
        initial[mod.id] = true;
      });
    }
    return initial;
  });

  // Solved topics state persisted in localStorage
  const [solvedTopicIds, setSolvedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem(SOLVED_STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const loadProgressFromCloud = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const res = await progressService.getProgress("os");
        if (res && res.success && Array.isArray(res.progress)) {
          setSolvedTopicIds(new Set(res.progress));
          localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify(res.progress));
        }
      } catch (err) {
        console.error("Failed to load OS cloud progress:", err);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getOsModules()
      .then((data) => {
        setModules(data);
        setExpandedModules((prev) => {
          const next = { ...prev };
          data.forEach((mod) => {
            if (next[mod.id] === undefined) {
              next[mod.id] = true;
            }
          });
          return next;
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load OS modules", err);
        setLoading(false);
      });

    loadProgressFromCloud();
  }, [loadProgressFromCloud]);

  // Listen for background sync updates
  useEffect(() => {
    const handleProgressUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail.os)) {
        setSolvedTopicIds(new Set(e.detail.os));
      }
    };
    window.addEventListener("placeprep-progress-updated", handleProgressUpdate);
    return () => window.removeEventListener("placeprep-progress-updated", handleProgressUpdate);
  }, []);

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const toggleSolved = (topicId) => {
    const isCurrentlySolved = solvedTopicIds.has(topicId);

    setSolvedTopicIds((prev) => {
      const next = new Set(prev);
      if (isCurrentlySolved) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      try {
        localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify([...next]));
      } catch (err) {
        console.error("Failed to save solved status", err);
      }
      return next;
    });

    if (isAuthenticated) {
      if (isCurrentlySolved) {
        progressService.uncompleteResource("os", topicId).catch(err => console.error("OS uncomplete error:", err));
      } else {
        progressService.completeResource("os", topicId).catch(err => console.error("OS complete error:", err));
      }
    }
  };

  const expandAll = () => {
    const allExpanded = {};
    modules.forEach((mod) => {
      allExpanded[mod.id] = true;
    });
    setExpandedModules(allExpanded);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  // Flatten all topics for count and solved calculation
  const allTopics = useMemo(() => {
    return modules.flatMap((m) => m.topics || []);
  }, [modules]);

  const totalTopicsCount = allTopics.length;
  const solvedCount = useMemo(() => {
    return allTopics.filter((t) => solvedTopicIds.has(t.id)).length;
  }, [allTopics, solvedTopicIds]);

  const progressPercentage = totalTopicsCount > 0
    ? Math.round((solvedCount / totalTopicsCount) * 100)
    : 0;

  // Filter modules and topics based on search query
  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return modules;

    return modules
      .map((mod) => {
        const matchingTopics = (mod.topics || []).filter((topic) => {
          const matchTitle = topic.title.toLowerCase().includes(query);
          const matchDiff = (topic.difficulty || "").toLowerCase().includes(query);
          return matchTitle || matchDiff;
        });

        return {
          ...mod,
          topics: matchingTopics,
        };
      })
      .filter((mod) => mod.topics.length > 0);
  }, [modules, searchQuery]);

  return (
    <div className="bg-black min-h-screen text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      {/* Page Header Banner */}
      <div className="border-b border-[#27272A] bg-[#0B0B0B]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="text-xs font-medium text-zinc-500">
              Core Subjects • OS
            </span>
          </div>

          {/* Title & Actions */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-[36px] font-bold tracking-tight text-[#F5F5F5]">
                Operating Systems Roadmap
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                Fundamental OS concepts, process management, CPU scheduling, synchronization, deadlocks, and memory management with verified technical articles.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/os/videos"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/60 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current text-rose-400" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Video Resources</span>
              </Link>
            </div>
          </div>

          {/* Progress Strip */}
          {!loading && totalTopicsCount > 0 && (
            <div className="mt-6 pt-6 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-300">
                  Overall Progress: <strong className="text-zinc-100 font-bold">{solvedCount}</strong> / {totalTopicsCount} Solved
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full sm:w-48 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        {/* Controls Bar: Search & Expand/Collapse */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search OS topics or concepts..."
              className="w-full rounded-lg border border-[#27272A] bg-[#121212] pl-10 pr-10 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs text-zinc-400 font-medium">
              {totalTopicsCount} Topics in {modules.length} Modules
            </span>
            <div className="flex items-center gap-2">
            </div>
          </div>
        </div>

        {/* Modules Table List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="rounded-xl border border-[#27272A] bg-[#121212] p-5 h-16 animate-pulse flex items-center justify-between">
                <div className="h-5 bg-zinc-800 rounded w-48" />
                <div className="h-5 bg-zinc-800 rounded w-16" />
              </div>
            ))}
          </div>
        ) : filteredModules.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 rounded-xl border border-[#27272A] bg-[#121212]">
            <p className="text-sm sm:text-base font-medium">No topics found matching "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-sm font-semibold text-zinc-300 underline hover:text-white"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredModules.map((module) => {
              const isExpanded = expandedModules[module.id] !== false;
              return (
                <OsModuleSection
                  key={module.id}
                  module={module}
                  isExpanded={isExpanded}
                  onToggle={() => toggleModule(module.id)}
                  solvedTopicIds={solvedTopicIds}
                  onToggleSolved={toggleSolved}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default OsPage;

