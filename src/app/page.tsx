"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import BrideGroom from "@/components/BrideGroom";
import LoveStory from "@/components/LoveStory";
import Events from "@/components/Events";
import Countdown from "@/components/Countdown";
import Venue from "@/components/Venue";
import Family from "@/components/Family";
import Gallery from "@/components/Gallery";
import Wishes from "@/components/Wishes";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";
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
            {/* Chapter Bridge */}
            <Welcome />
            {/* Chapter 3: The Couple */}
            <BrideGroom />
            {/* Chapter 4: Wedding Celebrations */}
            <Events />
            {/* Chapter 5: Family Blessings */}
            <Family />
            {/* Chapter 6: Countdown */}
            <Countdown />
            {/* Chapter 7: Gallery */}
            <Gallery />
            {/* Chapter 8: Venue */}
            <Venue />
            {/* Chapter 9: Their Story */}
            <LoveStory />
            {/* Guest Wishes */}
            <Wishes />
            {/* Chapter 10: RSVP */}
            <RSVP />
            {/* Chapter 11: Final Blessings */}
            <Footer />
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
