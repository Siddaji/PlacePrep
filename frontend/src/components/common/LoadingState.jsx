function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 animate-pulse">
          <div className="h-4 w-3/4 rounded bg-gray-800" />
          <div className="mt-3 flex gap-2">
            <div className="h-5 w-16 rounded-full bg-gray-800" />
            <div className="h-5 w-20 rounded-full bg-gray-800" />
          </div>
          <div className="mt-4 h-3 w-full rounded bg-gray-800/60" />
          <div className="mt-2 h-3 w-2/3 rounded bg-gray-800/60" />
          <div className="mt-5 pt-4 border-t border-gray-800 flex gap-1.5">
            <div className="h-5 w-14 rounded bg-gray-800/60" />
            <div className="h-5 w-14 rounded bg-gray-800/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingState;