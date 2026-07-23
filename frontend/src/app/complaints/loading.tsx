export default function ComplaintsLoading() {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-10 w-56 bg-surface-container-high rounded-2xl animate-pulse" />
          <div className="h-5 w-80 bg-surface-container rounded-xl animate-pulse" />
        </div>

        {/* Form card skeleton */}
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-8 space-y-6 animate-pulse">
          <div className="h-5 w-40 bg-surface-container-high rounded-lg" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 bg-surface-container-high rounded" />
                <div className="h-12 bg-surface-container rounded-xl w-full" />
              </div>
            ))}
          </div>
          <div className="h-10 bg-primary/20 rounded-full w-40" />
        </div>
      </div>
    </div>
  );
}
