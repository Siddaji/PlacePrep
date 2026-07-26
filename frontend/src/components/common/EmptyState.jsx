function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/50 py-20 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-300">No problems found</h3>
      <p className="mt-1 text-sm text-gray-600 max-w-sm">
        Try adjusting your search or filters.
      </p>
    </div>
  );
}

export default EmptyState;