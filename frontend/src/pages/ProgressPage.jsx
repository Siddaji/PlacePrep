import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { progressService, normalizeProgressId } from "../services/progressService.js";
import { getProblems, getCachedProblems } from "../services/problemService.js";
import { getCompanyProblemsData, getCachedCompanyProblemsData } from "../services/companyProblemService.js";
import { getSystemDesignTopics, getCachedSystemDesignTopics } from "../services/systemDesignService.js";
import { getOsModules, getCachedOsModules } from "../services/osService.js";
import { getOopModules, getCachedOopModules } from "../services/oopService.js";
import { getSubjects, getCachedSubjects } from "../services/subjectService.js";

// Storage keys matching individual module pages
const STORAGE_KEYS = {
  dsa: "placeprep-solved",
  "company-dsa": "placeprep-company-problems-solved",
  "system-design": "placeprep-sd-studied",
  os: "placeprep-os-solved-topics",
  oop: "placeprep-oop-solved-topics",
  subjects: "placeprep-subjects-studied",
};

function formatDatasets(dsaProblems, compProblems, sdTopics, osModules, oopModules, subjectsData) {
  // Group Company DSA into unique problems across all companies
  const uniqueCompMap = new Map();
  compProblems.forEach((p) => {
    const normTitle = (p.title || "").trim().toLowerCase() || String(p.id);
    if (!uniqueCompMap.has(normTitle)) {
      uniqueCompMap.set(normTitle, {
        key: normTitle,
        title: p.title,
        associatedIds: new Set(),
      });
    }
    const entry = uniqueCompMap.get(normTitle);
    const normId = normalizeProgressId(p.id);
    if (normId !== null) {
      entry.associatedIds.add(normId);
      entry.associatedIds.add(Number(normId));
      entry.associatedIds.add(String(normId));
    }
  });
  const uniqueCompProblems = Array.from(uniqueCompMap.values());

  // OS topics are nested inside modules
  const osTopics = [];
  (osModules || []).forEach((m) => {
    if (Array.isArray(m.topics)) {
      m.topics.forEach((t) => osTopics.push(t));
    }
  });

  // OOP topics are nested inside modules
  const oopTopics = [];
  (oopModules || []).forEach((m) => {
    if (Array.isArray(m.topics)) {
      m.topics.forEach((t) => oopTopics.push(t));
    }
  });

  // Subjects topics are nested inside subjects
  const subjectsTopics = [];
  (subjectsData || []).forEach((s) => {
    if (Array.isArray(s.topics)) {
      s.topics.forEach((t) => subjectsTopics.push(t));
    }
  });

  return {
    dsa: {
      items: dsaProblems || [],
      idSet: new Set((dsaProblems || []).map((p) => normalizeProgressId(p.id))),
    },
    "company-dsa": {
      items: compProblems || [],
      uniqueProblems: uniqueCompProblems,
      idSet: new Set((compProblems || []).map((p) => normalizeProgressId(p.id))),
    },
    "system-design": {
      items: sdTopics || [],
      idSet: new Set((sdTopics || []).map((t) => normalizeProgressId(t.id))),
    },
    os: {
      items: osTopics,
      idSet: new Set(osTopics.map((t) => normalizeProgressId(t.id))),
    },
    oop: {
      items: oopTopics,
      idSet: new Set(oopTopics.map((t) => normalizeProgressId(t.id))),
    },
    subjects: {
      items: subjectsTopics,
      idSet: new Set(subjectsTopics.map((t) => normalizeProgressId(t.id))),
    },
  };
}

function getInitialDatasets() {
  const dsa = getCachedProblems();
  const comp = getCachedCompanyProblemsData()?.problems;
  const sd = getCachedSystemDesignTopics();
  const os = getCachedOsModules();
  const oop = getCachedOopModules();
  const subj = getCachedSubjects();

  if (dsa && comp && sd && os && oop && subj) {
    return formatDatasets(dsa, comp, sd, os, oop, subj);
  }
  return null;
}

// Module metadata & routes
const MODULE_CONFIG = [
  {
    id: "dsa",
    title: "DSA Tracker",
    shortTitle: "DSA",
    route: "/dsa",
    description: "Topic-wise problem sets by difficulty, pattern & priority",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: "company-dsa",
    title: "Company-wise DSA",
    shortTitle: "Company DSA",
    route: "/company-dsa",
    description: "High-frequency interview questions from top tech firms",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "system-design",
    title: "System Design",
    shortTitle: "System Design",
    route: "/system-design",
    description: "Distributed systems, architectural fundamentals & case studies",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
  },
  {
    id: "os",
    title: "Operating Systems",
    shortTitle: "Operating Systems",
    route: "/os",
    description: "Processes, CPU scheduling, deadlocks, memory & concurrency",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25a3.75 3.75 0 013.75-3.75h9a3.75 3.75 0 013.75 3.75v3a3.75 3.75 0 01-3.75 3.75h-9a3.75 3.75 0 01-3.75-3.75v-3zM5.25 6a3.75 3.75 0 013.75-3.75h9a3.75 3.75 0 013.75 3.75v3a3.75 3.75 0 01-3.75 3.75h-9A3.75 3.75 0 015.25 9V6z" />
      </svg>
    ),
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    shortTitle: "OOP",
    route: "/oop",
    description: "Classes, Polymorphism, Inheritance, Encapsulation & SOLID",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    id: "subjects",
    title: "Core CS Subjects",
    shortTitle: "Core Subjects",
    route: "/subjects",
    description: "Quick revision notes, high-yield interview Q&A and concepts",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

// Helper to load solved items from localStorage for any module
function getLocalProgressMap() {
  const map = {};
  for (const [modKey, storageKey] of Object.entries(STORAGE_KEYS)) {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          map[modKey] = parsed.map(normalizeProgressId).filter((id) => id !== null);
          continue;
        }
      }
    } catch {
      // ignore
    }
    map[modKey] = [];
  }
  return map;
}

// Reusable SVG Circular Progress Indicator
function CircularProgress({
  percentage = 0,
  size = 56,
  strokeWidth = 5,
  textClassName = "text-xs font-bold font-mono text-emerald-400",
  trackClassName = "text-zinc-800",
  indicatorClassName = "text-emerald-400",
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(Math.max(percentage || 0, 0), 100);
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        className="w-full h-full -rotate-90 origin-center"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className={trackClassName}
        />
        {/* Animated progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${indicatorClassName} transition-all duration-700 ease-out`}
        />
      </svg>
      <span className={`absolute select-none ${textClassName}`}>
        {clampedPercentage}%
      </span>
    </div>
  );
}

export default function ProgressPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [datasets, setDatasets] = useState(() => getInitialDatasets());
  const [loading, setLoading] = useState(() => !getInitialDatasets());
  const [progressMap, setProgressMap] = useState(() => getLocalProgressMap());
  const [cloudError, setCloudError] = useState(false);

  // 1. Fetch real datasets across all 6 modules
  useEffect(() => {
    let isMounted = true;

    async function loadAllDatasets() {
      try {
        const [
          dsaRes,
          compDsaRes,
          sdRes,
          osRes,
          oopRes,
          subjectsRes,
        ] = await Promise.allSettled([
          getProblems(),
          getCompanyProblemsData(),
          getSystemDesignTopics(),
          getOsModules(),
          getOopModules(),
          getSubjects(),
        ]);

        const dsaProblems = dsaRes.status === "fulfilled" && Array.isArray(dsaRes.value) ? dsaRes.value : [];
        const compProblems = compDsaRes.status === "fulfilled" && compDsaRes.value?.problems ? compDsaRes.value.problems : [];
        const sdTopics = sdRes.status === "fulfilled" && Array.isArray(sdRes.value) ? sdRes.value : [];
        const osModules = osRes.status === "fulfilled" && Array.isArray(osRes.value) ? osRes.value : [];
        const oopModules = oopRes.status === "fulfilled" && Array.isArray(oopRes.value) ? oopRes.value : [];
        const subjectsData = subjectsRes.status === "fulfilled" && Array.isArray(subjectsRes.value) ? subjectsRes.value : [];

        if (isMounted) {
          setDatasets(formatDatasets(dsaProblems, compProblems, sdTopics, osModules, oopModules, subjectsData));
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load module datasets:", err);
        if (isMounted) setLoading(false);
      }
    }

    loadAllDatasets();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch cloud progress when user is authenticated
  const loadCloudProgress = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const res = await progressService.getAllProgress();
        if (res && res.success && res.progress) {
          setProgressMap((prev) => ({
            ...prev,
            ...res.progress,
          }));
          setCloudError(false);
        } else {
          setCloudError(true);
        }
      } catch (err) {
        console.error("Failed to load cloud progress for ProgressPage:", err);
        setCloudError(true);
      }
    } else {
      // If guest user, read local progress directly
      setProgressMap(getLocalProgressMap());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadCloudProgress();
  }, [loadCloudProgress]);

  // 3. Listen for live progress updates across other open tabs/components
  useEffect(() => {
    const handleProgressUpdate = (e) => {
      if (e.detail && typeof e.detail === "object") {
        const updated = {};
        for (const [key, items] of Object.entries(e.detail)) {
          if (Array.isArray(items)) {
            updated[key] = items.map(normalizeProgressId).filter((id) => id !== null);
          }
        }
        setProgressMap((prev) => ({
          ...prev,
          ...updated,
        }));
      } else {
        // Refresh local cache map
        setProgressMap(getLocalProgressMap());
      }
    };

    window.addEventListener("placeprep-progress-updated", handleProgressUpdate);
    return () => window.removeEventListener("placeprep-progress-updated", handleProgressUpdate);
  }, []);

  // 4. Calculate accurate counts & percentages per module
  const stats = useMemo(() => {
    if (!datasets) return null;

    let overallCompleted = 0;
    let overallTotal = 0;

    const moduleStats = {};

    MODULE_CONFIG.forEach((mod) => {
      const dataInfo = datasets[mod.id];
      if (!dataInfo) {
        moduleStats[mod.id] = { total: 0, completed: 0, percentage: 0 };
        return;
      }

      let total = 0;
      let completed = 0;

      if (mod.id === "company-dsa" && Array.isArray(dataInfo.uniqueProblems)) {
        // Count UNIQUE problems for Company DSA
        total = dataInfo.uniqueProblems.length;
        const userSolved = progressMap[mod.id] || [];
        const userSolvedSet = new Set(
          userSolved.map(normalizeProgressId).filter((id) => id !== null)
        );

        let uniqueCompleted = 0;
        dataInfo.uniqueProblems.forEach((prob) => {
          let hasSolved = false;
          prob.associatedIds.forEach((id) => {
            if (
              userSolvedSet.has(id) ||
              userSolvedSet.has(Number(id)) ||
              userSolvedSet.has(String(id))
            ) {
              hasSolved = true;
            }
          });
          if (hasSolved) {
            uniqueCompleted++;
          }
        });

        completed = Math.min(uniqueCompleted, total);
      } else {
        total = dataInfo?.items?.length || 0;
        const validIdSet = dataInfo?.idSet || new Set();
        const userSolved = progressMap[mod.id] || [];

        // Filter so only valid IDs in the actual dataset count towards completed
        const validCompleted = userSolved.filter((id) => {
          const norm = normalizeProgressId(id);
          return (
            norm !== null &&
            (validIdSet.has(norm) ||
              validIdSet.has(Number(norm)) ||
              validIdSet.has(String(norm)))
          );
        }).length;

        completed = Math.min(validCompleted, total);
      }

      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      overallCompleted += completed;
      overallTotal += total;

      moduleStats[mod.id] = {
        total,
        completed,
        percentage,
      };
    });

    const overallPercentage = overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0;

    return {
      overall: {
        completed: overallCompleted,
        total: overallTotal,
        percentage: overallPercentage,
      },
      modules: moduleStats,
    };
  }, [datasets, progressMap]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans pb-20">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="border-b border-[#27272A] bg-[#0B0B0B]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
          >
            ← Back to Home
          </Link>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-[36px] font-bold tracking-tight text-[#F5F5F5]">
                My Progress
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                Your placement preparation at a glance.
              </p>
            </div>

            {/* Sync Status Badge */}
            <div className="shrink-0 flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#27272A] text-xs text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Cloud Synced</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121212] border border-[#27272A] text-xs text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Guest Mode • Local Storage</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ───────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 space-y-8">
        {/* Guest Banner if not logged in */}
        {!isAuthenticated && !authLoading && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-3 text-zinc-300">
              <span className="text-amber-400 text-lg">💡</span>
              <p>
                You are currently in guest mode. <span className="text-zinc-100 font-medium">Login</span> to sync your progress automatically across devices.
              </p>
            </div>
            <Link
              to="/login"
              className="shrink-0 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-colors"
            >
              Sign In to Sync
            </Link>
          </div>
        )}

        {/* Cloud Error Warning if cloud fetch failed */}
        {cloudError && (
          <div className="rounded-xl border border-zinc-800 bg-[#121212] p-4 text-xs text-zinc-400 flex items-center justify-between">
            <span>Unable to refresh cloud progress — displaying saved local progress.</span>
            <button
              onClick={loadCloudProgress}
              className="text-zinc-200 hover:text-white underline ml-2"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading || !stats ? (
          <div className="space-y-6">
            {/* Overall Skeleton */}
            <div className="rounded-xl border border-[#27272A] bg-[#121212] p-6 sm:p-8 animate-pulse flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8">
              <div className="w-28 h-28 rounded-full bg-zinc-800 shrink-0"></div>
              <div className="flex-1 space-y-3 w-full text-center sm:text-left">
                <div className="h-4 bg-zinc-800 rounded w-24 mx-auto sm:mx-0"></div>
                <div className="h-7 bg-zinc-800 rounded w-48 mx-auto sm:mx-0"></div>
                <div className="h-4 bg-zinc-800 rounded w-64 mx-auto sm:mx-0"></div>
              </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl border border-[#27272A] bg-[#121212] p-6 animate-pulse space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="h-5 bg-zinc-800 rounded w-3/4"></div>
                      <div className="h-3 bg-zinc-800 rounded w-full"></div>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-zinc-800 shrink-0"></div>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                  <div className="h-4 bg-zinc-800 rounded w-1/3 pt-2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* ── Overall Progress Hero Card ────────────────────────── */}
            <div className="rounded-xl border border-[#27272A] bg-[#121212] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                {/* Large Circular Progress Indicator */}
                <div className="shrink-0 flex items-center justify-center">
                  <CircularProgress
                    percentage={stats.overall.percentage}
                    size={116}
                    strokeWidth={9}
                    textClassName="text-2xl font-bold font-mono text-white"
                    indicatorClassName="text-emerald-400"
                    trackClassName="text-zinc-800"
                  />
                </div>

                {/* Overall Progress Details */}
                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Overall Progress
                  </h2>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {stats.overall.completed}{" "}
                    <span className="font-normal text-zinc-400 text-lg sm:text-xl">
                      / {stats.overall.total} completed
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                    {stats.overall.completed === 0
                      ? "Start your placement journey — complete your first DSA problem or study your first topic to begin tracking your preparation."
                      : `${stats.overall.total - stats.overall.completed} resources remaining across all 6 core preparation modules.`}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Module Progress Cards Grid ─────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Module-Wise Breakdown
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MODULE_CONFIG.map((mod) => {
                  const modStat = stats.modules[mod.id] || { total: 0, completed: 0, percentage: 0 };

                  return (
                    <div
                      key={mod.id}
                      className="rounded-xl border border-[#27272A] bg-[#121212] hover:bg-[#161618] hover:border-zinc-700 p-6 flex flex-col justify-between transition-all duration-200 group"
                    >
                      <div>
                        {/* Top: Icon + Title/Description on left, Circular Progress on right */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0 pr-1">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 group-hover:text-white transition-colors shrink-0">
                                {mod.icon}
                              </div>
                              <h3 className="text-base font-semibold text-white group-hover:text-zinc-100 transition-colors truncate">
                                {mod.title}
                              </h3>
                            </div>
                            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                              {mod.description}
                            </p>
                          </div>

                          {/* Small Circular Progress Indicator */}
                          <CircularProgress
                            percentage={modStat.percentage}
                            size={56}
                            strokeWidth={5}
                            textClassName="text-xs font-bold font-mono text-emerald-400"
                            indicatorClassName="text-emerald-400"
                            trackClassName="text-zinc-800"
                          />
                        </div>

                        {/* Numbers */}
                        <div className="mt-5 flex items-baseline justify-between text-xs font-mono text-zinc-400 bg-zinc-900/60 rounded-lg px-3 py-2 border border-zinc-800/80">
                          <span>Completed</span>
                          <span className="font-semibold text-zinc-200">
                            {modStat.completed}{" "}
                            <span className="font-normal text-zinc-400">/ {modStat.total}</span>
                          </span>
                        </div>
                      </div>

                      {/* Bottom Continue Navigation Button */}
                      <div className="mt-5 pt-4 border-t border-[#27272A] flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-400">
                          {modStat.total - modStat.completed} remaining
                        </span>
                        <Link
                          to={mod.route}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                        >
                          <span>Continue</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
