import { useState } from "react";
import SelectField from "../common/SelectField.jsx";

function FilterBar({
  topics,
  search,
  onSearchChange,
  topic,
  onTopicChange,
  difficulty,
  onDifficultyChange,
  priority,
  onPriorityChange,
  showUnsolved,
  onToggleUnsolved,
  onClearFilters,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCount = [
    topic !== "All",
    difficulty !== "All",
    priority !== "All",
    showUnsolved,
  ].filter(Boolean).length;

  return (
    <div className="sticky top-[64px] z-10 border-b border-[#27272A] bg-[#0B0B0B]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5">

        {/* mobile row */}
        <div className="flex items-center gap-2.5 sm:hidden">
          <div className="relative flex-1">
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={onSearchChange}
              className="w-full rounded-lg border border-[#27272A] bg-[#121212] py-2.5 pl-10 pr-3.5 text-sm font-medium text-zinc-200 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setFiltersOpen(prev => !prev)}
            className={`relative inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition-colors shrink-0 ${
              filtersOpen || activeCount > 0
                ? "bg-zinc-800 text-white border-zinc-700"
                : "bg-[#121212] text-zinc-300 border-[#27272A] hover:border-zinc-700"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* mobile filter panel */}
        {filtersOpen && (
          <div className="sm:hidden mt-3 rounded-xl border border-[#27272A] bg-[#121212] p-4 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Topic</span>
                <select
                  value={topic}
                  onChange={onTopicChange}
                  className="rounded-lg border border-[#27272A] bg-zinc-900 py-2 px-3 text-sm font-medium text-zinc-200 focus:border-zinc-500 focus:outline-none"
                >
                  <option value="All">All Topics</option>
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Difficulty</span>
                <select
                  value={difficulty}
                  onChange={onDifficultyChange}
                  className="rounded-lg border border-[#27272A] bg-zinc-900 py-2 px-3 text-sm font-medium text-zinc-200 focus:border-zinc-500 focus:outline-none"
                >
                  <option value="All">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Priority</span>
                <select
                  value={priority}
                  onChange={onPriorityChange}
                  className="rounded-lg border border-[#27272A] bg-zinc-900 py-2 px-3 text-sm font-medium text-zinc-200 focus:border-zinc-500 focus:outline-none"
                >
                  <option value="All">All</option>
                  <option value="P0">P0 — Must</option>
                  <option value="P1">P1 — Important</option>
                  <option value="P2">P2 — Good</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</span>
                <button
                  onClick={onToggleUnsolved}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors text-left ${
                    showUnsolved
                      ? "bg-zinc-800 text-white border-zinc-700"
                      : "bg-zinc-900 text-zinc-300 border-[#27272A]"
                  }`}
                >
                  {showUnsolved ? "Unsolved Only" : "All Problems"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => { onClearFilters(); setFiltersOpen(false); }}
                className="flex-1 rounded-lg border border-[#27272A] bg-zinc-900 py-2.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 rounded-lg bg-white py-2.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* desktop row */}
        <div className="hidden sm:flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">

          {/* search */}
          <div className="flex flex-col gap-1.5 w-full lg:flex-1">
            <span className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider">Search</span>
            <div className="relative">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search problem title..."
                value={search}
                onChange={onSearchChange}
                className="w-full rounded-lg border border-[#27272A] bg-[#121212] py-2.5 pl-10 pr-3.5 text-sm font-medium text-zinc-200 placeholder:text-zinc-500 transition-colors hover:border-zinc-700 focus:border-zinc-500 focus:outline-none"
              />
            </div>
          </div>

          {/* dropdowns + buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3.5 w-full lg:w-auto lg:items-end">

            <SelectField label="Topic" value={topic} onChange={onTopicChange}>
              <option value="All">All Topics</option>
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </SelectField>

            <SelectField label="Difficulty" value={difficulty} onChange={onDifficultyChange}>
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </SelectField>

            <SelectField label="Priority" value={priority} onChange={onPriorityChange}>
              <option value="All">All</option>
              <option value="P0">P0 — Must Solve</option>
              <option value="P1">P1 — Important</option>
              <option value="P2">P2 — Good to Know</option>
            </SelectField>

            {/* unsolved toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider">Status</span>
              <button
                onClick={onToggleUnsolved}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium border transition-colors ${
                  showUnsolved
                    ? "bg-zinc-800 text-white border-zinc-700"
                    : "bg-[#121212] text-zinc-300 border-[#27272A] hover:border-zinc-700 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {showUnsolved ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                {showUnsolved ? "Unsolved Only" : "All Problems"}
              </button>
            </div>

            {/* clear */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider invisible">Clear</span>
              <button
                onClick={onClearFilters}
                className="rounded-lg border border-[#27272A] bg-[#121212] px-3.5 py-2.5 text-sm font-medium text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-colors"
              >
                Reset
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;
