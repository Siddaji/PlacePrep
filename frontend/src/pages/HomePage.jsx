import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/problemService.js";

// module cards data
const modules = [
  {
    id: "dsa",
    to: "/dsa",
    title: "DSA Tracker",
    description:
      "Topic-wise problem lists with difficulty, priority, and company tags. Covers Arrays, Strings, Trees, Graphs, DP, and more.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    accent: "violet",
  },
  {
    id: "system-design",
    to: "/system-design",
    title: "System Design",
    description:
      "Beginner to advanced concepts. Load balancers, databases, caching, CDN, microservices — with interview-style breakdowns.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
    accent: "blue",
  },
  {
    id: "subjects",
    to: "/subjects",
    title: "Core Subjects",
    description:
      "Concise notes and key questions for OS, DBMS, CN, and OOP — the four subjects that appear in almost every tech interview.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    accent: "emerald",
  },
];

const ACCENT_STYLES = {
  violet: {
    icon:  "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-700 ring-violet-200",
    hover: "hover:border-violet-200 hover:shadow-violet-100",
    arrow: "text-violet-400 group-hover:text-violet-600",
  },
  blue: {
    icon:  "bg-blue-50 text-blue-600",
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    hover: "hover:border-blue-200 hover:shadow-blue-100",
    arrow: "text-blue-400 group-hover:text-blue-600",
  },
  emerald: {
    icon:  "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    hover: "hover:border-emerald-200 hover:shadow-emerald-100",
    arrow: "text-emerald-400 group-hover:text-emerald-600",
  },
};

function ModuleCard({ module, stats }) {
  const styles = ACCENT_STYLES[module.accent];

  return (
    <Link
      to={module.to}
      className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${styles.hover}`}
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}>
          {module.icon}
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles.badge}`}>
          {stats}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-900">
        {module.title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">
        {module.description}
      </p>

      <div className={`mt-5 flex items-center gap-1.5 text-sm font-medium transition-colors ${styles.arrow}`}>
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

  useEffect(() => {
    getProblems()
      .then(data => setProblemCount(data.length))
      .catch(() => setProblemCount(null));
  }, []);

  // build stats per module — only DSA has real data right now
  function getStats(moduleId) {
    if (moduleId === "dsa") {
      if (problemCount === null) return "Loading...";
      return `${problemCount} Problems`;
    }
    return "Coming Soon";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* hero */}
      <section className="py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
            Placement Prep Platform
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            Crack your placement.{" "}
            <span className="text-violet-600">One platform.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
            Structured DSA practice, System Design prep, and Core CS revision —
            everything a serious placement student needs, organized and ready to use.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/dsa"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all hover:bg-violet-700 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Start with DSA
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              to="/subjects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              Browse Subjects
            </Link>
          </div>
        </div>
      </section>

      {/* divider */}
      <div className="border-t border-slate-100" />

      {/* module cards */}
      <section className="py-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
          What's inside
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map(module => (
            <ModuleCard
              key={module.id}
              module={module}
              stats={getStats(module.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;