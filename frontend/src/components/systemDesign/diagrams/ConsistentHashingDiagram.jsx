function ConsistentHashingDiagram() {
  const cx = 350;
  const cy = 230;
  const r  = 160;

  // convert angle to x,y on the ring
  function pt(deg, radius = r) {
    const rad = (deg - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  // servers on the ring — degrees, label, color
  const servers = [
    { deg: 0,   label: "Server A", short: "A", color: "#7c3aed", fill: "#ede9fe", stroke: "#7c3aed" },
    { deg: 90,  label: "Server B", short: "B", color: "#2563eb", fill: "#dbeafe", stroke: "#2563eb" },
    { deg: 180, label: "Server C", short: "C", color: "#059669", fill: "#dcfce7", stroke: "#059669" },
    { deg: 270, label: "Server D", short: "D", color: "#d97706", fill: "#fef3c7", stroke: "#d97706" },
  ];

  // keys on the ring — degrees and label
  const keys = [
    { deg: 40,  label: "key:user_1" },
    { deg: 130, label: "key:prob_5" },
    { deg: 220, label: "key:sub_os" },
    { deg: 310, label: "key:sd_cap" },
  ];

  // virtual nodes (smaller, dashed)
  const virtualNodes = [
    { deg: 45,  short: "A'", color: "#7c3aed" },
    { deg: 135, short: "B'", color: "#2563eb" },
    { deg: 225, short: "C'", color: "#059669" },
    { deg: 315, short: "D'", color: "#d97706" },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Consistent Hashing — Hash Ring with Virtual Nodes
      </p>
      <svg
        viewBox="0 0 700 500"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-ch" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-ch-violet" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed" />
          </marker>
          <marker id="arrow-ch-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#2563eb" />
          </marker>
          <marker id="arrow-ch-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#059669" />
          </marker>
          <marker id="arrow-ch-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#d97706" />
          </marker>
        </defs>

        {/* ── HASH RING ── */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="20"
        />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* ring label */}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">
          Hash Ring
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="10" fill="#94a3b8">
          0 → 2³²
        </text>
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize="9" fill="#94a3b8">
          circular space
        </text>

        {/* ── VIRTUAL NODES (dashed circles, smaller) ── */}
        {virtualNodes.map((vn) => {
          const p = pt(vn.deg, r);
          return (
            <g key={vn.deg}>
              <circle cx={p.x} cy={p.y} r={10}
                fill="white"
                stroke={vn.color}
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
              <text x={p.x} y={p.y + 4}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill={vn.color}
              >
                {vn.short}
              </text>
            </g>
          );
        })}

        {/* ── PHYSICAL SERVER NODES ── */}
        {servers.map((s) => {
          const p = pt(s.deg, r);
          // label position — push outward
          const lp = pt(s.deg, r + 42);
          return (
            <g key={s.deg}>
              <circle cx={p.x} cy={p.y} r={18}
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth="2.5"
              />
              <text x={p.x} y={p.y + 5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill={s.color}
              >
                {s.short}
              </text>
              {/* server label outside ring */}
              <text x={lp.x} y={lp.y - 6}
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill={s.color}
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* ── KEYS ON THE RING ── */}
        {keys.map((k, i) => {
          const p  = pt(k.deg, r);
          const lp = pt(k.deg, r - 42);
          const colors = ["#7c3aed", "#2563eb", "#059669", "#d97706"];
          const c = colors[i];
          return (
            <g key={k.deg}>
              <circle cx={p.x} cy={p.y} r={7}
                fill={c}
                stroke="white"
                strokeWidth="2"
              />
              <text x={lp.x} y={lp.y + 4}
                textAnchor="middle"
                fontSize="8"
                fill="#475569"
                fontWeight="600"
              >
                {k.label}
              </text>
            </g>
          );
        })}

        {/* ── CLOCKWISE ARROWS showing which key goes to which server ── */}
        {/* key:user_1 (deg 40) → Server B (deg 90) */}
        {(() => {
          const kp = pt(40, r - 8);
          const sp = pt(90, r - 20);
          return (
            <path
              d={`M ${kp.x} ${kp.y} Q ${cx + 100} ${cy - 180} ${sp.x} ${sp.y}`}
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              markerEnd="url(#arrow-ch-blue)"
            />
          );
        })()}
        <text x={cx + 115} y={cy - 145} fontSize="8" fill="#2563eb" fontWeight="600">
          clockwise →
        </text>
        <text x={cx + 115} y={cy - 133} fontSize="8" fill="#2563eb">
          goes to B
        </text>

        {/* key:prob_5 (deg 130) → Server C (deg 180) */}
        {(() => {
          const kp = pt(130, r - 8);
          const sp = pt(180, r - 20);
          return (
            <path
              d={`M ${kp.x} ${kp.y} Q ${cx - 170} ${cy + 60} ${sp.x} ${sp.y}`}
              fill="none"
              stroke="#059669"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              markerEnd="url(#arrow-ch-green)"
            />
          );
        })()}

        {/* ── WHAT HAPPENS WHEN SERVER B IS REMOVED ── */}
        <rect x="20" y="400" width="300" height="80" rx="10"
          fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
        <text x="170" y="420" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b">
          Simple Modulo — Server Removed
        </text>
        <text x="170" y="438" textAnchor="middle" fontSize="9" fill="#dc2626">
          key % 3 (was key % 4)
        </text>
        <text x="170" y="454" textAnchor="middle" fontSize="9" fill="#dc2626">
          ~75% of ALL keys remap
        </text>
        <text x="170" y="470" textAnchor="middle" fontSize="9" fill="#dc2626">
          ❌ Entire cache invalidated
        </text>

        <rect x="370" y="400" width="310" height="80" rx="10"
          fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="525" y="420" textAnchor="middle" fontSize="10" fontWeight="800" fill="#14532d">
          Consistent Hashing — Server Removed
        </text>
        <text x="525" y="438" textAnchor="middle" fontSize="9" fill="#059669">
          Only Server B's keys move to Server C
        </text>
        <text x="525" y="454" textAnchor="middle" fontSize="9" fill="#059669">
          ~25% of keys affected (just 1/N)
        </text>
        <text x="525" y="470" textAnchor="middle" fontSize="9" fill="#059669">
          ✅ Everything else stays put
        </text>

        {/* ── VIRTUAL NODES LEGEND ── */}
        <circle cx="35" cy="375" r="7"
          fill="white" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="47" y="379" fontSize="9" fill="#64748b">Virtual node (A') — extra ring position per server</text>

        <circle cx="35" cy="358" r="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
        <text x="35" y="362" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7c3aed">A</text>
        <text x="47" y="362" fontSize="9" fill="#64748b">Physical server node</text>

      </svg>
    </div>
  );
}

export default ConsistentHashingDiagram;