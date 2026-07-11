function MessageQueueDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
        Message Queue Architecture — Async Processing
      </p>
      <svg
        viewBox="0 0 700 480"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl mx-auto"
      >
        <defs>
          <marker id="arrow-mq" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
          <marker id="arrow-mq-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-mq-violet" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed" />
          </marker>
        </defs>

        {/* ── USER ── */}
        <rect x="20" y="195" width="90" height="60" rx="10"
          fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="65" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">
          Student
        </text>
        <text x="65" y="236" textAnchor="middle" fontSize="9" fill="#7c3aed">
          clicks solved
        </text>
        <text x="65" y="249" textAnchor="middle" fontSize="9" fill="#7c3aed">
          on Two Sum
        </text>

        {/* user → server */}
        <line x1="110" y1="225" x2="165" y2="225"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-mq)" />

        {/* ── SERVER ── */}
        <rect x="165" y="185" width="110" height="80" rx="10"
          fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="220" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">
          User Service
        </text>
        <text x="220" y="226" textAnchor="middle" fontSize="9" fill="#166534">
          1. Save to DB ✅
        </text>
        <text x="220" y="240" textAnchor="middle" fontSize="9" fill="#166534">
          2. Return 200 OK
        </text>
        <text x="220" y="254" textAnchor="middle" fontSize="9" fill="#166534">
          3. Publish event
        </text>

        {/* server → user (instant response) */}
        <path d="M 165 210 Q 120 170 110 210"
          fill="none" stroke="#16a34a" strokeWidth="1.5"
          markerEnd="url(#arrow-mq-green)" />
        <text x="118" y="178" textAnchor="middle" fontSize="9" fontWeight="600" fill="#16a34a">
          200 OK
        </text>
        <text x="118" y="190" textAnchor="middle" fontSize="8" fill="#16a34a">
          instant ⚡
        </text>

        {/* server → kafka */}
        <line x1="275" y1="225" x2="340" y2="225"
          stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-mq-violet)" />
        <text x="307" y="218" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">
          publish
        </text>

        {/* ── KAFKA ── */}
        <rect x="340" y="160" width="140" height="130" rx="10"
          fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <rect x="340" y="160" width="140" height="30" rx="10"
          fill="#d97706" />
        <rect x="340" y="176" width="140" height="14" fill="#d97706" />
        <text x="410" y="180" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">
          Kafka Queue
        </text>

        {/* partition lanes */}
        <rect x="352" y="200" width="116" height="22" rx="4"
          fill="white" stroke="#fbbf24" strokeWidth="1" />
        <text x="410" y="215" textAnchor="middle" fontSize="9" fill="#92400e">
          Partition 0: event_1 → event_4
        </text>

        <rect x="352" y="226" width="116" height="22" rx="4"
          fill="white" stroke="#fbbf24" strokeWidth="1" />
        <text x="410" y="241" textAnchor="middle" fontSize="9" fill="#92400e">
          Partition 1: event_2 → event_5
        </text>

        <rect x="352" y="252" width="116" height="22" rx="4"
          fill="white" stroke="#fbbf24" strokeWidth="1" />
        <text x="410" y="267" textAnchor="middle" fontSize="9" fill="#92400e">
          Partition 2: event_3 → event_6
        </text>

        {/* kafka → consumers */}
        <line x1="480" y1="195" x2="540" y2="120"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-mq)" />
        <line x1="480" y1="225" x2="540" y2="225"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-mq)" />
        <line x1="480" y1="255" x2="540" y2="320"
          stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-mq)" />

        {/* ── EMAIL CONSUMER ── */}
        <rect x="540" y="80" width="130" height="65" rx="10"
          fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="605" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
          Email Service
        </text>
        <text x="605" y="119" textAnchor="middle" fontSize="9" fill="#1e40af">
          Consumer Group A
        </text>
        <text x="605" y="134" textAnchor="middle" fontSize="9" fill="#1e40af">
          sends congrats email 📧
        </text>

        {/* ── ANALYTICS CONSUMER ── */}
        <rect x="540" y="190" width="130" height="65" rx="10"
          fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="605" y="213" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14532d">
          Analytics
        </text>
        <text x="605" y="229" textAnchor="middle" fontSize="9" fill="#166534">
          Consumer Group B
        </text>
        <text x="605" y="244" textAnchor="middle" fontSize="9" fill="#166534">
          logs event 📊
        </text>

        {/* ── STREAK CONSUMER ── */}
        <rect x="540" y="295" width="130" height="65" rx="10"
          fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.5" />
        <text x="605" y="318" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b21a8">
          Streak Service
        </text>
        <text x="605" y="334" textAnchor="middle" fontSize="9" fill="#7e22ce">
          Consumer Group C
        </text>
        <text x="605" y="349" textAnchor="middle" fontSize="9" fill="#7e22ce">
          updates streak 🔥
        </text>

        {/* retention label */}
        <rect x="340" y="300" width="140" height="40" rx="8"
          fill="#fffbeb" stroke="#fbbf24" strokeWidth="1"
          strokeDasharray="4 2" />
        <text x="410" y="317" textAnchor="middle" fontSize="9" fontWeight="700" fill="#92400e">
          Message Retention
        </text>
        <text x="410" y="332" textAnchor="middle" fontSize="8" fill="#b45309">
          stored 7 days — replayable
        </text>

        {/* ── LABELS ── */}
        <text x="350" y="420" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">
          Without Queue
        </text>
        <text x="350" y="436" textAnchor="middle" fontSize="9" fill="#94a3b8">
          User waits 800ms for all 6 steps
        </text>
        <text x="350" y="452" textAnchor="middle" fontSize="9" fill="#dc2626">
          ❌ Email down = entire request fails
        </text>

        <text x="590" y="420" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">
          With Queue
        </text>
        <text x="590" y="436" textAnchor="middle" fontSize="9" fill="#94a3b8">
          User gets response in ~50ms
        </text>
        <text x="590" y="452" textAnchor="middle" fontSize="9" fill="#16a34a">
          ✅ Email down = messages wait, not lost
        </text>

        {/* divider */}
        <line x1="470" y1="410" x2="470" y2="460"
          stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 2" />

      </svg>
    </div>
  );
}

export default MessageQueueDiagram;