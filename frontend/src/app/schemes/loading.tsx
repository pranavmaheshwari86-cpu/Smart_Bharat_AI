// Schemes route loading skeleton — shown instantly during navigation
export default function SchemesLoading() {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-10 w-64 bg-surface-container-high rounded-2xl animate-pulse" />
          <div className="h-5 w-96 bg-surface-container rounded-xl animate-pulse" />
        </div>

        {/* Filter bar skeleton */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-surface-container rounded-full animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 space-y-4 animate-pulse"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high" />
                <div className="h-4 w-32 bg-surface-container-high rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-surface-container rounded-lg w-full" />
                <div className="h-3 bg-surface-container rounded-lg w-4/5" />
              </div>
              <div className="h-8 bg-surface-container rounded-full w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
