"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();


  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-full bg-white/75 backdrop-blur-[24px] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08),inset_0_2px_8px_rgba(255,255,255,0.9)] supports-[backdrop-filter]:bg-white/60 z-[100] flex justify-between items-center px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              assured_workload
            </span>
            <span className="font-display-lg text-body-lg font-bold tracking-tight text-on-surface">
              Smart Bharat AI
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {[
            { name: "Dashboard", href: "/" },
            { name: "Schemes", href: "/schemes" },
            { name: "IDs", href: "/id" },
            { name: "Complaints", href: "/complaints" },
            { name: "Assistant", href: "/ai" },
            { name: "Your Credentials", href: "/credentials" },
          ].map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`font-label-md text-label-md transition-all duration-300 px-4 py-2 relative rounded-full ${
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-underline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden md:block text-on-surface font-label-md text-label-md hover:text-primary transition-colors"
            >
              Sign In
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="hidden md:block text-on-surface font-label-md text-label-md hover:text-primary transition-colors"
            >
              Sign Out
            </button>
          )}
          <button className="bg-primary hover:bg-primary/90 text-white font-label-md text-label-md px-5 py-2 rounded-full transition-all hover:shadow-apple-sm">
            Get Started
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthenticated(true)}
      />
    </>
  );
}
