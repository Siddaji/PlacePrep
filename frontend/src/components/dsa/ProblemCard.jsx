import Badge from "../common/Badge.jsx";

const DIFFICULTY_STYLES = {
  Easy:   "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Medium: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  Hard:   "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
};

const PRIORITY_STYLES = {
  P0: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  P1: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200",
  P2: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
};

function toLeetCodeUrl(title) {
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://leetcode.com/problems/${slug}/`;
}

// no useState import needed anymore — this component owns no state
function ProblemCard({ problem, isSolved, onToggleSolved }) {
  return (
    <div className={`group flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
      isSolved
        ? "border-emerald-200 bg-emerald-50/30"
        : "border-slate-200 hover:border-violet-200"
    }`}>

      {/* title + priority */}
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-base font-semibold leading-snug ${
          isSolved ? "text-slate-400 line-through" : "text-slate-900"
        }`}>
          {problem.title}
        </h3>
        <Badge className={PRIORITY_STYLES[problem.priority] || "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200"}>
          {problem.priority}
        </Badge>
      </div>

      {/* difficulty + topic */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge className={DIFFICULTY_STYLES[problem.difficulty] || "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200"}>
          {problem.difficulty}
        </Badge>
        <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-200">
          {problem.topic}
        </span>
      </div>

      {/* pattern */}
      <p className="mt-3 text-sm text-slate-500">
        <span className="font-medium text-slate-700">Pattern:</span>{" "}
        {problem.pattern}
      </p>

      {/* companies */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
          Companies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {problem.companies.map(company => (
            <span
              key={company}
              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* action row */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <a
          href={toLeetCodeUrl(problem.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          Solve on LeetCode
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>

        <button
          onClick={onToggleSolved}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            isSolved
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {isSolved ? (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Solved
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mark Solved
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProblemCard;