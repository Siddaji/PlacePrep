import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/problemService.js";
import FilterBar from "../components/dsa/FilterBar.jsx";
import ProblemCard from "../components/dsa/ProblemCard.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import LoadingState from "../components/common/LoadingState.jsx";

const STORAGE_KEY = "placeprep-solved";

function StatBox({ label, value, color }) {
  const colors = {
    default: "text-slate-700",
    easy:    "text-emerald-600",
    medium:  "text-amber-500",
    hard:    "text-rose-500",
  };
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm min-w-[80px]">
      <span className={`text-xl font-bold ${colors[color] || colors.default}`}>
        {value}
      </span>
      <span className="text-xs text-slate-400 font-medium">{label}</span>
    </div>
  );
}

function DsaPage() {
  const [problems, setProblems]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [topic, setTopic]         = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [priority, setPriority]   = useState("All");
  const [showUnsolved, setShowUnsolved] = useState(false);

  // solved state lives here now — Set of solved problem IDs
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    getProblems()
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  function toggleSolved(id) {
    setSolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // persist the whole set as a JSON array
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  const clearFilters = () => {
    setSearch("");
    setTopic("All");
    setDifficulty("All");
    setPriority("All");
    setShowUnsolved(false);
  };

  // derived values
  const easyCount   = problems.filter(p => p.difficulty === "Easy").length;
  const mediumCount = problems.filter(p => p.difficulty === "Medium").length;
  const hardCount   = problems.filter(p => p.difficulty === "Hard").length;
  const topicCount  = new Set(problems.map(p=>p.topic)).size;
  const topics  = [...new Set(problems.map(p=>p.topic))].sort();
  const solvedCount = solvedIds.size;
  const totalCount  = problems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  const filteredProblems = problems.filter(p => {
    const matchesSearch     = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesTopic      = topic === "All" || p.topic.toLowerCase() === topic.toLowerCase();
    const matchesDifficulty = difficulty === "All" || p.difficulty === difficulty;
    const matchesPriority   = priority === "All" || p.priority === priority;
    const matchesUnsolved = !showUnsolved || !solvedIds.has(p.id);
    return matchesSearch && matchesTopic && matchesDifficulty && matchesPriority && matchesUnsolved;
  });

  return (
    <div>
      {/* page header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            ← Home
          </Link>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                DSA Tracker
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Curated problems by topic, pattern, and company — sorted by interview priority.
              </p>
            </div>

            {/* progress — only show once data is loaded */}
            {!loading && totalCount > 0 && (
              <div className="sm:text-right">
                <p className="text-sm font-semibold text-slate-700">
                  {solvedCount}{" "}
                  <span className="font-normal text-slate-400">/ {totalCount} Solved</span>
                </p>
                {/* progress bar */}
                <div className="mt-1.5 w-full sm:w-48 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">{progressPct}% complete</p>
              </div>
            )}
          </div>

          {/* stat strip */}
          {!loading && (
            <div className="mt-6 flex flex-wrap gap-3">
              <StatBox label="Total"   value={totalCount}  color="default" />
              <StatBox label="Easy"    value={easyCount}   color="easy" />
              <StatBox label="Medium"  value={mediumCount} color="medium" />
              <StatBox label="Hard"    value={hardCount}   color="hard" />
              <StatBox label="Topics"  value={topicCount}  color="default" />
            </div>
          )}

        </div>
      </div>

      {/* filter bar */}
      <FilterBar
        topics={topics}
        search={search}
        onSearchChange={e => setSearch(e.target.value)}
        topic={topic}
        onTopicChange={e => setTopic(e.target.value)}
        difficulty={difficulty}
        onDifficultyChange={e => setDifficulty(e.target.value)}
        priority={priority}
        onPriorityChange={e => setPriority(e.target.value)}
        showUnsolved = {showUnsolved}
        onToggleUnsolved = {() => setShowUnsolved(prev => !prev)}
        onClearFilters={clearFilters}
      />

      {/* problem grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium text-slate-500">
            Showing{" "}
            <span className="text-slate-800 font-semibold">{filteredProblems.length}</span>
            {" "}of{" "}
            <span className="text-slate-800 font-semibold">{totalCount}</span>
            {" "}problems
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : filteredProblems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProblems.map(p => (
              <ProblemCard
                key={p.id}
                problem={p}
                isSolved={solvedIds.has(p.id)}
                onToggleSolved={() => toggleSolved(p.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DsaPage;