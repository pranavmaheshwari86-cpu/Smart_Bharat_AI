"use client";

import { useState, useEffect } from "react";
import { Mail, Eye, EyeOff, CheckCircle2, ShieldCheck, Sparkles, X, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, forgotPassword, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Privacy Policy Modal State
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.replace("/");
    }
  }, [isAuthenticated, authLoading, router]);

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem("remembered_email", email.trim());
      } else {
        localStorage.removeItem("remembered_email");
      }

      await signInWithEmail(email, password);
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/"), 300);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Invalid email or password.");
    }
  };

  const handleGoogleSignIn = async (credential?: string, demoProfile?: any) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await signInWithGoogle(credential, demoProfile);
      setIsLoading(false);

      if (data?.cancelled) return;

      setIsSuccess(true);
      setTimeout(() => router.push("/"), 800);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Google sign-in failed.");
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    setIsForgotLoading(true);
    setForgotMessage(null);

    try {
      await forgotPassword(forgotEmail.trim());
      setIsForgotLoading(false);
      setForgotMessage({
        type: "success",
        text: `Password reset link has been sent to ${forgotEmail.trim()}`,
      });
    } catch (err: any) {
      setIsForgotLoading(false);
      setForgotMessage({
        type: "error",
        text: err.message || "Failed to send reset link. Please verify your email.",
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden select-none font-sans bg-gradient-to-b from-[#DCE8FD] via-[#D5E4FC] to-[#C8DBF8] flex flex-col justify-between items-center p-6 sm:p-10">
      
      {/* ─── FIXED BACKGROUND VECTOR LANDSCAPE LAYER ───────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Sun & Rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-white/50 rounded-full blur-[50px]" />
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-white rounded-full shadow-[0_0_100px_rgba(255,255,255,0.95)]" />

        {/* Clouds */}
        <svg className="absolute top-0 left-0 w-full h-[45%] opacity-95" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="#FFFFFF" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
          />
        </svg>

        {/* Birds */}
        <div className="absolute top-[18%] left-[8%] opacity-85">
          <svg width="70" height="35" viewBox="0 0 70 35" fill="none">
            <path d="M2 12C8 6 15 10 20 16C25 10 32 6 38 12" stroke="#081220" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 20C27 15 33 18 37 23C41 18 47 15 52 20" stroke="#081220" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute top-[16%] right-[8%] opacity-85">
          <svg width="80" height="40" viewBox="0 0 90 45" fill="none">
            <path d="M5 15C12 8 20 12 26 20C32 12 40 8 47 15" stroke="#081220" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Mountains */}
        <div className="absolute inset-0 flex items-end">
          <svg className="absolute bottom-0 w-full h-[55%]" viewBox="0 0 1440 500" preserveAspectRatio="none">
            <path fill="#D5E2FA" d="M0,288L120,240C240,192,480,96,720,128C960,160,1200,320,1320,352L1440,384L1440,500L0,500Z" />
            <polygon points="720,128 660,170 780,170" fill="#FFFFFF" opacity="0.75" />
          </svg>
          <svg className="absolute bottom-0 w-full h-[48%]" viewBox="0 0 1440 450" preserveAspectRatio="none">
            <path fill="#A5BFEF" d="M0,320L180,220C360,120,720,280,1080,200C1260,160,1380,240,1440,280L1440,450L0,450Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-[38%]" viewBox="0 0 1440 380" preserveAspectRatio="none">
            <path fill="#7096D8" d="M0,250L240,160C480,60,960,260,1200,180L1440,240L1440,380L0,380Z" />
          </svg>
          <svg className="absolute bottom-0 w-full h-[30%]" viewBox="0 0 1440 300" preserveAspectRatio="none">
            <path fill="#4F78B8" d="M0,180L360,120C720,60,1080,200,1260,150L1440,180L1440,300L0,300Z" />
          </svg>
        </div>

        {/* Pine Forests */}
        <div className="absolute bottom-0 left-0 w-[38%] h-[55%]">
          <svg className="w-full h-full" viewBox="0 0 450 550" preserveAspectRatio="none">
            <path fill="#081220" d="M-50,550 L-50,200 L10,180 L-10,220 L30,200 L10,240 L50,220 L20,270 L80,240 L40,300 L120,270 L60,340 L160,300 L80,390 L200,340 L100,450 L260,400 L120,550 Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-[38%] h-[55%]">
          <svg className="w-full h-full" viewBox="0 0 450 550" preserveAspectRatio="none">
            <path fill="#081220" d="M500,550 L500,180 L440,160 L460,200 L420,180 L440,220 L400,200 L430,250 L370,220 L410,280 L330,250 L390,320 L290,280 L370,370 L250,320 L350,430 L190,380 L330,550 Z" />
          </svg>
        </div>
      </div>

      {/* ─── HEADER LOGO BRAND ─────────────────────────────────────────── */}
      <header className="relative z-50 w-full max-w-7xl flex items-center justify-between mb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[#111111] text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              assured_workload
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-extrabold tracking-widest text-[#111111] uppercase leading-none">
              SMART BHARAT AI
            </span>
            <span className="text-[10px] font-semibold text-[#111111]/70 tracking-wider mt-1">
              Government Portal
            </span>
          </div>
        </Link>
      </header>

      {/* ─── PROMINENT FROSTED GLASS LOGIN CARD ───────────────────────── */}
      <main className="relative z-20 my-auto w-full max-w-[620px] rounded-[32px] bg-white/25 border-2 border-white/40 backdrop-blur-[30px] p-8 sm:p-12 flex flex-col items-center justify-center shadow-[0_32px_90px_rgba(0,0,0,0.25)] overflow-hidden animate-fade-in-up">
        
        {/* Internal Glow Lighting Effects */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-[32px]" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#4F78B8]/35 to-transparent pointer-events-none rounded-b-[32px]" />

        {/* Title & Subtitle */}
        <div className="text-center mb-8 z-10">
          <h1 className="text-[38px] sm:text-[44px] font-extrabold text-[#111111] tracking-wider uppercase leading-none">
            LOGIN
          </h1>
          <p className="text-[15px] font-semibold text-[#333333] mt-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#315c9a] inline" />
            <span>Access Citizen AI Services</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[420px] flex flex-col items-center gap-6 z-10">
          
          {/* Email Input */}
          <div className="w-full relative border-b-2 border-gray-700/60 pb-2 focus-within:border-[#315c9a] transition-colors">
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent text-[18px] sm:text-[19px] text-gray-900 font-medium placeholder:text-gray-700 focus:outline-none transition-colors pr-10"
            />
            <span className="material-symbols-outlined absolute right-0 bottom-2 text-[24px] text-[#333333]">
              mail
            </span>
          </div>

          {/* Password Input */}
          <div className="w-full relative flex flex-col">
            <div className="relative w-full border-b-2 border-gray-700/60 pb-2 focus-within:border-[#315c9a] transition-colors">
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent text-[18px] sm:text-[19px] text-gray-900 font-medium placeholder:text-gray-700 focus:outline-none transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute right-0 bottom-2 text-[24px] text-[#333333] cursor-pointer hover:text-black transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "visibility" : "visibility_off"}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="w-full flex justify-between items-center mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/60 bg-white/30 text-[#315c9a] focus:ring-0 cursor-pointer"
                />
                <span className="text-[14px] font-semibold text-gray-800">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setForgotEmail(email);
                  setForgotMessage(null);
                  setIsForgotModalOpen(true);
                }}
                className="text-[13px] sm:text-[14px] text-[#111111] font-bold hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-[13px] text-red-700 font-semibold bg-red-100/80 border border-red-200 rounded-lg px-4 py-2 text-center w-full">
              {errorMessage}
            </p>
          )}

          {/* Login Button */}
          <button 
            type="submit"
            disabled={isLoading || isSuccess}
            className="w-full h-[50px] bg-gradient-to-b from-[#BFDFFF] to-[#8BBEF6] hover:brightness-105 rounded-xl text-[17px] font-extrabold uppercase tracking-wider text-[#244b82] shadow-lg shadow-blue-400/30 flex items-center justify-center transition-all cursor-pointer disabled:opacity-70 mt-1"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-3 border-[#244b82]/30 border-t-[#244b82] rounded-full animate-spin" />
            ) : isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>Authenticated</span>
              </span>
            ) : (
              <span>Login</span>
            )}
          </button>

          {/* Google Sign In Button */}
          <div className="w-full pt-1">
            <button
              type="button"
              onClick={() => handleGoogleSignIn()}
              disabled={isLoading}
              className="w-full h-[48px] rounded-xl bg-white/80 hover:bg-white/95 border border-white/80 text-[#333333] font-bold text-[15px] shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </form>

        {/* Footer inside Card */}
        <div className="mt-7 z-10 flex items-center justify-between w-full max-w-[420px] text-[15px]">
          <span className="text-gray-800 font-medium">Don't have an Account?</span>
          <Link href="/signup" className="font-extrabold text-white hover:underline drop-shadow-xs flex items-center gap-1">
            <span>Register</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      {/* ─── FOOTER BAR ────────────────────────────────────────────────── */}
      <footer className="relative z-20 mt-6 text-center text-[12px] font-semibold text-[#111111]/70 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#315c9a] inline" />
          <span>256-Bit SSL Encrypted</span>
        </span>
        <span>•</span>
        <span>© 2026 Smart Bharat AI</span>
        <span>•</span>
        <button 
          type="button"
          onClick={() => setIsPrivacyModalOpen(true)}
          className="hover:underline cursor-pointer"
        >
          Privacy Policy
        </button>
      </footer>

      {/* ─── FORGOT PASSWORD MODAL ─────────────────────────────────────── */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-[90vw] max-w-[480px] rounded-3xl bg-white/80 border border-white/60 backdrop-blur-xl p-8 shadow-2xl relative flex flex-col items-center">
            
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#315c9a]/10 flex items-center justify-center mb-4 text-[#315c9a]">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-[22px] font-extrabold text-[#111111] uppercase tracking-wide">
              Reset Password
            </h3>
            <p className="text-[13px] text-gray-600 text-center mt-1 mb-6">
              Enter your email address and we'll send you instructions to reset your account password.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="w-full flex flex-col items-center gap-4">
              <div className="w-full relative border-b-2 border-gray-400 pb-2 focus-within:border-[#315c9a]">
                <input 
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-[16px] text-gray-900 font-medium placeholder:text-gray-500 focus:outline-none pr-8"
                />
                <span className="material-symbols-outlined absolute right-0 bottom-2 text-[22px] text-gray-600">
                  mail
                </span>
              </div>

              {forgotMessage && (
                <p className={`text-[12px] font-semibold rounded-lg px-3 py-2 text-center w-full ${
                  forgotMessage.type === "success" 
                    ? "bg-emerald-100/90 text-emerald-800 border border-emerald-300" 
                    : "bg-red-100/90 text-red-800 border border-red-300"
                }`}>
                  {forgotMessage.text}
                </p>
              )}

              <button
                type="submit"
                disabled={isForgotLoading}
                className="w-full h-[46px] mt-2 bg-gradient-to-r from-[#315c9a] to-[#4F78B8] hover:brightness-110 text-white font-bold text-[15px] uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center cursor-pointer disabled:opacity-70"
              >
                {isForgotLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── PRIVACY POLICY MODAL ──────────────────────────────────────── */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fade-in">
          <div className="w-[90vw] max-w-[560px] max-h-[80vh] rounded-3xl bg-white/90 border border-white/60 backdrop-blur-xl p-8 shadow-2xl relative flex flex-col overflow-y-auto">
            
            <button
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-7 h-7 text-[#315c9a]" />
              <h3 className="text-[20px] font-extrabold text-[#111111] uppercase tracking-wide">
                Privacy & Data Security
              </h3>
            </div>

            <div className="text-[13px] text-gray-700 space-y-3 leading-relaxed">
              <p>
                Smart Bharat AI is committed to safeguarding government and citizen data using end-to-end 256-bit encryption.
              </p>
              <h4 className="font-bold text-[#111111] text-[14px]">Data Protection Principles:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Strict role-based authorization for administrative portal access.</li>
                <li>Passwords are hashed using bcrypt with salt rounds.</li>
                <li>Zero third-party telemetry or ad tracking.</li>
                <li>Fully compliant with Digital Personal Data Protection (DPDP) standards.</li>
              </ul>
            </div>

            <button
              onClick={() => setIsPrivacyModalOpen(false)}
              className="mt-6 w-full h-[42px] bg-[#315c9a] text-white font-bold text-[14px] uppercase tracking-wider rounded-xl hover:bg-[#244b82] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
