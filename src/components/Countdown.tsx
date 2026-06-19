"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const GOLD = "#D4AF37";
const SAFFRON = "#E8B04A";
const TARGET = new Date("2027-02-10T19:00:00").getTime(); // Sacred Pheras Date: Feb 10, 2027, 7:00 PM

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

// Compact Marigold Garland above each clock medallion
function MarigoldHanger() {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none mb-1.5">
      {/* Ceiling hanger button */}
      <div className="w-3.5 h-0.5 bg-[#D4AF37] opacity-60 rounded-full" />
      {/* Chain link */}
      <div className="w-[0.5px] h-3 bg-[#D4AF37]/50" />
      {/* Colorful flower buds */}
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_4px_rgba(255,107,53,0.5)] border border-[#FAF7F2]/10" />
      <div className="w-2 h-2 rounded-full bg-[#FFB703] shadow-[0_0_4px_rgba(255,183,3,0.5)] border border-[#FAF7F2]/10 -mt-0.5" />
      <div className="w-[0.5px] h-2 bg-[#D4AF37]/50" />
    </div>
  );
}

function CountBlock({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  const prevRef = useRef(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => setFlipping(false), 300);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center flex-1">
      {/* Decorative hanging chain */}
      <MarigoldHanger />
      
      {/* Circular Medallion */}
      <div
        className="relative flex items-center justify-center rounded-full border border-[#D4AF37]/45 bg-gradient-to-b from-[#4A0E0E]/90 to-[#1F0104]/95"
        style={{
          width: "clamp(68px, 17vw, 105px)",
          height: "clamp(68px, 17vw, 105px)",
          boxShadow: `0 8px 25px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 12px ${color}15`,
        }}
      >
        {/* Animated outer dotted circle spinning */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[3px] rounded-full border border-dashed border-[#D4AF37]/20 pointer-events-none"
        />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#FAF7F2]/5 to-transparent pointer-events-none" />

        {/* Number with flip-like slide fade */}
        <div className="overflow-hidden relative h-[1.2em] w-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 13 }}
              className="font-display text-[#FAF7F2] font-semibold text-center select-none"
              style={{
                fontSize: "clamp(1.5rem, 4.2vw, 2.7rem)",
                textShadow: `0 0 12px ${color}65`,
                lineHeight: 1,
              }}
            >
              {pad(value)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Label */}
      <p
        className="font-sans text-[7.5px] sm:text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase mt-2.5 opacity-90 select-none text-center"
      >
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const { t, locale } = useTranslation();
  const isHi = locale === "hi";
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      className="relative py-12 md:py-16 px-4 md:px-6 flex flex-col items-center justify-center min-h-[75vh] md:min-h-[85vh] animate-bg-luxury overflow-hidden"
      style={{
        boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.55)",
      }}
    >
      {/* Background Twinkling Stars */}
      {Array.from({ length: 45 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 31 + 9) % 98}%`,
            top: `${(i * 47 + 13) % 96}%`,
            width: i % 5 === 0 ? 3 : 1.5,
            height: i % 5 === 0 ? 3 : 1.5,
            borderRadius: "50%",
            background: i % 6 === 0 ? SAFFRON : "rgba(246,238,223,0.65)",
            "--duration": `${1.5 + (i % 6) * 0.5}s`,
            "--delay": `${(i * 0.17) % 5}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Floating Firefly Embers */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none select-none"
          style={{
            left: `${(i * 37 + 13) % 96}%`,
            bottom: "-10px",
            width: i % 3 === 0 ? 3.5 : 2,
            height: i % 3 === 0 ? 3.5 : 2,
            background: i % 2 === 0 ? "#FFC83B" : "#FF6B35",
            boxShadow: `0 0 8px ${i % 2 === 0 ? "#FFC83B" : "#FF6B35"}`,
          }}
          animate={{
            y: [0, -650],
            x: [0, Math.sin(i) * 35, 0],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: 10 + (i % 4) * 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Ornate Background Rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/5 pointer-events-none select-none"
        style={{
          width: "min(95vw, 680px)",
          height: "min(95vw, 680px)",
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D4AF37]/5 pointer-events-none select-none"
        style={{
          width: "min(90vw, 640px)",
          height: "min(90vw, 640px)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl text-center flex flex-col justify-between items-center h-full">
        {/* Chapter Header */}
        <div className="mb-4">
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#D4AF37] uppercase mb-1.5"
          >
            {isHi ? "षष्ठ अध्याय — शुभ घड़ियाँ" : "Chapter VI — Countdown"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-4xl text-gold-gradient font-bold tracking-wide"
          >
            {t("countdown.title")}
          </motion.h2>

          <div className="flex items-center justify-center gap-3 mt-3.5 mb-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[#D4AF37] text-[8px] animate-pulse">✦</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </div>

        {/* Suspended Medallions Container - Guaranteed flex row layout */}
        <div className="relative w-full max-w-xl my-4 py-2 px-1 flex flex-row items-center justify-between gap-1 sm:gap-3 flex-nowrap overflow-visible">
          {/* Outer glowing halo background */}
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="absolute inset-x-[-10px] inset-y-[-15px] rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${GOLD}05 0%, transparent 80%)`,
            }}
          />

          {/* Medallions (Flex-row, flex-nowrap) */}
          <CountBlock value={time.days} label={t("countdown.days")} color={SAFFRON} />
          <CountBlock value={time.hours} label={t("countdown.hours")} color={GOLD} />
          <CountBlock value={time.minutes} label={t("countdown.minutes")} color="#D8A28C" />
          <CountBlock value={time.seconds} label={t("countdown.seconds")} color={SAFFRON} />
        </div>

        {/* Footer Target Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif italic text-[11px] sm:text-xs md:text-sm text-[#FAF7F2]/80 mt-6 leading-relaxed select-none"
        >
          {isHi 
            ? "विवाह संस्कार की ओर बढ़ते कदम..." 
            : "Until the Sacred Pheras..."}
        </motion.p>
      </div>
    </section>
  );
}
