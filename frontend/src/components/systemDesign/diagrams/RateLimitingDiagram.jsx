function RateLimitingDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Token Bucket Rate Limiting — Request Flow
      </p>
      <svg
        viewBox="0 0 700 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-rl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-rl-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-rl-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
          </marker>
        </defs>

        {/* ── CLIENTS ── */}
        {/* Normal client */}
        <rect x="20" y="60" width="100" height="50" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="70" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Client A</text>
        <text x="70" y="98" textAnchor="middle" fontSize="9" fill="#7c3aed">Normal user</text>

        {/* Bot/attacker */}
        <rect x="20" y="200" width="100" height="50" rx="10"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="70" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">Bot</text>
        <text x="70" y="238" textAnchor="middle" fontSize="9" fill="#dc2626">50k req/sec</text>

        {/* arrows to rate limiter */}
        <line x1="120" y1="85" x2="195" y2="120"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-rl)" />
        <line x1="120" y1="225" x2="195" y2="200"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-rl)" />

        {/* ── RATE LIMITER BOX ── */}
        <rect x="195" y="80" width="150" height="160" rx="12"
          fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <rect x="195" y="80" width="150" height="35" rx="12"
          fill="#d97706" />
        <rect x="195" y="101" width="150" height="14" fill="#d97706" />
        <text x="270" y="103" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          Rate Limiter
        </text>
        <text x="270" y="118" textAnchor="middle" fontSize="9" fill="white/80">
          Redis — Token Bucket
        </text>

        {/* token bucket visual inside */}
        <rect x="215" y="128" width="110" height="90" rx="8"
          fill="white" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="270" y="145" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">
          Token Bucket
        </text>

        {/* tokens as circles */}
        <circle cx="235" cy="163" r="8" fill="#fbbf24" />
        <text x="235" y="167" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">T</text>

        <circle cx="255" cy="163" r="8" fill="#fbbf24" />
        <text x="255" y="167" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">T</text>

        <circle cx="275" cy="163" r="8" fill="#fbbf24" />
        <text x="275" y="167" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">T</text>

        <circle cx="295" cy="163" r="8" fill="#fbbf24" />
        <text x="295" y="167" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">T</text>

        <circle cx="315" cy="163" r="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
        <text x="315" y="167" textAnchor="middle" fontSize="8" fill="#94a3b8">–</text>

        <text x="270" y="195" textAnchor="middle" fontSize="8" fill="#92400e">
          4/5 tokens remaining
        </text>
        <text x="270" y="208" textAnchor="middle" fontSize="8" fill="#b45309">
          refill: 10/sec
        </text>

        {/* ── ALLOWED PATH ── */}
        <line x1="345" y1="120" x2="420" y2="80"
          stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-rl-green)" />
        <text x="385" y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">
          ✅ Allowed
        </text>

        {/* ── SERVER ── */}
        <rect x="420" y="50" width="120" height="60" rx="10"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="480" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">
          API Server
        </text>
        <text x="480" y="91" textAnchor="middle" fontSize="9" fill="#166534">
          processes request
        </text>

        {/* server response */}
        <line x1="420" y1="65" x2="345" y2="100"
          stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 2"
          markerEnd="url(#arrow-rl-green)" />
        <text x="375" y="73" textAnchor="middle" fontSize="9" fill="#16a34a">200 OK</text>

        {/* ── BLOCKED PATH ── */}
        <line x1="345" y1="200" x2="420" y2="240"
          stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow-rl-red)" />
        <text x="385" y="228" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">
          ❌ Blocked
        </text>

        {/* 429 response box */}
        <rect x="420" y="210" width="120" height="60" rx="10"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="480" y="233" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">
          HTTP 429
        </text>
        <text x="480" y="249" textAnchor="middle" fontSize="9" fill="#dc2626">
          Too Many Requests
        </text>
        <text x="480" y="262" textAnchor="middle" fontSize="8" fill="#dc2626">
          Retry-After: 60s
        </text>

        {/* 429 back to bot */}
        <line x1="420" y1="235" x2="345" y2="210"
          stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2"
          markerEnd="url(#arrow-rl-red)" />

        {/* ── REDIS STORAGE ── */}
        <rect x="195" y="280" width="150" height="70" rx="10"
          fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="270" y="303" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">
          Redis
        </text>
        <text x="270" y="319" textAnchor="middle" fontSize="9" fill="#991b1b">
          clientA: 4 tokens
        </text>
        <text x="270" y="333" textAnchor="middle" fontSize="9" fill="#991b1b">
          bot_ip: 0 tokens
        </text>
        <text x="270" y="347" textAnchor="middle" fontSize="8" fill="#b91c1c">
          TTL auto-clears per window
        </text>

        {/* rate limiter ↔ redis */}
        <line x1="270" y1="240" x2="270" y2="280"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-rl)" />
        <text x="285" y="263" textAnchor="middle" fontSize="8" fill="#64748b">lookup</text>

        {/* ── REFILL SERVICE ── */}
        <rect x="560" y="280" width="120" height="70" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="620" y="303" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">
          Refill Service
        </text>
        <text x="620" y="319" textAnchor="middle" fontSize="9" fill="#7c3aed">
          adds 10 tokens/sec
        </text>
        <text x="620" y="333" textAnchor="middle" fontSize="9" fill="#7c3aed">
          per client in Redis
        </text>

        {/* refill → redis */}
        <line x1="560" y1="315" x2="345" y2="315"
          stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 2"
          markerEnd="url(#arrow-rl)" />
        <text x="455" y="308" textAnchor="middle" fontSize="8" fill="#7c3aed">
          refill tokens
        </text>

        {/* ── LEGEND ── */}
        <line x1="20" y1="430" x2="50" y2="430"
          stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-rl-green)" />
        <text x="57" y="434" fontSize="10" fill="#16a34a" fontWeight="600">Allowed request</text>

        <line x1="185" y1="430" x2="215" y2="430"
          stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow-rl-red)" />
        <text x="222" y="434" fontSize="10" fill="#dc2626" fontWeight="600">Blocked request</text>

        <line x1="350" y1="430" x2="380" y2="430"
          stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 2"
          markerEnd="url(#arrow-rl)" />
        <text x="387" y="434" fontSize="10" fill="#7c3aed" fontWeight="600">Refill / response</text>

      </svg>
    </div>
  );
}

export default RateLimitingDiagram;