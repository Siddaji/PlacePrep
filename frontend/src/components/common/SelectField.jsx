function SelectField({ label, value, onChange, children }) {
  return (
    <label className="flex flex-col gap-1.5 w-full sm:w-auto">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full sm:w-44 cursor-pointer rounded-lg border border-slate-200 bg-white py-2.5 pl-3.5 pr-9 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-100"
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </label>
  );
}

export default SelectField;