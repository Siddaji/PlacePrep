function MicroservicesDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Monolith vs Microservices Architecture
      </p>
      <svg
        viewBox="0 0 700 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-ms" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-ms-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
          </marker>
          <marker id="arrow-ms-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
        </defs>

        {/* ══ LEFT SIDE — MONOLITH ══ */}

        {/* label */}
        <rect x="20" y="20" width="290" height="32" rx="8" fill="#2563eb" />
        <text x="165" y="41" textAnchor="middle" fontSize="12" fontWeight="800" fill="white">
          Monolith
        </text>

        {/* client */}
        <rect x="60" y="72" width="90" height="40" rx="8"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="105" y="97" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Client</text>

        {/* arrow to monolith */}
        <line x1="150" y1="92" x2="185" y2="92"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-ms)" />

        {/* monolith big box */}
        <rect x="185" y="60" width="120" height="260" rx="10"
          fill="white" stroke="#2563eb" strokeWidth="2" />
        <rect x="185" y="60" width="120" height="28" rx="10" fill="#2563eb" />
        <rect x="185" y="76" width="120" height="12" fill="#2563eb" />
        <text x="245" y="79" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">
          One Server
        </text>

        {/* modules inside monolith */}
        {[
          { y: 100, label: "Auth Module",     color: "#dbeafe", border: "#93c5fd" },
          { y: 145, label: "DSA Module",      color: "#dcfce7", border: "#86efac" },
          { y: 190, label: "Subjects Module", color: "#fef3c7", border: "#fcd34d" },
          { y: 235, label: "Email Module",    color: "#fce7f3", border: "#f9a8d4" },
          { y: 280, label: "Analytics",       color: "#ede9fe", border: "#c4b5fd" },
        ].map((m) => (
          <g key={m.y}>
            <rect x="200" y={m.y} width="90" height="34" rx="6"
              fill={m.color} stroke={m.border} strokeWidth="1.5" />
            <text x="245" y={m.y + 21} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">
              {m.label}
            </text>
          </g>
        ))}

        {/* one shared DB */}
        <rect x="185" y="338" width="120" height="40" rx="8"
          fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="245" y="363" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0c4a6e">
          One Database
        </text>

        {/* monolith → db arrow */}
        <line x1="245" y1="320" x2="245" y2="338"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-ms)" />

        {/* bug indicator */}
        <rect x="195" y="233" width="100" height="38" rx="6"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="245" y="250" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">
          🐛 Bug in Email
        </text>
        <text x="245" y="264" textAnchor="middle" fontSize="8" fill="#dc2626">
          crashes EVERYTHING
        </text>

        {/* crash arrows */}
        <line x1="195" y1="265" x2="195" y2="108"
          stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2"
          markerEnd="url(#arrow-ms-red)" />

        {/* ── DIVIDER ── */}
        <line x1="345" y1="20" x2="345" y2="460"
          stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 3" />

        {/* ══ RIGHT SIDE — MICROSERVICES ══ */}

        {/* label */}
        <rect x="365" y="20" width="315" height="32" rx="8" fill="#059669" />
        <text x="522" y="41" textAnchor="middle" fontSize="12" fontWeight="800" fill="white">
          Microservices
        </text>

        {/* client */}
        <rect x="365" y="72" width="90" height="40" rx="8"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="410" y="97" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Client</text>

        {/* API Gateway */}
        <rect x="460" y="72" width="100" height="40" rx="8"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="510" y="88" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">API Gateway</text>
        <text x="510" y="103" textAnchor="middle" fontSize="8" fill="#b45309">routes requests</text>

        <line x1="455" y1="92" x2="460" y2="92"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-ms)" />

        {/* services */}
        {[
          { x: 375, y: 155, label: "Auth",     sub: "Service",  color: "#dbeafe", border: "#93c5fd", db: "#bfdbfe" },
          { x: 460, y: 155, label: "DSA",      sub: "Service",  color: "#dcfce7", border: "#86efac", db: "#bbf7d0" },
          { x: 545, y: 155, label: "Subjects", sub: "Service",  color: "#fef3c7", border: "#fcd34d", db: "#fde68a" },
          { x: 375, y: 280, label: "Email",    sub: "Service",  color: "#fce7f3", border: "#f9a8d4", db: "#fbcfe8" },
          { x: 460, y: 280, label: "Analytics",sub: "Service",  color: "#ede9fe", border: "#c4b5fd", db: "#ddd6fe" },
          { x: 545, y: 280, label: "Payment",  sub: "Service",  color: "#f0fdf4", border: "#86efac", db: "#bbf7d0" },
        ].map((s) => (
          <g key={`${s.x}-${s.y}`}>
            {/* service box */}
            <rect x={s.x} y={s.y} width="75" height="55" rx="8"
              fill={s.color} stroke={s.border} strokeWidth="1.5" />
            <text x={s.x + 37} y={s.y + 24} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e293b">
              {s.label}
            </text>
            <text x={s.x + 37} y={s.y + 38} textAnchor="middle" fontSize="8" fill="#475569">
              {s.sub}
            </text>
            {/* own db */}
            <rect x={s.x + 10} y={s.y + 62} width="55" height="22" rx="5"
              fill={s.db} stroke={s.border} strokeWidth="1" />
            <text x={s.x + 37} y={s.y + 77} textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="600">
              Own DB
            </text>
            {/* service→db arrow */}
            <line
              x1={s.x + 37} y1={s.y + 55}
              x2={s.x + 37} y2={s.y + 62}
              stroke="#94a3b8" strokeWidth="1" markerEnd="url(#arrow-ms)" />
          </g>
        ))}

        {/* gateway → services arrows */}
        <line x1="490" y1="112" x2="413" y2="155"
          stroke="#d97706" strokeWidth="1.2" markerEnd="url(#arrow-ms)" />
        <line x1="510" y1="112" x2="498" y2="155"
          stroke="#d97706" strokeWidth="1.2" markerEnd="url(#arrow-ms)" />
        <line x1="530" y1="112" x2="582" y2="155"
          stroke="#d97706" strokeWidth="1.2" markerEnd="url(#arrow-ms)" />

        {/* email down arrow (from gateway or kafka) */}
        <line x1="413" y1="210" x2="413" y2="280"
          stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arrow-ms)" />
        <line x1="498" y1="210" x2="498" y2="280"
          stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arrow-ms)" />
        <line x1="582" y1="210" x2="582" y2="280"
          stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" markerEnd="url(#arrow-ms)" />

        {/* isolated failure callout */}
        <rect x="365" y="280" width="75" height="55" rx="8"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="402" y="302" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">Email</text>
        <text x="402" y="316" textAnchor="middle" fontSize="8" fill="#dc2626">🐛 Bug</text>
        <text x="402" y="329" textAnchor="middle" fontSize="8" fill="#dc2626">isolated</text>

        {/* green checkmarks on other services */}
        <text x="498" y="316" textAnchor="middle" fontSize="14" fill="#16a34a">✓</text>
        <text x="582" y="316" textAnchor="middle" fontSize="14" fill="#16a34a">✓</text>

        {/* isolation label */}
        <rect x="430" y="390" width="220" height="32" rx="8"
          fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="540" y="411" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">
          ✅ Other services unaffected
        </text>

        {/* crash label monolith */}
        <rect x="30" y="390" width="220" height="32" rx="8"
          fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="140" y="411" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">
          ❌ Entire app crashes
        </text>

      </svg>
    </div>
  );
}

export default MicroservicesDiagram;