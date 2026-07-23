export default function CredentialsLoading() {
  return (
    <div className="min-h-screen pt-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 space-y-2">
          <div className="h-9 w-52 bg-surface-container-high rounded-2xl animate-pulse" />
          <div className="h-4 w-72 bg-surface-container rounded-xl animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 space-y-4 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-28 bg-surface-container-high rounded" />
                    <div className="h-3 w-20 bg-surface-container rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-surface-container rounded-full" />
              </div>
              <div className="h-px bg-outline-variant/30" />
              <div className="space-y-2">
                <div className="h-3 bg-surface-container rounded w-full" />
                <div className="h-3 bg-surface-container rounded w-2/3" />
              </div>
              <div className="h-9 bg-primary/10 rounded-full w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
