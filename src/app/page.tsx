"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Hero from "@/components/Hero";
import LazySection from "@/components/LazySection";

// Dynamically import below-the-fold components to reduce initial bundle size and split chunks
const Welcome = dynamic(() => import("@/components/Welcome"), { ssr: false });
const BrideGroom = dynamic(() => import("@/components/BrideGroom"), { ssr: false });
const LoveStory = dynamic(() => import("@/components/LoveStory"), { ssr: false });
const Events = dynamic(() => import("@/components/Events"), { ssr: false });
const Countdown = dynamic(() => import("@/components/Countdown"), { ssr: false });
const Venue = dynamic(() => import("@/components/Venue"), { ssr: false });
const Family = dynamic(() => import("@/components/Family"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });
const Wishes = dynamic(() => import("@/components/Wishes"), { ssr: false });
const RSVP = dynamic(() => import("@/components/RSVP"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

// Keys that trigger scrolling — blocked while doors are closed
const SCROLL_KEYS = new Set([
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  " ", "PageUp", "PageDown", "Home", "End",
]);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // Nav & scrolling are locked until palace doors finish opening
  const [showNav, setShowNav] = useState(false);
  const lenis = useLenis();

  /* ── Scroll Lock ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (showNav) {
      // Doors fully open → restore everything
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    } else {
      // Loading or gate phase → hard-lock scroll
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      lenis?.stop();
    }
  }, [showNav, lenis]);

  /* ── Keyboard Scroll Block ───────────────────────────────────────────── */
  useEffect(() => {
    if (showNav) return; // unlocked — do nothing

    const blockKeys = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", blockKeys, { passive: false });
    return () => window.removeEventListener("keydown", blockKeys);
  }, [showNav]);

  /* ── Touch Scroll Block ──────────────────────────────────────────────── */
  useEffect(() => {
    if (showNav) return;

    const blockTouch = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", blockTouch, { passive: false });
    return () => document.removeEventListener("touchmove", blockTouch);
  }, [showNav]);

  const handleDoorsOpen = () => setShowNav(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--background)", paddingBottom: "env(safe-area-inset-bottom, 80px)" }}>

          {/* Navbar — slides in from top only after doors fully open */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                key="navbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>

          <main>
            {/* Chapter 1 + 2: Divine Ganesha + Royal Gates */}
            <Hero onDoorsOpen={handleDoorsOpen} />
            
            {/* Below-the-fold content wrapped in LazySection placeholders */}
            
            {/* Chapter Bridge */}
            <LazySection height="600px">
              <Welcome />
            </LazySection>
            
            {/* Chapter 3: The Couple */}
            <LazySection height="900px">
              <BrideGroom />
            </LazySection>
            
            {/* Chapter 4: Wedding Celebrations */}
            <LazySection height="900px">
              <Events />
            </LazySection>
            
            {/* Chapter 5: Family Blessings */}
            <LazySection height="900px">
              <Family />
            </LazySection>
            
            {/* Chapter 6: Countdown */}
            <LazySection height="600px">
              <Countdown />
            </LazySection>
            
            {/* Chapter 7: Gallery */}
            <LazySection height="800px">
              <Gallery />
            </LazySection>
            
            {/* Chapter 8: Venue */}
            <LazySection height="700px">
              <Venue />
            </LazySection>
            
            {/* Chapter 9: Their Story */}
            <LazySection height="1000px">
              <LoveStory />
            </LazySection>
            
            {/* Guest Wishes */}
            <LazySection height="900px">
              <Wishes />
            </LazySection>
            
            {/* Chapter 10: RSVP */}
            <LazySection height="800px">
              <RSVP />
            </LazySection>
            
            {/* Chapter 11: Final Blessings */}
            <LazySection height="800px">
              <Footer />
            </LazySection>
          </main>

          {/* Mobile bottom nav — fades in after doors open */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                key="mobilenav"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              >
                <MobileNav />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}

