"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Fingerprint, Key, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthStep = "method" | "aadhaar" | "otp" | "success";

export default function Login() {
  const [step, setStep] = useState<AuthStep>("method");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = (nextStep: AuthStep) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
      if (nextStep === "success") {
        setTimeout(() => {
          router.push("/vault");
        }, 1500);
      }
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 mb-6">
          <Shield className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl mb-4 font-heading">Secure Sign In</h1>
        <p className="text-lg text-muted-foreground font-body">
          Access your digital identity and government services securely via Aadhaar e-Pramaan.
        </p>
      </motion.div>

      <div className="premium-card p-8 border border-border/50 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <button
                onClick={() => setStep("aadhaar")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-500/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-100 dark:bg-brand-500/20 text-brand-600 rounded-lg">
                    <Fingerprint className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-foreground font-heading">Aadhaar Verification</h3>
                    <p className="text-sm text-muted-foreground font-body">Sign in using Aadhaar + OTP</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand-600 transition-colors" />
              </button>

              <button
                className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted text-muted-foreground rounded-lg">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-foreground font-heading">DigiLocker</h3>
                    <p className="text-sm text-muted-foreground font-body">Under maintenance</p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {step === "aadhaar" && (
            <motion.div
              key="aadhaar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Fingerprint className="h-10 w-10 text-brand-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl font-heading">Enter Aadhaar Number</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="XXXX-XXXX-XXXX"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  className="w-full h-14 text-center text-lg tracking-widest font-mono rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
              <button
                onClick={() => handleNext("otp")}
                disabled={isLoading || aadhaarNumber.length < 12}
                className="w-full h-14 rounded-xl bg-foreground text-background font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50 font-body flex items-center justify-center gap-2"
              >
                {isLoading ? "Verifying..." : "Generate OTP"}
              </button>
              <button onClick={() => setStep("method")} className="w-full text-sm font-semibold text-muted-foreground hover:text-foreground pt-2">
                Back to methods
              </button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Key className="h-10 w-10 text-brand-600 mx-auto mb-4" />
                <h3 className="font-bold text-xl font-heading">Enter OTP</h3>
                <p className="text-sm text-muted-foreground mt-2">Sent to registered mobile ending in ****1234</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full h-14 text-center text-2xl tracking-[0.5em] font-mono rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
              <button
                onClick={() => handleNext("success")}
                disabled={isLoading || otp.length !== 6}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold hover:shadow-lg hover:shadow-brand-500/25 transition-all disabled:opacity-50 font-body flex items-center justify-center gap-2"
              >
                {isLoading ? "Authenticating..." : "Secure Login"}
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-8"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="mx-auto w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="h-10 w-10" />
              </motion.div>
              <h3 className="font-bold text-2xl font-heading text-foreground">Authentication Successful</h3>
              <p className="text-muted-foreground font-body">Redirecting to your secure vault...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground font-body">
        <p>Protected by end-to-end encryption and Aadhaar SSO.</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          <Shield className="h-3 w-3" /> ISO 27001 Certified Security
        </p>
      </div>
    </div>
  );
}
