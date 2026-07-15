"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X, User, Globe, Sparkles } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/schemes", label: "Schemes" },
  { href: "/id", label: "Apply for Government IDs" },
  { href: "/complaints", label: "Complaints" },
  { href: "/ai", label: "Assistant", icon: Sparkles },
  { href: "/credentials", label: "Credentials" },
];

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/schemes") return null;

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-neutral-950/70 backdrop-blur-xl backdrop-saturate-150">
        <header className="mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* ── Logo ── */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-ring rounded-md"
              aria-label="Smart Bharat AI Home"
            >
              <span className="font-semibold text-[15px] text-neutral-100 tracking-tight hidden sm:block">
                Dashboard
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200 focus-ring",
                      isActive
                        ? "text-neutral-50 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">
            {/* Language */}
            <div className="hidden md:flex items-center gap-1.5 text-neutral-500">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <select
                className="bg-transparent text-[13px] font-medium cursor-pointer hover:text-neutral-300 transition-colors focus-ring rounded-sm [&>option]:bg-neutral-900 [&>option]:text-neutral-100"
                aria-label="Language"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.06] transition-all focus-ring"
                    aria-label="Notifications"
                    aria-expanded={showNotifications}
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </button>

                  {showNotifications && (
                    <div
                      className="absolute right-0 mt-2 w-80 rounded-xl border border-neutral-800 bg-neutral-900/95 backdrop-blur-xl p-4 shadow-2xl"
                      role="dialog"
                      aria-label="Notifications"
                    >
                      <h4 className="text-sm font-semibold text-neutral-100 mb-3">Notifications</h4>
                      <div className="flex gap-3 text-[13px]">
                        <div className="h-1.5 w-1.5 mt-1.5 shrink-0 rounded-full bg-brand-500" />
                        <p className="text-neutral-400">
                          <strong className="text-neutral-200 font-medium">Passport Application</strong>{" "}
                          has been approved.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <Link
                  href="/profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.1] transition-all focus-ring"
                  aria-label="Profile"
                >
                  <User className="h-4 w-4 text-neutral-400" />
                </Link>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-3 py-1.5 text-[13px] font-medium text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04] rounded-md transition-all focus-ring"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:inline-flex premium-button-primary !px-4 !py-1.5"
              >
                Sign In
              </button>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 hover:bg-white/[0.06] transition-all focus-ring"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-white/[0.06] bg-neutral-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-neutral-50 bg-white/[0.08]"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {link.label}
                </Link>
              );
            })}
            {!isAuthenticated && (
              <button
                onClick={() => { setIsAuthModalOpen(true); setMobileOpen(false); }}
                className="w-full mt-2 px-4 py-2.5 text-sm font-medium bg-white text-neutral-950 rounded-lg hover:bg-neutral-200 transition-all"
              >
                Sign In
              </button>
            )}
          </nav>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthenticated(true)}
      />
    </>
  );
}
