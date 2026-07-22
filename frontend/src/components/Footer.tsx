"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
export function Footer() {
  const pathname = usePathname();
  if (["/ai", "/assistant", "/login", "/signup"].includes(pathname)) return null;

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-highest relative z-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-xl flex flex-col md:flex-row justify-between items-center gap-lg">
        <div className="flex items-center gap-2">
          <span className="font-display-lg text-body-lg font-bold text-on-surface">Smart Bharat AI</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">
          © 2024 Smart Bharat AI. An elite digital initiative.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-tertiary transition-all" href="/privacy">Privacy Policy</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-tertiary transition-all" href="/terms">Terms of Service</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-tertiary transition-all" href="/security">Security</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-tertiary transition-all" href="/framework">Intelligence Framework</Link>
          <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-tertiary transition-all" href="/standards">Global Standards</Link>
        </div>
      </div>
    </footer>
  );
}
