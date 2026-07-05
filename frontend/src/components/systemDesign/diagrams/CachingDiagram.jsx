function CachingDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Caching Architecture Diagram
      </p>
      <svg
        viewBox="0 0 700 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
          </marker>
        </defs>

        {/* ── USER ── */}
        <rect x="20" y="190" width="90" height="50" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="65" y="211" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">User</text>
        <text x="65" y="228" textAnchor="middle" fontSize="10" fill="#7c3aed">Request</text>

        {/* user → CDN */}
        <line x1="110" y1="215" x2="175" y2="215"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow2)" />

        {/* ── CDN ── */}
        <rect x="175" y="170" width="110" height="90" rx="10"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="230" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">CDN</text>
        <text x="230" y="214" textAnchor="middle" fontSize="10" fill="#b45309">Geographic</text>
        <text x="230" y="228" textAnchor="middle" fontSize="10" fill="#b45309">Cache</text>
        <text x="230" y="248" textAnchor="middle" fontSize="9" fill="#b45309">Cloudflare/AWS</text>

        {/* CDN hit — goes back to user */}
        <path d="M 175 200 Q 140 150 110 200"
          fill="none" stroke="#16a34a" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow-green)" />
        <text x="125" y="160" textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="600">
          Cache HIT
        </text>
        <text x="125" y="172" textAnchor="middle" fontSize="9" fill="#16a34a">
          static files
        </text>

        {/* CDN miss → App Server */}
        <line x1="285" y1="215" x2="360" y2="215"
          stroke="#dc2626" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow-red)" />
        <text x="322" y="207" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="600">
          Cache MISS
        </text>

        {/* ── APP SERVER ── */}
        <rect x="360" y="170" width="110" height="90" rx="10"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="415" y="198" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">
          App Server
        </text>
        <text x="415" y="214" textAnchor="middle" fontSize="10" fill="#166534">Node.js</text>
        <text x="415" y="232" textAnchor="middle" fontSize="9" fill="#166534">Check Redis</text>
        <text x="415" y="247" textAnchor="middle" fontSize="9" fill="#166534">first</text>

        {/* app server → redis */}
        <line x1="470" y1="195" x2="540" y2="130"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow2)" />

        {/* ── REDIS ── */}
        <rect x="540" y="80" width="110" height="90" rx="10"
          fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="595" y="108" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">
          Redis Cache
        </text>
        <text x="595" y="124" textAnchor="middle" fontSize="10" fill="#991b1b">In-Memory</text>
        <text x="595" y="140" textAnchor="middle" fontSize="10" fill="#991b1b">~0.1ms read</text>
        <text x="595" y="158" textAnchor="middle" fontSize="9" fill="#991b1b">TTL: 1 hour</text>

        {/* redis hit → app server */}
        <path d="M 540 120 Q 510 150 470 200"
          fill="none" stroke="#16a34a" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow-green)" />
        <text x="495" y="148" textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="600">
          HIT ✓
        </text>

        {/* redis miss → database */}
        <line x1="595" y1="170" x2="595" y2="290"
          stroke="#dc2626" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow-red)" />
        <text x="620" y="235" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="600">
          MISS
        </text>

        {/* ── DATABASE ── */}
        <rect x="510" y="290" width="170" height="70" rx="10"
          fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="595" y="322" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c4a6e">
          Database
        </text>
        <text x="595" y="340" textAnchor="middle" fontSize="10" fill="#075985">
          MongoDB / PostgreSQL
        </text>
        <text x="595" y="354" textAnchor="middle" fontSize="9" fill="#075985">
          ~10ms read
        </text>

        {/* database → redis (store result) */}
        <path d="M 510 310 Q 480 260 540 190"
          fill="none" stroke="#7c3aed" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow2)" />
        <text x="470" y="265" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="600">
          Store in
        </text>
        <text x="470" y="277" textAnchor="middle" fontSize="9" fill="#7c3aed">
          cache
        </text>

        {/* ── LEGEND ── */}
        <line x1="20" y1="420" x2="50" y2="420"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow2)" />
        <text x="57" y="424" fontSize="10" fill="#64748b">Normal flow</text>

        <line x1="155" y1="420" x2="185" y2="420"
          stroke="#16a34a" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow-green)" />
        <text x="192" y="424" fontSize="10" fill="#16a34a">Cache hit</text>

        <line x1="265" y1="420" x2="295" y2="420"
          stroke="#dc2626" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow-red)" />
        <text x="302" y="424" fontSize="10" fill="#dc2626">Cache miss</text>

        <line x1="375" y1="420" x2="405" y2="420"
          stroke="#7c3aed" strokeWidth="1.5"
          strokeDasharray="5 2" markerEnd="url(#arrow2)" />
        <text x="412" y="424" fontSize="10" fill="#7c3aed">Cache store</text>

      </svg>
    </div>
  );
}

export default CachingDiagram;