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
    const runPreload = () => {
      // 1. Non-blocking background image caching
      PRELOAD_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      // 2. Non-blocking background AI Assistant code pre-fetch
      import("@/components/ai/AIAssistant").catch(() => {});
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(runPreload, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const timer = setTimeout(runPreload, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
