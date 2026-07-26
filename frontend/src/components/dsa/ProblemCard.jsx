import Badge from "../common/Badge.jsx";

const DIFFICULTY_STYLES = {
  Easy:   "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  Hard:   "bg-rose-500/10 text-rose-400 ring-rose-500/20",
};

const PRIORITY_STYLES = {
  P0: "bg-red-500/10 text-red-400 ring-red-500/20",
  P1: "bg-orange-500/10 text-orange-400 ring-orange-500/20",
  P2: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
};

function toLeetCodeUrl(title) {
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://leetcode.com/problems/${slug}/`;
}

function ProblemCard({ problem, isSolved, onToggleSolved }) {
  return (
    <div className={`group flex flex-col rounded-2xl border bg-gray-900 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 ${
      isSolved
        ? "border-emerald-500/30 bg-emerald-500/5"
        : "border-gray-800 hover:border-violet-500/30"
    }`}>

      {/* title + priority */}
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-sm font-semibold leading-snug ${
          isSolved ? "text-gray-600 line-through" : "text-gray-100"
        }`}>
          {problem.title}
        </h3>
        <Badge className={`ring-1 ring-inset shrink-0 ${PRIORITY_STYLES[problem.priority] || "bg-gray-800 text-gray-400 ring-gray-700"}`}>
          {problem.priority}
        </Badge>
      </div>

      {/* difficulty + topic */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge className={`ring-1 ring-inset ${DIFFICULTY_STYLES[problem.difficulty] || "bg-gray-800 text-gray-400 ring-gray-700"}`}>
          {problem.difficulty}
        </Badge>
        <span className="inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400 ring-1 ring-inset ring-violet-500/20">
          {problem.topic}
        </span>
      </div>

      {/* pattern */}
      <p className="mt-3 text-xs text-gray-600">
        <span className="font-medium text-gray-500">Pattern:</span>{" "}
        {problem.pattern}
      </p>

      {/* companies */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
          Companies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {problem.companies.map(company => (
            <span
              key={company}
              className="inline-flex items-center rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-gray-400"
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* action row */}
      <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
        <a
          href={toLeetCodeUrl(problem.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 px-3 py-1.5 text-xs font-semibold text-gray-300 transition-colors"
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
              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
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