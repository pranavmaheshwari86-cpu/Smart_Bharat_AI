"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";

const PUBLIC_ROUTES = [
  "/",
  "/signup",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

const NAV_LINKS = [
  { name: "Dashboard", href: "/" },
  { name: "Schemes", href: "/schemes" },
  { name: "IDs", href: "/id" },
  { name: "Complaints", href: "/complaints" },
  { name: "Assistant", href: "/ai" },
  { name: "Your Credentials", href: "/credentials" },
];

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Hide Navbar on authentication & recovery pages
  if (AUTH_ROUTES.includes(pathname)) {
    return null;
  }

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!PUBLIC_ROUTES.includes(href) && !isAuthenticated) {
      e.preventDefault();
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
    }
  };

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
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
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

        {/* Right: Auth Controls */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="hidden md:block text-on-surface font-label-md text-label-md hover:text-primary transition-colors px-3 py-1.5"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary hover:bg-primary/90 text-white font-label-md text-label-md px-5 py-2 rounded-full transition-all hover:shadow-apple-sm"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* User Profile Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container border border-outline-variant/50 rounded-full">
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.fullName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="text-xs font-semibold text-on-surface max-w-[120px] truncate">
                  {user?.fullName || "Citizen"}
                </span>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-error transition-colors px-3 py-1.5 rounded-full hover:bg-error/10 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
