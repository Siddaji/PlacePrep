function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/50 py-20 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-500">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800">No problems found</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
}

export default EmptyState;