"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CIVIC_SLIDES = [
  {
    id: "pothole",
    title: "Roads & Infrastructure Repair",
    department: "PWD Department",
    estTime: "Est. 48h",
    src: "/showcase/pothole-repair.png",
    alt: "Pothole repair civic complaint",
  },
  {
    id: "water",
    title: "Water Supply & Leakage",
    department: "Jal Board",
    estTime: "Est. 24h",
    src: "/showcase/water-leakage.png",
    alt: "Water supply pipeline leakage complaint",
  },
  {
    id: "streetlights",
    title: "Streetlight & Electrical Faults",
    department: "Power Corp",
    estTime: "Est. 12h",
    src: "/showcase/streetlight-repair.png",
    alt: "Streetlight repair civic complaint",
  },
  {
    id: "sanitation",
    title: "Garbage Overflow & Sanitation",
    department: "Municipal Corporation",
    estTime: "Est. 24h",
    src: "/showcase/garbage-overflow.png",
    alt: "Garbage overflow sanitation complaint",
  },
  {
    id: "routing",
    title: "AI Geolocation & Issue Routing",
    department: "Smart Bharat AI Engine",
    estTime: "Realtime",
    src: "/showcase/map-routing.jpg",
    alt: "Smart Bharat AI map routing",
  },
];

export function ComplaintsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CIVIC_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = CIVIC_SLIDES[currentIndex];

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-[720px] aspect-[4/3] sm:aspect-[16/10] relative rounded-[32px] overflow-hidden border border-white/40 shadow-2xl bg-neutral-900 group">
        {/* Slides */}
        {CIVIC_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover rounded-[32px]"
              priority={idx === 0}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-[32px]" />
          </div>
        ))}

        {/* Slide Info Content */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
          <div>
            <span className="text-xs font-semibold px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-white inline-block mb-1">
              {activeSlide.department}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
              {activeSlide.title}
            </h3>
          </div>
          <span className="text-xs font-medium px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white border border-white/20 self-start sm:self-auto">
            {activeSlide.estTime}
          </span>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          {CIVIC_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-primary" : "w-2 bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
