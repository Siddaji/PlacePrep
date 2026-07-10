function CAPTheoremDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        CAP Theorem — Network Partition Scenario
      </p>
      <svg
        viewBox="0 0 700 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-cap" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-cap-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
          </marker>
          <marker id="arrow-cap-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-cap-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d97706" />
          </marker>
        </defs>

        {/* ── TOP: NORMAL OPERATION ── */}
        <rect x="20" y="10" width="660" height="30" rx="8" fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="1" />
        <text x="350" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">
          ✅ Normal Operation — Nodes Communicating
        </text>

        {/* Node India */}
        <rect x="60" y="55" width="130" height="80" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="125" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Node 1</text>
        <text x="125" y="98" textAnchor="middle" fontSize="10" fill="#7c3aed">India 🇮🇳</text>
        <text x="125" y="114" textAnchor="middle" fontSize="9" fill="#6d28d9">solved: 12</text>
        <text x="125" y="127" textAnchor="middle" fontSize="9" fill="#6d28d9">streak: 7</text>

        {/* sync arrows normal */}
        <line x1="190" y1="95" x2="285" y2="95"
          stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-cap-green)" />
        <line x1="285" y1="105" x2="190" y2="105"
          stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-cap-green)" />
        <text x="237" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">syncing</text>
        <text x="237" y="115" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">in sync</text>

        {/* Node USA */}
        <rect x="285" y="55" width="130" height="80" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="350" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Node 2</text>
        <text x="350" y="98" textAnchor="middle" fontSize="10" fill="#7c3aed">USA 🇺🇸</text>
        <text x="350" y="114" textAnchor="middle" fontSize="9" fill="#6d28d9">solved: 12</text>
        <text x="350" y="127" textAnchor="middle" fontSize="9" fill="#6d28d9">streak: 7</text>

        {/* syncing arrow 2 */}
        <line x1="415" y1="95" x2="510" y2="95"
          stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-cap-green)" />
        <line x1="510" y1="105" x2="415" y2="105"
          stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrow-cap-green)" />
        <text x="462" y="90" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">syncing</text>
        <text x="462" y="115" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">in sync</text>

        {/* Node UK */}
        <rect x="510" y="55" width="130" height="80" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="575" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">Node 3</text>
        <text x="575" y="98" textAnchor="middle" fontSize="10" fill="#7c3aed">UK 🇬🇧</text>
        <text x="575" y="114" textAnchor="middle" fontSize="9" fill="#6d28d9">solved: 12</text>
        <text x="575" y="127" textAnchor="middle" fontSize="9" fill="#6d28d9">streak: 7</text>

        {/* ── PARTITION LABEL ── */}
        <rect x="20" y="155" width="660" height="30" rx="8" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
        <text x="350" y="175" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">
          ✂️ Network Partition — Nodes Cannot Communicate
        </text>

        {/* ── PARTITION SCENARIO ── */}

        {/* Node India — updated */}
        <rect x="60" y="205" width="130" height="90" rx="10"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="125" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Node 1</text>
        <text x="125" y="244" textAnchor="middle" fontSize="10" fill="#b45309">India 🇮🇳</text>
        <text x="125" y="260" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">solved: 13 ← updated</text>
        <text x="125" y="274" textAnchor="middle" fontSize="9" fill="#92400e">streak: 8</text>
        <text x="125" y="288" textAnchor="middle" fontSize="8" fill="#b45309">user just solved</text>

        {/* partition cut */}
        <line x1="200" y1="250" x2="285" y2="250"
          stroke="#dc2626" strokeWidth="2" strokeDasharray="6 3" />
        <text x="242" y="240" textAnchor="middle" fontSize="14" fill="#dc2626">✂️</text>
        <text x="242" y="268" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">
          PARTITION
        </text>

        {/* Node USA — stale */}
        <rect x="285" y="205" width="130" height="90" rx="10"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="350" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">Node 2</text>
        <text x="350" y="244" textAnchor="middle" fontSize="10" fill="#dc2626">USA 🇺🇸</text>
        <text x="350" y="260" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600">solved: 12 (stale)</text>
        <text x="350" y="274" textAnchor="middle" fontSize="9" fill="#991b1b">streak: 7</text>
        <text x="350" y="288" textAnchor="middle" fontSize="8" fill="#dc2626">cannot sync ❌</text>

        {/* partition cut 2 */}
        <line x1="415" y1="250" x2="510" y2="250"
          stroke="#dc2626" strokeWidth="2" strokeDasharray="6 3" />
        <text x="462" y="240" textAnchor="middle" fontSize="14" fill="#dc2626">✂️</text>
        <text x="462" y="268" textAnchor="middle" fontSize="8" fontWeight="600" fill="#dc2626">
          PARTITION
        </text>

        {/* Node UK — stale */}
        <rect x="510" y="205" width="130" height="90" rx="10"
          fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="575" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">Node 3</text>
        <text x="575" y="244" textAnchor="middle" fontSize="10" fill="#dc2626">UK 🇬🇧</text>
        <text x="575" y="260" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600">solved: 12 (stale)</text>
        <text x="575" y="274" textAnchor="middle" fontSize="9" fill="#991b1b">streak: 7</text>
        <text x="575" y="288" textAnchor="middle" fontSize="8" fill="#dc2626">cannot sync ❌</text>

        {/* ── TWO CHOICES ── */}

        {/* CP choice */}
        <rect x="20" y="320" width="310" height="130" rx="10"
          fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="20" y="320" width="310" height="32" rx="10"
          fill="#2563eb" />
        <rect x="20" y="338" width="310" height="14" fill="#2563eb" />
        <text x="175" y="342" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          CP Choice — Choose Consistency
        </text>
        <text x="175" y="368" textAnchor="middle" fontSize="10" fill="#1e3a8a">
          Node 2 refuses to respond
        </text>
        <text x="175" y="384" textAnchor="middle" fontSize="10" fill="#1e3a8a">
          Returns error until partition heals
        </text>
        <text x="175" y="400" textAnchor="middle" fontSize="10" fill="#1e3a8a">
          User sees: "Service unavailable"
        </text>
        <text x="175" y="420" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">
          ✅ Data always accurate
        </text>
        <text x="175" y="436" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">
          ❌ System unavailable during partition
        </text>

        {/* AP choice */}
        <rect x="370" y="320" width="310" height="130" rx="10"
          fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <rect x="370" y="320" width="310" height="32" rx="10"
          fill="#16a34a" />
        <rect x="370" y="338" width="310" height="14" fill="#16a34a" />
        <text x="525" y="342" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          AP Choice — Choose Availability
        </text>
        <text x="525" y="368" textAnchor="middle" fontSize="10" fill="#14532d">
          Node 2 responds with stale data
        </text>
        <text x="525" y="384" textAnchor="middle" fontSize="10" fill="#14532d">
          Returns solved: 12 (not yet 13)
        </text>
        <text x="525" y="400" textAnchor="middle" fontSize="10" fill="#14532d">
          User sees: slightly old data
        </text>
        <text x="525" y="420" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">
          ✅ Always responds — no errors
        </text>
        <text x="525" y="436" textAnchor="middle" fontSize="9" fontWeight="600" fill="#dc2626">
          ❌ Data briefly stale after partition
        </text>

        {/* vs label */}
        <text x="350" y="392" textAnchor="middle" fontSize="16" fontWeight="900" fill="#64748b">
          VS
        </text>

        {/* database examples bottom */}
        <text x="175" y="468" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">
          MongoDB · Redis · Zookeeper
        </text>
        <text x="525" y="468" textAnchor="middle" fontSize="10" fontWeight="700" fill="#16a34a">
          Cassandra · DynamoDB · CouchDB
        </text>

      </svg>
    </div>
  );
}

export default CAPTheoremDiagram;