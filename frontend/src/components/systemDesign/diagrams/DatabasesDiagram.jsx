function DatabasesDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        SQL vs NoSQL — Data Organization
      </p>
      <svg
        viewBox="0 0 700 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-db" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* ── LEFT SIDE: SQL ── */}

        {/* SQL label */}
        <rect x="20" y="20" width="290" height="36" rx="8"
          fill="#2563eb" />
        <text x="165" y="44" textAnchor="middle" fontSize="13" fontWeight="800" fill="white">
          SQL — Relational Database
        </text>

        {/* USERS table */}
        <rect x="20" y="70" width="290" height="130" rx="8"
          fill="white" stroke="#bfdbfe" strokeWidth="1.5" />

        {/* table header */}
        <rect x="20" y="70" width="290" height="28" rx="8"
          fill="#dbeafe" />
        <rect x="20" y="84" width="290" height="14"
          fill="#dbeafe" />
        <text x="165" y="89" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
          USERS TABLE
        </text>

        {/* column headers */}
        <line x1="20" y1="98" x2="310" y2="98" stroke="#bfdbfe" strokeWidth="1" />
        <text x="45"  y="113" fontSize="9" fontWeight="600" fill="#3b82f6">id</text>
        <text x="85"  y="113" fontSize="9" fontWeight="600" fill="#3b82f6">name</text>
        <text x="155" y="113" fontSize="9" fontWeight="600" fill="#3b82f6">email</text>
        <text x="240" y="113" fontSize="9" fontWeight="600" fill="#3b82f6">college</text>

        {/* row divider */}
        <line x1="20" y1="118" x2="310" y2="118" stroke="#eff6ff" strokeWidth="1" />

        {/* row 1 */}
        <text x="45"  y="132" fontSize="9" fill="#1e3a8a">1</text>
        <text x="85"  y="132" fontSize="9" fill="#1e3a8a">Siddaji</text>
        <text x="155" y="132" fontSize="9" fill="#1e3a8a">sid@mail.com</text>
        <text x="240" y="132" fontSize="9" fill="#1e3a8a">MVJ</text>

        {/* row 2 */}
        <line x1="20" y1="137" x2="310" y2="137" stroke="#eff6ff" strokeWidth="1" />
        <text x="45"  y="151" fontSize="9" fill="#1e3a8a">2</text>
        <text x="85"  y="151" fontSize="9" fill="#1e3a8a">Rahul</text>
        <text x="155" y="151" fontSize="9" fill="#1e3a8a">r@mail.com</text>
        <text x="240" y="151" fontSize="9" fill="#1e3a8a">RVCE</text>

        {/* row 3 */}
        <line x1="20" y1="156" x2="310" y2="156" stroke="#eff6ff" strokeWidth="1" />
        <text x="45"  y="170" fontSize="9" fill="#1e3a8a">3</text>
        <text x="85"  y="170" fontSize="9" fill="#1e3a8a">Priya</text>
        <text x="155" y="170" fontSize="9" fill="#1e3a8a">p@mail.com</text>
        <text x="240" y="170" fontSize="9" fill="#1e3a8a">BIT</text>

        {/* foreign key arrow label */}
        <text x="165" y="210" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6366f1">
          Foreign Key Relationship
        </text>

        {/* arrow down */}
        <line x1="165" y1="200" x2="165" y2="222"
          stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow-db)" />

        {/* SOLVED table */}
        <rect x="20" y="225" width="290" height="130" rx="8"
          fill="white" stroke="#bfdbfe" strokeWidth="1.5" />

        <rect x="20" y="225" width="290" height="28" rx="8"
          fill="#dbeafe" />
        <rect x="20" y="239" width="290" height="14"
          fill="#dbeafe" />
        <text x="165" y="244" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
          PROBLEMS_SOLVED TABLE
        </text>

        <line x1="20" y1="253" x2="310" y2="253" stroke="#bfdbfe" strokeWidth="1" />
        <text x="40"  y="268" fontSize="9" fontWeight="600" fill="#3b82f6">id</text>
        <text x="75"  y="268" fontSize="9" fontWeight="600" fill="#ef4444">user_id ←</text>
        <text x="160" y="268" fontSize="9" fontWeight="600" fill="#3b82f6">problem_id</text>
        <text x="245" y="268" fontSize="9" fontWeight="600" fill="#3b82f6">solved_at</text>

        <line x1="20" y1="273" x2="310" y2="273" stroke="#eff6ff" strokeWidth="1" />
        <text x="40"  y="287" fontSize="9" fill="#1e3a8a">1</text>
        <text x="75"  y="287" fontSize="9" fill="#dc2626">1</text>
        <text x="160" y="287" fontSize="9" fill="#1e3a8a">5</text>
        <text x="245" y="287" fontSize="9" fill="#1e3a8a">2024-01-15</text>

        <line x1="20" y1="292" x2="310" y2="292" stroke="#eff6ff" strokeWidth="1" />
        <text x="40"  y="306" fontSize="9" fill="#1e3a8a">2</text>
        <text x="75"  y="306" fontSize="9" fill="#dc2626">1</text>
        <text x="160" y="306" fontSize="9" fill="#1e3a8a">12</text>
        <text x="245" y="306" fontSize="9" fill="#1e3a8a">2024-01-16</text>

        <line x1="20" y1="311" x2="310" y2="311" stroke="#eff6ff" strokeWidth="1" />
        <text x="40"  y="325" fontSize="9" fill="#1e3a8a">3</text>
        <text x="75"  y="325" fontSize="9" fill="#dc2626">2</text>
        <text x="160" y="325" fontSize="9" fill="#1e3a8a">5</text>
        <text x="245" y="325" fontSize="9" fill="#1e3a8a">2024-01-17</text>

        {/* SQL JOIN label */}
        <rect x="20" y="368" width="290" height="40" rx="8"
          fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="165" y="384" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">
          JOIN to get user + solved problems
        </text>
        <text x="165" y="400" textAnchor="middle" fontSize="9" fill="#3b82f6">
          SELECT * FROM users JOIN problems_solved ON id = user_id
        </text>

        {/* ── DIVIDER ── */}
        <line x1="345" y1="20" x2="345" y2="450"
          stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 3" />

        {/* ── RIGHT SIDE: NoSQL ── */}

        {/* NoSQL label */}
        <rect x="365" y="20" width="310" height="36" rx="8"
          fill="#059669" />
        <text x="520" y="44" textAnchor="middle" fontSize="13" fontWeight="800" fill="white">
          NoSQL — Document Database
        </text>

        {/* Document 1 */}
        <rect x="365" y="70" width="310" height="175" rx="8"
          fill="white" stroke="#a7f3d0" strokeWidth="1.5" />

        <rect x="365" y="70" width="310" height="28" rx="8"
          fill="#d1fae5" />
        <rect x="365" y="84" width="310" height="14"
          fill="#d1fae5" />
        <text x="520" y="89" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">
          USER DOCUMENT — Siddaji
        </text>

        <text x="382" y="115" fontSize="9" fill="#065f46" fontWeight="600">{`{`}</text>
        <text x="395" y="130" fontSize="9" fill="#374151">  _id: <tspan fill="#059669">"user_001"</tspan></text>
        <text x="395" y="145" fontSize="9" fill="#374151">  name: <tspan fill="#059669">"Siddaji"</tspan></text>
        <text x="395" y="160" fontSize="9" fill="#374151">  college: <tspan fill="#059669">"MVJ"</tspan></text>
        <text x="395" y="175" fontSize="9" fill="#374151">  streak: <tspan fill="#2563eb">7</tspan></text>
        <text x="395" y="190" fontSize="9" fill="#374151">  solved: <tspan fill="#7c3aed">[ Two Sum, Valid Anagram ]</tspan></text>
        <text x="395" y="205" fontSize="9" fill="#374151">  badges: <tspan fill="#7c3aed">[ "Array Master" ]</tspan></text>
        <text x="382" y="220" fontSize="9" fill="#065f46" fontWeight="600">{`}`}</text>

        {/* Document 2 */}
        <rect x="365" y="260" width="310" height="150" rx="8"
          fill="white" stroke="#a7f3d0" strokeWidth="1.5" />

        <rect x="365" y="260" width="310" height="28" rx="8"
          fill="#d1fae5" />
        <rect x="365" y="274" width="310" height="14"
          fill="#d1fae5" />
        <text x="520" y="279" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">
          USER DOCUMENT — Priya
        </text>

        <text x="382" y="305" fontSize="9" fill="#065f46" fontWeight="600">{`{`}</text>
        <text x="395" y="320" fontSize="9" fill="#374151">  _id: <tspan fill="#059669">"user_003"</tspan></text>
        <text x="395" y="335" fontSize="9" fill="#374151">  name: <tspan fill="#059669">"Priya"</tspan></text>
        <text x="395" y="350" fontSize="9" fill="#374151">  github: <tspan fill="#059669">"priya99"</tspan></text>
        <text x="395" y="365" fontSize="9" fill="#374151">  placement: <tspan fill="#059669">"placed at Google"</tspan></text>
        <text x="382" y="380" fontSize="9" fill="#065f46" fontWeight="600">{`}`}</text>

        {/* flexible schema note */}
        <rect x="365" y="425" width="310" height="40" rx="8"
          fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="1" />
        <text x="520" y="441" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">
          No JOIN needed — one fetch = all data
        </text>
        <text x="520" y="457" textAnchor="middle" fontSize="9" fill="#059669">
          Documents can have different fields — schema is flexible
        </text>

      </svg>
    </div>
  );
}

export default DatabasesDiagram;