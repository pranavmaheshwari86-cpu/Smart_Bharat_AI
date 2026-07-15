"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FileText,
  FileBadge,
  AlertCircle,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   AI ORB — The visual centerpiece
   Complex Holographic AI Orb & Connected Ecosystem
   ═══════════════════════════════════════════════════════════════════ */
function AiOrb() {
  return (
    <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] mx-auto animate-float">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-[80px]" />
      
      {/* Center holographic core */}
      <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-brand-400/80 via-brand-500/40 to-transparent blur-xl animate-pulse-slow" />
      <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-white/40 via-brand-300/20 to-transparent blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.4)]" />
      
      {/* Outer rotating dashed ring */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite] opacity-30" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#ring-grad)" strokeWidth="0.5" strokeDasharray="4 8" />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Inner rotating solid ring (reverse) */}
      <svg className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] animate-[spin_30s_linear_infinite_reverse] opacity-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="url(#ring-grad-2)" strokeWidth="1" />
        <defs>
          <linearGradient id="ring-grad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbiting Government Nodes */}
      {/* Node 1 - Identity */}
      <div className="absolute top-4 right-1/4 animate-[float_5s_ease-in-out_infinite_0s]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-neutral-900/60 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <div className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-[11px] font-medium text-brand-200">Identity Verified</span>
        </div>
      </div>
      
      {/* Node 2 - Processing */}
      <div className="absolute bottom-1/4 left-0 animate-[float_6s_ease-in-out_infinite_1s]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-violet-500/30 bg-neutral-900/60 backdrop-blur-md shadow-[0_0_15px_rgba(167,139,250,0.2)]">
          <div className="h-1.5 w-1.5 rounded-full bg-accent-violet-400 animate-pulse" />
          <span className="text-[11px] font-medium text-accent-violet-200">Docs Scanned</span>
        </div>
      </div>
      
      {/* Node 3 - Success */}
      <div className="absolute bottom-8 right-12 animate-[float_4.5s_ease-in-out_infinite_2s]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-neutral-900/60 backdrop-blur-md shadow-[0_0_15px_rgba(10,185,129,0.2)]">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-medium text-emerald-200">Gov Approved</span>
        </div>
      </div>

      {/* Center Sparkles Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
      </div>
    </div>
  );
}



/* ═══════════════════════════════════════════════════════════════════
   FEATURE CARD — premium bento card
   ═══════════════════════════════════════════════════════════════════ */
function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  className = "",
  large = false,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link href={href} className={`group block h-full ${className}`}>
      <div
        className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] backdrop-blur-sm ${
          large ? "sm:p-10" : ""
        }`}
      >
        {/* Ambient glow on hover */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/[0.05] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.05] mb-6 group-hover:border-brand-500/50 transition-all duration-300">
            <Icon className="h-6 w-6 text-neutral-400 group-hover:text-brand-400 transition-colors duration-300" />
          </div>

          {/* Content */}
          <h3 className={`font-semibold text-neutral-100 mb-2 ${large ? "text-2xl" : "text-lg"}`}>
            {title}
          </h3>
          <p className={`text-neutral-400 leading-relaxed flex-1 ${large ? "text-[16px]" : "text-[14px]"}`}>
            {description}
          </p>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-1.5 text-[14px] font-medium text-brand-400 transition-colors duration-300">
            <span>{large ? "Get started" : "Learn more"}</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO — The complete homepage
   ═══════════════════════════════════════════════════════════════════ */
export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });

  return (
    <div className="relative overflow-hidden bg-neutral-950">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep background space */}
        <div className="absolute inset-0 bg-neutral-950" />
        {/* Layered radial gradients */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)" }}
        />
        <div 
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-50"
          style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)" }}
        />
        {/* Subtle grid and noise */}
        <div className="absolute inset-0 grid-dots opacity-[0.4]" />
        <div className="absolute inset-0 noise-bg" />
        {/* Bottom fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
         SECTION 1 — HERO
         ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative z-10 pt-20 sm:pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* ── Left: Copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-2xl text-left"
            >
              {/* Pre-headline badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-brand-400" />
                <span className="text-xs font-medium text-neutral-300">Gov.in Beta Engine Available</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-bold tracking-tighter text-white mb-6 leading-[1.05]">
                Government Services, <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-brand-300 via-white to-neutral-400 bg-clip-text text-transparent">
                  Simplified by AI.
                </span>
              </h1>

              <p className="max-w-xl text-lg sm:text-xl text-neutral-400 mb-10 leading-relaxed">
                Navigate bureaucracy instantly. Find schemes, generate documents, and track applications without the wait.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/schemes"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-950 font-semibold rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center"
                >
                  Explore Schemes
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  href="/ai"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md flex items-center justify-center"
                >
                  Talk to AI Assistant
                </Link>
              </div>
            </motion.div>

            {/* ── Right: AI Orb ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:flex items-center justify-center"
            >
              <AiOrb />
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="max-w-4xl mx-auto border-t border-neutral-800/60 pt-16 mt-20 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "CITIZENS HELPED", value: "50M+" },
                { label: "ACTIVE SCHEMES", value: "2,000+" },
                { label: "AVG. RESPONSE", value: "3s" },
                { label: "SUCCESS RATE", value: "98%" },
              ].map((stat, i) => (
                <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                  <div className="text-3xl font-bold text-white tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         SECTION 2 — FEATURE BENTO GRID
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 sm:py-24 bg-neutral-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <FeatureCard
                title="Discover Government Schemes"
                description="Our AI analyzes your profile and recommends the most relevant government schemes from a database of 2,000+ programs. Never miss a benefit you're entitled to."
                icon={FileText}
                href="/schemes"
                large
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                title="Apply for IDs"
                description="Aadhaar, PAN Card, Passport — streamlined applications with real-time status tracking."
                icon={FileBadge}
                href="/id"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                title="File Complaints"
                description="Direct civic grievance reporting with transparent follow-up and resolution tracking."
                icon={AlertCircle}
                href="/complaints"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <Link href="/ai" className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] backdrop-blur-sm">
                  {/* Ambient glow on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/[0.05] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 h-full">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.05] shrink-0 group-hover:border-brand-500/50 transition-all duration-300">
                      <Bot className="h-6 w-6 text-neutral-400 group-hover:text-brand-400 transition-colors duration-300" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-100 mb-1">AI Policy Assistant</h3>
                      <p className="text-[15px] text-neutral-400 leading-relaxed max-w-xl">
                        Get instant, intelligent answers about government policies, eligibility criteria, and application procedures. Available 24/7 in multiple languages.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[14px] font-medium text-brand-400 group-hover:text-brand-300 transition-colors shrink-0">
                      <span>Start conversation</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
         SECTION 4 — FOOTER CTA
         ══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-100 tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-3 text-[15px] text-neutral-500 max-w-md mx-auto">
              Join millions of citizens accessing government services the smarter way.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/schemes"
                className="w-full sm:w-auto premium-button-primary"
              >
                Explore Schemes
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/ai"
                className="w-full sm:w-auto premium-button-secondary"
              >
                Talk to AI Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
