"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { SplineScene } from "@/components/ui/splite";

export function Hero() {
  return (
    <main className="flex-grow pt-[40px]">
      {/* Background Shader (Simulated with simple div for now as per template) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-80 mix-blend-multiply"></div>

      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-8 pb-section relative">
        <div className="flex flex-col lg:flex-row items-center relative">
          
          {/* Left: Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-start gap-6 z-10 relative py-12">

            
            <h1 className="font-display-lg text-display-lg text-on-surface max-w-[650px] leading-tight drop-shadow-sm">
              Simplified Access to <span className="text-gradient font-bold italic pr-1">Government Services</span>, <br className="hidden md:block"/>
              <span className="text-gradient">Powered by AI</span>
            </h1>
            
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[576px] font-medium">
              Navigate bureaucracy instantly. Find the exact schemes you qualify for, generate required documents, and track applications without the wait.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
              <Link href="/schemes" className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full font-semibold text-lg shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                Get Started
                <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-surface-container-highest text-label-sm font-label-sm text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-green-600">verified</span>
                Government Verified
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-surface-container-highest text-label-sm font-label-sm text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-primary">database</span>
                5,000+ Schemes
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded-full border border-surface-container-highest text-label-sm font-label-sm text-on-surface-variant shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-tertiary">lock</span>
                Secure & Private
              </div>
            </div>
          </div>

          {/* Right: 3D Animation */}
          <div className="w-full lg:w-[800px] h-[500px] lg:h-[800px] relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-[30%] z-0 mt-12 lg:mt-0 flex items-center justify-center mix-blend-normal">
            {/* Atmospheric Gradients */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(37,99,235,0.15)_40%,transparent_70%)] blur-[80px]"></div>
            
            {/* Spline 3D Container */}
            <div className="w-full h-full bg-transparent relative z-10 opacity-100 transition-opacity duration-1000 ease-in-out">
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </div>


          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-900 font-bold mb-4">Comprehensive Service Suite</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Everything you need to navigate government services efficiently, all in one place.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Apply for IDs */}
          <div className="glass-panel rounded-[24px] p-8 flex flex-col shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">badge</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Apply for IDs</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">Aadhaar, PAN Card, Passport — streamlined applications with real-time status tracking.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:opacity-80 transition-opacity" href="/id">
              Apply Now
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          
          {/* File Complaints */}
          <div className="glass-panel rounded-[24px] p-8 flex flex-col shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">report_problem</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">File Complaints</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">Direct civic grievance reporting with transparent follow-up and resolution tracking.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:opacity-80 transition-opacity" href="/complaints">
              Complaint Now
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          
          {/* AI Policy Assistant */}
          <div className="glass-panel rounded-[24px] p-8 flex flex-col shadow-apple-sm hover-lift border-[#E4E0D6] bg-surface-container-lowest/80 md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-6 border border-surface-container-highest shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">smart_toy</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">AI Policy Assistant</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">Get instant, intelligent answers about government policies, eligibility criteria, and application procedures. Available 24/7 in multiple languages.</p>
            <Link className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:opacity-80 transition-opacity" href="/ai">
              Start conversation
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter pb-section relative z-10">
        <div className="glass-panel rounded-[32px] p-8 md:p-16 flex flex-col items-center text-center shadow-apple-xl border-[#E4E0D6] bg-surface-container-lowest/90 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 z-0"></div>
          <div className="relative z-10">
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-4">Ready to get started?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
              Join millions of citizens accessing government services the smarter, faster way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/schemes" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-label-md text-label-md shadow-apple-sm hover:shadow-apple-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Explore Schemes
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
              <Link href="/ai" className="w-full sm:w-auto glass-panel px-8 py-4 rounded-full font-label-md text-label-md text-on-surface hover:bg-surface-container-lowest transition-all flex items-center justify-center gap-2 border-[#E4E0D6]">
                Talk to AI Assistant
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

