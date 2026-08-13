"use client";

import Link from "next/link";
import { HeroShowcase } from "@/components/HeroShowcase";

export function Hero() {
  return (
    <main className="flex-grow pt-16">
      {/* Background Shader (Simulated with simple div for now as per template) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-80 mix-blend-multiply"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12 sm:pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
          
          {/* Left: Content */}
          <div className="w-full lg:col-span-6 flex flex-col items-start gap-4 sm:gap-6 z-10 relative py-2 sm:py-4">
            <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] leading-[1.15] text-on-surface font-extrabold tracking-tight drop-shadow-sm">
              Simplified Access to <span className="text-gradient font-bold italic pr-1">Government Services</span>
            </h1>
            
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-[540px] font-medium leading-relaxed">
              Navigate bureaucracy instantly. Find the exact schemes you qualify for, generate required documents, and track applications without the wait.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              <Link href="/schemes" className="w-full sm:w-auto bg-primary text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 touch-target-min">
                Get Started
                <span className="material-symbols-outlined text-[24px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4">
              <div className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-surface-container-highest text-xs sm:text-sm font-medium text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-green-600" aria-hidden="true">verified</span>
                Government Verified
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-surface-container-highest text-xs sm:text-sm font-medium text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">database</span>
                5,000+ Schemes
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-surface-container-highest text-xs sm:text-sm font-medium text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-tertiary" aria-hidden="true">lock</span>
                Secure &amp; Private
              </div>
            </div>
          </div>

          {/* Right: AI Showcase Video */}
          <div className="w-full lg:col-span-6 flex items-center justify-center lg:justify-end z-10 mt-4 lg:mt-0">
            <div className="w-full bg-transparent relative z-10 flex items-center justify-center">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <span className="font-display-lg text-4xl font-bold text-on-surface mb-2">50M+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Citizens Helped</span>
          </div>
          <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <span className="font-display-lg text-4xl font-bold text-on-surface mb-2">2,000+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Schemes</span>
          </div>
          <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <span className="font-display-lg text-4xl font-bold text-on-surface mb-2">99%</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Accuracy</span>
          </div>
          <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <span className="font-display-lg text-4xl font-bold text-on-surface mb-2">24/7</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">AI Support</span>
          </div>
        </div>
      </section>

      {/* Comprehensive Service Suite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-900 font-bold mb-3 sm:mb-4">Comprehensive Service Suite</h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">Everything you need to navigate government services efficiently, all in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Apply for IDs */}
          <div className="glass-panel rounded-[24px] p-6 sm:p-8 flex flex-col shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">badge</span>
            </div>
            <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-3">Apply for IDs</h3>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant mb-6 flex-grow">Aadhaar, PAN Card, Passport — streamlined applications with real-time status tracking.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-label-md text-sm sm:text-base hover:opacity-80 transition-opacity touch-target-min" href="/id">
              <span>Apply Now</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          
          {/* File Complaints */}
          <div className="glass-panel rounded-[24px] p-6 sm:p-8 flex flex-col shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">report_problem</span>
            </div>
            <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-3">File Complaints</h3>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant mb-6 flex-grow">Direct civic grievance reporting with transparent follow-up and resolution tracking.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-label-md text-sm sm:text-base hover:opacity-80 transition-opacity touch-target-min" href="/complaints">
              <span>File Complaint</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          
          {/* AI Policy Assistant */}
          <div className="glass-panel rounded-[24px] p-6 sm:p-8 flex flex-col shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80 md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]" aria-hidden="true">smart_toy</span>
            </div>
            <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-3">AI Policy Assistant</h3>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant mb-6 flex-grow">Get instant, intelligent answers about government policies, eligibility criteria, and application procedures. Available 24/7 in multiple languages.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-label-md text-sm sm:text-base hover:opacity-80 transition-opacity touch-target-min" href="/ai">
              <span>Start Conversation</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 relative z-10">
        <div className="glass-panel rounded-[32px] p-6 sm:p-12 md:p-16 flex flex-col items-center text-center shadow-apple-xl border-[#E4E0D6] bg-surface-container-lowest/90 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 z-0"></div>
          <div className="relative z-10">
            <h2 className="font-display-lg text-2xl sm:text-4xl md:text-5xl font-bold text-on-surface mb-4">Ready to get started?</h2>
            <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
              Join millions of citizens accessing government services the smarter, faster way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/schemes" className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-full font-label-md text-base shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 touch-target-min">
                <span>Explore Schemes</span>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
              </Link>
              <Link href="/ai" className="w-full sm:w-auto glass-panel px-8 py-3.5 rounded-full font-label-md text-base text-on-surface hover:bg-surface-container-lowest transition-all flex items-center justify-center gap-2 border-[#E4E0D6] touch-target-min">
                <span>Talk to AI Assistant</span>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">smart_toy</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

