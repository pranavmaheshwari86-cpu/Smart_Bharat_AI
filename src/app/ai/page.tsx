"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from 'three';
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

export default function AIPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Input focus state handling
    const input = document.querySelector('input[type="text"]');
    const container = input?.closest('.glass-input');
    
    if (input && container) {
      const handleFocus = () => container.classList.add('ring-2', 'ring-primary/30');
      const handleBlur = () => container.classList.remove('ring-2', 'ring-primary/30');
      
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      
      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    }
  }, []);



  return (
    <div className="font-body-md text-on-surface antialiased overflow-hidden selection:bg-primary/20 selection:text-primary">
      <style dangerouslySetInnerHTML={{ __html: `
        @theme {
          --animate-float-1: float 6s ease-in-out infinite, fade 8s ease-in-out infinite;
          --animate-float-2: float 7s ease-in-out infinite 1s, fade 9s ease-in-out infinite 1s;
          --animate-float-3: float 5s ease-in-out infinite 2s, fade 7s ease-in-out infinite 2s;
          --animate-float-4: float 8s ease-in-out infinite 3s, fade 10s ease-in-out infinite 3s;
          --animate-float-5: float 6.5s ease-in-out infinite 0.5s, fade 8.5s ease-in-out infinite 0.5s;
          --animate-float-6: float 5.5s ease-in-out infinite 1.5s, fade 7.5s ease-in-out infinite 1.5s;
          --keyframes-float: {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-15px)" }
          };
          --keyframes-fade: {
            "0%, 100%": { opacity: "0.3" },
            "50%": { opacity: "1" }
          };
        }
        
        .ambient-glow-1 {
            position: fixed;
            top: -10%;
            left: -10%;
            width: 50vw;
            height: 50vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 74, 198, 0.08) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }
        .ambient-glow-2 {
            position: fixed;
            bottom: -20%;
            right: -10%;
            width: 60vw;
            height: 60vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(120, 89, 38, 0.06) 0%, rgba(253, 248, 245, 0) 70%);
            z-index: -1;
            pointer-events: none;
        }

        .glass-panel {
            background-color: rgba(253, 248, 245, 0.7);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(195, 198, 215, 0.3);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .glass-card {
            background-color: rgba(253, 248, 245, 0.6);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(195, 198, 215, 0.2);
            border-radius: 1rem;
            transition: all 0.3s;
        }
        .glass-card:hover {
            background-color: rgba(253, 248, 245, 0.8);
        }
        .glass-input {
            background-color: rgba(253, 248, 245, 0.8);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(195, 198, 215, 0.4);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-radius: 9999px;
            transition: all 0.3s;
        }
        .glass-input:focus-within {
            box-shadow: 0 0 0 2px rgba(0, 74, 198, 0.3);
        }

        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(195, 198, 215, 0.5);
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(115, 118, 134, 0.5);
        }

        /* Hide Spline watermark */
        a[href*="spline.design"] {
            display: none !important;
        }
      `}} />
      
      {/* Global Background Shader */}
      <div className="fixed inset-0 z-[-2] bg-[#fdf8f5]"></div>
      
      {/* Ambient CSS Glows */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      
      <div className="flex h-screen w-full relative">
        {/* Sidebar (Smart Context) */}
        <div className={`hidden md:flex transition-all duration-300 ease-in-out flex-shrink-0 h-full overflow-hidden relative z-20 ${isSidebarOpen ? 'w-[280px]' : 'w-0'}`}>
          <aside className="flex flex-col w-[280px] h-full bg-surface/50 backdrop-blur-2xl border-r border-outline-variant/30 flex-shrink-0">

          
          {/* Sidebar Navigation/History */}
          <div className="flex-1 overflow-y-auto px-4 pt-[104px] pb-6 space-y-8">
            {/* Main Nav removed per user request */}
            
            {/* Recent Contexts */}
            <div>
              <h3 className="px-4 font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-3">Recent Contexts</h3>
              <div className="space-y-1">
                <button className="w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5 group-hover:text-primary transition-colors">chat_bubble</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface line-clamp-1">PM-Kisan Eligibility Check</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">2 hours ago</p>
                  </div>
                </button>
                <button className="w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5 group-hover:text-primary transition-colors">chat_bubble</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface line-clamp-1">Aadhaar Address Update Process</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Yesterday</p>
                  </div>
                </button>
                <button className="w-full text-left flex items-start gap-3 px-4 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group">
                  <span className="material-symbols-outlined text-[18px] text-outline mt-0.5 group-hover:text-primary transition-colors">chat_bubble</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface line-clamp-1">Ayushman Bharat Healthcare Benefits Overview</p>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Last week</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* User Profile Area */}
          <div className="p-4 border-t border-outline-variant/20">
            <Link href="/profile" className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container transition-colors">
              <img className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" alt="Rajesh Kumar Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVzDw4lMPV5BICoU6B7r4TyeNw9m5VL0voMFVNuWc7zJ4MorqTfGla2uuXv50bAwnHc850ed_L0IdM26f7HqrCxp6od4978oU0wpEeJTNAOLlaeNHFXD_12-nAqVTP-NSD3Vx8CmsApuMuB4OMVimLXk2r8iC6fJJnX3LL8v4dFY-AEEBOBxThdDxsYYNovYqOAR9By0E6fYIFl3xbiCOkqWWEYoTtgHTextqEg7riu2isGed6TJ7-Kw" />
              <div className="text-left flex-1">
                <p className="font-body-md text-[14px] font-medium text-on-surface">Rajesh Kumar</p>
                <p className="font-label-sm text-[12px] text-on-surface-variant">Citizen Profile</p>
              </div>
              <span className="material-symbols-outlined text-outline">settings</span>
            </Link>
          </div>
          </aside>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative h-full min-w-0 transition-all duration-300">
          
          {/* Sidebar Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex absolute top-[104px] left-4 z-50 w-10 h-10 rounded-full bg-surface/50 backdrop-blur border border-outline-variant/30 items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all shadow-sm group"
            title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              view_sidebar
            </span>
          </button>


          {/* Scrollable Canvas */}
          <div className="flex-1 overflow-y-auto pt-24 pb-40 px-4 md:px-12 lg:px-20 flex flex-col">
            <div className={`w-full max-w-[800px] flex flex-col gap-16 ${isSidebarOpen ? 'mr-auto' : 'mx-auto'}`}>
              {/* Hero Section */}
              <section className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8 md:mt-16">
                <div className="flex-1 space-y-4 text-center md:text-left">

                  <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
                    Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">Intelligence</span><br/>Core
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[500px] mx-auto md:mx-0">
                    How can I help you navigate government services, understand documents, or access benefits today?
                  </p>
                </div>

                {/* Network Visualization Container */}
                <div className="w-80 h-80 md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] relative flex-shrink-0" style={{ perspective: '1000px' }}>
                  
                  <InteractiveRobotSpline
                    scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                    className="absolute inset-0 w-full h-full z-10 spline-container" 
                  />
                  
                </div>
              </section>

              {/* Suggested Actions Grid */}
              <section className="w-full">
                <h3 className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-4 px-2">Suggested Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1 */}
                  <button className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-primary">account_balance</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-primary transition-colors">Find Schemes</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Discover eligibility for state &amp; central programs.</p>
                    </div>
                  </button>
                  {/* Card 2 */}
                  <button className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-secondary">description</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-secondary transition-colors">Explain Document</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Upload official forms for simple explanations.</p>
                    </div>
                  </button>
                  {/* Card 3 */}
                  <button className="glass-card p-5 text-left group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-sm relative z-10">
                      <span className="material-symbols-outlined text-[24px] text-tertiary">local_hospital</span>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-body-lg text-[16px] font-medium text-on-surface mb-1 group-hover:text-tertiary transition-colors">Healthcare Nav</h4>
                      <p className="font-body-md text-[14px] text-on-surface-variant">Locate AB-PMJAY empaneled hospitals near you.</p>
                    </div>
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Fixed Bottom Composer */}
          <div className={`absolute bottom-0 left-0 w-full px-4 md:px-12 lg:px-20 pb-8 pt-12 bg-gradient-to-t from-surface via-surface/80 to-transparent z-40 flex ${isSidebarOpen ? 'justify-start' : 'justify-center'} pointer-events-none`}>
            <div className="w-full max-w-[800px] relative pointer-events-auto">
              {/* Input Container */}
              <div className="glass-input p-2 pl-6 pr-2 flex items-center gap-3 relative z-10">
                <input className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-md text-body-md placeholder:text-outline py-3 outline-none" placeholder="Ask about schemes, upload documents, or request guidance..." type="text"/>
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Attach file">
                    <span className="material-symbols-outlined text-[22px]">attach_file</span>
                  </button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" title="Voice input">
                    <span className="material-symbols-outlined text-[22px]">mic</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm ml-1" title="Send message">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </div>
              </div>
              
              {/* Footer Info */}
              <div className="text-center mt-3">
                <p className="font-label-sm text-[11px] text-outline">Smart Bharat AI may display inaccurate info. Always verify official government sources.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
