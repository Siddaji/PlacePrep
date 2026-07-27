import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubjects } from "../services/subjectService.js";

const STUDIED_KEY = "placeprep-subjects-studied";

const COLOR_MAP = {
  violet: {
    header:  "bg-violet-600",
    badge:   "bg-violet-500/10 text-violet-400 ring-violet-500/20",
    freq:    "bg-violet-500/10 text-violet-400",
    pill:    "bg-violet-500/10 text-violet-400",
    border:  "border-violet-500/30",
    button:  "bg-violet-600 hover:bg-violet-500",
    dot:     "bg-violet-500",
  },
  blue: {
    header:  "bg-blue-600",
    badge:   "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    freq:    "bg-blue-500/10 text-blue-400",
    pill:    "bg-blue-500/10 text-blue-400",
    border:  "border-blue-500/30",
    button:  "bg-blue-600 hover:bg-blue-500",
    dot:     "bg-blue-500",
  },
  emerald: {
    header:  "bg-emerald-600",
    badge:   "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    freq:    "bg-emerald-500/10 text-emerald-400",
    pill:    "bg-emerald-500/10 text-emerald-400",
    border:  "border-emerald-500/30",
    button:  "bg-emerald-600 hover:bg-emerald-500",
    dot:     "bg-emerald-500",
  },
  rose: {
    header:  "bg-rose-600",
    badge:   "bg-rose-500/10 text-rose-400 ring-rose-500/20",
    freq:    "bg-rose-500/10 text-rose-400",
    pill:    "bg-rose-500/10 text-rose-400",
    border:  "border-rose-500/30",
    button:  "bg-rose-600 hover:bg-rose-500",
    dot:     "bg-rose-500",
  },
};

const DIFFICULTY_STYLES = {
  Easy:   "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20",
  Hard:   "bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20",
};

// ── Q&A Accordion ────────────────────────────────────────────

function QAItem({ qa }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        <span className="text-sm font-medium text-gray-300 leading-relaxed">
          Q: {qa.q}
        </span>
        <svg
          className={`h-4 w-4 text-gray-600 shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-800">
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="font-semibold text-gray-300">A: </span>
            {qa.a}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Topic Card ────────────────────────────────────────────────

function TopicCard({ topic, color, isStudied, onToggleStudied }) {
  const [expanded, setExpanded] = useState(false);
  const [showQA, setShowQA]     = useState(false);
  const c = COLOR_MAP[color] || COLOR_MAP.violet;

  return (
    <div className={`rounded-2xl border bg-gray-900 transition-all duration-200 ${
      isStudied ? c.border : "border-gray-800"
    }`}>

      {/* header */}
      <div
        className="flex items-start justify-between gap-4 p-5 cursor-pointer select-none"
        onClick={() => setExpanded(p => !p)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DIFFICULTY_STYLES[topic.difficulty]}`}>
              {topic.difficulty}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.freq}`}>
              🔥 {topic.frequency}
            </span>
            {isStudied && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                ✓ Studied
              </span>
            )}
          </div>
          <h3 className={`text-base font-bold ${isStudied ? "text-gray-600" : "text-gray-100"}`}>
            {topic.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{topic.summary}</p>
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
        <div className="border-t border-gray-800 px-5 pb-6 space-y-5">

          {/* must know */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-3">
              ✅ Must Know
            </p>
            <div className="rounded-2xl border border-gray-800 bg-gray-800/40 p-4 space-y-2">
              {topic.mustKnow.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${c.dot}`} />
                  <p className="text-sm text-gray-400 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* explanation */}
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest mb-2">
              📖 Explanation
            </p>
            <p className="text-sm text-gray-400 leading-relaxed rounded-xl border border-gray-800 bg-gray-800/40 p-4">
              {topic.explanation}
            </p>
          </div>

          {/* analogy */}
          {topic.analogy && (
            <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{topic.analogy.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">
                    Real World — {topic.analogy.title}
                  </p>
                  <p className="text-sm text-blue-300/80 leading-relaxed">
                    {topic.analogy.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* interview Q&A toggle */}
          <div>
            <button
              onClick={() => setShowQA(p => !p)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                showQA
                  ? `${c.button} text-white`
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span>🎯 Interview Q&A ({topic.interviewQA.length} questions)</span>
              <svg
                className={`h-4 w-4 transition-transform ${showQA ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showQA && (
              <div className="mt-3 space-y-2">
                {topic.interviewQA.map((qa, i) => (
                  <QAItem key={i} qa={qa} />
                ))}
              </div>
            )}
          </div>

          {/* self check */}
          <div className="rounded-2xl border border-gray-800 bg-gray-800/40 p-5">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="text-sm font-bold text-gray-200">
                  Before marking as studied...
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Can you answer these out loud without notes?
                </p>
              </div>
            </div>
            <ul className="space-y-2 mb-5">
              {topic.selfCheck.map((q, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-600 shrink-0" />
                  <span className="text-sm text-gray-500">{q}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                onClick={e => { e.stopPropagation(); onToggleStudied(); }}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                  isStudied
                    ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : `${c.button} text-white`
                }`}
              >
                {isStudied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Studied ✓
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Mark as Studied
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

// ── Subject Section ───────────────────────────────────────────

function SubjectSection({ subject, studiedIds, onToggleStudied }) {
  const c         = COLOR_MAP[subject.color] || COLOR_MAP.violet;
  const studied   = subject.topics.filter(t => studiedIds.has(t.id)).length;
  const total     = subject.topics.length;
  const pct       = total > 0 ? Math.round((studied / total) * 100) : 0;
  const hasTopics = total > 0;

  return (
    <section className="rounded-2xl border border-gray-800 overflow-hidden">

      {/* subject header */}
      <div className={`${c.header} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-black text-white/90">{subject.short}</span>
            <p className="text-sm text-white/60 mt-0.5">{subject.title}</p>
          </div>
          {hasTopics && (
            <div className="text-right">
              <p className="text-sm font-bold text-white">
                {studied} / {total} studied
              </p>
              <div className="mt-1.5 w-32 h-1.5 rounded-full bg-white/20">
                <div
                  className="h-1.5 rounded-full bg-white transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-white/60">{subject.description}</p>
      </div>

      {/* topics */}
      <div className="p-5 bg-gray-950">
        {!hasTopics ? (
          <div className="text-center py-8">
            <p className="text-sm font-semibold text-gray-600">Content coming soon</p>
            <p className="text-xs text-gray-700 mt-1">
              Topics and Q&A for {subject.title} are being prepared
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {subject.topics.map(topic => (
              <TopicCard
                key={topic.id}
                topic={topic}
                color={subject.color}
                isStudied={studiedIds.has(topic.id)}
                onToggleStudied={() => onToggleStudied(topic.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  const [studiedIds, setStudiedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STUDIED_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    getSubjects()
      .then(data  => { setSubjects(data); setLoading(false); })
      .catch(err  => { console.error(err); setLoading(false); });
  }, []);

  function toggleStudied(id) {
    setStudiedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STUDIED_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const allTopics    = subjects.flatMap(s => s.topics);
  const totalTopics  = allTopics.length;
  const studiedCount = [...studiedIds].filter(id => allTopics.some(t => t.id === id)).length;
  const progressPct  = totalTopics > 0 ? Math.round((studiedCount / totalTopics) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

      {/* header */}
      <div className="mb-10">
        <Link to="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ← Home
        </Link>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
              Core Subjects
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              OS, DBMS, CN, OOP — the four subjects in almost every placement interview.
            </p>
          </div>

          {!loading && totalTopics > 0 && (
            <div className="sm:text-right">
              <p className="text-sm font-semibold text-gray-300">
                {studiedCount}{" "}
                <span className="font-normal text-gray-600">/ {totalTopics} Studied</span>
              </p>
              <div className="mt-1.5 w-full sm:w-40 h-1.5 rounded-full bg-gray-800">
                <div
                  className="h-1.5 rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-600">{progressPct}% complete</p>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 animate-pulse">
              <div className="h-16 rounded-xl bg-gray-800 mb-4" />
              <div className="h-4 w-2/3 rounded bg-gray-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {subjects.map(subject => (
            <SubjectSection
              key={subject.id}
              subject={subject}
              studiedIds={studiedIds}
              onToggleStudied={toggleStudied}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default SubjectsPage;