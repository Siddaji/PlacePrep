import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoadmap } from "../services/roadmapService.js";

const THEME = {
  violet: {
    header:  "bg-violet-600",
    badge:   "bg-violet-500/10 text-violet-400 ring-violet-500/20",
    border:  "border-violet-500/30",
    dot:     "bg-violet-500",
    pill:    "bg-violet-500/10 text-violet-400",
    week:    "text-violet-400",
  },
  blue: {
    header:  "bg-blue-600",
    badge:   "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    border:  "border-blue-500/30",
    dot:     "bg-blue-500",
    pill:    "bg-blue-500/10 text-blue-400",
    week:    "text-blue-400",
  },
  emerald: {
    header:  "bg-emerald-600",
    badge:   "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    border:  "border-emerald-500/30",
    dot:     "bg-emerald-500",
    pill:    "bg-emerald-500/10 text-emerald-400",
    week:    "text-emerald-400",
  },
  amber: {
    header:  "bg-amber-600",
    badge:   "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    border:  "border-amber-500/30",
    dot:     "bg-amber-500",
    pill:    "bg-amber-500/10 text-amber-400",
    week:    "text-amber-400",
  },
  rose: {
    header:  "bg-rose-600",
    badge:   "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    border:  "border-rose-500/30",
    dot:     "bg-rose-500",
    pill:    "bg-rose-500/10 text-rose-400",
    week:    "text-rose-400",
  },
};

function WeekCard({ week }) {
  const [expanded, setExpanded] = useState(false);
  const t = THEME[week.theme] || THEME.violet;

  return (
    <div className={`rounded-2xl border bg-gray-900 transition-all duration-200 ${t.border}`}>

      {/* header */}
      <div
        className="flex items-start justify-between gap-4 p-5 cursor-pointer select-none"
        onClick={() => setExpanded(p => !p)}
      >
        <div className="flex items-start gap-4 flex-1">

          {/* week number */}
          <div className={`${t.header} rounded-xl px-3 py-2 shrink-0`}>
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Week</p>
            <p className="text-2xl font-black text-white leading-none">{week.id}</p>
          </div>

          <div className="flex-1">
            <p className={`text-xs font-semibold uppercase tracking-widest ${t.week} mb-1`}>
              {week.week}
            </p>
            <h3 className="text-base font-bold text-gray-100">
              {week.title}
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">{week.subtitle}</p>

            {/* quick stats */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${t.badge}`}>
                ⏱ {week.estimatedHours}
              </span>
              {week.dsaTopics.length > 0 && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-400">
                  {week.dsaTopics.reduce((acc, t) => acc + t.problems.length, 0)} DSA problems
                </span>
              )}
              {week.systemDesignTopics.length > 0 && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-400">
                  {week.systemDesignTopics.length} System Design
                </span>
              )}
              {week.subjectTopics.length > 0 && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-400">
                  {week.subjectTopics.length} Subject topics
                </span>
              )}
            </div>
          </div>
        </div>

        <svg
          className={`mt-1 h-5 w-5 text-gray-600 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* expanded content */}
      {expanded && (
        <div className="border-t border-gray-800 px-5 pb-6 space-y-6">

          {/* goal */}
          <div className="mt-5 rounded-xl bg-gray-800/40 border border-gray-800 px-4 py-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">
              🎯 Week Goal
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">{week.goal}</p>
          </div>

          {/* daily plan */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
              📅 Daily Plan
            </p>
            <div className="space-y-2">
              {week.dailyPlan.map((day, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${t.dot}`} />
                  <p className="text-sm text-gray-400">{day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DSA topics */}
          {week.dsaTopics.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
                  DSA Problems
                </p>
                <Link
                  to="/dsa"
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Open DSA Tracker →
                </Link>
              </div>
              <div className="space-y-3">
                {week.dsaTopics.map((topic, i) => (
                  <div key={i} className="rounded-xl border border-gray-800 bg-gray-800/40 p-4">
                    <p className="text-xs font-bold text-gray-300 mb-2">{topic.title}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.problems.map((p, j) => (
                        <span key={j} className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded-md">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* system design topics */}
          {week.systemDesignTopics.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
                  System Design Topics
                </p>
                <Link
                  to="/system-design"
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Open System Design →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {week.systemDesignTopics.map((topic, i) => (
                  <span key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${t.pill}`}>
                    {topic.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* subject topics */}
          {week.subjectTopics.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
                  Core Subject Topics
                </p>
                <Link
                  to="/subjects"
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Open Subjects →
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {week.subjectTopics.map((topic, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-800 text-gray-400">
                    {topic.subject}: {topic.topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* tip */}
          <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">
                  Mentor Tip
                </p>
                <p className="text-sm text-amber-300/80 leading-relaxed">
                  {week.tip}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function RoadmapPage() {
  const [weeks, setWeeks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoadmap()
      .then(data => { setWeeks(data); setLoading(false); })
      .catch(err  => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

      {/* header */}
      <div className="mb-10">
        <Link to="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ← Home
        </Link>

        <div className="mt-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
            8-Week Placement Roadmap
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Structured week-by-week plan covering DSA, System Design, and Core Subjects.
          </p>
        </div>

        {/* summary strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Weeks",          value: "8" },
            { label: "DSA Problems",   value: "88+" },
            { label: "System Design",  value: "10" },
            { label: "Subject Topics", value: "20" },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3 text-center">
              <p className="text-xl font-bold text-gray-100">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* how to use */}
        <div className="mt-5 rounded-2xl bg-violet-500/5 border border-violet-500/20 px-5 py-4">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">
            How to Use This Roadmap
          </p>
          <div className="space-y-1.5">
            {[
              "Click any week to expand its full daily plan.",
              "Each week links directly to the relevant content in DSA, System Design, and Subjects.",
              "Follow the daily plan — 2-3 hours per day is enough if you are consistent.",
              "Week 8 is revision only — do not learn new things in the final week.",
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                <p className="text-sm text-violet-300/80">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* week cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 animate-pulse">
              <div className="flex gap-4">
                <div className="h-16 w-14 rounded-xl bg-gray-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/4 rounded bg-gray-800" />
                  <div className="h-5 w-1/2 rounded bg-gray-800" />
                  <div className="h-3 w-1/3 rounded bg-gray-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {weeks.map(week => (
            <WeekCard key={week.id} week={week} />
          ))}
        </div>
      )}

    </div>
  );
}

export default RoadmapPage;