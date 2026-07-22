"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PasswordStrengthMeter } from "@/components/auth/PasswordStrengthMeter";

function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage("Invalid or missing password reset token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      await resetPassword({
        token,
        newPassword,
        confirmPassword,
      });

      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Failed to reset password.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FFFFFF] border border-[#E8E8E5] rounded-3xl p-6 sm:p-9 shadow-[0_20px_50px_rgba(17,17,17,0.04),0_2px_8px_rgba(17,17,17,0.02)]"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5F5F2] border border-[#E8E8E5] text-[#C9A86A] shadow-2xs mb-4">
          <KeyRound className="w-7 h-7" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-[#111111] tracking-tight">
          Create New Password
        </h1>
        <p className="text-sm font-medium text-[#666666] mt-1">
          Enter your new password below to regain access to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
            <input 
              type={showPassword ? "text" : "password"}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full h-12 pl-10 pr-11 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#111111] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <PasswordStrengthMeter password={newPassword} />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
            <input 
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full h-12 pl-10 pr-11 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all"
            />
          </div>
          {confirmPassword && confirmPassword !== newPassword && (
            <p className="text-[11px] font-semibold text-[#FF4D4F] mt-1">Passwords do not match.</p>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-[#FF4D4F] font-semibold bg-[#FF4D4F]/10 border border-[#FF4D4F]/20 rounded-xl p-3 text-center">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || isSuccess || !newPassword}
          className="w-full h-12 mt-2 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Updating Password...</span>
            </span>
          ) : isSuccess ? (
            <span className="inline-flex items-center gap-2 text-[#34C759] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Password Saved! Redirecting...</span>
            </span>
          ) : (
            <>
              <span>Save & Sign In</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#FAFAF8] text-[#111111] font-sans select-none overflow-hidden">
      
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

      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors group px-3.5 py-1.5 rounded-full hover:bg-[#F5F5F2] border border-transparent hover:border-[#E8E8E5]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Sign In</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#666666] bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E8E8E5] shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-[#34C759]" />
          <span>Secure Password Update</span>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-md mx-auto my-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-10 text-xs font-semibold">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-[#666666] font-medium">
        <p>Protected by Smart Bharat Security & Encryption Services</p>
      </footer>
    </div>
  );
}
