"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useAudio } from "@/context/AudioContext";
import { useTranslation } from "@/context/LanguageContext";
import { Menu, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isPlaying, togglePlay } = useAudio();
  const { t, locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { label: t("nav.welcome"), href: "#welcome" },
    { label: t("nav.story"),   href: "#story"   },
    { label: t("nav.couple"),  href: "#couple"  },
    { label: t("nav.events"),  href: "#events"  },
    { label: t("nav.venue"),   href: "#venue"   },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.rsvp"),    href: "#rsvp"    },
  ], [t]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2.5 bg-[#FFFDF8]/90 backdrop-blur-md shadow-md border-b border-[#D4AF37]/15"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-14">

          {/* Brand Emblem */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 relative flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]"
            >
              <div className="absolute inset-0 rounded-full bg-[#E8B04A]/10 opacity-30 animate-pulse" />
              <img
                src="/assets/ganesha.webp"
                alt="Ganesha Emblem"
                className="w-8 h-8 object-contain relative z-10"
              />
            </motion.div>
            <span className="font-display tracking-[0.12em] text-[#D4AF37] text-sm md:text-base font-bold flex items-center gap-1 select-none">
              <span>D</span>
              <Heart className="h-3 w-3 text-[#D8A28C] fill-[#D8A28C] animate-pulse" />
              <span>C</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-serif text-[10px] tracking-[0.2em] text-[#5A4634] uppercase font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                className="hover:text-[#D4AF37] transition-colors relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Language Toggle */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-white/60 shadow-sm font-serif text-[9px] md:text-[10px] tracking-wider font-semibold">
              <button
                onClick={() => setLocale("en")}
                className={`transition-all duration-300 focus:outline-none cursor-pointer hover:text-[#D4AF37] ${
                  locale === "en" ? "text-[#D4AF37] font-bold" : "text-[#5A4634]/60 font-light"
                }`}
              >EN</button>
              <span className="text-[#D4AF37]/40 font-normal">|</span>
              <button
                onClick={() => setLocale("hi")}
                className={`transition-all duration-300 focus:outline-none cursor-pointer hover:text-[#D4AF37] ${
                  locale === "hi" ? "text-[#D4AF37] font-bold" : "text-[#5A4634]/60 font-light"
                }`}
              >हिन्दी</button>
            </div>

            {/* ── Music Icon Button (single, clean) ── */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Music" : "Play Music"}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `1.5px solid ${isPlaying ? "rgba(232,176,74,0.6)" : "rgba(212,175,55,0.3)"}`,
                background: isPlaying ? "rgba(232,176,74,0.12)" : "rgba(255,255,255,0.7)",
                boxShadow: isPlaying ? "0 0 12px rgba(212,175,55,0.25)" : "0 1px 4px rgba(0,0,0,0.06)",
                cursor: "pointer",
                outline: "none",
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            >
              {/* Ping rings when playing */}
              {isPlaying && (
                <>
                  <span style={{
                    position: "absolute", inset: -3, borderRadius: "50%",
                    border: "1px solid rgba(232,176,74,0.35)",
                    animation: "ping 1.8s ease-out infinite",
                  }} />
                  <span style={{
                    position: "absolute", inset: -7, borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.18)",
                    animation: "ping 2.6s ease-out infinite 0.4s",
                  }} />
                </>
              )}

              {/* Equalizer (playing) */}
              {isPlaying ? (
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14, width: 14 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: 3, height: "100%", borderRadius: 2,
                      background: "#C9912E",
                      transformOrigin: "bottom",
                      animation: `bounceWave 1.1s ease-in-out infinite`,
                      animationDelay: `${i * 0.16}s`,
                      display: "block",
                    }} />
                  ))}
                </div>
              ) : (
                /* Music note icon (paused) */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9912E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              )}
            </button>

            {/* Hamburger (mobile/tablet only) — shows Menu icon always, no X */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 bg-white/60 text-[#5A4634] focus:outline-none cursor-pointer transition-all"
              aria-label="Toggle Navigation Menu"
              style={{ width: 36, height: 36, flexShrink: 0 }}
            >
              {/* Animated hamburger → X lines */}
              <div style={{ width: 16, height: 12, position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "block", height: 1.5, background: "#5A4634", borderRadius: 2, transformOrigin: "center" }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "block", height: 1.5, background: "#5A4634", borderRadius: 2 }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "block", height: 1.5, background: "#5A4634", borderRadius: 2, transformOrigin: "center" }}
                />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* ── Backdrop (click outside to close) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 39,
              background: "rgba(26, 8, 5, 0.45)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              cursor: "pointer",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile Drawer (no close button inside) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-[260px] bg-[#FFFDF8]/97 backdrop-blur-xl border-l border-[#D4AF37]/15 shadow-2xl flex flex-col justify-between"
            style={{ paddingTop: "5rem", paddingBottom: "2rem", paddingInline: "1.75rem" }}
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.055, type: "spring", stiffness: 200, damping: 22 }}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-[#D4AF37]/08 hover:text-[#D4AF37] transition-all border-b border-[#D4AF37]/08 font-serif text-[11px] tracking-[0.22em] text-[#5A4634] uppercase font-semibold group"
                >
                  <span className="w-1 h-4 rounded-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/70 transition-colors" />
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom Brand */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-center pt-5 border-t border-[#D4AF37]/12"
            >
              <p className="font-sans text-[8px] tracking-widest text-[#5A4634]/50 uppercase">
                {t("couple.groom.name").split(" ")[0]} &amp; {t("couple.bride.name").split(" ")[0]}
              </p>
              <p className="font-serif italic text-[10px] text-[#D4AF37] mt-1">
                Palamu Jharkhand Wedding
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes */}
      <style>{`
        @keyframes bounceWave {
          0%, 100% { transform: scaleY(0.2); }
          50%       { transform: scaleY(1);   }
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </>
  );
}
