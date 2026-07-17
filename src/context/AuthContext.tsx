"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  pendingHref: string | null;
  signIn: () => void;
  signOut: () => void;
  openAuthModal: (redirectTo?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const signIn = useCallback(() => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setPendingHref(null);
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

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
        isAuthenticated,
        isAuthModalOpen,
        pendingHref,
        signIn,
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
