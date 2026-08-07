import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/problemService.js";
import { getCompanyProblemsData } from "../services/companyProblemService.js";
import CompanyTagsBackground from "../components/common/CompanyTagsBackground.jsx";

const modules = [
  {
    id: "dsa",
    to: "/dsa",
    title: "DSA Tracker",
    description: "Topic-wise problem sets curated by difficulty, pattern, and priority. Covers Arrays, DP, Graphs, Trees & more.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    id: "company-dsa",
    to: "/company-dsa",
    title: "Company-wise DSA",
    description: "High-frequency interview questions tagged by top tech companies — Google, Meta, Microsoft, Amazon, Apple, Uber.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "system-design",
    to: "/system-design",
    title: "System Design",
    description: "Architectural fundamentals, distributed systems, caching, load balancing, and real-world system breakdowns.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
    ),
  },
  {
    id: "subjects",
    to: "/subjects",
    title: "Core CS Subjects",
    description: "Operating Systems, DBMS, Computer Networks, and OOP — core interview concepts, diagrams, and revision notes.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    to: "/roadmap",
    title: "8-Week Prep Roadmap",
    description: "Structured timeline guiding your preparation sequentially across Data Structures, Algorithms, System Design & Core CS.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0z" />
      </svg>
    ),
  },
];

function ModuleCard({ module, stats }) {
  return (
    <Link
      to={module.to}
      className="group flex flex-col justify-between rounded-xl border border-[#27272A] bg-[#121212] p-6 sm:p-7 transition-all duration-200 hover:border-zinc-700 hover:bg-[#161618]"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
            {module.icon}
          </div>
          <span className="inline-flex items-center rounded-md bg-zinc-800/80 border border-zinc-700/50 px-3 py-1 text-xs sm:text-sm font-mono font-medium text-zinc-300">
            {stats}
          </span>
        </div>

        <h3 className="mt-5 text-lg sm:text-[20px] font-semibold text-[#F5F5F5] group-hover:text-white transition-colors">
          {module.title}
        </h3>
        <p className="mt-2 text-sm sm:text-[15.5px] text-zinc-400 leading-relaxed">
          {module.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#27272A]/80 flex items-center gap-2 text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
        <span>Explore module</span>
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    return "Curated";
  }

  return (
    <div className="w-full">
      {/* Hero Section with Scoped Background Animation */}
      <section className="relative w-full overflow-hidden border-b border-[#27272A] py-16 sm:py-24">
        <CompanyTagsBackground />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">

            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-zinc-900 border border-[#27272A] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Placement Prep Platform
              </span>
              <Link
                to="/company-dsa"
                className="inline-flex items-center gap-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-[#27272A] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 transition-colors"
              >
                Company-Wise DSA
              </Link>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[50px] font-bold text-[#F5F5F5] leading-[1.12] tracking-tight">
              Master engineering interviews with structured practice.
            </h1>

            <p className="mt-5 text-base sm:text-[18px] text-zinc-300 leading-relaxed max-w-2xl">
              Topic-wise DSA trackers, company-specific problem archives, system design breakdowns, and core CS fundamentals — built for serious candidate preparation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/dsa"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm sm:text-base font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm"
              >
                Start DSA Practice
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                to="/company-dsa"
                className="inline-flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#121212] hover:bg-zinc-800 text-zinc-200 px-5 py-2.5 text-sm sm:text-base font-semibold transition-colors"
              >
                Company DSA
              </Link>

              <Link
                to="/subjects"
                className="inline-flex items-center gap-2 rounded-lg border border-[#27272A] bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white px-5 py-2.5 text-sm sm:text-base font-semibold transition-colors"
              >
                Core CS Subjects
              </Link>
            </div>

            {/* subtle stats row */}
            <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-[#27272A] pt-8">
              <div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {problemCount ?? 154}
                </p>
                <p className="text-sm text-zinc-400 font-medium mt-1">DSA Problems</p>
              </div>
              <div className="h-8 w-px bg-[#27272A] hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {companyProblemCount ?? "580+"}
                </p>
                <p className="text-sm text-zinc-400 font-medium mt-1">Company Problems</p>
              </div>
              <div className="h-8 w-px bg-[#27272A] hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">12</p>
                <p className="text-sm text-zinc-400 font-medium mt-1">System Design Topics</p>
              </div>
              <div className="h-8 w-px bg-[#27272A] hidden sm:block" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">20</p>
                <p className="text-sm text-zinc-400 font-medium mt-1">Core CS Modules</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* module cards */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Preparation Modules
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map(m => (
            <ModuleCard key={m.id} module={m} stats={getStats(m.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
