"use client";

import { useState, useEffect, useCallback } from "react";
import { useAudio } from "@/context/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

interface LoadingScreenProps {
  onComplete: () => void;
}

const PETALS = [
  { left: "4%",  delay: 0,   dur: 7.5, size: 14, drift:  20 },
  { left: "12%", delay: 1.3, dur: 8,   size: 11, drift: -30 },
  { left: "19%", delay: 0.5, dur: 6.5, size: 17, drift:  35 },
  { left: "27%", delay: 2.1, dur: 9,   size: 13, drift: -20 },
  { left: "35%", delay: 0.8, dur: 7,   size: 16, drift:  25 },
  { left: "44%", delay: 1.6, dur: 6,   size: 19, drift: -35 },
  { left: "52%", delay: 3.0, dur: 8.5, size: 12, drift:  15 },
  { left: "61%", delay: 0.3, dur: 7.5, size: 15, drift: -25 },
  { left: "69%", delay: 2.5, dur: 6.5, size: 18, drift:  30 },
  { left: "77%", delay: 1.1, dur: 9,   size: 13, drift: -15 },
  { left: "84%", delay: 0.7, dur: 7,   size: 16, drift:  20 },
  { left: "92%", delay: 1.9, dur: 8,   size: 14, drift: -20 },
];

const DUST = Array.from({ length: 22 }, (_, i) => ({
  left:   `${(i * 4.55) % 100}%`,
  delay:  (i * 0.28) % 5,
  dur:    2.8 + (i % 3) * 0.9,
  size:   1.4 + (i % 3) * 0.7,
  bright: i % 4 === 0,
}));

const ORBIT_COUNT = 10;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "invite" | "entering">("loading");
  const [progress, setProgress] = useState(0);
  const [clicked, setClicked] = useState(false);
  const { playAudio } = useAudio();
  const { locale } = useTranslation();

  useEffect(() => {
    if (phase !== "loading") return;
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => setPhase("invite"), 200); return 100; }
        return Math.min(100, p + Math.random() * 28 + 12);
      });
    }, 75);
    return () => clearInterval(iv);
  }, [phase]);

  const handleEnter = useCallback(() => {
    if (clicked) return;
    setClicked(true);
    playAudio();
    setPhase("entering");
    setTimeout(onComplete, 1600);
  }, [clicked, playAudio, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden select-none">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 25%, #250500 0%, #120100 45%, #070000 100%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "url('/assets/palace.webp')", backgroundSize: "cover", backgroundPosition: "center bottom", opacity: 0.07, filter: "blur(3px) sepia(1) saturate(0.5)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 5%, rgba(212,175,55,0.14) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 119px, rgba(212,175,55,0.025) 119px, rgba(212,175,55,0.025) 120px)" }} />
        <div className="absolute inset-0 pointer-events-none">
          {[
            { pos: "top-0 left-0",    radii: "0 0 100% 0", noBorder: ["borderRight", "borderBottom"] },
            { pos: "top-0 right-0",   radii: "0 0 100% 0", noBorder: ["borderLeft",  "borderBottom"] },
            { pos: "bottom-0 left-0", radii: "0 100% 0 0", noBorder: ["borderRight", "borderTop"]    },
            { pos: "bottom-0 right-0",radii: "0 100% 0 0", noBorder: ["borderLeft",  "borderTop"]    },
          ].map((c, i) => (
            <div key={i} className={`absolute ${c.pos} w-28 h-28`} style={{ border: "1px solid rgba(212,175,55,0.08)", borderRadius: c.radii, [c.noBorder[0]]: "none", [c.noBorder[1]]: "none" }} />
          ))}
        </div>
      </div>

      {/* PETALS */}
      {phase === "invite" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PETALS.map((p, i) => (
            <motion.div key={i}
              style={{ position: "absolute", left: p.left, top: -28, fontSize: p.size, willChange: "transform" }}
              animate={{ y: ["0vh", "108vh"], x: [0, p.drift], rotate: [0, 360], opacity: [0, 0.65, 0.65, 0] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear", times: [0, 0.08, 0.88, 1] }}
            >🌸</motion.div>
          ))}
        </div>
      )}

      {/* DUST */}
      {phase === "invite" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {DUST.map((d, i) => (
            <motion.div key={i}
              style={{ position: "absolute", left: d.left, bottom: 0, width: d.size, height: d.size, borderRadius: "50%", background: d.bright ? "#F3D27F" : "#D4AF37", boxShadow: `0 0 ${d.size * 3}px rgba(212,175,55,${d.bright ? 0.9 : 0.6})`, willChange: "transform" }}
              animate={{ y: [0, "-65vh"], opacity: [0, 0.85, 0.4, 0], scale: [0.4, 1.3, 0.6, 0] }}
              transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* LOADING */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              style={{ width: 68, height: 68, border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}
            >
              <img src="/assets/ganesha.webp" alt="Ganesha" style={{ width: 44, height: 44, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(212,175,55,0.7))" }} />
            </motion.div>
            <p style={{ fontFamily: "var(--font-noto-devanagari)", color: "#D4AF37", fontSize: 15, letterSpacing: "0.25em", marginBottom: 18, textShadow: "0 0 16px rgba(212,175,55,0.5)" }}>
              ॥ श्री गणेशाय नमः ॥
            </p>
            <div style={{ width: 160, height: 1.5, background: "rgba(212,175,55,0.12)", borderRadius: 4, overflow: "hidden" }}>
              <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #A68018, #D4AF37, #F3D27F)", width: `${progress}%` }} transition={{ ease: "linear" }} />
            </div>
            <span style={{ fontFamily: "var(--font-poppins)", color: "rgba(212,175,55,0.45)", fontSize: 10, letterSpacing: "0.4em", marginTop: 8 }}>{progress}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INVITE */}
      <AnimatePresence>
        {phase === "invite" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 px-5"
            style={{ paddingTop: "max(20px, env(safe-area-inset-top))", paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
          >
            {/* GANESHA */}
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.75 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.25, 1, 0.3, 1] }}
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(16px, 4vw, 28px)" }}
            >
              <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: 170, height: 170, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,184,75,0.3) 0%, transparent 65%)", filter: "blur(14px)" }}
              />
              {[80, 110, 140].map((size, ri) => (
                <motion.div key={ri}
                  style={{ position: "absolute", width: size, height: size, border: `${ri === 1 ? "1px dashed" : "1px solid"} rgba(212,175,55,${0.5 - ri * 0.12})`, borderRadius: "50%" }}
                  animate={{ scale: [1, 1.07, 1], opacity: [0.7, 0.25, 0.7], rotate: ri === 1 ? [0, 360] : [0, -360] }}
                  transition={{ duration: 4 + ri * 1.2, repeat: Infinity, ease: ri === 1 ? "linear" : "easeInOut" }}
                />
              ))}
              {Array.from({ length: 6 }, (_, pi) => (
                <motion.div key={pi}
                  style={{ position: "absolute", width: 130, height: 130, display: "flex", alignItems: "flex-start", justifyContent: "center" }}
                  animate={{ rotate: [pi * 60, pi * 60 + 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                ><span style={{ fontSize: 11, marginTop: -4 }}>🌸</span></motion.div>
              ))}
              <motion.img src="/assets/ganesha.webp" alt="Lord Ganesha"
                animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "clamp(80px, 20vw, 110px)", height: "clamp(80px, 20vw, 110px)", objectFit: "contain", position: "relative", zIndex: 2, filter: "drop-shadow(0 0 22px rgba(212,175,55,0.8)) drop-shadow(0 0 50px rgba(232,184,75,0.25))" }}
              />
            </motion.div>

            {/* MANTRA */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 }}
              style={{ fontFamily: "var(--font-noto-devanagari)", fontSize: "clamp(13px, 3.8vw, 18px)", letterSpacing: "0.18em", color: "#E8B84B", marginBottom: "clamp(10px, 2.5vw, 16px)", textShadow: "0 0 24px rgba(232,184,75,0.55)", textAlign: "center" }}
            >॥ श्री गणेशाय नमः ॥</motion.p>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.4 }}
              style={{ width: "min(260px, 68vw)", height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)", marginBottom: "clamp(10px, 2.5vw, 16px)" }}
            />

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              style={{ fontFamily: "var(--font-lora)", fontSize: "clamp(9px, 2.2vw, 12px)", letterSpacing: "0.38em", color: "rgba(212,175,55,0.65)", textTransform: "uppercase", marginBottom: "clamp(10px, 2.5vw, 16px)", textAlign: "center" }}
            >Together With Their Families</motion.p>

            {/* NAMES */}
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.6, ease: [0.25, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: "clamp(10px, 2.5vw, 16px)" }}
            >
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "block", fontFamily: "var(--font-great-vibes)", fontSize: "clamp(36px, 9.5vw, 68px)", lineHeight: 1.05, background: "linear-gradient(135deg, #F3D27F 0%, #E8B84B 40%, #D4AF37 70%, #F3D27F 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 2px 12px rgba(212,175,55,0.45))" }}
              >{locale === "hi" ? "दीपक" : "Deepak"}</motion.span>
              <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ display: "block", fontFamily: "var(--font-playfair)", fontSize: "clamp(11px, 2.5vw, 15px)", color: "rgba(212,175,55,0.65)", letterSpacing: "0.5em", margin: "4px 0" }}
              >✦ &amp; ✦</motion.span>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                style={{ display: "block", fontFamily: "var(--font-great-vibes)", fontSize: "clamp(36px, 9.5vw, 68px)", lineHeight: 1.05, background: "linear-gradient(135deg, #F3D27F 0%, #E8B84B 40%, #D4AF37 70%, #F3D27F 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 2px 12px rgba(212,175,55,0.45))" }}
              >{locale === "hi" ? "चंदनी" : "Chandani"}</motion.span>
            </motion.div>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.8 }}
              style={{ width: "min(200px, 55vw)", height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)", marginBottom: "clamp(18px, 4.5vw, 30px)" }}
            />

            {/* ROYAL SEAL */}
            <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.95, type: "spring", stiffness: 90, damping: 14 }}
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(14px, 3.5vw, 24px)" }}
            >
              {/* Orbit particles */}
              <div style={{ position: "absolute", width: 196, height: 196, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                {Array.from({ length: ORBIT_COUNT }, (_, i) => (
                  <motion.div key={i}
                    style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center" }}
                    animate={{ rotate: [i * 36, i * 36 + 360] }}
                    transition={{ duration: 7 + (i % 3) * 0.6, repeat: Infinity, ease: "linear" }}
                  >
                    <div style={{ width: i % 2 === 0 ? 7 : 5, height: i % 2 === 0 ? 7 : 5, borderRadius: "50%", marginTop: -3, background: i % 3 === 0 ? "#F3D27F" : i % 3 === 1 ? "#E8B84B" : "#D4AF37", boxShadow: `0 0 ${i % 2 === 0 ? 10 : 6}px rgba(232,184,75,0.95)` }} />
                  </motion.div>
                ))}
              </div>
              {/* Pulse rings */}
              {[{ s: 140, b: "1.5px solid", o: 0.55, dur: 2.5 }, { s: 116, b: "1px dashed", o: 0.4, dur: 3.2 }, { s: 92, b: "1.5px solid", o: 0.65, dur: 2 }].map((r, ri) => (
                <motion.div key={ri}
                  style={{ position: "absolute", width: r.s, height: r.s, border: `${r.b} rgba(212,175,55,${r.o})`, borderRadius: "50%" }}
                  animate={{ scale: [1, 1.09, 1], opacity: [r.o, r.o * 0.35, r.o], rotate: ri === 1 ? [0, 360] : undefined }}
                  transition={{ duration: r.dur, repeat: Infinity, ease: ri === 1 ? "linear" : "easeInOut" }}
                />
              ))}
              {/* Ripple rings */}
              {[0, 0.5, 1].map(d => (
                <motion.div key={d}
                  style={{ position: "absolute", width: 100, height: 100, border: "1.5px solid rgba(212,175,55,0.5)", borderRadius: "50%" }}
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, delay: d, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              {/* BUTTON */}
              <motion.button onClick={handleEnter}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer", position: "relative", zIndex: 10, background: "radial-gradient(circle at 38% 32%, #7B1520 0%, #5C0E16 45%, #360009 100%)", border: "2.5px solid #D4AF37", boxShadow: "0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: "10%", left: "18%", width: "38%", height: "28%", background: "linear-gradient(145deg, rgba(255,255,255,0.22), transparent)", borderRadius: "50%", transform: "rotate(-25deg)" }} />
                <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,20,45,0.35) 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.35)" }} />
                <motion.span animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 22, lineHeight: 1, filter: "drop-shadow(0 0 10px rgba(212,175,55,1))", zIndex: 1 }}
                >✦</motion.span>
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: 7.5, letterSpacing: "0.18em", color: "#D4AF37", textTransform: "uppercase", zIndex: 1, marginTop: 3, textAlign: "center", lineHeight: 1.3 }}>Enter</span>
              </motion.button>
            </motion.div>

            {/* CTA TEXT */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} style={{ textAlign: "center", marginBottom: "clamp(10px, 2.5vw, 18px)" }}>
              <motion.p animate={{ opacity: [0.45, 1, 0.45], y: [0, -3, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(9px, 2.4vw, 13px)", letterSpacing: "0.32em", color: "#D4AF37", textTransform: "uppercase" }}
              >✨ ENTER THE CELEBRATION ✨</motion.p>
            </motion.div>

            {/* GUIDED SYSTEM */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <motion.div animate={{ y: [6, 0, 6, 0, 6], scale: [1, 1.2, 1, 1.2, 1] }} transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }}
                style={{ fontSize: "clamp(18px, 4.5vw, 24px)", filter: "drop-shadow(0 0 10px rgba(232,184,75,0.8))" }}
              >👆</motion.div>
              <motion.div animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}
              >
                {[0, 0.15, 0.3].map(d => (
                  <motion.div key={d} animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, delay: d }}
                    style={{ width: 8, height: 8, borderRight: "1.5px solid rgba(212,175,55,0.7)", borderTop: "1.5px solid rgba(212,175,55,0.7)", transform: "rotate(-45deg)" }}
                  />
                ))}
              </motion.div>
              <motion.p animate={{ opacity: [0.35, 0.85, 0.35] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(8px, 2vw, 10px)", letterSpacing: "0.38em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase", marginTop: 4 }}
              >👇 Tap Here To Begin 👇</motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSITION */}
      <AnimatePresence>
        {phase === "entering" && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6, 0] }} transition={{ duration: 0.8, times: [0, 0.2, 0.5, 1] }}
              style={{ position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,220,80,0.9) 0%, rgba(212,175,55,0.55) 35%, transparent 65%)" }}
            />
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i / 16) * 360;
              const rad = angle * Math.PI / 180;
              return (
                <motion.div key={i} initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }} animate={{ x: Math.cos(rad) * 180, y: Math.sin(rad) * 180, opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{ position: "fixed", left: "50%", top: "50%", zIndex: 75, fontSize: 16, pointerEvents: "none", marginLeft: -8, marginTop: -8 }}
                >🌸</motion.div>
              );
            })}
            <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.2, delay: 0.35, ease: [0.25, 1, 0.3, 1] }}
              style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: "50%", zIndex: 65, background: "linear-gradient(to right, #8B1A28, #6B0F1A, #4A0A12)", borderRight: "3px solid #D4AF37" }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 39px, rgba(0,0,0,0.15) 39px, rgba(0,0,0,0.15) 40px)", opacity: 0.4 }} />
            </motion.div>
            <motion.div initial={{ x: "100%" }} animate={{ x: "0%" }} transition={{ duration: 1.2, delay: 0.35, ease: [0.25, 1, 0.3, 1] }}
              style={{ position: "fixed", top: 0, left: "50%", bottom: 0, right: 0, zIndex: 65, background: "linear-gradient(to left, #8B1A28, #6B0F1A, #4A0A12)", borderLeft: "3px solid #D4AF37" }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(270deg, transparent 0, transparent 39px, rgba(0,0,0,0.15) 39px, rgba(0,0,0,0.15) 40px)", opacity: 0.4 }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
