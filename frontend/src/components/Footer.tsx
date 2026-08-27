"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import Image from "next/image";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  if (["/ai", "/assistant", "/login", "/signup"].includes(pathname)) return null;

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-highest relative z-10 pb-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Smart Bharat AI Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain rounded-full"
          />
          <span className="font-display-lg text-lg font-bold text-on-surface">Smart Bharat AI</span>
        </div>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant text-center md:text-left">
          © 2026 Smart Bharat AI. {t("footer_tagline", "An elite digital initiative.")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1.5 px-2 touch-target-min" href="/privacy">{t("footer_privacy", "Privacy Policy")}</Link>
          <Link className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1.5 px-2 touch-target-min" href="/terms">{t("footer_terms", "Terms of Service")}</Link>
          <Link className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1.5 px-2 touch-target-min" href="/security">Security</Link>
          <Link className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1.5 px-2 touch-target-min" href="/framework">Intelligence Framework</Link>
          <Link className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1.5 px-2 touch-target-min" href="/standards">Global Standards</Link>
        </div>
      </div>
    </footer>
  );
}

