function LoadBalancingDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Architecture Diagram
      </p>
      <svg
        viewBox="0 0 700 420"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        {/* ── Styles ── */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        {/* ── CLIENT ── */}
        <rect x="20" y="170" width="110" height="50" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="75" y="191" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">
          Clients
        </text>
        <text x="75" y="207" textAnchor="middle" fontSize="10" fill="#7c3aed">
          10,000 users
        </text>

        {/* client → load balancer */}
        <line x1="130" y1="195" x2="215" y2="195"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* ── LOAD BALANCER ── */}
        <rect x="215" y="155" width="130" height="80" rx="10"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="280" y="187" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">
          Load Balancer
        </text>
        <text x="280" y="203" textAnchor="middle" fontSize="10" fill="#b45309">
          Nginx / AWS ALB
        </text>
        <text x="280" y="219" textAnchor="middle" fontSize="9" fill="#b45309">
          Layer 7
        </text>

        {/* load balancer → server 1 */}
        <line x1="345" y1="175" x2="430" y2="100"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* load balancer → server 2 */}
        <line x1="345" y1="195" x2="430" y2="195"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        {/* load balancer → server 3 */}
        <line x1="345" y1="215" x2="430" y2="290"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* ── SERVER 1 ── */}
        <rect x="430" y="70" width="110" height="55" rx="10"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="485" y="95" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
          Server 1
        </text>
        <text x="485" y="112" textAnchor="middle" fontSize="10" fill="#166534">
          Node.js
        </text>

        {/* ── SERVER 2 ── */}
        <rect x="430" y="165" width="110" height="55" rx="10"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="485" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
          Server 2
        </text>
        <text x="485" y="207" textAnchor="middle" fontSize="10" fill="#166534">
          Node.js
        </text>

        {/* ── SERVER 3 ── */}
        <rect x="430" y="260" width="110" height="55" rx="10"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="485" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="#14532d">
          Server 3
        </text>
        <text x="485" y="302" textAnchor="middle" fontSize="10" fill="#166534">
          Node.js
        </text>

        {/* servers → redis */}
        <line x1="540" y1="97" x2="590" y2="155"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="540" y1="192" x2="590" y2="192"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="540" y1="287" x2="590" y2="230"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* ── REDIS ── */}
        <rect x="590" y="150" width="95" height="80" rx="10"
          fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="637" y="183" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7f1d1d">
          Redis
        </text>
        <text x="637" y="199" textAnchor="middle" fontSize="10" fill="#991b1b">
          Shared
        </text>
        <text x="637" y="215" textAnchor="middle" fontSize="10" fill="#991b1b">
          Sessions
        </text>

        {/* redis → database (arrow down) */}
        <line x1="637" y1="230" x2="637" y2="310"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* ── DATABASE ── */}
        <rect x="555" y="310" width="165" height="60" rx="10"
          fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
        <text x="637" y="337" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0c4a6e">
          Database
        </text>
        <text x="637" y="355" textAnchor="middle" fontSize="10" fill="#075985">
          MongoDB / PostgreSQL
        </text>

        {/* ── HEALTH CHECK label ── */}
        <rect x="215" y="260" width="130" height="45" rx="8"
          fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 2" />
        <text x="280" y="280" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">
          Health Checks
        </text>
        <text x="280" y="296" textAnchor="middle" fontSize="9" fill="#64748b">
          every 5 seconds
        </text>

        {/* health check line (dashed) */}
        <line x1="280" y1="260" x2="280" y2="235"
          stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />

        {/* ── LEGEND ── */}
        <line x1="25" y1="380" x2="55" y2="380"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="62" y="384" fontSize="10" fill="#64748b">Request flow</text>

        <line x1="160" y1="380" x2="190" y2="380"
          stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
        <text x="197" y="384" fontSize="10" fill="#64748b">Health check</text>

      </svg>
    </div>
  );
}

export default LoadBalancingDiagram;