import Badge from "../common/Badge.jsx";

const DIFFICULTY_STYLES = {
  Easy:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Hard:   "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

const PRIORITY_STYLES = {
  P0: "bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono",
  P1: "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono",
  P2: "bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono",
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
    <div className={`flex flex-col justify-between rounded-xl border p-5 sm:p-6 transition-all duration-150 ${
      isSolved
        ? "border-emerald-500/30 bg-emerald-950/10"
        : "border-[#27272A] bg-[#121212] hover:border-zinc-700"
    }`}>

      <div>
        {/* title + priority */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={`text-base sm:text-[17px] font-semibold leading-snug ${
            isSolved ? "text-zinc-500 line-through" : "text-[#F5F5F5]"
          }`}>
            {problem.title}
          </h3>
          <Badge className={`shrink-0 text-xs sm:text-sm font-medium ${PRIORITY_STYLES[problem.priority] || "bg-zinc-800 text-zinc-300 border border-zinc-700"}`}>
            {problem.priority}
          </Badge>
        </div>

        {/* difficulty + topic */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <Badge className={`text-xs sm:text-sm font-medium ${DIFFICULTY_STYLES[problem.difficulty] || "bg-zinc-800 text-zinc-300 border border-zinc-700"}`}>
            {problem.difficulty}
          </Badge>
          <span className="inline-flex items-center rounded-md bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-1 text-xs sm:text-sm font-medium text-zinc-300">
            {problem.topic}
          </span>
        </div>

        {/* pattern */}
        <p className="mt-3.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          <span className="font-semibold text-zinc-300">Pattern:</span>{" "}
          {problem.pattern}
        </p>

        {/* companies */}
        <div className="mt-4 pt-3.5 border-t border-[#27272A]">
          <div className="flex flex-wrap gap-1.5">
            {problem.companies.map(company => (
              <span
                key={company}
                className="inline-flex items-center rounded-md bg-zinc-800/60 border border-zinc-700/40 px-2.5 py-1 text-xs font-medium text-zinc-300"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* action row */}
      <div className="mt-5 pt-3.5 border-t border-[#27272A] flex items-center justify-between gap-3">
        <a
          href={toLeetCodeUrl(problem.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 px-3 py-1.5 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
        >
          Solve
          <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>

        <button
          onClick={onToggleSolved}
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
            isSolved
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
              : "bg-zinc-900 border-[#27272A] text-zinc-300 hover:border-zinc-700 hover:text-white"
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
