import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getCompanyProblemsData } from "../services/companyProblemService.js";
import LoadingState from "../components/common/LoadingState.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import Badge from "../components/common/Badge.jsx";

const STORAGE_KEY = "placeprep-company-problems-solved";
const TITLE_STORAGE_KEY = "placeprep-company-problems-solved-titles";

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
};

const POPULARITY_STYLES = {
  "Very Hot": "bg-rose-500/10 text-rose-400 ring-rose-500/20 border-rose-500/30",
  Hot: "bg-orange-500/10 text-orange-400 ring-orange-500/20 border-orange-500/30",
  Warm: "bg-amber-500/10 text-amber-400 ring-amber-500/20 border-amber-500/30",
};

function getProblemLink(title, platform) {
  if (platform === "GeeksforGeeks") {
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    return `https://www.geeksforgeeks.org/${slug}/`;
  }
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://leetcode.com/problems/${slug}/`;
}

function CompanyDsaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCompany = searchParams.get("company") || "microsoft";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState(initialCompany);

  useEffect(() => {
    const compParam = searchParams.get("company");
    if (compParam && compParam !== selectedCompany) {
      setSelectedCompany(compParam);
    }
  }, [searchParams]);

  const handleSelectCompany = (compKey) => {
    setSelectedCompany(compKey);
    setSearchParams({ company: compKey }, { replace: true });
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [popularityFilter, setPopularityFilter] = useState("ALL");
  const [tagFilter, setTagFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  // Solved tracking by numeric IDs
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Solved tracking by normalized problem titles (cross-company sync)
  const [solvedTitles, setSolvedTitles] = useState(() => {
    try {
      const saved = localStorage.getItem(TITLE_STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    getCompanyProblemsData()
      .then((res) => {
        setData(res);
        setLoading(false);

        // Migrate/sync title-based set from existing solvedIds if available
        if (res?.problems && solvedIds.length > 0) {
          setSolvedTitles((prevSet) => {
            const nextSet = new Set(prevSet);
            res.problems.forEach((p) => {
              if (solvedIds.includes(p.id)) {
                nextSet.add(p.title.trim().toLowerCase());
              }
            });
            try {
              localStorage.setItem(
                TITLE_STORAGE_KEY,
                JSON.stringify(Array.from(nextSet))
              );
            } catch (e) {
              console.error(e);
            }
            return nextSet;
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Check if a problem is solved either by ID or normalized title
  const isProblemSolved = (prob) => {
    const normTitle = prob.title.trim().toLowerCase();
    return solvedTitles.has(normTitle) || solvedIds.includes(prob.id);
  };

  // Toggle solved status across ALL companies containing this problem
  const toggleSolved = (prob) => {
    const normTitle = prob.title.trim().toLowerCase();

    // Find all matching problem IDs for this title across all companies
    const matchingIds = data?.problems
      ? data.problems
          .filter((p) => p.title.trim().toLowerCase() === normTitle)
          .map((p) => p.id)
      : [prob.id];

    const currentlySolved = isProblemSolved(prob);

    setSolvedTitles((prev) => {
      const next = new Set(prev);
      if (currentlySolved) {
        next.delete(normTitle);
      } else {
        next.add(normTitle);
      }
      try {
        localStorage.setItem(TITLE_STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch (e) {
        console.error(e);
      }
      return next;
    });

    setSolvedIds((prevIds) => {
      let nextIds;
      if (currentlySolved) {
        nextIds = prevIds.filter((id) => !matchingIds.includes(id));
      } else {
        nextIds = Array.from(new Set([...prevIds, ...matchingIds]));
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
      } catch (e) {
        console.error(e);
      }
      return nextIds;
    });
  };

  const activeCompanyObj = useMemo(() => {
    if (!data?.companies) return null;
    return data.companies.find((c) => c.id === selectedCompany);
  }, [data, selectedCompany]);

  // Extract unique tags for dropdown
  const allTags = useMemo(() => {
    if (!data?.problems) return [];
    const tagsSet = new Set();
    data.problems.forEach((p) => {
      p.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet).sort();
  }, [data]);

  // Filter problems for active company and search/filters
  const filteredProblems = useMemo(() => {
    if (!data?.problems) return [];
    return data.problems.filter((p) => {
      if (p.companyId !== selectedCompany) return false;
      if (
        difficultyFilter !== "ALL" &&
        p.difficulty.toUpperCase() !== difficultyFilter
      )
        return false;
      if (
        popularityFilter !== "ALL" &&
        p.popularity.toUpperCase() !== popularityFilter.toUpperCase()
      )
        return false;
      if (tagFilter !== "ALL" && !p.tags.includes(tagFilter)) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !tagMatch) return false;
      }
      return true;
    });
  }, [
    data,
    selectedCompany,
    difficultyFilter,
    popularityFilter,
    tagFilter,
    searchQuery,
  ]);

  // Stats calculation
  const stats = useMemo(() => {
    if (!data?.problems)
      return { total: 0, solved: 0, easy: 0, medium: 0, hard: 0 };
    const companyProbs = data.problems.filter(
      (p) => p.companyId === selectedCompany
    );
    const total = companyProbs.length;
    const solved = companyProbs.filter((p) => isProblemSolved(p)).length;
    const easy = companyProbs.filter((p) => p.difficulty === "Easy").length;
    const medium = companyProbs.filter((p) => p.difficulty === "Medium").length;
    const hard = companyProbs.filter((p) => p.difficulty === "Hard").length;
    return { total, solved, easy, medium, hard };
  }, [data, selectedCompany, solvedIds, solvedTitles]);

  // Company-wise solved count map for tabs
  const companySolvedCounts = useMemo(() => {
    if (!data?.problems) return {};
    const counts = {};
    data.problems.forEach((p) => {
      if (!counts[p.companyId]) counts[p.companyId] = 0;
      if (isProblemSolved(p)) {
        counts[p.companyId]++;
      }
    });
    return counts;
  }, [data, solvedIds, solvedTitles]);

  // Map of problem title to array of companies asking it
  const companyOccurrences = useMemo(() => {
    if (!data?.problems) return {};
    const map = {};
    data.problems.forEach((p) => {
      const key = p.title.trim().toLowerCase();
      if (!map[key]) map[key] = [];
      if (!map[key].includes(p.company)) {
        map[key].push(p.company);
      }
    });
    return map;
  }, [data]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <LoadingState />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState />
      </div>
    );
  }

  const progressPercent =
    stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      {/* ── HERO HEADER ──────────────────────────────────────────────── */}
      <section className="relative border-b border-gray-800/80 bg-gradient-to-b from-blue-950/30 via-gray-950 to-gray-950 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Company-Specific Placement Track
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Company-Wise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">DSA Questions</span>
          </h1>
          <p className="mt-4 text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Targeted problem sets asked in tech interviews at top product companies. Master high-frequency questions tagged by difficulty and interview frequency. Solved questions automatically update across all companies!
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* ── COMPANY TABS SELECTOR ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-gray-800 pb-6">
          {data.companies.map((comp) => {
            const isActive = selectedCompany === comp.id;
            const solvedCount = companySolvedCounts[comp.id] || 0;
            return (
              <button
                key={comp.id}
                onClick={() => !comp.disabled && handleSelectCompany(comp.id)}
                disabled={comp.disabled}
                className={`flex items-center gap-2.5 rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-blue-500/50 bg-blue-600/15 text-white ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10"
                    : comp.disabled
                    ? "border-gray-800/60 bg-gray-900/40 text-gray-600 cursor-not-allowed opacity-60"
                    : "border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700 hover:bg-gray-800/60"
                }`}
              >
                <span className="text-xl">{comp.logo}</span>
                <span>{comp.name}</span>
                {comp.problemCount > 0 && (
                  <span
                    className={`ml-1 rounded-full px-2 py-0.5 text-xs transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white font-bold"
                        : solvedCount > 0
                        ? "bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {solvedCount > 0
                      ? `${solvedCount}/${comp.problemCount}`
                      : comp.problemCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── PROGRESS & STATS BANNER ──────────────────────────────── */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeCompanyObj?.logo || "💻"}</span>
                <h2 className="text-xl font-bold text-white">
                  {activeCompanyObj?.name || "Microsoft"} Interview Track
                </h2>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {stats.total} curated high-frequency questions for technical phone screens & onsite rounds.
              </p>
            </div>

            {/* Progress Bar & Badges */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-gray-300">
                  Solved {stats.solved} of {stats.total} problems
                </span>
                <span className="text-blue-400 font-mono font-bold">
                  {progressPercent}% Complete
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400">
                <span>Easy: <strong className="text-emerald-400">{stats.easy}</strong></span>
                <span>Medium: <strong className="text-amber-400">{stats.medium}</strong></span>
                <span>Hard: <strong className="text-rose-400">{stats.hard}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTROLS & FILTER BAR ─────────────────────────────────── */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search problem name or topic tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-900 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filter Selects */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="ALL">Difficulty: All</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>

            {/* Popularity Filter */}
            <select
              value={popularityFilter}
              onChange={(e) => setPopularityFilter(e.target.value)}
              className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="ALL">Frequency: All</option>
              <option value="VERY HOT">Very Hot 🔥🔥</option>
              <option value="HOT">Hot 🔥</option>
              <option value="WARM">Warm ☀️</option>
            </select>

            {/* Tag Filter */}
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-300 focus:border-blue-500 focus:outline-none max-w-[150px]"
            >
              <option value="ALL">Tag: All</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex rounded-xl border border-gray-800 bg-gray-900 p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === "table" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
                title="Table View"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
                title="Grid View"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6a2.25 2.25 0 012.25-2.25h12a2.25 2.25 0 012.25 2.25v12a2.25 2.25 0 01-2.25 2.25h-12A2.25 2.25 0 013.75 18V6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── PROBLEM LISTING ───────────────────────────────────────── */}
        {filteredProblems.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
            <p className="text-gray-400 text-sm">
              No problems match your selected filters. Try clearing your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("ALL");
                setPopularityFilter("ALL");
                setTagFilter("ALL");
              }}
              className="mt-4 rounded-xl bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-200 hover:bg-gray-700"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "table" ? (
          /* TABLE VIEW */
          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-950/80 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-4 w-12 text-center">Done</th>
                  <th className="py-4 px-3 w-12 text-center">#</th>
                  <th className="py-4 px-4">Problem Name</th>
                  <th className="py-4 px-4">Tags</th>
                  <th className="py-4 px-3 text-center">Difficulty</th>
                  <th className="py-4 px-3 text-center">Popularity</th>
                  <th className="py-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/80 text-xs sm:text-sm">
                {filteredProblems.map((prob) => {
                  const isSolved = isProblemSolved(prob);
                  const link = getProblemLink(prob.title, prob.platform);
                  const askedCompanies =
                    companyOccurrences[prob.title.trim().toLowerCase()] || [];
                  const isShared = askedCompanies.length > 1;

                  return (
                    <tr
                      key={prob.id}
                      className={`transition-colors ${
                        isSolved
                          ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                          : "hover:bg-gray-800/40"
                      }`}
                    >
                      {/* Solved Checkbox */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleSolved(prob)}
                          className={`inline-flex h-5 w-5 items-center justify-center rounded border transition-all ${
                            isSolved
                              ? "bg-emerald-500 border-emerald-500 text-gray-950"
                              : "border-gray-700 bg-gray-950 hover:border-gray-500 text-transparent"
                          }`}
                        >
                          <svg
                            className="h-3.5 w-3.5 stroke-[3]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                      </td>

                      {/* Number */}
                      <td className="py-3.5 px-3 text-center font-mono text-gray-500 font-medium">
                        {prob.id}
                      </td>

                      {/* Title */}
                      <td className="py-3.5 px-4 font-semibold">
                        <div className="flex flex-col gap-0.5">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:text-blue-400 transition-colors ${
                              isSolved ? "text-gray-500 line-through" : "text-gray-200"
                            }`}
                          >
                            {prob.title}
                          </a>
                          {isShared && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-normal text-indigo-400/90">
                              <svg
                                className="w-3 h-3 text-indigo-400 shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0-12.814a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm0 12.814a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                />
                              </svg>
                              Asked in {askedCompanies.join(", ")}
                              {isSolved && (
                                <span className="text-emerald-400 font-medium ml-1">
                                  ✓ Solved across companies
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Tags */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {prob.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-3 text-center">
                        <Badge
                          className={`ring-1 ring-inset ${
                            DIFFICULTY_STYLES[prob.difficulty] ||
                            "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {prob.difficulty}
                        </Badge>
                      </td>

                      {/* Popularity */}
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${
                            POPULARITY_STYLES[prob.popularity] ||
                            "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {prob.popularity === "Very Hot"
                            ? "Very Hot 🔥"
                            : prob.popularity === "Hot"
                            ? "Hot 🔥"
                            : "Warm ☀️"}
                        </span>
                      </td>

                      {/* Action Link */}
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-gray-800 hover:bg-blue-600 px-3 py-1.5 text-xs font-semibold text-gray-200 hover:text-white transition-all"
                        >
                          {prob.platform || "LeetCode"}
                          <svg
                            className="h-3 w-3"
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProblems.map((prob) => {
              const isSolved = isProblemSolved(prob);
              const link = getProblemLink(prob.title, prob.platform);
              const askedCompanies =
                companyOccurrences[prob.title.trim().toLowerCase()] || [];
              const isShared = askedCompanies.length > 1;

              return (
                <div
                  key={prob.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
                    isSolved
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-gray-800 bg-gray-900 hover:border-blue-500/30"
                  }`}
                >
                  <div>
                    {/* Header: ID + Difficulty + Popularity */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-gray-500">
                        #{prob.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Badge
                          className={`ring-1 ring-inset ${
                            DIFFICULTY_STYLES[prob.difficulty]
                          }`}
                        >
                          {prob.difficulty}
                        </Badge>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                            POPULARITY_STYLES[prob.popularity]
                          }`}
                        >
                          {prob.popularity}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-base font-semibold leading-snug ${
                        isSolved ? "text-gray-500 line-through" : "text-gray-100"
                      }`}
                    >
                      {prob.title}
                    </h3>

                    {/* Shared Info Badge */}
                    {isShared && (
                      <div className="mt-1 text-[11px] font-medium text-indigo-400">
                        Asked in {askedCompanies.join(", ")}
                        {isSolved && (
                          <span className="text-emerald-400 font-bold ml-1">
                            ✓ Solved
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {prob.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-gray-800/80 px-2 py-0.5 text-[11px] font-medium text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleSolved(prob)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                        isSolved
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {isSolved ? "✓ Solved" : "Mark Solved"}
                    </button>

                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-xl bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600 px-3 py-1.5 text-xs font-bold text-blue-400 hover:text-white transition-all"
                    >
                      Solve on {prob.platform || "LeetCode"}
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDsaPage;
