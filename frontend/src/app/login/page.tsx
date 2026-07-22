"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  Smartphone,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { CompleteProfileModal } from "@/components/auth/CompleteProfileModal";
import { OtpInput } from "@/components/auth/OtpInput";

type AuthTab = "GOOGLE" | "EMAIL" | "PHONE";

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, sendPhoneOtp, verifyPhoneOtp } = useAuth();
  const router = useRouter();

  // Active Method Tab
  const [activeTab, setActiveTab] = useState<AuthTab>("EMAIL");

  // Email Form State
  const [email, setEmail] = useState("pranav.maheshwari@smartbharat.gov.in");
  const [password, setPassword] = useState("SmartBharat2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Phone Form State
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [phoneStep, setPhoneStep] = useState<"ENTER_PHONE" | "VERIFY_OTP">("ENTER_PHONE");
  const [debugOtp, setDebugOtp] = useState<string | undefined>();

  // Complete Profile Modal State (for first-time Google users)
  const [pendingGoogleUser, setPendingGoogleUser] = useState<{ id: string; name?: string; email?: string } | null>(null);

  // Focus state tracking for dynamic icon highlighting
  const [activeFocus, setActiveFocus] = useState<string | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ─── EMAIL SIGN IN HANDLER ────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter valid email and password.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await signInWithEmail(email, password);
      setIsLoading(false);

      if (data.profileCompleted) {
        setIsSuccess(true);
        setTimeout(() => router.push("/"), 900);
      } else {
        // Needs phone verification
        setPhone(data.user.phone || "");
        setPhoneStep("VERIFY_OTP");
        setActiveTab("PHONE");
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Authentication failed.");
    }
  };

  // ─── GOOGLE SIGN IN HANDLER ───────────────────────────────────────────────
  const handleGoogleSignIn = async (credential?: string, demoProfile?: any) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await signInWithGoogle(credential, demoProfile);
      setIsLoading(false);

      if (data.profileCompleted) {
        setIsSuccess(true);
        setTimeout(() => router.push("/"), 900);
      } else if (data.user) {
        // First-time Google user -> Open Complete Profile Modal
        setPendingGoogleUser({
          id: data.user.id,
          name: data.user.fullName,
          email: data.user.email,
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Google authentication failed.");
    }
  };

  // ─── PHONE OTP SEND HANDLER ──────────────────────────────────────────────
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await sendPhoneOtp(phone, countryCode, "LOGIN");
      setIsLoading(false);
      if (data.debugOtp) setDebugOtp(data.debugOtp);
      setPhoneStep("VERIFY_OTP");
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Failed to send SMS OTP.");
    }
  };

  // ─── PHONE OTP VERIFY HANDLER ─────────────────────────────────────────────
  const handleVerifyPhoneOtp = async (otp: string) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await verifyPhoneOtp(phone, otp, countryCode, "LOGIN");
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/"), 900);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Invalid OTP code.");
      throw err;
    }
  };

  const handleResendPhoneOtp = async () => {
    setErrorMessage("");
    const data = await sendPhoneOtp(phone, countryCode, "LOGIN");
    if (data.debugOtp) setDebugOtp(data.debugOtp);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#FAFAF8] text-[#111111] font-sans select-none overflow-hidden">
      
      {/* Background glow & matrix */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C9A86A]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#C9A86A]/5 blur-[160px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors group px-3.5 py-1.5 rounded-full hover:bg-[#F5F5F2] border border-transparent hover:border-[#E8E8E5]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Smart Bharat AI</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#666666] bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E8E8E5] shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-[#34C759]" />
          <span>Government of India Verified Portal</span>
        </div>
      </header>

      {/* Main Card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFFFF] border border-[#E8E8E5] rounded-3xl p-6 sm:p-9 shadow-[0_20px_50px_rgba(17,17,17,0.04),0_2px_8px_rgba(17,17,17,0.02)]"
        >
          {/* Logo & Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5F5F2] border border-[#E8E8E5] text-[#C9A86A] shadow-2xs mb-4">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                assured_workload
              </span>
            </div>
            
            <h1 className="text-2xl font-extrabold text-[#111111] tracking-tight">
              Sign In
            </h1>
            <p className="text-sm font-medium text-[#666666] mt-1">
              Access your Smart Bharat AI dashboard & services
            </p>
          </div>

          {/* Top Google OAuth Button (Option 1) */}
          <div className="mb-6">
            <GoogleSignInButton
              onGoogleSuccess={handleGoogleSignIn}
              isLoading={isLoading}
            />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EFEFEA]" />
            </div>
            <span className="relative bg-[#FFFFFF] px-3 text-[11px] font-bold text-[#666666] uppercase tracking-widest">
              Or sign in with
            </span>
          </div>

          {/* Tab Selector: Email vs Phone */}
          <div className="flex bg-[#F5F5F2] p-1 rounded-2xl border border-[#E8E8E5] mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab("EMAIL"); setErrorMessage(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "EMAIL"
                  ? "bg-[#FFFFFF] text-[#111111] shadow-xs"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              Continue with Email
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("PHONE"); setErrorMessage(""); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "PHONE"
                  ? "bg-[#FFFFFF] text-[#111111] shadow-xs"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              Continue with Phone
            </button>
          </div>

          {/* TAB 1: EMAIL AUTHENTICATION */}
          {activeTab === "EMAIL" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeFocus === "email" ? "text-[#C9A86A]" : "text-[#9A9A9A]"}`} />
                  <input 
                    type="email"
                    required
                    value={email}
                    onFocus={() => setActiveFocus("email")}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all placeholder:text-[#9A9A9A]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-[#C9A86A] hover:text-[#B89254] transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeFocus === "password" ? "text-[#C9A86A]" : "text-[#9A9A9A]"}`} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onFocus={() => setActiveFocus("password")}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 pl-10 pr-11 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all placeholder:text-[#9A9A9A]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#111111] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E8E8E5] text-[#111111] focus:ring-[#C9A86A]"
                  />
                  <span className="text-xs font-semibold text-[#666666]">Remember me on this device</span>
                </label>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-xs text-[#FF4D4F] font-semibold bg-[#FF4D4F]/10 border border-[#FF4D4F]/20 rounded-xl p-3 text-center">
                  {errorMessage}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full h-12 mt-2 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] font-semibold text-sm transition-all duration-200 shadow-md shadow-[#111111]/10 flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#FFFFFF]/30 border-t-[#FFFFFF] rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </span>
                ) : isSuccess ? (
                  <span className="inline-flex items-center gap-2 text-[#34C759] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Authenticated! Redirecting...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAB 2: PHONE AUTHENTICATION */}
          {activeTab === "PHONE" && (
            <div>
              {phoneStep === "ENTER_PHONE" ? (
                <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-12 px-3 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-semibold focus:outline-none"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>
                      <div className="relative flex-1">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-[#FF4D4F] font-semibold bg-[#FF4D4F]/10 border border-[#FF4D4F]/20 rounded-xl p-3 text-center">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !phone}
                    className="w-full h-12 mt-2 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending SMS OTP...</span>
                      </span>
                    ) : (
                      <>
                        <span>Continue with Phone OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <OtpInput
                    phone={`${countryCode} ${phone}`}
                    onVerify={handleVerifyPhoneOtp}
                    onResend={handleResendPhoneOtp}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    debugOtp={debugOtp}
                  />

                  <button
                    type="button"
                    onClick={() => { setPhoneStep("ENTER_PHONE"); setErrorMessage(""); }}
                    className="w-full py-2 text-center text-xs font-semibold text-[#666666] hover:text-[#111111] transition-colors"
                  >
                    ← Change Phone Number
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer Register Link */}
          <div className="mt-6 text-center text-xs font-semibold text-[#666666] pt-4 border-t border-[#EFEFEA]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#C9A86A] hover:text-[#B89254] font-bold">
              Create Account
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Complete Profile Modal for first-time Google sign ins */}
      {pendingGoogleUser && (
        <CompleteProfileModal
          isOpen={true}
          userId={pendingGoogleUser.id}
          initialName={pendingGoogleUser.name}
          initialEmail={pendingGoogleUser.email}
          onClose={() => setPendingGoogleUser(null)}
          onCompleteSuccess={() => {
            setPendingGoogleUser(null);
            setIsSuccess(true);
            setTimeout(() => router.push("/"), 900);
          }}
        />
      )}

      {/* Security Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#666666] font-medium">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34C759] inline" />
          <span>Protected by 256-bit SSL encryption & Smart Bharat Auth Services</span>
        </p>
      </footer>

    </div>
  );
}
