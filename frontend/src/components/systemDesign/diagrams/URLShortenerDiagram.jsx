function URLShortenerDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        URL Shortener — Write Path + Read Path
      </p>
      <svg
        viewBox="0 0 700 520"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-us" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-us-violet" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed" />
          </marker>
          <marker id="arrow-us-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-us-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d97706" />
          </marker>
          <marker id="arrow-us-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#2563eb" />
          </marker>
        </defs>

        {/* ══ WRITE PATH (top half) ══ */}

        {/* WRITE label */}
        <rect x="20" y="16" width="660" height="26" rx="6"
          fill="#7c3aed" />
        <text x="350" y="33" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          ✍️  WRITE PATH — Shorten a URL
        </text>

        {/* User */}
        <rect x="20" y="58" width="90" height="55" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="65" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">User</text>
        <text x="65" y="94" textAnchor="middle" fontSize="8" fill="#7c3aed">POST</text>
        <text x="65" y="106" textAnchor="middle" fontSize="8" fill="#7c3aed">/shorten</text>

        {/* user → load balancer */}
        <line x1="110" y1="85" x2="155" y2="85"
          stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-us-violet)" />

        {/* Load Balancer */}
        <rect x="155" y="62" width="90" height="46" rx="8"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="200" y="81" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Load</text>
        <text x="200" y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Balancer</text>

        {/* lb → web server */}
        <line x1="245" y1="85" x2="290" y2="85"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Web Server */}
        <rect x="290" y="58" width="100" height="55" rx="8"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="340" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">Web Server</text>
        <text x="340" y="96" textAnchor="middle" fontSize="8" fill="#166534">validate URL</text>
        <text x="340" y="108" textAnchor="middle" fontSize="8" fill="#166534">call counter</text>

        {/* web server → counter service */}
        <line x1="390" y1="85" x2="435" y2="85"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Counter Service */}
        <rect x="435" y="58" width="100" height="55" rx="8"
          fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <text x="485" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9d174d">Counter</text>
        <text x="485" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9d174d">Service</text>
        <text x="485" y="106" textAnchor="middle" fontSize="8" fill="#be185d">Redis INCR</text>

        {/* counter → encoder */}
        <line x1="535" y1="85" x2="580" y2="85"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Base62 Encoder */}
        <rect x="580" y="58" width="100" height="55" rx="8"
          fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="630" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">Base62</text>
        <text x="630" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1d4ed8">Encoder</text>
        <text x="630" y="106" textAnchor="middle" fontSize="8" fill="#1e40af">12345 → dnh75K</text>

        {/* encoder → DB (down) */}
        <line x1="630" y1="113" x2="630" y2="155"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Database */}
        <rect x="560" y="155" width="140" height="55" rx="8"
          fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="630" y="177" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0c4a6e">Database</text>
        <text x="630" y="193" textAnchor="middle" fontSize="8" fill="#075985">dnh75K →</text>
        <text x="630" y="205" textAnchor="middle" fontSize="8" fill="#075985">placeprep.vercel.app/dsa</text>

        {/* encoder → redis cache (down-left) */}
        <line x1="600" y1="113" x2="490" y2="155"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Redis Cache */}
        <rect x="415" y="155" width="120" height="55" rx="8"
          fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="475" y="177" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7f1d1d">Redis Cache</text>
        <text x="475" y="193" textAnchor="middle" fontSize="8" fill="#991b1b">dnh75K → long URL</text>
        <text x="475" y="205" textAnchor="middle" fontSize="8" fill="#991b1b">TTL: 24 hours</text>

        {/* response back to user */}
        <path d="M 340 113 Q 200 145 65 145 Q 65 130 65 113"
          fill="none" stroke="#16a34a" strokeWidth="1.5"
          strokeDasharray="4 2" markerEnd="url(#arrow-us-green)" />
        <text x="200" y="148" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">
          returns: plprp.co/dnh75K
        </text>

        {/* ── DIVIDER ── */}
        <line x1="20" y1="228" x2="680" y2="228"
          stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 3" />

        {/* ══ READ PATH (bottom half) ══ */}

        {/* READ label */}
        <rect x="20" y="238" width="660" height="26" rx="6"
          fill="#059669" />
        <text x="350" y="255" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          🔗  READ PATH — Redirect from Short URL
        </text>

        {/* User visits */}
        <rect x="20" y="278" width="90" height="60" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="65" y="298" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">User</text>
        <text x="65" y="312" textAnchor="middle" fontSize="8" fill="#7c3aed">visits</text>
        <text x="65" y="324" textAnchor="middle" fontSize="8" fill="#7c3aed">plprp.co</text>
        <text x="65" y="336" textAnchor="middle" fontSize="8" fill="#7c3aed">/dnh75K</text>

        <line x1="110" y1="308" x2="155" y2="308"
          stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-us-violet)" />

        {/* Load Balancer read */}
        <rect x="155" y="285" width="90" height="46" rx="8"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="200" y="304" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Load</text>
        <text x="200" y="318" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">Balancer</text>

        <line x1="245" y1="308" x2="290" y2="308"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Web Server read */}
        <rect x="290" y="278" width="100" height="60" rx="8"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="340" y="300" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">Web Server</text>
        <text x="340" y="316" textAnchor="middle" fontSize="8" fill="#166534">extract code</text>
        <text x="340" y="328" textAnchor="middle" fontSize="8" fill="#166534">lookup dnh75K</text>

        {/* web server → redis (cache check) */}
        <line x1="390" y1="308" x2="435" y2="308"
          stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow-us)" />

        {/* Redis read */}
        <rect x="435" y="278" width="120" height="60" rx="8"
          fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="495" y="298" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7f1d1d">Redis Cache</text>
        <text x="495" y="314" textAnchor="middle" fontSize="8" fill="#991b1b">check dnh75K</text>
        <text x="495" y="327" textAnchor="middle" fontSize="8" fontWeight="600" fill="#16a34a">HIT ✓ → long URL</text>

        {/* cache HIT → redirect user */}
        <path d="M 435 295 Q 300 265 150 280 Q 110 280 110 308"
          fill="none" stroke="#16a34a" strokeWidth="2"
          markerEnd="url(#arrow-us-green)" />
        <text x="275" y="268" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">
          302 Redirect → original URL
        </text>

        {/* cache MISS path */}
        <line x1="555" y1="308" x2="600" y2="308"
          stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 2"
          markerEnd="url(#arrow-us-amber)" />
        <text x="577" y="300" textAnchor="middle" fontSize="8" fill="#d97706" fontWeight="600">MISS</text>

        {/* DB read */}
        <rect x="600" y="278" width="80" height="60" rx="8"
          fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="640" y="302" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0c4a6e">Database</text>
        <text x="640" y="318" textAnchor="middle" fontSize="8" fill="#075985">fetch URL</text>
        <text x="640" y="332" textAnchor="middle" fontSize="8" fill="#075985">store in Redis</text>

        {/* ── ANALYTICS STRIP ── */}
        <rect x="20" y="370" width="660" height="50" rx="10"
          fill="#faf5ff" stroke="#c4b5fd" strokeWidth="1.5" />
        <text x="350" y="390" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">
          📊 Analytics Pipeline
        </text>
        <text x="350" y="408" textAnchor="middle" fontSize="9" fill="#6d28d9">
          Every redirect → publish event to Kafka → Analytics Consumer tracks clicks, geography, device
        </text>

        {/* ── BASE62 EXPLAINER ── */}
        <rect x="20" y="435" width="320" height="60" rx="10"
          fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="180" y="455" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">
          Base62 Encoding
        </text>
        <text x="180" y="471" textAnchor="middle" fontSize="9" fill="#1e40af">
          Counter: 12,345,678
        </text>
        <text x="180" y="485" textAnchor="middle" fontSize="9" fill="#1e40af">
          Base62: dnh75K  (6 chars = 62⁶ = 56B combinations)
        </text>

        {/* ── 301 vs 302 ── */}
        <rect x="360" y="435" width="320" height="60" rx="10"
          fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="520" y="455" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">
          301 vs 302 Redirect
        </text>
        <text x="520" y="471" textAnchor="middle" fontSize="9" fill="#166534">
          301 Permanent — browser caches, no analytics
        </text>
        <text x="520" y="485" textAnchor="middle" fontSize="9" fill="#166534">
          302 Temporary — every visit tracked ✅
        </text>

      </svg>
    </div>
  );
}

export default URLShortenerDiagram;