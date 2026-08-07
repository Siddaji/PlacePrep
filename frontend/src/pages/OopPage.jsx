import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getOopModules } from "../services/oopService.js";

function OopPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track open/collapsed modules. Map module.id -> boolean
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    getOopModules()
      .then((data) => {
        setModules(data);
        // Expand all modules by default
        const initialExpanded = {};
        data.forEach((mod) => {
          initialExpanded[mod.id] = true;
        });
        setExpandedModules(initialExpanded);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load OOP modules", err);
        setLoading(false);
      });
  }, []);

  const toggleModule = (modId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  // Flatten all topics for count
  const totalTopicsCount = useMemo(() => {
    return modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0);
  }, [modules]);

  // Filter modules and topics based on search query
  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return modules;

    return modules
      .map((mod) => {
        const matchingTopics = mod.topics.filter((topic) => {
          const matchTitle = topic.title.toLowerCase().includes(query);
          const matchDiff = topic.difficulty.toLowerCase().includes(query);
          return matchTitle || matchDiff;
        });

        return {
          ...mod,
          topics: matchingTopics,
        };
      })
      .filter((mod) => mod.topics.length > 0);
  }, [modules, searchQuery]);

  const getDifficultyBadge = (difficulty) => {
    const diffLower = difficulty?.toLowerCase() || "";
    if (diffLower.includes("beginner") || diffLower.includes("easy")) {
      return (
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
          Beginner
        </span>
      );
    }
    if (diffLower.includes("intermediate") || diffLower.includes("medium")) {
      return (
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60">
          Intermediate
        </span>
      );
    }
    if (diffLower.includes("advanced") || diffLower.includes("hard")) {
      return (
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/60">
          Advanced
        </span>
      );
    }
    return (
      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
        {difficulty}
      </span>
    );
  };

  return (
    <div className="bg-black min-h-screen text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          <span className="text-xs font-medium text-zinc-500">
            OOP Specialization
          </span>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Object-Oriented Programming Roadmap
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                A structured reference covering core Object-Oriented concepts, design principles, and placement interview topics with verified GeeksforGeeks technical articles.
              </p>
            </div>

            <Link
              to="/oop/videos"
              className="inline-flex items-center gap-2 shrink-0 rounded-md bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-black hover:bg-zinc-200 transition-colors shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Video Resources</span>
            </Link>
          </div>
        </div>

        {/* Search Bar & Module Stats */}
        <div className="py-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
              placeholder="Search topics or concepts..."
              className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 pl-10 pr-10 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-zinc-400 font-medium">
            {totalTopicsCount} Topics in {modules.length} Modules
          </div>
        </div>

        {/* Modules List */}
        {loading ? (
          <div className="py-12 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse space-y-2 py-4 border-b border-zinc-800">
                <div className="h-6 bg-zinc-900 w-1/3 rounded" />
                <div className="h-10 bg-zinc-950 w-full rounded" />
              </div>
            ))}
          </div>
        ) : filteredModules.length === 0 ? (
          <div className="py-16 text-center text-zinc-500">
            <p className="text-sm sm:text-base font-medium">No topics found matching "{searchQuery}".</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 text-sm font-semibold text-zinc-300 underline hover:text-white"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/80">
            {filteredModules.map((module) => {
              const isExpanded = expandedModules[module.id] !== false;

              return (
                <div key={module.id} className="py-6">
                  {/* Module Header Toggle */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between text-left py-2 group hover:text-zinc-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs text-zinc-500 font-medium">
                        {isExpanded ? "▼" : "▶"}
                      </span>
                      <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                        {module.title}
                      </h2>
                    </div>
                    <span className="text-xs font-medium text-zinc-500">
                      {module.topics.length} {module.topics.length === 1 ? "topic" : "topics"}
                    </span>
                  </button>

                  {/* Module Topics List */}
                  {isExpanded && (
                    <div className="mt-3 space-y-1.5">
                      {module.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 px-4 rounded-lg bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 transition-colors"
                        >
                          {/* Topic Title & Difficulty */}
                          <div className="flex flex-wrap items-center gap-2.5 min-w-0 flex-1">
                            <span className="text-sm sm:text-[15px] font-medium text-zinc-200 group-hover:text-white leading-normal">
                              {topic.title}
                            </span>
                            {getDifficultyBadge(topic.difficulty)}
                          </div>

                          {/* Documentation Link */}
                          <div className="flex items-center gap-4 text-xs font-medium text-zinc-400 shrink-0">
                            <a
                              href={topic.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors group/link underline-offset-4 hover:underline"
                            >
                              <span>Read Article</span>
                              <svg
                                className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-white transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default OopPage;
