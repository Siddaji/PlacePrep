import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSystemDesignTopics } from "../services/systemDesignService.js";
import LoadBalancingDiagram from "../components/systemDesign/diagrams/LoadBalancingDiagram.jsx";
import CachingDiagram from "../components/systemDesign/diagrams/CachingDiagram.jsx";
import DatabasesDiagram from "../components/systemDesign/diagrams/DatabasesDiagram.jsx";
import CAPTheoremDiagram from "../components/systemDesign/diagrams/CAPTheoremDiagram.jsx";
import MessageQueueDiagram from "../components/systemDesign/diagrams/MessageQueueDiagram.jsx";

const STUDIED_KEY  = "placeprep-sd-studied";
const STREAK_KEY   = "placeprep-sd-streak";

const DIAGRAMS = {
  1: <LoadBalancingDiagram />,
  2: <CachingDiagram />,
  3: <DatabasesDiagram />,
  4: <CAPTheoremDiagram />,
  5: <MessageQueueDiagram />,
};

const DIFFICULTY_STYLES = {
  Beginner:     "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  Advanced:     "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
};

const CATEGORY_STYLES = {
  HLD: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
  LLD: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
};

const COMPANY_COLORS = {
  rose:   { bg: "bg-rose-50",   border: "border-rose-200",   title: "text-rose-700",   body: "text-rose-900"   },
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   title: "text-blue-700",   body: "text-blue-900"   },
  emerald:{ bg: "bg-emerald-50",border: "border-emerald-200",title: "text-emerald-700",body: "text-emerald-900" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  title: "text-amber-700",  body: "text-amber-900"  },
  violet: { bg: "bg-violet-50", border: "border-violet-200", title: "text-violet-700", body: "text-violet-900" },
};

const COMPARISON_COLORS = {
  blue: {
    header: "bg-blue-600",
    pro: "text-emerald-600",
    when: "bg-blue-50 text-blue-700 border-blue-200",
  },
  emerald: {
    header: "bg-emerald-600",
    pro: "text-emerald-600",
    when: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  violet: {
    header: "bg-violet-600",
    pro: "text-emerald-600",
    when: "bg-violet-50 text-violet-700 border-violet-200",
  },
};


function loadStreak() {
  try {
    const saved = localStorage.getItem(STREAK_KEY);
    return saved ? JSON.parse(saved) : { count: 0, lastDate: null, longest: 0 };
  } catch {
    return { count: 0, lastDate: null, longest: 0 };
  }
}

function saveStreak(streak) {
  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
}

function updateStreak() {
  const today     = new Date().toDateString();
  const streak    = loadStreak();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (streak.lastDate === today) return streak; 

  const newCount = streak.lastDate === yesterday
    ? streak.count + 1   
    : 1;                  

  const updated = {
    count:    newCount,
    lastDate: today,
    longest:  Math.max(newCount, streak.longest),
  };
  saveStreak(updated);
  return updated;
}


function StreakBanner({ streak }) {
  if (streak.count === 0) return null;

  return (
    <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <p className="text-base font-black text-orange-700">
              {streak.count} Day Streak
            </p>
            <p className="text-xs text-orange-500">
              Keep going — consistency beats intensity every time.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-orange-700">{streak.count}</p>
            <p className="text-xs text-orange-400">Current</p>
          </div>
          <div className="h-8 w-px bg-orange-200" />
          <div className="text-center">
            <p className="text-lg font-bold text-orange-700">{streak.longest}</p>
            <p className="text-xs text-orange-400">Best</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Self Check Gate ──────────────────────────────────────────

function SelfCheckGate({ questions, onConfirmed, isStudied }) {
  const [checked, setChecked] = useState({});
  const [attempted, setAttempted] = useState(false);

  const allChecked = questions.every((_, i) => checked[i]);

  function handleToggle(i) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  }

  function handleMark() {
    if (!allChecked) {
      setAttempted(true);
      return;
    }
    onConfirmed();
  }

  if (isStudied) {
    return (
      <div className="flex justify-end">
        <button
          onClick={onConfirmed}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Studied ✓
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">🎯</span>
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            Before you mark this as studied...
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Check each question you can confidently answer out loud.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {questions.map((q, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
              checked[i]
                ? "bg-emerald-50 border-emerald-200"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className={`mt-0.5 h-4 w-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
              checked[i]
                ? "bg-emerald-500 border-emerald-500"
                : "border-slate-300"
            }`}>
              {checked[i] && (
                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </div>
            <span
              className={`text-sm leading-relaxed ${
                checked[i] ? "text-emerald-800 line-through" : "text-slate-700"
              }`}
              onClick={() => handleToggle(i)}
            >
              {q}
            </span>
          </label>
        ))}
      </div>

      {attempted && !allChecked && (
        <p className="mt-3 text-xs font-medium text-rose-500">
          ⚠️ Check all questions you can answer before marking as studied.
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          {Object.values(checked).filter(Boolean).length} / {questions.length} ready
        </p>
        <button
          onClick={handleMark}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
            allChecked
              ? "bg-slate-900 text-white hover:bg-slate-700"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Mark as Studied
        </button>
      </div>
    </div>
  );
}

// ── Company Examples ─────────────────────────────────────────

function CompanyExamples({ examples }) {
  if (!examples || examples.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        🏢 How Companies Use This
      </p>
      {examples.map((ex, i) => {
        const c = COMPANY_COLORS[ex.color] || COMPANY_COLORS.blue;
        return (
          <div
            key={i}
            className={`rounded-xl border ${c.border} ${c.bg} px-4 py-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{ex.emoji}</span>
              <p className={`text-sm font-bold ${c.title}`}>
                {ex.company}
              </p>
            </div>
            <p className={`text-sm leading-relaxed ${c.body}`}>
              {ex.example}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ── Section renderers ────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
      <span className="h-4 w-1 rounded-full bg-violet-500 inline-block" />
      {children}
    </h4>
  );
}

function AnalogyBox({ analogy }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{analogy.emoji}</span>
        <div>
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
            Real World — {analogy.title}
          </p>
          <p className="text-sm text-blue-800 leading-relaxed">{analogy.text}</p>
        </div>
      </div>
    </div>
  );
}

function TakeawayChip({ text }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-violet-50 border border-violet-200 px-4 py-3">
      <span className="text-violet-500 font-bold text-base shrink-0">→</span>
      <p className="text-sm font-medium text-violet-800">{text}</p>
    </div>
  );
}

function ComparisonSection({ section }) {
  const renderCard = (side) => {
    const c = COMPARISON_COLORS[side.color];
    return (
      <div className="flex-1 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className={`${c.header} px-5 py-4`}>
          <p className="text-xs font-semibold text-white/70 uppercase tracking-widest">
            {side.subtitle}
          </p>
          <h4 className="text-lg font-black text-white mt-0.5">{side.title}</h4>
          <p className="text-xs text-white/80 mt-1">{side.description}</p>
        </div>
        <div className="p-5 bg-white space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">✅ Pros</p>
            <ul className="space-y-1.5">
              {side.pros.map((p, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-emerald-500">+</span>
                  <span className="text-slate-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">❌ Cons</p>
            <ul className="space-y-1.5">
              {side.cons.map((con, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-rose-400">−</span>
                  <span className="text-slate-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-lg border px-3 py-2 text-xs font-medium ${c.when}`}>
            🎯 Use when: {side.when}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <SectionHeading>{section.heading}</SectionHeading>
      <div className="flex flex-col sm:flex-row gap-4">
        {renderCard(section.left)}
        {renderCard(section.right)}
      </div>
    </div>
  );
}

function AlgorithmSection({ section }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-900 px-5 py-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Algorithm</span>
        <h4 className="text-base font-bold text-white mt-1">{section.heading}</h4>
      </div>
      <div className="bg-white p-5 space-y-5">
        <p className="text-sm text-slate-600 leading-relaxed">{section.body}</p>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Visual Flow</p>
          <div className="space-y-2">
            {section.flow.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.label}
                </span>
                <svg className="h-4 w-4 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span className="text-sm font-medium text-slate-700">{step.target}</span>
              </div>
            ))}
          </div>
        </div>
        {section.analogy && <AnalogyBox analogy={section.analogy} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
            <p className="text-xs font-semibold text-emerald-700 mb-1">✅ When it works</p>
            <p className="text-sm text-emerald-800">{section.pros}</p>
          </div>
          <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3">
            <p className="text-xs font-semibold text-rose-700 mb-1">⚠️ Watch out for</p>
            <p className="text-sm text-rose-800">{section.cons}</p>
          </div>
        </div>
        {section.takeaway && <TakeawayChip text={section.takeaway} />}
      </div>
    </div>
  );
}

function ConceptSection({ section }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="px-5 pt-5">
        <SectionHeading>{section.heading}</SectionHeading>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{section.body}</p>
      </div>
      {section.analogy && (
        <div className="px-5 pb-1 mt-4"><AnalogyBox analogy={section.analogy} /></div>
      )}
      {section.takeaway && (
        <div className="px-5 pb-5 mt-3"><TakeawayChip text={section.takeaway} /></div>
      )}
    </div>
  );
}

function DeepDiveSection({ section }) {
  if (section.type === "comparison") return <ComparisonSection section={section} />;
  if (section.type === "algorithm")  return <AlgorithmSection section={section} />;
  if (section.type === "concept")    return <ConceptSection section={section} />;
  return null;
}

// ── Topic Card ───────────────────────────────────────────────

function TopicCard({ topic, isStudied, onToggleStudied }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
      isStudied ? "border-emerald-200" : "border-slate-200"
    }`}>

      {/* header */}
      <div
        className="flex items-start justify-between gap-4 p-5 cursor-pointer select-none"
        onClick={() => setExpanded(prev => !prev)}
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_STYLES[topic.category]}`}>
              {topic.category}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${DIFFICULTY_STYLES[topic.difficulty]}`}>
              {topic.difficulty}
            </span>
            <span className="text-xs text-slate-400">{topic.subcategory}</span>
            {isStudied && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                ✓ Studied
              </span>
            )}
          </div>

          <h3 className={`text-base font-bold ${isStudied ? "text-slate-400" : "text-slate-900"}`}>
            {topic.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{topic.summary}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {topic.concepts.map(c => (
              <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                {c}
              </span>
            ))}
          </div>
        </div>

        <svg
          className={`mt-1 h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* expanded content */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-6 space-y-6">

          {/* problem */}
          <div className="mt-5 rounded-2xl bg-rose-50 border border-rose-200 px-5 py-4">
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-2">
              🔥 The Problem
            </p>
            <p className="text-sm text-rose-900 leading-relaxed">
              {topic.content.problem}
            </p>
          </div>

          {/* diagram */}
          {DIAGRAMS[topic.id] && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Architecture Diagram
              </p>
              {DIAGRAMS[topic.id]}
            </div>
          )}

          {/* deep dive */}
          <div className="space-y-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Deep Dive
            </p>
            {topic.content.sections.map((section, i) => (
              <DeepDiveSection key={i} section={section} />
            ))}
          </div>

          {/* company examples */}
          <CompanyExamples examples={topic.companyExamples} />

          {/* related topics */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Related Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {topic.relatedTopics.map(t => (
                <span
                  key={t}
                  className="text-xs font-medium bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full ring-1 ring-inset ring-violet-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* interview tip */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
                  Interview Tip
                </p>
                <p className="text-sm text-amber-800 leading-relaxed">
                  {topic.interviewTip}
                </p>
              </div>
            </div>
          </div>

          {/* self check gate */}
          {topic.selfCheck && (
            <SelfCheckGate
              questions={topic.selfCheck}
              isStudied={isStudied}
              onConfirmed={e => {
                if (e && e.stopPropagation) e.stopPropagation();
                onToggleStudied();
              }}
            />
          )}

        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────

function SystemDesignPage() {
  const [topics, setTopics]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak]   = useState(loadStreak);

  const [studiedIds, setStudiedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STUDIED_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    getSystemDesignTopics()
      .then(data => {
        setTopics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  function toggleStudied(id) {
    setStudiedIds(prev => {
      const next = new Set(prev);
      const wasStudied = next.has(id);

      if (wasStudied) {
        next.delete(id);
      } else {
        next.add(id);
        // update streak only when marking as studied (not un-marking)
        const updated = updateStreak();
        setStreak(updated);
      }

      localStorage.setItem(STUDIED_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const hldTopics    = topics.filter(t => t.category === "HLD");
  const lldTopics    = topics.filter(t => t.category === "LLD");
  const studiedCount = studiedIds.size;
  const progressPct  = topics.length > 0
    ? Math.round((studiedCount / topics.length) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

      {/* header */}
      <div className="mb-6">
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
          ← Home
        </Link>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              System Design
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              One topic per day. Understand it, diagram it, explain it.
            </p>
          </div>

          {!loading && topics.length > 0 && (
            <div className="sm:text-right">
              <p className="text-sm font-semibold text-slate-700">
                {studiedCount}{" "}
                <span className="font-normal text-slate-400">/ {topics.length} Studied</span>
              </p>
              <div className="mt-1.5 w-full sm:w-40 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">{progressPct}% complete</p>
            </div>
          )}
        </div>
      </div>

      {/* streak banner */}
      <div className="mb-8">
        <StreakBanner streak={streak} />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
              <div className="h-4 w-1/3 rounded bg-slate-200 mb-3" />
              <div className="h-5 w-2/3 rounded bg-slate-200 mb-2" />
              <div className="h-4 w-full rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">

          {hldTopics.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-bold text-slate-900">High Level Design</h2>
                <span className="text-xs font-semibold bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full ring-1 ring-inset ring-violet-200">
                  HLD
                </span>
              </div>
              <div className="space-y-4">
                {hldTopics.map(topic => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isStudied={studiedIds.has(topic.id)}
                    onToggleStudied={() => toggleStudied(topic.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {lldTopics.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-lg font-bold text-slate-900">Low Level Design</h2>
                <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full ring-1 ring-inset ring-blue-200">
                  LLD
                </span>
              </div>
              <div className="space-y-4">
                {lldTopics.map(topic => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isStudied={studiedIds.has(topic.id)}
                    onToggleStudied={() => toggleStudied(topic.id)}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-500">More topics dropping soon</p>
            <p className="text-xs text-slate-400 mt-1">
              Databases · CAP Theorem · Message Queues · Rate Limiting · Microservices
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

export default SystemDesignPage;