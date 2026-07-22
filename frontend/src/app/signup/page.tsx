"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  User,
  Smartphone
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";
import { OtpInput } from "@/components/auth/OtpInput";

export default function SignUpPage() {
  const { signUpWithEmail, sendPhoneOtp, verifyPhoneOtp } = useAuth();
  const router = useRouter();

  // Step 1: Form, Step 2: Phone Verification OTP
  const [step, setStep] = useState<"FORM" | "VERIFY_PHONE">("FORM");

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Focus tracking
  const [activeFocus, setActiveFocus] = useState<string | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [debugOtp, setDebugOtp] = useState<string | undefined>();

  // ─── FORM SUBMIT ──────────────────────────────────────────────────────────
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !phone) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      setErrorMessage("You must accept the Terms of Service and Privacy Policy.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // 1. Register User
      await signUpWithEmail({
        fullName,
        email,
        password,
        confirmPassword,
        phone,
        countryCode,
        acceptTerms,
      });

      // 2. Send SMS OTP for phone verification
      const otpData = await sendPhoneOtp(phone, countryCode, "PHONE_VERIFICATION");
      setIsLoading(false);

      if (otpData.debugOtp) {
        setDebugOtp(otpData.debugOtp);
      }

      setStep("VERIFY_PHONE");
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Registration failed.");
    }
  };

  // ─── OTP VERIFICATION ──────────────────────────────────────────────────────
  const handleVerifyOtp = async (otp: string) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await verifyPhoneOtp(phone, otp, countryCode, "PHONE_VERIFICATION");
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/"), 900);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Invalid OTP code.");
      throw err;
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage("");
    const data = await sendPhoneOtp(phone, countryCode, "PHONE_VERIFICATION");
    if (data.debugOtp) setDebugOtp(data.debugOtp);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#FAFAF8] text-[#111111] font-sans select-none overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C9A86A]/5 blur-[140px] rounded-full" />
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
          <span>Citizen Identity Registration</span>
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
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5F5F2] border border-[#E8E8E5] text-[#C9A86A] shadow-2xs mb-4">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                assured_workload
              </span>
            </div>
            
            <h1 className="text-2xl font-extrabold text-[#111111] tracking-tight">
              {step === "FORM" ? "Create Account" : "Verify Phone Number"}
            </h1>
            <p className="text-sm font-medium text-[#666666] mt-1">
              {step === "FORM"
                ? "Join Smart Bharat AI to access government services"
                : `We sent a 6-digit verification OTP to ${countryCode} ${phone}`}
            </p>
          </div>

          {step === "FORM" ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeFocus === "name" ? "text-[#C9A86A]" : "text-[#9A9A9A]"}`} />
                  <input 
                    type="text"
                    required
                    value={fullName}
                    onFocus={() => setActiveFocus("name")}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Pranav Maheshwari"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all placeholder:text-[#9A9A9A]"
                  />
                </div>
              </div>

              {/* Email Address */}
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

              {/* Mobile Number & Country Code */}
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
                    <Smartphone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeFocus === "phone" ? "text-[#C9A86A]" : "text-[#9A9A9A]"}`} />
                    <input 
                      type="tel"
                      required
                      value={phone}
                      onFocus={() => setActiveFocus("phone")}
                      onBlur={() => setActiveFocus(null)}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all placeholder:text-[#9A9A9A]"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeFocus === "password" ? "text-[#C9A86A]" : "text-[#9A9A9A]"}`} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onFocus={() => setActiveFocus("password")}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
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
                {/* Real-time Password Strength Meter */}
                <PasswordStrengthMeter password={password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${activeFocus === "confirmPassword" ? "text-[#C9A86A]" : "text-[#9A9A9A]"}`} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onFocus={() => setActiveFocus("confirmPassword")}
                    onBlur={() => setActiveFocus(null)}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full h-12 pl-10 pr-11 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all placeholder:text-[#9A9A9A]"
                  />
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-[11px] font-semibold text-[#FF4D4F] mt-1">Passwords do not match.</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-[#E8E8E5] text-[#111111] focus:ring-[#C9A86A]"
                  />
                  <span className="text-xs font-semibold text-[#666666]">
                    I accept the <a href="/terms" target="_blank" className="text-[#C9A86A] hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-[#C9A86A] hover:underline">Privacy Policy</a>
                  </span>
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
                disabled={isLoading || !acceptTerms}
                className="w-full h-12 mt-2 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#FFFFFF]/30 border-t-[#FFFFFF] rounded-full animate-spin" />
                    <span>Creating Account...</span>
                  </span>
                ) : (
                  <>
                    <span>Continue to Phone Verification</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <OtpInput
                phone={`${countryCode} ${phone}`}
                onVerify={handleVerifyOtp}
                onResend={handleResendOtp}
                isLoading={isLoading}
                errorMessage={errorMessage}
                debugOtp={debugOtp}
              />
            </div>
          )}

          <div className="mt-6 text-center text-xs font-semibold text-[#666666] pt-4 border-t border-[#EFEFEA]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#C9A86A] hover:text-[#B89254] font-bold">
              Sign In
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-[#666666] font-medium">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34C759] inline" />
          <span>Protected by 256-bit SSL encryption & Government e-Pramaan SSO</span>
        </p>
      </footer>
    </div>
  );
}
