"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "@/lib/api/auth.api";
import {
  sendOTP,
  verifyOTP,
  logoutFirebase,
  listenForAuthChanges,
  FirebaseAuthUser,
  signInWithGooglePopup,
} from "@/lib/auth";
import { getUserDisplayName } from "@/lib/utils";

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
  firebaseUser: FirebaseAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  pendingHref: string | null;
  checkAuth: () => Promise<void>;
  signInWithGoogle: (credential?: string, demoProfile?: any) => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (data: any) => Promise<any>;
  sendPhoneOtp: (phone: string, countryCode?: string, verifier?: any) => Promise<any>;
  verifyPhoneOtp: (phone: string, otp: string, confirmationResult?: any, purpose?: string, userEmail?: string) => Promise<any>;
  completeProfile: (data: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (data: any) => Promise<any>;
  signOut: () => Promise<void>;
  openAuthModal: (redirectTo?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "smart_bharat_active_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const persistUserSession = (userObj: UserProfile) => {
    setUser(userObj);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
    } catch {}
  };

  const clearUserSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const checkAuth = useCallback(async () => {
    try {
      const data = await authApi.getMe();
      if (data.authenticated && data.user) {
        const userObj: UserProfile = {
          ...data.user,
          fullName: getUserDisplayName(data.user),
        };
        persistUserSession(userObj);
      } else if (firebaseUser) {
        const email = firebaseUser.email || `${firebaseUser.phoneNumber || "user"}@smartbharat.gov.in`;
        const fbProfile: UserProfile = {
          id: firebaseUser.uid,
          fullName: getUserDisplayName({ fullName: firebaseUser.displayName || "", email }),
          email,
          phone: firebaseUser.phoneNumber || undefined,
          profilePhoto: firebaseUser.photoURL || undefined,
          role: "CITIZEN",
          authProvider: "firebase_phone",
          emailVerified: Boolean(firebaseUser.email),
          phoneVerified: Boolean(firebaseUser.phoneNumber),
          profileCompleted: true,
        };
        persistUserSession(fbProfile);
      } else {
        // If backend explicitly says not authenticated and no localStorage fallback
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          clearUserSession();
        }
      }
    } catch {
      // Offline fallback to persisted local session
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.id) {
            setUser(parsed);
            setIsAuthenticated(true);
          }
        } catch {}
      }
    } finally {
      setIsLoading(false);
    }
  }, [firebaseUser]);

  // Initial client-side session hydration + backend check
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          setUser(parsed);
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      }
    } catch {}

    checkAuth();
  }, [checkAuth]);

  // Subscribe to Firebase Auth State Changes
  useEffect(() => {
    const unsubscribe = listenForAuthChanges((fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const email = fbUser.email || `${fbUser.phoneNumber || "user"}@smartbharat.gov.in`;
        const fbProfile: UserProfile = {
          id: fbUser.uid,
          fullName: getUserDisplayName({ fullName: fbUser.displayName || "", email }),
          email,
          phone: fbUser.phoneNumber || undefined,
          profilePhoto: fbUser.photoURL || undefined,
          role: "CITIZEN",
          authProvider: "firebase_phone",
          emailVerified: Boolean(fbUser.email),
          phoneVerified: Boolean(fbUser.phoneNumber),
          profileCompleted: true,
        };
        persistUserSession(fbProfile);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (credential?: string, demoProfile?: any) => {
    if (!credential) {
      const result = await signInWithGooglePopup();
      if (result.cancelled) {
        return { profileCompleted: false, cancelled: true };
      }
      if (!result.success || !result.user) {
        throw new Error(result.error || "Google sign-in failed.");
      }

      const fbUser = result.user;
      const email = fbUser.email || "";
      const fbProfile: UserProfile = {
        id: fbUser.uid,
        fullName: getUserDisplayName({ fullName: fbUser.displayName || "", email }),
        email: email || `${fbUser.uid}@smartbharat.gov.in`,
        phone: fbUser.phoneNumber || undefined,
        profilePhoto: fbUser.photoURL || undefined,
        role: "CITIZEN",
        authProvider: "google",
        emailVerified: Boolean(fbUser.email),
        phoneVerified: Boolean(fbUser.phoneNumber),
        profileCompleted: true,
      };
      persistUserSession(fbProfile);
      return { profileCompleted: true, user: fbProfile };
    }

    const data = await authApi.googleSignIn(credential, demoProfile);
    if (data.user) {
      const userObj = {
        ...data.user,
        fullName: getUserDisplayName(data.user),
      };
      persistUserSession(userObj);
    }
    return data;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const data = await authApi.emailLogin(email, password);
    if (data.user) {
      const userObj = {
        ...data.user,
        fullName: getUserDisplayName(data.user),
      };
      persistUserSession(userObj);
    }
    return data;
  };

  const signUpWithEmail = async (formData: any) => {
    const data = await authApi.emailRegister(formData);
    if (data.user) {
      const userObj = {
        ...data.user,
        fullName: getUserDisplayName(data.user),
      };
      persistUserSession(userObj);
    } else {
      try {
        const loginData = await authApi.emailLogin(formData.email, formData.password);
        if (loginData.user) {
          const userObj = {
            ...loginData.user,
            fullName: getUserDisplayName(loginData.user),
          };
          persistUserSession(userObj);
        }
      } catch {}
    }
    return data;
  };

  const sendPhoneOtp = async (phone: string, countryCode = "+91", verifier?: any) => {
    const result = await sendOTP(phone, verifier);
    return result;
  };

  const verifyPhoneOtp = async (phone: string, otp: string, confirmationResult?: any, purpose?: string, userEmail?: string) => {
    const validConfResult = (typeof confirmationResult === "object" && confirmationResult !== null && "confirm" in confirmationResult) ? confirmationResult : null;
    const result = await verifyOTP(validConfResult, otp);
    if (result.success && result.user) {
      const finalEmail = userEmail || result.user.email || `${phone}@smartbharat.gov.in`;
      const fbProfile: UserProfile = {
        id: result.user.uid,
        fullName: getUserDisplayName({ fullName: result.user.displayName || "", email: finalEmail }),
        email: finalEmail,
        phone: result.user.phoneNumber || phone,
        role: "CITIZEN",
        authProvider: "firebase_phone",
        emailVerified: false,
        phoneVerified: true,
        profileCompleted: true,
      };
      persistUserSession(fbProfile);
      return { success: true, user: fbProfile };
    }
    return result;
  };

  const completeProfile = async (formData: any) => {
    const data = await authApi.completeProfile(formData);
    if (data.user) {
      const userObj = {
        ...data.user,
        fullName: getUserDisplayName(data.user),
      };
      persistUserSession(userObj);
    }
    return data;
  };

  const forgotPassword = async (email: string) => {
    return authApi.forgotPassword(email);
  };

  const resetPassword = async (formData: any) => {
    return authApi.resetPassword(formData);
  };

  const signOut = async () => {
    try {
      await logoutFirebase();
      await authApi.logout().catch(() => {});
    } finally {
      clearUserSession();
      setFirebaseUser(null);
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
        firebaseUser,
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
