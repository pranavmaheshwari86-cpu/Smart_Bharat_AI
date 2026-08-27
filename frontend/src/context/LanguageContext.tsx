"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LanguageCode, LANGUAGES, LanguageOption, TRANSLATIONS } from "@/lib/i18n/translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  currentLanguageObj: LanguageOption;
  languages: LanguageOption[];
}

const STORAGE_KEY = "smart_bharat_selected_language";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (savedLang && LANGUAGES.some((l) => l.code === savedLang)) {
        setLanguageState(savedLang);
        updateHtmlLangAttribute(savedLang);
      } else {
        updateHtmlLangAttribute("en");
      }
    } catch (e) {
      console.error("Failed to load saved language:", e);
    }
  }, []);

  const updateHtmlLangAttribute = (code: LanguageCode) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
      const langObj = LANGUAGES.find((l) => l.code === code);
      if (langObj?.dir === "rtl") {
        document.documentElement.setAttribute("dir", "rtl");
      } else {
        document.documentElement.removeAttribute("dir");
      }
    }
  };

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    updateHtmlLangAttribute(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      console.error("Failed to save language choice:", e);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const currentLanguageObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language: mounted ? language : "en",
        setLanguage,
        t,
        currentLanguageObj,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
