import { Link } from "react-router-dom";

const topics = [
  {
    id: 1,
    title: "Scalability & Load Balancing",
    difficulty: "Beginner",
    ready: false,
  },
  {
    id: 2,
    title: "Databases — SQL vs NoSQL",
    difficulty: "Beginner",
    ready: false,
  },
  {
    id: 3,
    title: "Caching (Redis, CDN)",
    difficulty: "Intermediate",
    ready: false,
  },
  { id: 4, title: "Rate Limiting", difficulty: "Intermediate", ready: false },
  {
    id: 5,
    title: "Message Queues & Kafka",
    difficulty: "Intermediate",
    ready: false,
  },
  {
    id: 6,
    title: "Microservices vs Monolith",
    difficulty: "Intermediate",
    ready: false,
  },
  { id: 7, title: "Consistent Hashing", difficulty: "Advanced", ready: false },
  { id: 8, title: "CAP Theorem", difficulty: "Advanced", ready: false },
  {
    id: 9,
    title: "Design URL Shortener",
    difficulty: "Interview",
    ready: false,
  },
  {
    id: 10,
    title: "Design Twitter Feed",
    difficulty: "Interview",
    ready: false,
  },
  { id: 11, title: "Design WhatsApp", difficulty: "Interview", ready: false },
  { id: 12, title: "Design Netflix", difficulty: "Interview", ready: false },
];

const difficultyStyle = {
  Beginner: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  Advanced: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  Interview: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
};

function TopicCard({ topic }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* lock icon — content not ready yet */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 shrink-0">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-slate-700">
          {topic.title}
        </span>
      </div>

      <span
        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyStyle[topic.difficulty]}`}
      >
        {topic.difficulty}
      </span>
    </div>
  );
}

function SystemDesignPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* page header */}
      <div className="mb-10">
        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
          System Design
        </h1>
        <p className="mt-2 text-sm text-slate-500 max-w-xl">
          Core concepts and interview-style questions — from basics like load
          balancing to real interview problems like designing Twitter. Content
          dropping soon.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
          🚧 Work in progress — topics listed below are planned
        </div>
      </div>

      {/* topic list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

export default SystemDesignPage;
