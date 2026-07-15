"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful login
    onSuccess();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                {isLogin ? "Welcome back" : "Create an account"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {isLogin
                  ? "Enter your details to sign in to your account"
                  : "Enter your details to create your Smart Bharat AI account"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="John Doe"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="+91 98765 43210"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-blue-600 hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
