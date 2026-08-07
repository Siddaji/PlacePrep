import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getCompanyProblemsData } from "../services/companyProblemService.js";
import LoadingState from "../components/common/LoadingState.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

// Inline SVG Icon components
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
  microsoft: "Frequently asked interview questions covering binary trees, string algorithms, dynamic programming, and core data structures.",
  google: "Challenging technical questions emphasizing graph traversals, DP optimizations, advanced recursion, and math logic.",
  amazon: "High-frequency interview problems focused on array manipulation, binary trees, sliding window, and greedy strategies.",
  meta: "Speed-oriented interview problems featuring binary search, tree traversals, recursion, and string processing.",
  netflix: "System-oriented DSA problems covering two pointers, sliding windows, heaps, and streaming memory constraints.",
  linkedin: "Interview questions prioritizing hash maps, concurrent data structures, stacks, and API string parsing.",
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

  const [activeCompanyId, setActiveCompanyId] = useState(() => searchParams.get("company") || null);
  const [searchCompany, setSearchCompany] = useState("");
  const [searchProblem, setSearchProblem] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");

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
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] flex items-center justify-center py-20">
        <LoadingState />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] flex items-center justify-center py-20">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans pb-20">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-[64px] z-20 bg-[#0B0B0B]/90 backdrop-blur border-b border-[#27272A] px-4 sm:px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            {activeCompanyId ? (
              <button
                onClick={handleBackToGrid}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#121212] border border-[#27272A] text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400" />
                <span>All Companies</span>
              </button>
            ) : (
              <div className="p-2.5 rounded-lg bg-[#121212] border border-[#27272A] text-zinc-300">
                <Building2 className="w-5 h-5" />
              </div>
            )}

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeCompanyId ? activeCompanyObj?.name : "Company-Wise DSA Practice"}
              </h1>
              <p className="text-sm text-zinc-300 mt-0.5">
                {activeCompanyId
                  ? `Targeted interview problems asked at ${activeCompanyObj?.name}`
                  : "Target company specific problem archives from recent technical interviews"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* ── VIEW 1: COMPANY CARDS ────────────────────────── */}
        {!activeCompanyId && (
          <div>
            {/* Search Bar */}
            <div className="mb-6 relative max-w-sm">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
                placeholder="Search target company..."
                className="w-full bg-[#121212] border border-[#27272A] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            {/* Grid of Company Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCompanyCards.map((comp) => {
                const stats = companyStatsMap[comp.id] || { total: 0, solved: 0 };
                const desc = COMPANY_DESCRIPTIONS[comp.id] || "Curated technical interview questions.";

                return (
                  <div
                    key={comp.id}
                    onClick={() => handleOpenCompany(comp.id)}
                    className="group border border-[#27272A] bg-[#121212] hover:bg-[#161618] hover:border-zinc-700 rounded-xl p-6 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Logo + Name */}
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <span className="text-2xl p-2.5 bg-zinc-900 rounded-lg border border-[#27272A] shrink-0">
                          {comp.logo}
                        </span>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-100 transition-colors">
                            {comp.name}
                          </h3>
                          <span className="text-xs sm:text-sm text-zinc-400 font-sans font-medium">
                            {stats.solved > 0 ? `${stats.solved} / ${stats.total} solved` : `${stats.total} interview questions`}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[14px] font-normal text-zinc-400 leading-8 tracking-[0.005em]">
                        {desc}
                      </p>
                    </div>

                    {/* Bottom Question Count Tag */}
                    <div className="mt-5 pt-3.5 border-t border-[#27272A] flex items-center justify-between text-xs sm:text-sm font-sans text-zinc-400">
                      <span className="flex items-center gap-2 text-zinc-400 font-medium">
                        <Code2 className="w-4 h-4 text-zinc-400" />
                        {stats.total} interview questions
                      </span>
                      <span className="text-zinc-200 font-sans font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Explore →
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
            
            {/* Header Banner */}
            <div className="flex items-center justify-between border-b border-[#27272A] pb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl p-3 bg-[#121212] rounded-xl border border-[#27272A]">
                  {activeCompanyObj.logo}
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeCompanyObj.name} DSA Problems
                  </h2>
                  <p className="text-sm text-zinc-300 mt-1">
                    {COMPANY_DESCRIPTIONS[activeCompanyId] || "Curated interview problems."}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono text-sm text-zinc-400 bg-[#121212] border border-[#27272A] px-4 py-2.5 rounded-xl">
                <div className="text-base font-bold text-white">
                  {companyStatsMap[activeCompanyId]?.solved || 0} / {companyStatsMap[activeCompanyId]?.total || 0}
                </div>
                <span className="text-zinc-400 text-xs">Solved</span>
              </div>
            </div>

            {/* Search & Difficulty Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchProblem}
                  onChange={(e) => setSearchProblem(e.target.value)}
                  placeholder="Search problem title or topic..."
                  className="w-full bg-[#121212] border border-[#27272A] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-[#121212] border border-[#27272A] rounded-lg px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600 font-medium cursor-pointer"
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
                    className="p-2.5 text-zinc-300 hover:text-white bg-[#121212] border border-[#27272A] rounded-lg transition-colors"
                    title="Reset Filters"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Problem Table */}
            {filteredProblems.length === 0 ? (
              <div className="bg-[#121212] border border-[#27272A] rounded-xl p-10 text-center text-zinc-400 text-sm">
                No problems match your search criteria.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#27272A] bg-[#121212]">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#27272A] text-xs font-mono text-zinc-400 uppercase tracking-wider bg-zinc-900/80">
                      <th className="py-3 px-4 w-14 text-center">Status</th>
                      <th className="py-3 px-3 w-14 text-center">#</th>
                      <th className="py-3 px-4">Problem Name</th>
                      <th className="py-3 px-4">Topics</th>
                      <th className="py-3 px-3 text-center">Difficulty</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272A] text-sm sm:text-[15px]">
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
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={(e) => toggleSolved(prob, e)}
                              className="p-1 rounded transition-transform"
                            >
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                  isSolved
                                    ? "bg-emerald-600 border-emerald-500 text-white"
                                    : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                                }`}
                              >
                                {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </button>
                          </td>

                          {/* ID */}
                          <td className="py-3.5 px-3 text-center font-mono text-zinc-400 text-xs sm:text-sm">
                            {prob.id}
                          </td>

                          {/* Title + Asked in Companies */}
                          <td className="py-3.5 px-4 font-semibold">
                            <div className="flex flex-col gap-0.5">
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-white transition-colors ${
                                  isSolved ? "text-zinc-500 line-through font-normal" : "text-zinc-100"
                                }`}
                              >
                                {prob.title}
                              </a>
                              {askedCompanies.length > 0 && (
                                <span className="text-xs font-normal text-zinc-400">
                                  Asked in {askedCompanies.join(", ")}
                                  {isSolved && (
                                    <span className="text-emerald-400 font-medium ml-1.5">✓ Solved</span>
                                  )}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Tags */}
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1.5">
                              {prob.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[13px] font-sans font-medium bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 px-2.5 py-1 rounded-md hover:bg-zinc-800 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Difficulty */}
                          <td className="py-3.5 px-3 text-center">
                            <span
                              className={`text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded border ${
                                DIFFICULTY_STYLES[prob.difficulty] || "bg-zinc-800 text-zinc-300"
                              }`}
                            >
                              {prob.difficulty}
                            </span>
                          </td>

                          {/* Link Action */}
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
                            >
                              <span>Solve</span>
                              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
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
