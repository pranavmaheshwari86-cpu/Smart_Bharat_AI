"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    id: 0,
    image: "/showcase/map-routing.jpg",
    title: "Water Leakage Detected",
    subtitle: "Forwarding to Jal Board",
    icon: "water_drop",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: 1,
    image: "/showcase/garbage-truck.jpg",
    title: "Garbage Overflow",
    subtitle: "Assigned to Sanitation Department",
    icon: "delete",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: 2,
    image: "/showcase/streetlight.png",
    title: "Street Light Failure",
    subtitle: "Electricity Department Notified",
    icon: "lightbulb",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    id: 3,
    image: "/showcase/water-leak.jpg",
    title: "Pothole Detected",
    subtitle: "Routing to Municipal Corporation",
    icon: "add_road",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  }
];

export function HeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="w-full h-full relative flex items-center justify-center p-4 lg:p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container - Glassmorphism, Rounded, Soft Shadow */}
      <motion.div 
        className="w-full h-full max-w-[600px] aspect-square lg:aspect-[4/5] relative rounded-[32px] overflow-hidden bg-surface-container-lowest/40 backdrop-blur-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] cursor-pointer"
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -4 : 0,
          boxShadow: isHovered 
            ? "0 24px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)" 
            : "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Soft Inner Highlight */}
        <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/30 z-20 pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.03, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -12, filter: "blur(4px)" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
          >
            <Image
              src={showcaseItems[currentIndex].image}
              alt={showcaseItems[currentIndex].title}
              fill
              className="object-cover w-full h-full"
              priority
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        {/* Floating AI Status Card */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 px-6">
          <motion.div
            className="w-full max-w-[360px]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-surface-container-lowest/90 backdrop-blur-xl border border-white/40 shadow-apple-lg rounded-[20px] p-4 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${showcaseItems[currentIndex].bg}`}>
                  <span className={`material-symbols-outlined text-[24px] ${showcaseItems[currentIndex].color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {showcaseItems[currentIndex].icon}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[16px] font-semibold text-on-surface leading-tight">
                    {showcaseItems[currentIndex].title}
                  </span>
                  <span className="font-body-sm text-[13px] text-on-surface-variant mt-0.5">
                    {showcaseItems[currentIndex].subtitle}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
