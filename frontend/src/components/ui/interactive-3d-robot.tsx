'use client';

import { Suspense, lazy, Component, ReactNode } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));
import type { Application } from '@splinetool/runtime';

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

// ─── Error Boundary ───────────────────────────────────────────────────────────
// Catches "Failed to fetch" and other Spline load errors so the AI page
// doesn't crash when the Spline CDN is unreachable or the scene fails to load.
interface EBState { hasError: boolean }
class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    // Silence the noisy Spline fetch error from the console in production
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Spline] Scene failed to load:', err.message);
    }
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ─── Animated Fallback ────────────────────────────────────────────────────────
function SplineFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Pulsing outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-4 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        {/* AI icon */}
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
          <span className="material-symbols-outlined text-[42px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            smart_toy
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────
function SplineLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse">
        <span className="material-symbols-outlined text-[36px] text-primary/60" style={{ fontVariationSettings: "'FILL' 1" }}>
          smart_toy
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  function handleLoad(splineApp: Application) {
    if (typeof splineApp.setGlobalEvents === 'function') {
      splineApp.setGlobalEvents(true);
    }
  }

  return (
    <div className={`relative w-full h-full ${className || ''} pointer-events-auto`}>
      <SplineErrorBoundary fallback={<SplineFallback />}>
        <Suspense fallback={<SplineLoading />}>
          <Spline scene={scene} className="w-full h-full" onLoad={handleLoad} />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
