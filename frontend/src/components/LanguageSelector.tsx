"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/lib/i18n/translations";

export function LanguageSelector({ isMobile = false }: { isMobile?: boolean }) {
  const { language, setLanguage, languages, currentLanguageObj, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-2 p-3 bg-surface-container rounded-2xl border border-outline-variant/40">
        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">
          <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>{t("nav_change_language", "Select Language")}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-white font-semibold shadow-xs"
                    : "bg-white text-on-surface hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                <span className="truncate">{lang.displayLabel}</span>
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language option"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Language"
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-all duration-200 rounded-full bg-surface-container/80 hover:bg-primary/10 border border-outline-variant/50 hover:border-primary/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target-min"
      >
        <Globe className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
        <span className="max-w-[90px] truncate">{currentLanguageObj.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-60 py-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/80 z-[120] animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {t("nav_change_language", "Select Language")}
            </span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
              9 Languages
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto px-1 space-y-0.5">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  role="menuitem"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all ${
                    isSelected
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-[13px]">{lang.displayLabel}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
