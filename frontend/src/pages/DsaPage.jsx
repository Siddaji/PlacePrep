import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { getProblems, getCachedProblems } from "../services/problemService.js";
import { progressService, normalizeProgressId } from "../services/progressService.js";
import { useAuth } from "../context/AuthContext.jsx";
import FilterBar from "../components/dsa/FilterBar.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

const STORAGE_KEY = "placeprep-solved";

function StatBox({ label, value, color }) {
  const colors = {
    default: "text-zinc-100",
    easy:    "text-emerald-400",
    medium:  "text-amber-400",
    hard:    "text-rose-400",
  };
  return (
    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-[#121212] border border-[#27272A] min-w-[88px]">
      <span className={`text-lg sm:text-xl font-bold font-mono ${colors[color] || colors.default}`}>
        {value}
      </span>
      <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">{label}</span>
    </div>
  );
}

/**
 * Builds structured category sections from curated problems grouped by their main topic.
 * Preserves the order in which topics appear in the dataset.
 */
function buildDsaCategories(allProblems) {
  if (!allProblems || allProblems.length === 0) return [];

  const categoryMap = new Map();

  for (const problem of allProblems) {
    const rawTopic = problem.topic || "General";
    // Normalize topic name for title display (e.g. "Arrays" -> "Array")
    const displayTitle = rawTopic === "Arrays" ? "Array" : rawTopic;
    const categoryKey = rawTopic;

    if (!categoryMap.has(categoryKey)) {
      categoryMap.set(categoryKey, {
        id: `topic-${categoryKey.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        rawTopic,
        title: displayTitle,
        problems: [],
      });
    }
    categoryMap.get(categoryKey).problems.push(problem);
  }

  return Array.from(categoryMap.values());
}

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

const PRIORITY_STYLES = {
  "P0": "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  "P1": "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  "P2": "bg-zinc-800/80 text-zinc-400 border border-zinc-700/60",
  "P0 • Must": "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  "P1 • Important": "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  "P2 • Good": "bg-zinc-800/80 text-zinc-400 border border-zinc-700/60",
  "High": "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  "Medium": "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  "Low": "bg-zinc-800/80 text-zinc-400 border border-zinc-700/60",
};

function formatPriority(p) {
  if (!p) return null;
  if (p === "P0" || p === "High") return "P0 • Must";
  if (p === "P1" || p === "Medium" || p === "Important") return "P1 • Important";
  if (p === "P2" || p === "Low" || p === "Good") return "P2 • Good";
  return p;
}

function toLeetCodeUrl(title) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://leetcode.com/problems/${slug}/`;
}

/**
 * Memoized Horizontal Problem Card Component
 */
const DsaHorizontalProblemCard = memo(function DsaHorizontalProblemCard({
  problem,
  isSolved,
  onToggleSolved,
}) {
  const leetCodeUrl = toLeetCodeUrl(problem.title);
  const formattedPriority = formatPriority(problem.priority);

  return (
    <div
      className={`w-[260px] sm:w-[280px] shrink-0 flex flex-col justify-between rounded-xl border p-4 transition-all duration-150 ${
        isSolved
          ? "border-emerald-500/30 bg-emerald-950/15"
          : "border-[#27272A] bg-[#141417] hover:border-zinc-700"
      }`}
    >
      <div>
        {/* Top Header: Checkbox Indicator + Difficulty/Priority Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Solved Check Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleSolved(problem.id)}
            className="shrink-0 p-1 -m-1 rounded-full transition-transform active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
            aria-label={isSolved ? "Mark as unsolved" : "Mark as solved"}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                isSolved
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                  : "border-zinc-700 bg-zinc-900/90 hover:border-zinc-500 text-transparent"
              }`}
            >
              {isSolved && (
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
          </button>

          {/* Badges: Difficulty & Priority */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {problem.difficulty && (
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                  DIFFICULTY_STYLES[problem.difficulty] || "bg-zinc-800 text-zinc-300 border-zinc-700"
                }`}
              >
                {problem.difficulty}
              </span>
            )}

            {formattedPriority && (
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                  PRIORITY_STYLES[problem.priority] || PRIORITY_STYLES[formattedPriority] || "bg-zinc-800 text-zinc-300 border-zinc-700"
                }`}
              >
                {formattedPriority}
              </span>
            )}
          </div>
        </div>

        {/* Problem Title */}
        <h4
          className={`text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2 ${
            isSolved ? "text-zinc-500 line-through" : "text-zinc-100"
          }`}
          title={problem.title}
        >
          {problem.title}
        </h4>

        {/* Company Tags */}
        {problem.companies && problem.companies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 items-center">
            {problem.companies.slice(0, 3).map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/60 text-zinc-300"
              >
                {comp}
              </span>
            ))}
            {problem.companies.length > 3 && (
              <span className="text-[10px] text-zinc-500 font-medium px-1">
                +{problem.companies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action: Solve Link Button */}
      <div className="mt-4 pt-3 border-t border-[#27272A]/70">
        <a
          href={leetCodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-zinc-200 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 transition-colors"
        >
          <span>Solve</span>
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
      </div>
    </div>
  );
});

/**
 * Memoized DSA Topic Category Section row component with Horizontal Scrolling List
 */
const DsaTopicSection = memo(function DsaTopicSection({
  category,
  isExpanded,
  onToggle,
  solvedIds,
  matchingProblems,
  onToggleSolved,
}) {
  const categoryTotal = category.problems.length;
  const categorySolved = category.problems.filter((p) => {
    const pId = p.id;
    const numId = Number(pId);
    return solvedIds.has(pId) || (!isNaN(numId) && solvedIds.has(numId));
  }).length;

  const isCompleted = categorySolved === categoryTotal && categoryTotal > 0;

  return (
    <div className="rounded-xl border border-[#27272A] bg-[#121212] overflow-hidden transition-colors">
      {/* Expandable Section Header Row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-[#121212] hover:bg-[#18181B] transition-colors duration-150 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-600"
      >
        {/* Category / Topic Title matching existing PlacePrep styling */}
        <div className="flex items-center gap-3 min-w-0 pr-3">
          <span className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight truncate">
            {category.title}
          </span>
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
            ({categoryTotal} {categoryTotal === 1 ? "problem" : "problems"})
          </span>
        </div>

        {/* Right Side: Progress Count + Chevron */}
        <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
          <span
            className={`font-mono text-sm sm:text-base font-semibold ${
              isCompleted ? "text-emerald-400" : "text-zinc-300"
            }`}
          >
            {categorySolved}/{categoryTotal}
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

      {/* Collapsible Horizontal Problem Tracker */}
      <div
        className={`grid transition-[grid-template-rows] duration-250 ease-in-out ${
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#27272A] bg-[#0E0E11]/60">
            {matchingProblems.length === 0 ? (
              <p className="text-xs sm:text-sm text-zinc-500 py-4 px-6 italic text-center">
                No problems match the current filter in this section.
              </p>
            ) : (
              <div className="w-full max-w-full overflow-x-auto overscroll-x-contain py-4 px-4 sm:px-6 flex items-stretch gap-3.5 scroll-smooth [scrollbar-width:thin] [scrollbar-color:#27272A_transparent] [-webkit-overflow-scrolling:touch]">
                {matchingProblems.map((p) => {
                  const pId = p.id;
                  const numId = Number(pId);
                  const isSolved = solvedIds.has(pId) || (!isNaN(numId) && solvedIds.has(numId));
                  return (
                    <DsaHorizontalProblemCard
                      key={p.id}
                      problem={p}
                      isSolved={isSolved}
                      onToggleSolved={onToggleSolved}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

function DsaPage() {
  const { isAuthenticated } = useAuth();
  const [problems, setProblems]       = useState(() => getCachedProblems() || []);
  const [loading, setLoading]         = useState(() => !getCachedProblems());
  const [search, setSearch]           = useState("");
  const [topic, setTopic]             = useState("All");
  const [difficulty, setDifficulty]   = useState("All");
  const [priority, setPriority]       = useState("All");
  const [showUnsolved, setShowUnsolved] = useState(false);

  // Set of expanded category IDs (first topic expanded by default)
  const [expandedCategories, setExpandedCategories] = useState(() => new Set(["topic-arrays"]));

  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return new Set();
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return new Set();
      const cleanIds = parsed.map(normalizeProgressId).filter((id) => id !== null);
      return new Set(cleanIds);
    } catch {
      return new Set();
    }
  });

  const loadProgressFromCloud = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const res = await progressService.getProgress("dsa");
        if (res && res.success && Array.isArray(res.progress)) {
          const cleanIds = res.progress.map(normalizeProgressId).filter((id) => id !== null);
          setSolvedIds(new Set(cleanIds));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanIds));
        }
      } catch (err) {
        console.error("Failed to load DSA cloud progress:", err);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!getCachedProblems()) {
      getProblems()
        .then((data) => {
          setProblems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    loadProgressFromCloud();
  }, [loadProgressFromCloud]);

  // Listen for background sync updates from AuthContext
  useEffect(() => {
    const handleProgressUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail.dsa)) {
        const cleanIds = e.detail.dsa.map(normalizeProgressId).filter((id) => id !== null);
        setSolvedIds(new Set(cleanIds));
      }
    };
    window.addEventListener("placeprep-progress-updated", handleProgressUpdate);
    return () => window.removeEventListener("placeprep-progress-updated", handleProgressUpdate);
  }, []);

  const toggleSolved = useCallback(
    (id) => {
      const numericId = normalizeProgressId(id);
      if (numericId === null) return;
      const isCurrentlySolved = solvedIds.has(numericId) || solvedIds.has(String(numericId));

      setSolvedIds((prev) => {
        const next = new Set(prev);
        if (isCurrentlySolved) {
          next.delete(numericId);
          next.delete(String(numericId));
        } else {
          next.add(numericId);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
        return next;
      });

      if (isAuthenticated) {
        if (isCurrentlySolved) {
          progressService
            .uncompleteResource("dsa", String(numericId))
            .catch((err) => console.error("DSA uncomplete sync error:", err));
        } else {
          progressService
            .completeResource("dsa", String(numericId))
            .catch((err) => console.error("DSA complete sync error:", err));
        }
      }
    },
    [isAuthenticated, solvedIds]
  );

  const clearFilters = () => {
    setSearch("");
    setTopic("All");
    setDifficulty("All");
    setPriority("All");
    setShowUnsolved(false);
  };

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  // Build Category sections from dataset
  const dsaCategories = useMemo(() => {
    return buildDsaCategories(problems);
  }, [problems]);

  const expandAll = useCallback(() => {
    if (!dsaCategories) return;
    setExpandedCategories(new Set(dsaCategories.map((c) => c.id)));
  }, [dsaCategories]);

  const collapseAll = useCallback(() => {
    setExpandedCategories(new Set());
  }, []);

  // Overall statistics
  const easyCount   = useMemo(() => problems.filter((p) => p.difficulty === "Easy").length, [problems]);
  const mediumCount = useMemo(() => problems.filter((p) => p.difficulty === "Medium").length, [problems]);
  const hardCount   = useMemo(() => problems.filter((p) => p.difficulty === "Hard").length, [problems]);
  const topicCount  = useMemo(() => new Set(problems.map((p) => p.topic)).size, [problems]);
  const topics      = useMemo(() => [...new Set(problems.map((p) => p.topic))].sort(), [problems]);
  const solvedCount = solvedIds.size;
  const totalCount  = problems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Filter problems per category
  const isFilterActive = search.trim() !== "" || topic !== "All" || difficulty !== "All" || priority !== "All" || showUnsolved;

  const categoriesWithMatchingProblems = useMemo(() => {
    const searchLower = search.toLowerCase().trim();

    return dsaCategories
      .map((category) => {
        const matchingProblems = category.problems.filter((p) => {
          const pId = p.id;
          const numId = Number(pId);
          const isSolved = solvedIds.has(pId) || (!isNaN(numId) && solvedIds.has(numId));
          const matchesSearch =
            !searchLower ||
            p.title.toLowerCase().includes(searchLower) ||
            (p.pattern && p.pattern.toLowerCase().includes(searchLower)) ||
            (p.companies && p.companies.some((c) => c.toLowerCase().includes(searchLower)));
          const matchesTopic      = topic === "All" || p.topic === topic;
          const matchesDifficulty = difficulty === "All" || p.difficulty === difficulty;
          const matchesPriority   = priority === "All" || p.priority === priority;
          const matchesUnsolved   = !showUnsolved || !isSolved;

          return matchesSearch && matchesTopic && matchesDifficulty && matchesPriority && matchesUnsolved;
        });

        return {
          category,
          matchingProblems,
        };
      })
      .filter((item) => (isFilterActive ? item.matchingProblems.length > 0 : true));
  }, [dsaCategories, search, topic, difficulty, priority, showUnsolved, solvedIds, isFilterActive]);

  // Total matching problems count
  const totalFilteredProblemsCount = useMemo(() => {
    return categoriesWithMatchingProblems.reduce((acc, curr) => acc + curr.matchingProblems.length, 0);
  }, [categoriesWithMatchingProblems]);

  return (
    <div>
      {/* Page Header */}
      <div className="border-b border-[#27272A] bg-[#0B0B0B]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h1 className="text-3xl sm:text-[36px] font-bold tracking-tight text-[#F5F5F5]">
                DSA Problem Tracker
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                Curated interview problems by topic and pattern — complete with LeetCode solutions.
              </p>
            </div>

            {/* Overall Progress Widget */}
            {loading ? (
              <div className="sm:text-right bg-[#121212] border border-[#27272A] p-4 rounded-xl shrink-0 w-full sm:w-56 h-[78px] animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-28 sm:ml-auto mb-2.5" />
                <div className="h-1.5 bg-zinc-800 rounded-full w-full" />
              </div>
            ) : totalCount > 0 ? (
              <div className="sm:text-right bg-[#121212] border border-[#27272A] p-4 rounded-lg shrink-0">
                <p className="text-sm font-semibold text-zinc-200">
                  {solvedCount}{" "}
                  <span className="font-normal text-zinc-400">/ {totalCount} Solved</span>
                </p>
                <div className="mt-2 w-full sm:w-48 h-1.5 rounded-full bg-zinc-800">
                  <div
                    className="h-1.5 rounded-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs font-mono text-zinc-400">{progressPct}% completed</p>
              </div>
            ) : null}
          </div>

          {/* Stat Strip */}
          {loading ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-[#121212] border border-[#27272A] min-w-[88px] h-[66px] animate-pulse space-y-1"
                >
                  <div className="h-5 w-8 bg-zinc-800 rounded" />
                  <div className="h-3 w-12 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <StatBox label="Total"  value={totalCount}  color="default" />
              <StatBox label="Easy"   value={easyCount}   color="easy" />
              <StatBox label="Medium" value={mediumCount} color="medium" />
              <StatBox label="Hard"   value={hardCount}   color="hard" />
              <StatBox label="Topics" value={topicCount}  color="default" />
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        topics={topics}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        topic={topic}
        onTopicChange={(e) => setTopic(e.target.value)}
        difficulty={difficulty}
        onDifficultyChange={(e) => setDifficulty(e.target.value)}
        priority={priority}
        onPriorityChange={(e) => setPriority(e.target.value)}
        showUnsolved={showUnsolved}
        onToggleUnsolved={() => setShowUnsolved((prev) => !prev)}
        onClearFilters={clearFilters}
      />

      {/* Main Problems Categories List */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <p className="text-sm font-medium text-zinc-400">
            Showing{" "}
            <span className="text-zinc-100 font-bold">
              {loading ? "..." : totalFilteredProblemsCount}
            </span>{" "}
            of{" "}
            <span className="text-zinc-100 font-bold">{loading ? "..." : totalCount}</span> problems
            {isFilterActive && " (filtered)"}
          </p>

          {!loading && dsaCategories.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-md border border-zinc-800 transition-colors"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-md border border-zinc-800 transition-colors"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-3.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-[#27272A] bg-[#121212] p-5 h-16 animate-pulse flex items-center justify-between"
              >
                <div className="h-5 bg-zinc-800 rounded w-48" />
                <div className="h-5 bg-zinc-800 rounded w-16" />
              </div>
            ))}
          </div>
        ) : categoriesWithMatchingProblems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3.5">
            {categoriesWithMatchingProblems.map(({ category, matchingProblems }) => {
              const isExpanded = isFilterActive || expandedCategories.has(category.id);
              return (
                <DsaTopicSection
                  key={category.id}
                  category={category}
                  isExpanded={isExpanded}
                  onToggle={() => toggleCategory(category.id)}
                  solvedIds={solvedIds}
                  matchingProblems={matchingProblems}
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

export default DsaPage;

