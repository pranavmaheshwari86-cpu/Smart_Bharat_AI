"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface OtpInputProps {
  length?: number;
  phone: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string;
  debugOtp?: string;
}

export function OtpInput({
  length = 6,
  phone,
  onVerify,
  onResend,
  isLoading = false,
  errorMessage = "",
  debugOtp,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [expiryTimer, setExpiryTimer] = useState<number>(300); // 5 mins
  const [isResending, setIsResending] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend Timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Expiry Timer countdown
  useEffect(() => {
    if (expiryTimer <= 0) return;
    const interval = setInterval(() => {
      setExpiryTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryTimer]);

  // Handle shake animation on error
  useEffect(() => {
    if (errorMessage) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (!numericValue) return;

    const newDigits = [...digits];
    // If user pasted or typed multiple digits
    if (numericValue.length > 1) {
      const pasted = numericValue.slice(0, length).split("");
      pasted.forEach((char, i) => {
        if (index + i < length) {
          newDigits[index + i] = char;
        }
      });
      setDigits(newDigits);
      const nextIdx = Math.min(index + pasted.length, length - 1);
      inputRefs.current[nextIdx]?.focus();
      if (newDigits.every((d) => d !== "")) {
        handleAutoSubmit(newDigits.join(""));
      }
      return;
    }

    newDigits[index] = numericValue.slice(-1);
    setDigits(newDigits);

    // Auto-focus next field
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit on 6th digit
    if (newDigits.every((d) => d !== "")) {
      handleAutoSubmit(newDigits.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!pastedData) return;

    const newDigits = Array(length).fill("");
    pastedData.split("").forEach((char, i) => {
      newDigits[i] = char;
    });
    setDigits(newDigits);
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();

    if (newDigits.every((d) => d !== "")) {
      handleAutoSubmit(newDigits.join(""));
    }
  };

  const handleAutoSubmit = async (code: string) => {
    try {
      await onVerify(code);
      setIsSuccess(true);
    } catch {
      setIsShaking(true);
    }
  };

  const handleResendClick = async () => {
    if (resendTimer > 0 || isResending) return;
    setIsResending(true);
    try {
      await onResend();
      setDigits(Array(length).fill(""));
      setResendTimer(30);
      setExpiryTimer(300);
      inputRefs.current[0]?.focus();
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Info */}
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold text-[#111111]">Verify Security OTP</h3>
        <p className="text-xs font-medium text-[#666666]">
          Enter the 6-digit code sent via SMS to <span className="font-semibold text-[#111111]">{phone}</span>
        </p>

        {debugOtp && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 bg-[#C9A86A]/10 border border-[#C9A86A]/30 rounded-full text-xs font-bold text-[#9E7A37]">
            <span>Developer Test OTP: {debugOtp}</span>
          </div>
        )}
      </div>

      {/* 6 Digit Inputs Container */}
      <motion.div
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center gap-2 sm:gap-3"
      >
        {digits.map((digit, idx) => (
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
            className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border transition-all shadow-2xs outline-none ${
              digit
                ? "border-[#111111] bg-[#FFFFFF] text-[#111111] ring-2 ring-[#111111]/10"
                : "border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] focus:border-[#C9A86A] focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#C9A86A]/20"
            } ${errorMessage ? "border-[#FF4D4F] bg-[#FF4D4F]/5 text-[#FF4D4F]" : ""}`}
          />
        ))}
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 p-3 bg-[#FF4D4F]/10 border border-[#FF4D4F]/20 rounded-xl text-xs font-semibold text-[#FF4D4F]"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timers & Resend Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-[#EFEFEA] text-xs">
        <div className="flex items-center gap-1.5 text-[#666666] font-medium">
          <Clock className="w-3.5 h-3.5 text-[#9A9A9A]" />
          <span>Code expires in: <strong className="text-[#111111]">{formatTime(expiryTimer)}</strong></span>
        </div>

        <button
          type="button"
          onClick={handleResendClick}
          disabled={resendTimer > 0 || isResending || isLoading}
          className="inline-flex items-center gap-1.5 font-bold text-[#C9A86A] hover:text-[#B89254] disabled:text-[#9A9A9A] transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
          <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}</span>
        </button>
      </div>

      {/* Manual Verify Button */}
      <button
        type="button"
        disabled={digits.some((d) => !d) || isLoading || isSuccess}
        onClick={() => handleAutoSubmit(digits.join(""))}
        className="w-full h-12 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Verifying Code...</span>
          </span>
        ) : isSuccess ? (
          <span className="inline-flex items-center gap-2 text-[#34C759] font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>OTP Verified!</span>
          </span>
        ) : (
          <span>Verify & Continue</span>
        )}
      </button>
    </div>
  );
}
