export default function AILoading() {
  return (
    <div className="min-h-screen pt-16 flex flex-col">
      {/* Top bar skeleton */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
          <div className="h-4 w-32 bg-surface-container rounded-lg animate-pulse" />
        </div>
        <div className="h-8 w-24 bg-surface-container rounded-full animate-pulse" />
      </div>

      {/* Chat area skeleton */}
      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex w-64 flex-col gap-3 p-4 border-r border-outline-variant/30">
          <div className="h-4 w-24 bg-surface-container rounded animate-pulse mb-2" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-surface-container rounded-xl animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
          ))}
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
          {/* AI orb skeleton */}
          <div className="w-40 h-40 rounded-full bg-primary/10 animate-pulse flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 animate-pulse" />
          </div>
          <div className="space-y-2 text-center">
            <div className="h-6 w-48 bg-surface-container-high rounded-lg animate-pulse mx-auto" />
            <div className="h-4 w-64 bg-surface-container rounded-lg animate-pulse mx-auto" />
          </div>

          {/* Quick action cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Input area skeleton */}
      <div className="p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-3xl h-14 bg-surface-container-lowest border border-outline-variant/40 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
