export default function AssistantLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      {/* AI globe skeleton */}
      <div className="relative w-56 h-56 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
        <div className="absolute inset-6 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
          <span className="material-symbols-outlined text-[48px] text-primary/30">smart_toy</span>
        </div>
      </div>

      {/* Greeting text skeleton */}
      <div className="text-center space-y-3">
        <div className="h-8 w-64 bg-surface-container-high rounded-2xl animate-pulse mx-auto" />
        <div className="h-4 w-48 bg-surface-container rounded-xl animate-pulse mx-auto" />
      </div>

      {/* Action cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      {/* Input skeleton */}
      <div className="w-full max-w-3xl h-14 bg-surface-container-lowest border border-outline-variant/40 rounded-full animate-pulse" />
    </div>
  );
}
