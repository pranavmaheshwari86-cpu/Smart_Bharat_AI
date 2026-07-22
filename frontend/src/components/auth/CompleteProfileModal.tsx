"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Smartphone, ShieldCheck, ArrowRight, CheckCircle2, X } from "lucide-react";
import { OtpInput } from "./OtpInput";
import { authApi } from "@/lib/api/auth.api";

interface CompleteProfileModalProps {
  isOpen: boolean;
  userId: string;
  initialName?: string;
  initialEmail?: string;
  onCompleteSuccess: () => void;
  onClose: () => void;
}

export function CompleteProfileModal({
  isOpen,
  userId,
  initialName = "",
  initialEmail = "",
  onCompleteSuccess,
  onClose,
}: CompleteProfileModalProps) {
  const [fullName, setFullName] = useState(initialName);
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [debugOtp, setDebugOtp] = useState<string | undefined>();

  if (!isOpen) return null;

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMessage("Mobile number is mandatory.");
      return;
    }
    if (!acceptTerms) {
      setErrorMessage("You must accept the Terms of Service and Privacy Policy.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // 1. Submit Profile details
      await authApi.completeProfile({
        userId,
        fullName,
        phone,
        countryCode,
        acceptTerms,
      });

      // 2. Trigger Phone OTP
      const otpData = await authApi.sendPhoneOtp(phone, countryCode, "PHONE_VERIFICATION");

      if (otpData.debugOtp) {
        setDebugOtp(otpData.debugOtp);
      }

      setStep("OTP");
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      await authApi.verifyPhoneOtp(phone, otp, countryCode, "PHONE_VERIFICATION");
      onCompleteSuccess();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Invalid OTP code.");
      throw err;
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage("");
    const otpData = await authApi.sendPhoneOtp(phone, countryCode, "PHONE_VERIFICATION");
    if (otpData.debugOtp) {
      setDebugOtp(otpData.debugOtp);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#E8E8E5] rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#9A9A9A] hover:text-[#111111] transition-colors p-1 rounded-full hover:bg-[#F5F5F2]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#C9A86A]/10 border border-[#C9A86A]/20 text-[#C9A86A] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#111111]">
              {step === "DETAILS" ? "Complete Your Citizen Profile" : "Verify Mobile Number"}
            </h2>
            <p className="text-xs font-medium text-[#666666] mt-1">
              {step === "DETAILS"
                ? "First-time sign-in requires a verified mobile number for security."
                : `We sent a 6-digit OTP code to ${countryCode} ${phone}`}
            </p>
          </div>

          {step === "DETAILS" ? (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {initialEmail && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F2] border border-[#E8E8E5] text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                    <span className="font-semibold text-[#111111]">Google Email Verified:</span>
                  </div>
                  <span className="font-medium text-[#666666]">{initialEmail}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Pranav Maheshwari"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#E8E8E5] bg-[#F5F5F2] text-[#111111] text-sm font-medium focus:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/20 focus:border-[#C9A86A] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5">
                  Mobile Number (Mandatory)
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

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-[#E8E8E5] text-[#111111] focus:ring-[#C9A86A]"
                  />
                  <span className="text-xs font-semibold text-[#666666]">
                    I agree to the <a href="/terms" target="_blank" className="text-[#C9A86A] hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-[#C9A86A] hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {errorMessage && (
                <p className="text-xs font-semibold text-[#FF4D4F] bg-[#FF4D4F]/10 border border-[#FF4D4F]/20 rounded-xl p-3 text-center">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading || !phone || !acceptTerms}
                className="w-full h-12 rounded-xl bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending SMS OTP...</span>
                  </span>
                ) : (
                  <>
                    <span>Send SMS OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <OtpInput
              phone={`${countryCode} ${phone}`}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              isLoading={isLoading}
              errorMessage={errorMessage}
              debugOtp={debugOtp}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
