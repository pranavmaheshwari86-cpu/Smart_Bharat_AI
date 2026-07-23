"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { getUserDisplayName } from "@/lib/utils";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];
const PUBLIC_ROUTES = ["/", "/signup", "/login", "/forgot-password", "/reset-password", "/privacy", "/terms"];

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (AUTH_ROUTES.includes(pathname)) return null;

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!PUBLIC_ROUTES.includes(href) && !isAuthenticated) {
      e.preventDefault();
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
    }
  };

  const isUserLoggedIn = mounted && isAuthenticated;

  return (
    <header suppressHydrationWarning className="fixed top-0 left-0 right-0 w-full z-[100] bg-white/75 backdrop-blur-[24px] border-b border-surface-container-highest/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/65">
      <nav
        suppressHydrationWarning
        aria-label="Main Navigation"
        className="w-full h-16 flex justify-between items-center px-6 md:px-10 relative"
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full px-2 py-1"
            aria-label="Smart Bharat AI Homepage"
          >
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
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
                prefetch={true}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-label-md text-label-md transition-all duration-300 px-4 py-2 relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Right: Auth Controls */}
        <div className="flex items-center gap-3">
          {!isUserLoggedIn ? (
            <>
              <Link
                href="/login"
                prefetch={true}
                className="hidden md:block text-on-surface font-label-md text-label-md hover:text-primary transition-colors px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                prefetch={true}
                className="bg-primary hover:bg-primary/90 text-white font-label-md text-label-md px-5 py-2 rounded-full transition-all hover:shadow-apple-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* User Profile Badge */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 bg-surface-container border border-outline-variant/50 rounded-full cursor-default"
                title={user?.email ? `${getUserDisplayName(user)} (${user.email})` : getUserDisplayName(user)}
              >
                {user?.profilePhoto ? (
                  <Image
                    src={user.profilePhoto}
                    alt={getUserDisplayName(user)}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center" aria-hidden="true">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="text-xs font-semibold text-on-surface max-w-[130px] truncate">
                  {getUserDisplayName(user)}
                </span>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={() => signOut()}
                aria-label="Sign Out"
                className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-error transition-colors px-3 py-1.5 rounded-full hover:bg-error/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-error/40"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
