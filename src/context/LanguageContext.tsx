"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import hi from "../locales/hi.json";

type Locale = "hi" | "en";

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("hi");

  useEffect(() => {
    // Check URL query params (e.g. ?lang=hi)
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get("lang") as Locale;

    if (queryLang === "hi" || queryLang === "en") {
      setLocaleState(queryLang);
      localStorage.setItem("wedding-invite-lang", queryLang);
    } else {
      // Default to "hi" if no URL query param is present
      setLocaleState("hi");
      localStorage.setItem("wedding-invite-lang", "hi");
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("wedding-invite-lang", newLocale);

    // Dynamic URL search query update (SEO friendly, keeps scroll)
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLocale);
    window.history.pushState({}, "", url.toString());
  };

  const t = (key: string): string => {
    const dictionary = locale === "hi" ? hi : en;
    const parts = key.split(".");
    let current: any = dictionary;

    for (const part of parts) {
      if (current === undefined || current[part] === undefined) {
        return key;
      }
      current = current[part];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
