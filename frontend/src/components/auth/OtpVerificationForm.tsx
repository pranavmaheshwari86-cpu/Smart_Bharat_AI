"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Lock, RefreshCw, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

interface OtpVerificationFormProps {
  phoneNumber: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  errorMessage?: string | null;
  isMockMode?: boolean;
}

export function OtpVerificationForm({
  phoneNumber,
  onVerify,
  onResend,
  onBack,
  isLoading,
  errorMessage,
  isMockMode = false,
}: OtpVerificationFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Mask phone number (e.g. +91 9876543210 -> +91 ******3210)
  const maskPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length >= 10) {
      const last4 = cleaned.slice(-4);
      return `+91 ******${last4}`;
    }
    return phone;
  };

  // 60-second countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto move to next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 digits entered
    const fullOtp = newOtp.join("");
    if (fullOtp.length === 6) {
      handleAutoSubmit(fullOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasteData.length > 0) {
      const newOtp = Array(6).fill("");
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const targetIndex = Math.min(pasteData.length, 5);
      inputRefs.current[targetIndex]?.focus();

      if (pasteData.length === 6) {
        handleAutoSubmit(pasteData);
      }
    }
  };

  const handleAutoSubmit = async (code: string) => {
    try {
      await onVerify(code);
      setIsSuccess(true);
    } catch {
      setIsSuccess(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length === 6) {
      handleAutoSubmit(fullOtp);
    }
  };

  const handleResendClick = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    try {
      await onResend();
      setCountdown(60);
      setCanResend(false);
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-md mx-auto p-6 sm:p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Change Number
        </button>

        <div className="w-8 h-8 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Lock className="w-4 h-4" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Verify OTP Code
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Enter the 6-digit verification code sent to{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            {maskPhoneNumber(phoneNumber)}
          </span>
        </p>

        {isMockMode && (
          <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            💡 Dev Mode: Enter OTP <strong className="ml-1 underline">123456</strong>
          </div>
        )}
      </div>

      {/* Error Message Alert */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-start text-xs text-rose-700 dark:text-rose-300"
        >
          <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleManualSubmit} className="space-y-6">
        {/* 6 Digit Box Inputs */}
        <div className="flex items-center justify-between gap-2 sm:gap-2.5">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              disabled={isLoading || isSuccess}
              className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                digit
                  ? "border-emerald-500 dark:border-emerald-400 text-slate-900 dark:text-white bg-emerald-50/30 dark:bg-emerald-950/20 focus:ring-emerald-500/40"
                  : "border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 focus:border-indigo-500 focus:ring-indigo-500/30"
              }`}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6 || isSuccess}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 dark:shadow-emerald-950/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Verified Successfully!</span>
            </>
          ) : (
            <span>Verify & Continue</span>
          )}
        </button>
      </form>

      {/* Resend OTP Section */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Didn&apos;t receive the code?
        </p>

        <button
          type="button"
          onClick={handleResendClick}
          disabled={!canResend || isResending || isLoading}
          className="mt-1.5 inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
        >
          {isResending ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Resending OTP...
            </>
          ) : canResend ? (
            "Resend OTP Code"
          ) : (
            `Resend OTP in ${countdown}s`
          )}
        </button>
      </div>
    </motion.div>
  );
}
