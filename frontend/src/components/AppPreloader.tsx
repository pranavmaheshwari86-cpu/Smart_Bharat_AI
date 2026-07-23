"use client";

import { useEffect } from "react";

const PRELOAD_IMAGES = [
  "/showcase/pothole-repair.png",
  "/showcase/water-leakage.png",
  "/showcase/streetlight-repair.png",
  "/showcase/garbage-overflow.png",
  "/showcase/map-routing.jpg",
];

export function AppPreloader() {
  useEffect(() => {
    // Priority 2: Proactively load all showcase images into browser cache instantly
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Priority 3: Proactively pre-fetch AI Assistant robot component & chat assets in background
    const timer = setTimeout(() => {
      import("@/components/ai/AIAssistant").catch(() => {});
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
