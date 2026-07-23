"use client";

import { useEffect, useRef, useState } from "react";

export function HeroShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <div className="w-full relative flex items-center justify-center">
      {/* Video Container Card — Instant Loading */}
      <div className="w-full max-w-[720px] aspect-[3/2] relative rounded-[32px] overflow-hidden border border-white/30 shadow-[0_24px_60px_rgba(0,74,198,0.2)] bg-gradient-to-br from-blue-950 via-slate-900 to-black group flex items-center justify-center">
        
        {/* Instant Ambient Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent animate-pulse pointer-events-none" />

        {/* Hero Showcase Video */}
        <video
          ref={videoRef}
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => {
            setIsLoaded(true);
            videoRef.current?.play().catch(() => {});
          }}
          className={`w-full h-full object-cover rounded-[32px] relative z-10 pointer-events-none transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-90"
          }`}
        />
      </div>
    </div>
  );
}
