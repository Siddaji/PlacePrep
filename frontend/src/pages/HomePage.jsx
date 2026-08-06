import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/problemService.js";
import { getCompanyProblemsData } from "../services/companyProblemService.js";

const modules = [
  {
    id: "dsa",
    to: "/dsa",
    title: "DSA Tracker",
    description: "Topic-wise problem lists with difficulty, priority, and company tags. Covers Arrays, Strings, Trees, Graphs, DP, and more.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    accent: "violet",
  },
  {
    id: "company-dsa",
    to: "/company-dsa",
    title: "Company-wise DSA",
    description: "Must-solve interview questions asked in top companies — Microsoft, Google, Amazon, Meta, Netflix, Apple, Uber & more.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accent: "rose",
  },
  {
    id: "system-design",
    to: "/system-design",
    title: "System Design",
    description: "HLD and LLD topics with curated video breakdowns covering load balancing, caching, CAP theorem, URL shortener & Twitter.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
    accent: "blue",
  },
  {
    id: "subjects",
    to: "/subjects",
    title: "Core Subjects",
    description: "OS, DBMS, CN, OOP — 20 topics with must-know points, real-world analogies, and interview Q&A for every concept.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    accent: "emerald",
  },
  {
    id: "roadmap",
    to: "/roadmap",
    title: "8-Week Roadmap",
    description: "Structured week-by-week placement prep plan. DSA, System Design, and Core Subjects — in the right order.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0z" />
      </svg>
    ),
    accent: "amber",
  },
];

const ACCENT = {
  violet: {
    icon:   "bg-violet-500/10 text-violet-400",
    badge:  "bg-violet-500/10 text-violet-400 ring-violet-500/20",
    border: "hover:border-violet-500/40",
    arrow:  "text-violet-500 group-hover:text-violet-400",
  },
  rose: {
    icon:   "bg-rose-500/10 text-rose-400",
    badge:  "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    border: "hover:border-rose-500/40",
    arrow:  "text-rose-500 group-hover:text-rose-400",
  },
  blue: {
    icon:   "bg-blue-500/10 text-blue-400",
    badge:  "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    border: "hover:border-blue-500/40",
    arrow:  "text-blue-500 group-hover:text-blue-400",
  },
  emerald: {
    icon:   "bg-emerald-500/10 text-emerald-400",
    badge:  "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    border: "hover:border-emerald-500/40",
    arrow:  "text-emerald-500 group-hover:text-emerald-400",
  },
  amber: {
    icon:   "bg-amber-500/10 text-amber-400",
    badge:  "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    border: "hover:border-amber-500/40",
    arrow:  "text-amber-500 group-hover:text-amber-400",
  },
};

function ModuleCard({ module, stats }) {
  const a = ACCENT[module.accent];
  return (
    <Link
      to={module.to}
      className={`group flex flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 ${a.border}`}
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.icon}`}>
          {module.icon}
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${a.badge}`}>
          {stats}
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold text-gray-100">
        {module.title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">
        {module.description}
      </p>

      <div className={`mt-5 flex items-center gap-1.5 text-sm font-medium transition-colors ${a.arrow}`}>
        Explore
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}

function HomePage() {
  const [problemCount, setProblemCount] = useState(null);
  const [companyProblemCount, setCompanyProblemCount] = useState(null);

  useEffect(() => {
    getProblems()
      .then(data => setProblemCount(data.length))
      .catch(() => setProblemCount(null));

    getCompanyProblemsData()
      .then(data => {
        if (data && data.problems) {
          setCompanyProblemCount(data.problems.length);
        }
      })
      .catch(() => setCompanyProblemCount(null));
  }, []);

  function getStats(id) {
    if (id === "dsa") {
      if (problemCount === null) return "154 Problems";
      return `${problemCount} Problems`;
    }
    if (id === "company-dsa") {
      if (companyProblemCount === null) return "580+ Problems";
      return `${companyProblemCount} Problems`;
    }
    if (id === "system-design") return "12 Topics";
    if (id === "subjects")      return "20 Topics";
    if (id === "roadmap")       return "8 Weeks";
    return "Coming Soon";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* hero */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl">

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400 ring-1 ring-inset ring-violet-500/20">
              Placement Prep Platform
            </span>
            <Link
              to="/company-dsa"
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 ring-1 ring-inset ring-rose-500/20 hover:bg-rose-500/20 transition-colors"
            >
              <span>🏢 Company-Wise DSA</span>
            </Link>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-100 leading-tight tracking-tight">
            Crack your placement.{" "}
            <span className="text-violet-400">One platform.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed">
            Structured DSA practice, Company-wise problem sets, System Design video breakdowns, and Core CS revision —
            everything a serious placement student needs, organized and ready to use.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/dsa"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5"
            >
              Start with DSA
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/company-dsa"
              className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Company-Wise DSA
            </Link>

            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-gray-600 px-5 py-3 text-sm font-semibold text-gray-300 transition-all"
            >
              Browse Subjects
            </Link>
          </div>

          {/* subtle stats row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-gray-100">
                {problemCount ?? 154}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">DSA Problems</p>
            </div>
            <div className="h-8 w-px bg-gray-800 hidden sm:block" />
            <div>
              <p className="text-2xl font-bold text-rose-400">
                {companyProblemCount ?? "580+"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Company DSA Problems</p>
            </div>
            <div className="h-8 w-px bg-gray-800 hidden sm:block" />
            <div>
              <p className="text-2xl font-bold text-gray-100">12</p>
              <p className="text-xs text-gray-400 mt-0.5">System Design Topics</p>
            </div>
            <div className="h-8 w-px bg-gray-800 hidden sm:block" />
            <div>
              <p className="text-2xl font-bold text-gray-100">20</p>
              <p className="text-xs text-gray-400 mt-0.5">Core Subject Topics</p>
            </div>
          </div>

        </div>
      </section>

      {/* divider */}
      <div className="border-t border-gray-800" />

      {/* module cards */}
      <section className="py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6">
          What's inside
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(m => (
            <ModuleCard key={m.id} module={m} stats={getStats(m.id)} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;