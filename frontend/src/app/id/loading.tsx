export default function IDsLoading() {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-10 w-72 bg-surface-container-high rounded-2xl animate-pulse" />
          <div className="h-5 w-80 bg-surface-container rounded-xl animate-pulse" />
        </div>

        {/* ID Card grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Card top color band */}
              <div className="h-2 bg-surface-container-high w-full" />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container-high" />
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-surface-container-high rounded-lg" />
                    <div className="h-3 w-20 bg-surface-container rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-surface-container rounded w-full" />
                  <div className="h-3 bg-surface-container rounded w-3/4" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-surface-container rounded-full w-24" />
                  <div className="h-8 bg-surface-container rounded-full w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
