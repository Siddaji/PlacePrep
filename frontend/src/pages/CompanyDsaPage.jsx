import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getCompanyProblemsData } from "../services/companyProblemService.js";
import LoadingState from "../components/common/LoadingState.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

// Inline SVG Icon components to ensure no missing dependency errors
const Search = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArrowLeft = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const Check = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ExternalLink = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Building2 = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const Code2 = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

const RefreshCw = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const STORAGE_KEY = "placeprep-company-problems-solved";
const TITLE_STORAGE_KEY = "placeprep-company-problems-solved-titles";

const COMPANY_DESCRIPTIONS = {
  microsoft: "Core data structures, trees, dynamic programming & system questions.",
  google: "High-frequency graph algorithms, DP puzzles & complex recursion.",
  amazon: "Problem solving, arrays, trees, and core data structure foundations.",
  meta: "Fast-paced coding, binary search, trees & recursion algorithms.",
  netflix: "High-throughput algorithms, sliding windows & senior interview prep.",
  linkedin: "Concurrency, API design, hash maps & stack data structures.",
};

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

function getProblemLink(title, platform) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  if (platform === "GeeksforGeeks") {
    return `https://www.geeksforgeeks.org/${slug}/`;
  }
  return `https://leetcode.com/problems/${slug}/`;
}

export default function CompanyDsaPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected company state (null = show all cards, companyId = show problems)
  const [activeCompanyId, setActiveCompanyId] = useState(() => searchParams.get("company") || null);

  // Search query for cards
  const [searchCompany, setSearchCompany] = useState("");

  // Search & Filters inside company problems view
  const [searchProblem, setSearchProblem] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");

  // Solved tracking states
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [solvedTitles, setSolvedTitles] = useState(() => {
    try {
      const saved = localStorage.getItem(TITLE_STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    const compParam = searchParams.get("company");
    if (compParam !== activeCompanyId) {
      setActiveCompanyId(compParam);
    }
  }, [searchParams]);

  useEffect(() => {
    getCompanyProblemsData()
      .then((res) => {
        setData(res);
        setLoading(false);

        if (res?.problems && solvedIds.length > 0) {
          setSolvedTitles((prevSet) => {
            const nextSet = new Set(prevSet);
            res.problems.forEach((p) => {
              if (solvedIds.includes(p.id)) {
                nextSet.add(p.title.trim().toLowerCase());
              }
            });
            try {
              localStorage.setItem(TITLE_STORAGE_KEY, JSON.stringify(Array.from(nextSet)));
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

  const handleOpenCompany = (companyId) => {
    setActiveCompanyId(companyId);
    setSearchParams({ company: companyId }, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGrid = () => {
    setActiveCompanyId(null);
    setSearchParams({}, { replace: true });
  };

  const isProblemSolved = (prob) => {
    const normTitle = prob.title.trim().toLowerCase();
    return solvedTitles.has(normTitle) || solvedIds.includes(prob.id);
  };

  const toggleSolved = (prob, e) => {
    if (e) e.stopPropagation();
    const normTitle = prob.title.trim().toLowerCase();

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
      } catch (err) {
        console.error(err);
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
      } catch (err) {
        console.error(err);
      }
      return nextIds;
    });
  };

  const companyStatsMap = useMemo(() => {
    if (!data?.problems || !data?.companies) return {};
    const map = {};
    data.companies.forEach((comp) => {
      const compProbs = data.problems.filter((p) => p.companyId === comp.id);
      const solved = compProbs.filter((p) => isProblemSolved(p)).length;
      map[comp.id] = {
        total: comp.problemCount || compProbs.length,
        solved,
      };
    });
    return map;
  }, [data, solvedIds, solvedTitles]);

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

  const activeCompanyObj = useMemo(() => {
    if (!data?.companies || !activeCompanyId) return null;
    return data.companies.find((c) => c.id === activeCompanyId);
  }, [data, activeCompanyId]);

  const filteredCompanyCards = useMemo(() => {
    if (!data?.companies) return [];
    if (!searchCompany.trim()) return data.companies;
    return data.companies.filter((c) =>
      c.name.toLowerCase().includes(searchCompany.toLowerCase())
    );
  }, [data, searchCompany]);

  const filteredProblems = useMemo(() => {
    if (!data?.problems || !activeCompanyId) return [];
    return data.problems.filter((p) => {
      if (p.companyId !== activeCompanyId) return false;

      if (difficultyFilter !== "ALL" && p.difficulty.toUpperCase() !== difficultyFilter) {
        return false;
      }

      if (searchProblem.trim() !== "") {
        const q = searchProblem.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !tagMatch) return false;
      }

      return true;
    });
  }, [data, activeCompanyId, difficultyFilter, searchProblem, solvedIds, solvedTitles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-zinc-100 flex items-center justify-center py-20">
        <LoadingState />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-zinc-100 flex items-center justify-center py-20">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-zinc-100 font-sans pb-20">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#0b0c10]/95 backdrop-blur border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeCompanyId ? (
              <button
                onClick={handleBackToGrid}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4 text-blue-400" />
                <span>All Companies</span>
              </button>
            ) : (
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
            )}

            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {activeCompanyId ? activeCompanyObj?.name : "Company-Wise DSA Questions"}
              </h1>
              <p className="text-xs text-zinc-400">
                {activeCompanyId
                  ? `Practice interview problems asked at ${activeCompanyObj?.name}`
                  : "Select a company card to view its problems"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* ── VIEW 1: SIMPLE COMPANY CARDS ────────────────────────── */}
        {!activeCompanyId && (
          <div>
            {/* Minimal Search Bar */}
            <div className="mb-6 relative max-w-sm">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
                placeholder="Search target company..."
                className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
              />
            </div>

            {/* Grid of Minimal Company Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanyCards.map((comp) => {
                const stats = companyStatsMap[comp.id] || { total: 0, solved: 0 };
                const desc = COMPANY_DESCRIPTIONS[comp.id] || "Curated technical interview questions.";

                return (
                  <div
                    key={comp.id}
                    onClick={() => handleOpenCompany(comp.id)}
                    className="group border border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700/80 rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg"
                  >
                    <div>
                      {/* Logo + Name */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl p-2 bg-zinc-950 rounded-xl border border-zinc-800 shrink-0">
                          {comp.logo}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                            {comp.name}
                          </h3>
                          <span className="text-xs text-zinc-400 font-mono">
                            {stats.solved > 0 ? `${stats.solved} / ${stats.total} Solved` : `${stats.total} Questions`}
                          </span>
                        </div>
                      </div>

                      {/* Small Description */}
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    {/* Bottom Question Count Tag */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Code2 className="w-3.5 h-3.5 text-blue-400" />
                        {stats.total} Questions
                      </span>
                      <span className="text-blue-400 font-sans font-semibold group-hover:translate-x-0.5 transition-transform">
                        Open →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── VIEW 2: PROBLEMS LIST FOR SELECTED COMPANY ────────── */}
        {activeCompanyId && activeCompanyObj && (
          <div className="space-y-6">
            
            {/* Minimal Header Banner */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-zinc-900 rounded-2xl border border-zinc-800">
                  {activeCompanyObj.logo}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {activeCompanyObj.name} DSA Problems
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {COMPANY_DESCRIPTIONS[activeCompanyId] || "Curated interview problems."}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-zinc-400">
                <div className="text-sm font-bold text-white">
                  {companyStatsMap[activeCompanyId]?.solved || 0} / {companyStatsMap[activeCompanyId]?.total || 0}
                </div>
                <span>Solved</span>
              </div>
            </div>

            {/* Simple Search & Difficulty Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchProblem}
                  onChange={(e) => setSearchProblem(e.target.value)}
                  placeholder="Search problem title or topic..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 font-medium"
                >
                  <option value="ALL">Difficulty: All</option>
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>

                {(searchProblem || difficultyFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      setSearchProblem("");
                      setDifficultyFilter("ALL");
                    }}
                    className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-xl"
                    title="Reset Filters"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Simple Problem Table */}
            {filteredProblems.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 text-center text-zinc-400 text-xs">
                No problems match your search criteria.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase bg-zinc-950/60">
                      <th className="py-3 px-4 w-12 text-center">Status</th>
                      <th className="py-3 px-3 w-12 text-center">#</th>
                      <th className="py-3 px-4">Problem Name</th>
                      <th className="py-3 px-4">Topics</th>
                      <th className="py-3 px-3 text-center">Difficulty</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                    {filteredProblems.map((prob) => {
                      const isSolved = isProblemSolved(prob);
                      const link = getProblemLink(prob.title, prob.platform);
                      const askedCompanies = companyOccurrences[prob.title.trim().toLowerCase()] || [];

                      return (
                        <tr
                          key={prob.id}
                          className={`transition-colors ${
                            isSolved ? "bg-emerald-950/10 hover:bg-emerald-950/20" : "hover:bg-zinc-800/40"
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={(e) => toggleSolved(prob, e)}
                              className="p-1 rounded hover:scale-105 transition-transform"
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                  isSolved
                                    ? "bg-emerald-600 border-emerald-500 text-white"
                                    : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
                                }`}
                              >
                                {isSolved && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          </td>

                          {/* ID */}
                          <td className="py-3 px-3 text-center font-mono text-zinc-500 text-xs">
                            {prob.id}
                          </td>

                          {/* Title + Asked in Companies */}
                          <td className="py-3 px-4 font-semibold">
                            <div className="flex flex-col gap-0.5">
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-blue-400 transition-colors ${
                                  isSolved ? "text-zinc-500 line-through" : "text-zinc-100"
                                }`}
                              >
                                {prob.title}
                              </a>
                              {askedCompanies.length > 0 && (
                                <span className="text-[11px] font-normal text-zinc-400">
                                  Asked in {askedCompanies.join(", ")}
                                  {isSolved && (
                                    <span className="text-emerald-400 font-medium ml-1">✓ Solved</span>
                                  )}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Tags */}
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {prob.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-mono bg-zinc-950 border border-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Difficulty */}
                          <td className="py-3 px-3 text-center">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                                DIFFICULTY_STYLES[prob.difficulty] || "bg-zinc-800 text-zinc-400"
                              }`}
                            >
                              {prob.difficulty}
                            </span>
                          </td>

                          {/* Link Action */}
                          <td className="py-3 px-4 text-right">
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <span>Solve</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
