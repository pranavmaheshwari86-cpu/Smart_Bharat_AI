"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { getUserDisplayName } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];
const PUBLIC_ROUTES = ["/", "/schemes", "/id", "/complaints", "/assistant", "/credentials", "/signup", "/login", "/forgot-password", "/reset-password", "/privacy", "/terms"];

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t("nav_dashboard", "Dashboard"), href: "/" },
    { name: t("nav_schemes", "Schemes"), href: "/schemes" },
    { name: t("nav_ids", "IDs"), href: "/id" },
    { name: t("nav_complaints", "Complaints"), href: "/complaints" },
    { name: t("nav_assistant", "Assistant"), href: "/assistant" },
    { name: t("nav_credentials", "Credentials"), href: "/credentials" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  if (AUTH_ROUTES.includes(pathname)) return null;

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    if (!PUBLIC_ROUTES.includes(href) && !isAuthenticated) {
      e.preventDefault();
      router.push(`/login?redirect=${encodeURIComponent(href)}`);
    }
  };

  const isUserLoggedIn = mounted && isAuthenticated;

  return (
    <>
      <header suppressHydrationWarning className="fixed top-0 left-0 right-0 w-full z-[100] bg-white/80 backdrop-blur-[24px] border-b border-surface-container-highest/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/70 pt-safe">
        <nav
          suppressHydrationWarning
          aria-label="Main Navigation"
          className="w-full h-16 max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 relative"
        >
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0" suppressHydrationWarning>
            <Link
              href="/"
              prefetch={true}
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full px-2 py-1.5 touch-target-min"
              aria-label="Smart Bharat AI Homepage"
              suppressHydrationWarning
            >
              <Image
                src="/logo.png"
                alt="Smart Bharat AI Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded-full shadow-xs"
                priority
              />
              <span className="font-display-lg text-lg sm:text-body-lg font-bold tracking-tight text-on-surface whitespace-nowrap">
                Smart Bharat AI
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 flex-1 mx-2 lg:mx-4">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-label-md text-label-md transition-all duration-200 px-3.5 py-2 relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target-min ${
                    isActive
                      ? "text-primary font-semibold bg-primary/5"
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

          {/* Right: Auth Controls, Sign Out & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0" suppressHydrationWarning>
            {!isUserLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  prefetch={true}
                  className="text-on-surface font-label-md text-label-md hover:text-primary transition-colors px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-full touch-target-min"
                >
                  {t("nav_signin", "Sign In")}
                </Link>
                <Link
                  href="/signup"
                  prefetch={true}
                  className="bg-primary hover:bg-primary/90 text-white font-label-md text-label-md px-5 py-2.5 rounded-full transition-all hover:shadow-apple-sm focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target-min"
                >
                  {t("nav_signup", "Get Started")}
                </Link>
                {/* Change language option on right side */}
                <LanguageSelector />
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                {/* User Profile Badge */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high border border-outline-variant/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target-min"
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
                  <span className="text-xs font-semibold text-on-surface max-w-[110px] xl:max-w-[140px] truncate">
                    {getUserDisplayName(user)}
                  </span>
                </Link>

                {/* Sign Out Button */}
                <button
                  onClick={() => signOut()}
                  aria-label={t("nav_signout", "Sign Out")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-error transition-colors px-3 py-2 rounded-full hover:bg-error/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-error/40 touch-target-min"
                  title={t("nav_signout", "Sign Out")}
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  <span>{t("nav_signout", "Sign Out")}</span>
                </button>

                {/* Change language option placed on the right side of the Sign Out button */}
                <LanguageSelector />
              </div>
            )}

            {/* Mobile Hamburger Toggle Button - strictly hidden on laptops/desktops */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="mobile-only-control p-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target-min"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Out Drawer Navigation - strictly hidden on laptops/desktops */}
      <div
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 z-[90] mobile-only-control transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Slide-Out Drawer Panel */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between pt-20 pb-safe px-6 overflow-y-auto transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6">
            {/* User Profile Header in Drawer if Logged In */}
            {isUserLoggedIn && (
              <div className="flex items-center gap-3 p-3 bg-surface-container rounded-2xl border border-outline-variant/40">
                {user?.profilePhoto ? (
                  <Image
                    src={user.profilePhoto}
                    alt={getUserDisplayName(user)}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-on-surface truncate">{getUserDisplayName(user)}</span>
                  <span className="text-xs text-on-surface-variant truncate">{user?.email}</span>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links List */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-3 mb-1">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={true}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-label-md text-base transition-colors ${
                      isActive
                        ? "bg-primary text-white font-semibold shadow-sm"
                        : "text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-on-surface-variant"}`} />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Language Selector */}
            <div className="mt-2">
              <LanguageSelector isMobile={true} />
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
            {!isUserLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 text-on-surface font-label-md text-sm border border-slate-300 rounded-full hover:bg-slate-50 transition-colors"
                >
                  {t("nav_signin", "Sign In")}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-primary text-white font-label-md text-sm rounded-full shadow-md hover:bg-primary/90 transition-colors"
                >
                  {t("nav_signup", "Get Started")}
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-error font-semibold text-sm bg-error/10 hover:bg-error/20 rounded-full transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("nav_signout", "Sign Out")}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

