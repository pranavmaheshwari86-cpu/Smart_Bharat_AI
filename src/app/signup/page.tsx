"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/* ══════════════════════════════════════════════════════════════════════════
   SPRING CONFIGURATIONS
══════════════════════════════════════════════════════════════════════════ */
const SP_SMOOTH = { type: "spring", damping: 30, stiffness: 200, mass: 1 };
const SP_BOUNCY = { type: "spring", damping: 15, stiffness: 300, mass: 0.8 };
const SP_FLOAT  = { type: "spring", damping: 40, stiffness: 80,  mass: 2 };

/* ══════════════════════════════════════════════════════════════════════════
   LIQUID GLASS COMPONENTS (DECORATIVE WIDGETS)
══════════════════════════════════════════════════════════════════════════ */

function LiquidPill({ 
  colorBase, colorShadow, label, width = "w-48", delay = 0, yOffset = [0, -10, 0] 
}: { 
  colorBase: string; colorShadow: string; label: string; width?: string; delay?: number; yOffset?: number[] 
}) {
  return (
    <motion.div 
      className={`relative h-14 ${width} rounded-full flex items-center justify-center cursor-default`}
      animate={{ y: yOffset }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Outer shadow bloom */}
      <div className="absolute -inset-4 rounded-full blur-xl opacity-60 pointer-events-none" style={{ background: colorShadow }} />
      {/* Glass pill body */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, ${colorBase} 100%)`,
          backdropFilter: "blur(20px)",
          border: "1.5px solid rgba(255,255,255,0.8)",
          boxShadow: `
            0 15px 35px ${colorShadow}, 
            inset 0 4px 10px rgba(255,255,255,0.9), 
            inset 0 -4px 10px rgba(0,0,0,0.1)
          `
        }}
      />
      {/* Specular highlight */}
      <div className="absolute top-1 left-4 right-4 h-3 rounded-full opacity-50" 
           style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)" }} />
      
      <span className="relative z-10 text-white font-bold tracking-wide text-sm drop-shadow-md">
        {label}
      </span>
    </motion.div>
  );
}

function LiquidSearchBar({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      className="relative w-64 h-14 rounded-full flex items-center px-4 gap-3"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
       <div className="absolute -inset-6 rounded-full blur-2xl opacity-20 bg-blue-400 pointer-events-none" />
       <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08), inset 0 2px 5px rgba(255,255,255,1), inset 0 -2px 5px rgba(0,0,0,0.05)"
        }}
      />
      <span className="relative z-10 material-symbols-outlined text-gray-500">search</span>
      <div className="relative z-10 h-2 w-24 bg-gray-300/50 rounded-full" />
    </motion.div>
  );
}

function LiquidCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      className="relative w-72 h-40 rounded-3xl p-5 flex flex-col justify-between"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* Colorful blooms behind the card */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-400/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-400/40 rounded-full blur-2xl pointer-events-none" />
      
      {/* Glass body */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)",
          backdropFilter: "blur(30px)",
          border: "1.5px solid rgba(255,255,255,0.8)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.1), inset 0 4px 10px rgba(255,255,255,0.8)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="w-10 h-10 rounded-xl bg-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,1)] flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-500">apps</span>
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>
      <div className="relative z-10 space-y-2">
        <div className="h-3 w-32 bg-white/70 rounded-full shadow-sm" />
        <div className="h-2 w-20 bg-white/40 rounded-full" />
      </div>
    </motion.div>
  );
}

function LiquidToggle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      className="relative w-24 h-12 rounded-full p-1.5 flex items-center"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "inset 0 3px 8px rgba(0,0,0,0.1)"
        }}
      />
      <div 
        className="relative z-10 w-9 h-9 rounded-full bg-white ml-auto flex items-center justify-center"
        style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,1)" }}
      >
        <span className="material-symbols-outlined text-gray-400 text-[18px]">add</span>
      </div>
    </motion.div>
  );
}

function LiquidCheckbox({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div 
      className="relative w-36 h-12 rounded-2xl flex items-center px-3 gap-3"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)"
        }}
      />
      <div className="relative z-10 w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
        <span className="material-symbols-outlined text-white text-[16px]">check</span>
      </div>
      <div className="relative z-10 h-2 w-12 bg-gray-400/40 rounded-full" />
    </motion.div>
  );
}

function GlassBubble({ size = 40, x = 0, y = 0, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size, height: size, left: x, top: y,
        background: "radial-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 15px 25px rgba(0,0,0,0.1), inset 0 4px 10px rgba(255,255,255,0.9), inset 0 -4px 10px rgba(0,0,0,0.1)"
      }}
      animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   GLASS FORM COMPONENTS
══════════════════════════════════════════════════════════════════════════ */

function GlassInput({ 
  id, label, type = "text", icon 
}: { 
  id: string; label: string; type?: string; icon: string; 
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div className="relative w-full h-14 rounded-2xl group">
      {/* Animated glow under input */}
      <motion.div 
        className="absolute inset-0 rounded-2xl bg-indigo-400/30 blur-md pointer-events-none"
        animate={{ opacity: focused ? 1 : 0, scale: focused ? 1.05 : 0.95 }}
        transition={SP_SMOOTH}
      />
      
      {/* Glass Body */}
      <div 
        className="absolute inset-0 rounded-2xl transition-all duration-300"
        style={{
          background: focused ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
          backdropFilter: "blur(12px)",
          border: focused ? "1.5px solid rgba(255,255,255,1)" : "1px solid rgba(255,255,255,0.6)",
          boxShadow: focused 
            ? "0 10px 30px rgba(99,102,241,0.15), inset 0 2px 4px rgba(255,255,255,0.8)" 
            : "0 4px 15px rgba(0,0,0,0.03), inset 0 2px 4px rgba(255,255,255,0.5)"
        }}
      />

      <div className="relative flex items-center h-full px-4 gap-3">
        <span className={`material-symbols-outlined transition-colors duration-300 ${focused ? 'text-indigo-600' : 'text-gray-400'}`}>
          {icon}
        </span>
        <div className="relative flex-1 h-full">
          <motion.label 
            htmlFor={id}
            className="absolute left-0 pointer-events-none font-medium text-gray-500 origin-left"
            animate={{
              top: focused || val ? "8px" : "50%",
              y: focused || val ? "0%" : "-50%",
              scale: focused || val ? 0.75 : 1,
              color: focused ? "#4f46e5" : "#6b7280"
            }}
            transition={SP_SMOOTH}
          >
            {label}
          </motion.label>
          <input 
            id={id}
            type={type}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="absolute bottom-1 left-0 w-full bg-transparent outline-none text-gray-800 font-medium placeholder-transparent"
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE LAYOUT
══════════════════════════════════════════════════════════════════════════ */
export default function SignUpPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  
  // Parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const bgX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), SP_FLOAT);
  const bgY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), SP_FLOAT);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans select-none">
      
      {/* ─── 1. AMBIENT BACKGROUND ────────────────────────────────────────── */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 20% 20%, #FAF8F5 0%, #E8E4D9 50%, #D1CBC0 100%)",
        }}
      />
      
      {/* Animated soft lighting blooms */}
      <motion.div className="absolute inset-0 z-0 opacity-70 pointer-events-none" style={{ x: bgX, y: bgY }}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-orange-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] bg-blue-200/40 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[50%] bg-emerald-100/30 rounded-full blur-[100px]" />
        {/* Soft shadow caster from top left */}
        <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-gradient-to-br from-white/60 via-transparent to-black/5 mix-blend-overlay" />
      </motion.div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />


      {/* ─── 2. MAIN THICK GLASS PANEL ───────────────────────────────────── */}
      <motion.div 
        className="relative z-10 w-[92%] max-w-6xl h-[85vh] min-h-[600px] max-h-[800px] rounded-[40px] flex flex-col md:flex-row overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(40px) saturate(150%)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: `
            0 50px 100px -20px rgba(50,50,93,0.15), 
            0 30px 60px -30px rgba(0,0,0,0.1), 
            inset 0 2px 4px rgba(255,255,255,1), 
            inset 0 -2px 10px rgba(255,255,255,0.4)
          `
        }}
      >
        {/* Inner specular highlight top edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
        
        {/* ─── LEFT: SIGN IN FORM ────────────────────────────────────────── */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-16 lg:px-20 relative z-20">
          <div className="mb-10">
            <div className="w-12 h-12 rounded-2xl mb-6 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05),inset_0_2px_5px_rgba(255,255,255,1)] border border-white/60 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-500 text-2xl">account_balance</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">Sign In</h1>
            <p className="text-gray-500 font-medium">Access your Smart Bharat AI dashboard.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); signIn(); router.push("/"); }}>
            <GlassInput id="email" label="Email Address" type="email" icon="mail" />
            <GlassInput id="password" label="Password" type="password" icon="lock" />
            
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 rounded-md border border-white/80 bg-white/40 shadow-sm flex items-center justify-center group-hover:bg-white/60 transition-colors">
                  <span className="material-symbols-outlined text-[14px] text-transparent group-hover:text-gray-400">check</span>
                </div>
                <span className="text-sm font-medium text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot Password?</a>
            </div>

            {/* Primary Pill Button */}
            <motion.button 
              type="submit"
              className="relative w-full h-14 rounded-full mt-4 flex items-center justify-center group outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={SP_SMOOTH}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 opacity-90 blur-lg group-hover:opacity-100 transition-opacity" />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(249,115,22,0.9) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 10px 25px rgba(249,115,22,0.3), inset 0 4px 8px rgba(255,255,255,0.6), inset 0 -4px 8px rgba(0,0,0,0.15)"
                }}
              />
              <div className="absolute top-1 left-6 right-6 h-3 rounded-full opacity-60 bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
              
              <span className="relative z-10 text-white font-bold text-lg tracking-wide drop-shadow-sm flex items-center gap-2">
                Continue <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </span>
            </motion.button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or login with</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
            <div className="flex gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1 h-12 rounded-xl bg-white/50 border border-white/80 shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)] flex items-center justify-center gap-2 font-semibold text-gray-600 hover:bg-white/70 transition-colors">
                Google
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1 h-12 rounded-xl bg-white/50 border border-white/80 shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)] flex items-center justify-center gap-2 font-semibold text-gray-600 hover:bg-white/70 transition-colors">
                Microsoft
              </motion.button>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: DECORATIVE LIQUID GLASS WIDGETS ────────────────────── */}
        <div className="hidden md:flex w-1/2 h-full relative border-l border-white/40 overflow-hidden bg-gradient-to-br from-transparent to-black/5">
          {/* Inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_20px_0_40px_rgba(0,0,0,0.02)] pointer-events-none" />
          
          <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
            
            {/* Ambient Rainbow Blooms behind widgets */}
            <motion.div className="absolute top-[20%] right-[15%] w-64 h-64 bg-cyan-400/30 rounded-full blur-[80px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
            <motion.div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-purple-400/30 rounded-full blur-[90px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity }} />
            <motion.div className="absolute top-[40%] left-[30%] w-48 h-48 bg-orange-400/20 rounded-full blur-[60px]" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 7, repeat: Infinity }} />

            {/* Widget Composition */}
            <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
              
              <div className="absolute top-24 left-4">
                <LiquidPill colorBase="rgba(167,139,250,0.8)" colorShadow="rgba(167,139,250,0.4)" label="Secondary" delay={0.2} yOffset={[0, 8, 0]} />
              </div>
              
              <div className="absolute top-44 left-4">
                <LiquidPill colorBase="rgba(45,212,191,0.7)" colorShadow="rgba(45,212,191,0.4)" label="Tertiary" delay={0.5} yOffset={[0, -10, 0]} />
              </div>

              <div className="absolute top-32 right-0">
                <LiquidCard delay={1.2} />
              </div>

              <div className="absolute top-72 left-8">
                <LiquidSearchBar delay={0.8} />
              </div>

              <div className="absolute bottom-40 left-12">
                <LiquidCheckbox delay={1.5} />
              </div>

              <div className="absolute bottom-32 right-12">
                <LiquidToggle delay={1.8} />
              </div>

              <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
                 <motion.div 
                    className="relative w-64 h-24 rounded-3xl p-4 flex flex-col justify-end"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
                  >
                    <div className="absolute -inset-4 bg-orange-400/30 rounded-full blur-2xl pointer-events-none" />
                    <div 
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(249,115,22,0.3) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1.5px solid rgba(255,255,255,0.9)",
                        boxShadow: "0 20px 40px rgba(249,115,22,0.15), inset 0 2px 6px rgba(255,255,255,0.9)"
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-between">
                       <span className="font-bold text-gray-800 tracking-tight">Upgrade plan</span>
                       <div className="w-8 h-8 rounded-full bg-white/60 shadow-sm flex items-center justify-center">
                         <span className="material-symbols-outlined text-orange-500 text-[16px]">add</span>
                       </div>
                    </div>
                  </motion.div>
              </div>

              {/* Little glass bubbles floating around */}
              <GlassBubble size={32} x="85%" y="20%" delay={0.3} />
              <GlassBubble size={48} x="20%" y="60%" delay={1.1} />
              <GlassBubble size={24} x="75%" y="70%" delay={2.4} />

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
