function SelectField({ label, value, onChange, children }) {
  return (
    <label className="flex flex-col gap-1.5 w-full sm:w-auto">
      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full sm:w-44 cursor-pointer rounded-lg border border-gray-800 bg-gray-900 py-2.5 pl-3.5 pr-9 text-sm font-medium text-gray-300 transition-colors hover:border-gray-700 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </label>
  );
}

export default SelectField;
