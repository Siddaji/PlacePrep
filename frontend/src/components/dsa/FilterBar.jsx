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
    <div className="sticky top-[57px] z-10 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">

        {/* mobile row */}
        <div className="flex items-center gap-2 sm:hidden">
          <div className="relative flex-1">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={onSearchChange}
              className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2.5 pl-9 pr-3 text-sm text-gray-200 placeholder:text-gray-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <button
            onClick={() => setFiltersOpen(prev => !prev)}
            className={`relative inline-flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
              filtersOpen || activeCount > 0
                ? "bg-violet-600 text-white border-violet-600"
                : "bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* mobile filter panel */}
        {filtersOpen && (
          <div className="sm:hidden mt-3 rounded-xl border border-gray-800 bg-gray-900 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Topic</span>
                <select
                  value={topic}
                  onChange={onTopicChange}
                  className="rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-sm font-medium text-gray-300 focus:border-violet-500/50 focus:outline-none"
                >
                  <option value="All">All Topics</option>
                  {topics.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Difficulty</span>
                <select
                  value={difficulty}
                  onChange={onDifficultyChange}
                  className="rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-sm font-medium text-gray-300 focus:border-violet-500/50 focus:outline-none"
                >
                  <option value="All">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Priority</span>
                <select
                  value={priority}
                  onChange={onPriorityChange}
                  className="rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-sm font-medium text-gray-300 focus:border-violet-500/50 focus:outline-none"
                >
                  <option value="All">All</option>
                  <option value="P0">P0 — Must</option>
                  <option value="P1">P1 — Important</option>
                  <option value="P2">P2 — Good</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</span>
                <button
                  onClick={onToggleUnsolved}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors text-left ${
                    showUnsolved
                      ? "bg-violet-600 text-white border-violet-600"
                      : "bg-gray-800 text-gray-400 border-gray-700"
                  }`}
                >
                  {showUnsolved ? "Unsolved Only" : "All Problems"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => { onClearFilters(); setFiltersOpen(false); }}
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="flex-1 rounded-lg bg-violet-600 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
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
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Search</span>
            <div className="relative">
              <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search problems by title..."
                value={search}
                onChange={onSearchChange}
                className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2.5 pl-10 pr-3.5 text-sm text-gray-200 placeholder:text-gray-600 transition-colors hover:border-gray-700 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>

          {/* dropdowns + buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full lg:w-auto lg:items-end">

            <SelectField label="Topic" value={topic} onChange={onTopicChange}>
              <option value="All">All</option>
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
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Status</span>
              <button
                onClick={onToggleUnsolved}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium border transition-colors ${
                  showUnsolved
                    ? "bg-violet-600 text-white border-violet-600 hover:bg-violet-500"
                    : "bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200"
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
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide invisible">Clear</span>
              <button
                onClick={onClearFilters}
                className="rounded-lg border border-gray-800 bg-gray-900 px-3.5 py-2.5 text-sm font-medium text-gray-500 hover:border-gray-700 hover:text-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;