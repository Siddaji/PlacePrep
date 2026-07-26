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
    default: "text-gray-100",
    easy:    "text-emerald-400",
    medium:  "text-amber-400",
    hard:    "text-rose-400",
  };
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 min-w-[80px]">
      <span className={`text-xl font-bold ${colors[color] || colors.default}`}>
        {value}
      </span>
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
  );
}

function DsaPage() {
  const [problems, setProblems]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [topic, setTopic]             = useState("All");
  const [difficulty, setDifficulty]   = useState("All");
  const [priority, setPriority]       = useState("All");
  const [showUnsolved, setShowUnsolved] = useState(false);

  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    getProblems()
      .then(data => { setProblems(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  function toggleSolved(id) {
    setSolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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

  const easyCount   = problems.filter(p => p.difficulty === "Easy").length;
  const mediumCount = problems.filter(p => p.difficulty === "Medium").length;
  const hardCount   = problems.filter(p => p.difficulty === "Hard").length;
  const topicCount  = new Set(problems.map(p => p.topic)).size;
  const topics      = [...new Set(problems.map(p => p.topic))].sort();
  const solvedCount = solvedIds.size;
  const totalCount  = problems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  const filteredProblems = problems.filter(p => {
    const matchesSearch     = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesTopic      = topic === "All" || p.topic === topic;
    const matchesDifficulty = difficulty === "All" || p.difficulty === difficulty;
    const matchesPriority   = priority === "All" || p.priority === priority;
    const matchesUnsolved   = !showUnsolved || !solvedIds.has(p.id);
    return matchesSearch && matchesTopic && matchesDifficulty && matchesPriority && matchesUnsolved;
  });

  return (
    <div>

      {/* page header */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

          <Link to="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Home
          </Link>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
                DSA Tracker
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Curated problems by topic, pattern, and company — sorted by interview priority.
              </p>
            </div>

            {/* progress */}
            {!loading && totalCount > 0 && (
              <div className="sm:text-right">
                <p className="text-sm font-semibold text-gray-300">
                  {solvedCount}{" "}
                  <span className="font-normal text-gray-600">/ {totalCount} Solved</span>
                </p>
                <div className="mt-1.5 w-full sm:w-48 h-1.5 rounded-full bg-gray-800">
                  <div
                    className="h-1.5 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-600">{progressPct}% complete</p>
              </div>
            )}
          </div>

          {/* stat strip */}
          {!loading && (
            <div className="mt-6 flex flex-wrap gap-3">
              <StatBox label="Total"  value={totalCount}  color="default" />
              <StatBox label="Easy"   value={easyCount}   color="easy" />
              <StatBox label="Medium" value={mediumCount} color="medium" />
              <StatBox label="Hard"   value={hardCount}   color="hard" />
              <StatBox label="Topics" value={topicCount}  color="default" />
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
        showUnsolved={showUnsolved}
        onToggleUnsolved={() => setShowUnsolved(prev => !prev)}
        onClearFilters={clearFilters}
      />

      {/* problem grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium text-gray-600">
            Showing{" "}
            <span className="text-gray-300 font-semibold">{filteredProblems.length}</span>
            {" "}of{" "}
            <span className="text-gray-300 font-semibold">{totalCount}</span>
            {" "}problems
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : filteredProblems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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