"use client";

import { motion } from "framer-motion";
import React from "react";

export function BackgroundSystem() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-neutral-950">
      {/* Cinematic Noise */}
      <div className="absolute inset-0 noise-bg opacity-[0.4]" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 grid-dots opacity-[0.8]" />

      {/* Ambient Gradient Orbs */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-brand-500/10 blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-violet-500/10 blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-[100%] bg-brand-400/5 blur-[150px] rotate-45"
        animate={{
          rotate: [45, 90, 45],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
