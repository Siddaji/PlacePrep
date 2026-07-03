import { Link } from "react-router-dom";

const subjects = [
  {
    id: "os",
    title: "Operating Systems",
    short: "OS",
    description: "Processes, threads, memory management, scheduling, deadlocks, virtual memory.",
    topics: ["Process vs Thread", "CPU Scheduling", "Deadlocks", "Paging & Segmentation", "Semaphores"],
    color: "violet",
    ready: false,
  },
  {
    id: "dbms",
    title: "Database Management",
    short: "DBMS",
    description: "ACID properties, normalization, indexing, transactions, SQL queries, NoSQL basics.",
    topics: ["ACID Properties", "Normalization", "Indexing", "Joins", "Transactions"],
    color: "blue",
    ready: false,
  },
  {
    id: "cn",
    title: "Computer Networks",
    short: "CN",
    description: "OSI model, TCP/IP, HTTP vs HTTPS, DNS, sockets, congestion control.",
    topics: ["OSI vs TCP/IP", "HTTP & HTTPS", "DNS", "TCP vs UDP", "Subnetting"],
    color: "emerald",
    ready: false,
  },
  {
    id: "oop",
    title: "Object Oriented Programming",
    short: "OOP",
    description: "Four pillars, SOLID principles, design patterns, abstraction vs encapsulation.",
    topics: ["4 Pillars", "SOLID", "Design Patterns", "Abstract vs Interface", "Polymorphism"],
    color: "rose",
    ready: false,
  },
];

const colorMap = {
  violet: {
    header: "bg-violet-600",
    badge:  "bg-violet-50 text-violet-700 ring-violet-200",
    pill:   "bg-violet-50 text-violet-600",
  },
  blue: {
    header: "bg-blue-600",
    badge:  "bg-blue-50 text-blue-700 ring-blue-200",
    pill:   "bg-blue-50 text-blue-600",
  },
  emerald: {
    header: "bg-emerald-600",
    badge:  "bg-emerald-50 text-emerald-700 ring-emerald-200",
    pill:   "bg-emerald-50 text-emerald-600",
  },
  rose: {
    header: "bg-rose-600",
    badge:  "bg-rose-50 text-rose-700 ring-rose-200",
    pill:   "bg-rose-50 text-rose-600",
  },
};

function SubjectCard({ subject }) {
  const c = colorMap[subject.color];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* colored top bar with subject abbreviation */}
      <div className={`${c.header} px-6 py-5`}>
        <span className="text-3xl font-black text-white/90">{subject.short}</span>
        <p className="text-xs text-white/70 mt-0.5">{subject.title}</p>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-slate-500 leading-relaxed">
          {subject.description}
        </p>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Key Topics
          </p>
          <div className="flex flex-wrap gap-1.5">
            {subject.topics.map(t => (
              <span
                key={t}
                className={`text-xs font-medium px-2 py-0.5 rounded-md ${c.pill}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* coming soon — bottom of card */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ring-inset ${c.badge}`}>
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}

function SubjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

      {/* header */}
      <div className="mb-10">
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
          ← Back to Home
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
          Core Subjects
        </h1>
        <p className="mt-2 text-sm text-slate-500 max-w-xl">
          OS, DBMS, CN, and OOP — the four subjects that show up in almost every
          tech interview. Notes and key questions coming soon.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
          🚧 Work in progress — structure is ready, content dropping soon
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}

export default SubjectsPage;