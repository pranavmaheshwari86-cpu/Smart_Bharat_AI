"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "@/lib/api/auth.api";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
  role: "CITIZEN" | "ADMIN";
  authProvider?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profileCompleted: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  pendingHref: string | null;
  checkAuth: () => Promise<void>;
  signInWithGoogle: (credential?: string, demoProfile?: any) => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (data: any) => Promise<any>;
  sendPhoneOtp: (phone: string, countryCode?: string, purpose?: string) => Promise<any>;
  verifyPhoneOtp: (phone: string, otp: string, countryCode?: string, purpose?: string) => Promise<any>;
  completeProfile: (data: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (data: any) => Promise<any>;
  signOut: () => Promise<void>;
  openAuthModal: (redirectTo?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const data = await authApi.getMe();
      if (data.authenticated && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signInWithGoogle = async (credential?: string, demoProfile?: any) => {
    const data = await authApi.googleSignIn(credential, demoProfile);
    if (data.profileCompleted && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
    return data;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const data = await authApi.emailLogin(email, password);
    if (data.profileCompleted && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
    return data;
  };

  const signUpWithEmail = async (formData: any) => {
    return authApi.emailRegister(formData);
  };

  const sendPhoneOtp = async (phone: string, countryCode = "+91", purpose = "PHONE_VERIFICATION") => {
    return authApi.sendPhoneOtp(phone, countryCode, purpose);
  };

  const verifyPhoneOtp = async (phone: string, otp: string, countryCode = "+91", purpose = "PHONE_VERIFICATION") => {
    const data = await authApi.verifyPhoneOtp(phone, otp, countryCode, purpose);
    if (data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
    return data;
  };

  const completeProfile = async (profileData: any) => {
    return authApi.completeProfile(profileData);
  };

  const forgotPassword = async (email: string) => {
    return authApi.forgotPassword(email);
  };

  const resetPassword = async (resetData: any) => {
    return authApi.resetPassword(resetData);
  };

  const signOut = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const openAuthModal = useCallback((redirectTo?: string) => {
    setPendingHref(redirectTo ?? null);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPendingHref(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAuthModalOpen,
        pendingHref,
        checkAuth,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPhoneOtp,
        verifyPhoneOtp,
        completeProfile,
        forgotPassword,
        resetPassword,
        signOut,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
