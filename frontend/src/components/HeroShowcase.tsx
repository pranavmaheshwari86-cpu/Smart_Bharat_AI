"use client";

import { useState, useEffect } from "react";

export function HeroShowcase() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full relative flex items-center justify-center">
        <div className="w-full max-w-[720px] aspect-[3/2] relative rounded-[32px] overflow-hidden border border-white/20 shadow-[0_16px_48px_rgba(0,0,0,0.16)] bg-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full relative flex items-center justify-center">
      {/* Video Container Card */}
      <div className="w-full max-w-[720px] aspect-[3/2] relative rounded-[32px] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-transparent group flex items-center justify-center">
        
        {/* Permanently Muted Autoplay Video Element */}
        <video
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-[32px] relative z-10"
        />

      </div>
    </div>
  );
}
