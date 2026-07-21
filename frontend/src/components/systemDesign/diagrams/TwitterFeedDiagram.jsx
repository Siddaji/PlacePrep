function TwitterFeedDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Twitter Feed — Hybrid Fan-out Architecture
      </p>
      <svg
        viewBox="0 0 700 540"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-tf" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-tf-violet" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed" />
          </marker>
          <marker id="arrow-tf-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#2563eb" />
          </marker>
          <marker id="arrow-tf-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-tf-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d97706" />
          </marker>
          <marker id="arrow-tf-rose" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
          </marker>
        </defs>

        {/* ══ WRITE PATH — Tweet Posted ══ */}
        <rect x="20" y="14" width="660" height="26" rx="6" fill="#7c3aed" />
        <text x="350" y="31" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          ✍️  WRITE PATH — User Posts a Tweet
        </text>

        {/* Regular user tweeting */}
        <rect x="20" y="56" width="90" height="60" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="65" y="76" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Regular</text>
        <text x="65" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">User</text>
        <text x="65" y="105" textAnchor="middle" fontSize="8" fill="#7c3aed">200 followers</text>

        {/* celebrity tweeting */}
        <rect x="20" y="136" width="90" height="60" rx="10"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="65" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">Celebrity</text>
        <text x="65" y="170" textAnchor="middle" fontSize="8" fill="#dc2626">50M followers</text>
        <text x="65" y="184" textAnchor="middle" fontSize="8" fill="#dc2626">⭐ verified</text>

        {/* both → tweet service */}
        <line x1="110" y1="86" x2="175" y2="115"
          stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-tf-violet)" />
        <line x1="110" y1="166" x2="175" y2="145"
          stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow-tf-rose)" />

        {/* Tweet Service */}
        <rect x="175" y="100" width="110" height="55" rx="8"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="230" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14532d">Tweet Service</text>
        <text x="230" y="138" textAnchor="middle" fontSize="8" fill="#166534">save to Tweets DB</text>
        <text x="230" y="150" textAnchor="middle" fontSize="8" fill="#166534">publish to Kafka</text>

        {/* tweet service → tweets DB */}
        <rect x="175" y="175" width="110" height="40" rx="8"
          fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="230" y="195" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0c4a6e">Tweets DB</text>
        <text x="230" y="208" textAnchor="middle" fontSize="8" fill="#075985">all tweets stored</text>
        <line x1="230" y1="155" x2="230" y2="175"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />

        {/* tweet service → kafka */}
        <line x1="285" y1="127" x2="340" y2="127"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />

        {/* Kafka */}
        <rect x="340" y="100" width="100" height="55" rx="8"
          fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="390" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">Kafka</text>
        <text x="390" y="138" textAnchor="middle" fontSize="9" fill="#b45309">tweet-events</text>
        <text x="390" y="150" textAnchor="middle" fontSize="8" fill="#b45309">topic</text>

        {/* kafka → fan-out service */}
        <line x1="440" y1="127" x2="490" y2="127"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-tf)" />

        {/* Fan-out Service */}
        <rect x="490" y="100" width="120" height="55" rx="8"
          fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
        <text x="550" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#9d174d">Fan-out Service</text>
        <text x="550" y="132" textAnchor="middle" fontSize="8" fill="#be185d">checks follower count</text>
        <text x="550" y="145" textAnchor="middle" fontSize="8" fill="#be185d">regular vs celebrity</text>

        {/* fan-out → regular followers cache */}
        <line x1="550" y1="155" x2="480" y2="235"
          stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-tf-blue)" />
        <text x="490" y="200" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">
          push to
        </text>
        <text x="490" y="212" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">
          each follower
        </text>

        {/* fan-out → skip for celebrity */}
        <line x1="610" y1="127" x2="650" y2="127"
          stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2"
          markerEnd="url(#arrow-tf-rose)" />
        <rect x="650" y="110" width="40" height="32" rx="6"
          fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="670" y="125" textAnchor="middle" fontSize="8" fontWeight="700" fill="#dc2626">SKIP</text>
        <text x="670" y="137" textAnchor="middle" fontSize="7" fill="#dc2626">50M!</text>

        {/* ── DIVIDER ── */}
        <line x1="20" y1="228" x2="680" y2="228"
          stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 3" />

        {/* ══ READ PATH — Open Feed ══ */}
        <rect x="20" y="238" width="660" height="26" rx="6" fill="#059669" />
        <text x="350" y="255" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          👁️  READ PATH — User Opens Their Feed
        </text>

        {/* reader user */}
        <rect x="20" y="278" width="90" height="60" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="65" y="298" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">Reader</text>
        <text x="65" y="312" textAnchor="middle" fontSize="8" fill="#7c3aed">opens feed</text>
        <text x="65" y="326" textAnchor="middle" fontSize="8" fill="#7c3aed">GET /timeline</text>

        <line x1="110" y1="308" x2="155" y2="308"
          stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-tf-violet)" />

        {/* Timeline Service */}
        <rect x="155" y="280" width="110" height="55" rx="8"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="210" y="300" textAnchor="middle" fontSize="9" fontWeight="700" fill="#14532d">Timeline Service</text>
        <text x="210" y="315" textAnchor="middle" fontSize="8" fill="#166534">merge regular +</text>
        <text x="210" y="328" textAnchor="middle" fontSize="8" fill="#166534">celebrity tweets</text>

        {/* ── Pre-computed cache ── */}
        <rect x="305" y="245" width="160" height="115" rx="10"
          fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <rect x="305" y="245" width="160" height="28" rx="10" fill="#2563eb" />
        <rect x="305" y="261" width="160" height="12" fill="#2563eb" />
        <text x="385" y="263" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">
          Redis — Pre-computed
        </text>
        <text x="385" y="285" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a">
          user_123 timeline:
        </text>
        <text x="385" y="299" textAnchor="middle" fontSize="8" fill="#1d4ed8">tweet_45 (Rahul)</text>
        <text x="385" y="312" textAnchor="middle" fontSize="8" fill="#1d4ed8">tweet_67 (Priya)</text>
        <text x="385" y="325" textAnchor="middle" fontSize="8" fill="#1d4ed8">tweet_89 (Amit)</text>
        <text x="385" y="345" textAnchor="middle" fontSize="8" fontWeight="600" fill="#2563eb">
          Fan-out on Write ✓
        </text>

        {/* timeline service → redis */}
        <line x1="265" y1="308" x2="305" y2="308"
          stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrow-tf-blue)" />
        <text x="285" y="300" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="600">fetch</text>

        {/* ── Celebrity real-time fetch ── */}
        <rect x="505" y="245" width="165" height="115" rx="10"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <rect x="505" y="245" width="165" height="28" rx="10" fill="#dc2626" />
        <rect x="505" y="261" width="165" height="12" fill="#dc2626" />
        <text x="587" y="263" textAnchor="middle" fontSize="10" fontWeight="800" fill="white">
          Celebrity Tweets DB
        </text>
        <text x="587" y="285" textAnchor="middle" fontSize="9" fontWeight="700" fill="#7f1d1d">
          Fetch at Read Time:
        </text>
        <text x="587" y="299" textAnchor="middle" fontSize="8" fill="#dc2626">⭐ Elon (150M)</text>
        <text x="587" y="312" textAnchor="middle" fontSize="8" fill="#dc2626">⭐ Shah Rukh (50M)</text>
        <text x="587" y="325" textAnchor="middle" fontSize="8" fill="#dc2626">⭐ Virat (40M)</text>
        <text x="587" y="345" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">
          Fan-out on Read ✓
        </text>

        {/* timeline service → celebrity DB */}
        <line x1="265" y1="320" x2="505" y2="320"
          stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#arrow-tf-rose)" />
        <text x="385" y="338" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="600">
          real-time fetch
        </text>

        {/* merged result → reader */}
        <path d="M 210 335 Q 140 380 65 368 Q 65 355 65 338"
          fill="none" stroke="#16a34a" strokeWidth="2"
          markerEnd="url(#arrow-tf-green)" />
        <text x="130" y="388" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">
          merged feed
        </text>
        <text x="130" y="400" textAnchor="middle" fontSize="8" fill="#16a34a">
          top 20 tweets
        </text>

        {/* Pre-computed cache (fan-out on write box for write path) */}
        <rect x="340" y="235" width="160" height="55" rx="8"
          fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />

        {/* followers cache under fan-out */}
        <rect x="385" y="235" width="160" height="80" rx="10"
          fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="465" y="258" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a">
          Followers' Redis Cache
        </text>
        <text x="465" y="274" textAnchor="middle" fontSize="8" fill="#1d4ed8">user_456 ← tweet added</text>
        <text x="465" y="288" textAnchor="middle" fontSize="8" fill="#1d4ed8">user_789 ← tweet added</text>
        <text x="465" y="302" textAnchor="middle" fontSize="8" fill="#1d4ed8">user_101 ← tweet added</text>

        {/* ── BOTTOM HYBRID SUMMARY ── */}
        <rect x="20" y="385" width="660" height="135" rx="10"
          fill="white" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* title */}
        <text x="350" y="408" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e293b">
          Hybrid Fan-out — The Core Insight
        </text>

        {/* regular user column */}
        <rect x="35" y="418" width="295" height="90" rx="8"
          fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="182" y="438" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">
          Regular Users (&lt; 1M followers)
        </text>
        <text x="182" y="455" textAnchor="middle" fontSize="9" fill="#1e40af">Fan-out on WRITE</text>
        <text x="182" y="470" textAnchor="middle" fontSize="8" fill="#2563eb">Tweet → push to all follower caches immediately</text>
        <text x="182" y="484" textAnchor="middle" fontSize="8" fill="#2563eb">Feed read = instant Redis lookup</text>
        <text x="182" y="499" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">✅ Fast reads, manageable writes</text>

        {/* celebrity column */}
        <rect x="370" y="418" width="295" height="90" rx="8"
          fill="#fff1f2" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="517" y="438" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">
          Celebrities (&gt; 1M followers)
        </text>
        <text x="517" y="455" textAnchor="middle" fontSize="9" fill="#dc2626">Fan-out on READ</text>
        <text x="517" y="470" textAnchor="middle" fontSize="8" fill="#dc2626">Tweet saved to DB only — no fan-out</text>
        <text x="517" y="484" textAnchor="middle" fontSize="8" fill="#dc2626">Feed read = real-time DB fetch + merge</text>
        <text x="517" y="499" textAnchor="middle" fontSize="9" fontWeight="700" fill="#16a34a">✅ Avoids 50M cache write storm</text>

      </svg>
    </div>
  );
}

export default TwitterFeedDiagram;