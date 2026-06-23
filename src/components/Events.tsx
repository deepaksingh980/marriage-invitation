"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { Calendar, Clock, Sun, Music, Flame, RotateCw, ArrowLeft, Award, Paintbrush } from "lucide-react";
import confetti from "canvas-confetti";

interface EventItem {
  id: "tilak" | "haldi" | "ghidhahri" | "mehndi" | "wedding";
  emoji: string;
  titleKey: string;
  dateKey: string;
  timeKey: string;
  descKey: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  accent: string;
  bgGradient: string;
}

// Interactive Marigold Garland Bead String
function MarigoldGarland({ isWedding = false }: { isWedding?: boolean }) {
  const beadCount = isWedding ? 4 : 3;
  return (
    <div className="flex flex-col items-center select-none pointer-events-none z-10">
      {/* Top Brass Hanger Cap */}
      <div className="w-5 h-1 bg-gradient-to-r from-[#8A661C] via-[#D4AF37] to-[#8A661C] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />

      {/* Hanging metallic wire */}
      <div className="w-[1px] h-3 bg-gradient-to-b from-[#D4AF37]/80 to-[#FF9F1C]/80" />

      {/* Fluffy Marigold Beads & Gold spacers */}
      <div className="flex flex-col items-center -mt-0.5">
        {Array.from({ length: beadCount }).map((_, i) => {
          const isOrange = i % 2 === 0;
          const beadColor = isOrange ? "bg-[#FF6B35]" : "bg-[#FFB703]";
          const shadowColor = isOrange ? "rgba(255,107,53,0.7)" : "rgba(255,183,3,0.7)";
          const sizeClass = isWedding
            ? (i === 1 || i === 2 ? "w-3 h-3" : "w-2.5 h-2.5")
            : (i === 1 ? "w-2.5 h-2.5" : "w-2 h-2");

          return (
            <React.Fragment key={i}>
              <div
                className={`${sizeClass} rounded-full ${beadColor} border border-[#FAF7F2]/10 relative`}
                style={{
                  boxShadow: `0 0 6px ${shadowColor}, inset -1.2px -1.2px 3px rgba(0,0,0,0.3)`,
                  backgroundImage: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45) 0%, transparent 60%)",
                }}
              >
                {/* Petal texture ring */}
                <div className="absolute inset-[25%] rounded-full border border-[#FAF7F2]/20 opacity-30" />
              </div>

              {/* Golden connector thread */}
              {i < beadCount - 1 && (
                <div className="w-[0.75px] h-1.5 bg-[#D4AF37]/70" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Golden Bead Cap just above card */}
      <div className="w-3 h-2 rounded-t-full bg-gradient-to-b from-[#D4AF37] to-[#A68018] border border-[#FAF7F2]/10 shadow-sm -mt-0.5" />
    </div>
  );
}

// Swaying Brass Bell below card
function HangingBrassBell({ isWedding = false }: { isWedding?: boolean }) {
  return (
    <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
      {/* Hanging chain */}
      <div className="w-[1px] h-2.5 bg-gradient-to-b from-[#A68018] to-[#D4AF37]" />

      {/* Brass bead spacer */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#FF9F1C] border border-[#D4AF37] -mt-0.5 shadow-sm" />

      {/* Bell Body */}
      <div
        className={`relative bg-gradient-to-b from-[#FFF0D4] via-[#D4AF37] to-[#A68018] rounded-t-full border border-[#D4AF37]/50 shadow-md flex items-center justify-center ${isWedding ? "w-4.5 h-5" : "w-4 h-4.5"
          }`}
        style={{
          boxShadow: "0 2px 5px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {/* Flare rim of bell */}
        <div className="absolute bottom-0 left-[-1.5px] right-[-1.5px] h-[2px] bg-[#8A661C] rounded-full" />

        {/* Swinging clapper */}
        <motion.div
          animate={{ x: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-2.5px] w-1 h-1.5 rounded-full bg-[#E65F2B]"
          style={{ transformOrigin: "top center" }}
        />
      </div>
    </div>
  );
}

// Gold star filigrees for luxury card styling
function GoldCornerOrnaments() {
  return (
    <>
      <div className="absolute top-2.5 left-2.5 text-[#D4AF37]/75 text-[8px] pointer-events-none select-none animate-pulse">✦</div>
      <div className="absolute top-2.5 right-2.5 text-[#D4AF37]/75 text-[8px] pointer-events-none select-none animate-pulse">✦</div>
      <div className="absolute bottom-2.5 left-2.5 text-[#D4AF37]/75 text-[8px] pointer-events-none select-none animate-pulse">✦</div>
      <div className="absolute bottom-2.5 right-2.5 text-[#D4AF37]/75 text-[8px] pointer-events-none select-none animate-pulse">✦</div>
    </>
  );
}

export default function Events() {
  const { t, locale } = useTranslation();
  const isHi = locale === "hi";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const triggerConfetti = (e?: React.MouseEvent) => {
    let origin: { x?: number; y?: number } = { y: 0.65 };
    if (e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      origin = { x, y };
    }

    const colors = ["#D4AF37", "#F3D27F", "#A68018", "#E8B04A", "#FF9F1C", "#FF6B35"];

    // Core burst
    confetti({
      particleCount: 75,
      spread: 65,
      origin,
      colors,
      ticks: 200,
      gravity: 1.1,
      scalar: 0.9,
    });

    // Celebratory side splashes
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0.05, y: 0.75 },
        colors,
      });
    }, 120);

    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 0.95, y: 0.75 },
        colors,
      });
    }, 120);
  };

  const toggleFlip = (index: number, e?: React.MouseEvent) => {
    const isCurrentlyFlipped = !!flippedCards[index];
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    if (!isCurrentlyFlipped) {
      triggerConfetti(e);
    }
  };

  // 1. Tilak: 🪔 + Award
  // 2. Haldi: 🌼 + Sun
  // 3. Ghidhahri: 💃 + Music
  // 4. Mehndi: 🌿 + Paintbrush
  // 5. Wedding: 💍 + Flame
  const events: EventItem[] = [
    {
      id: "tilak",
      emoji: "🪔",
      titleKey: "events.tilak.title",
      dateKey: "events.tilak.date",
      timeKey: "events.tilak.time",
      descKey: "events.tilak.desc",
      icon: Award,
      iconColor: "#F3D27F",
      accent: "#E8B04A",
      bgGradient: "linear-gradient(135deg, #6A2510 0%, #3A1005 100%)",
    },
    {
      id: "haldi",
      emoji: "🌼",
      titleKey: "events.haldi.title",
      dateKey: "events.haldi.date",
      timeKey: "events.haldi.time",
      descKey: "events.haldi.desc",
      icon: Sun,
      iconColor: "#FFD97D",
      accent: "#FFC83B",
      bgGradient: "linear-gradient(135deg, #6E5410 0%, #3C2D05 100%)",
    },
    {
      id: "ghidhahri",
      emoji: "💃",
      titleKey: "events.ghidhahri.title",
      dateKey: "events.ghidhahri.date",
      timeKey: "events.ghidhahri.time",
      descKey: "events.ghidhahri.desc",
      icon: Music,
      iconColor: "#FCA3B7",
      accent: "#D8A28C",
      bgGradient: "linear-gradient(135deg, #5C1A3F 0%, #30081E 100%)",
    },
    {
      id: "mehndi",
      emoji: "🌿",
      titleKey: "events.mehndi.title",
      dateKey: "events.mehndi.date",
      timeKey: "events.mehndi.time",
      descKey: "events.mehndi.desc",
      icon: Paintbrush,
      iconColor: "#A7F3D0",
      accent: "#2D9F65",
      bgGradient: "linear-gradient(135deg, #104D31 0%, #052C1B 100%)",
    },
  ];

  const weddingEvent: EventItem = {
    id: "wedding",
    emoji: "💍",
    titleKey: "events.wedding.title",
    dateKey: "events.wedding.date",
    timeKey: "events.wedding.time",
    descKey: "events.wedding.desc",
    icon: Flame,
    iconColor: "#F3D27F",
    accent: "#D4AF37",
    bgGradient: "linear-gradient(135deg, #701019 0%, #3C050B 100%)",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  } as const;

  const cardContainerVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 14 },
    },
  } as const;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);
  const starCount = isMobile ? 10 : 35;

  return (
    <section
      id="events"
      className="relative py-16 md:py-24 px-4 md:px-6 w-full flex flex-col items-center justify-center min-h-[98vh] animate-bg-luxury overflow-hidden"
      style={{
        boxShadow: "inset 0 0 120px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Background Mandala Watermarks */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full border border-[#D4AF37]/5 pointer-events-none select-none animate-spin-slow opacity-25" />
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full border border-[#D4AF37]/5 pointer-events-none select-none animate-spin-slow opacity-25" />

      {/* Background Twinkling Stars */}
      {Array.from({ length: starCount }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 29 + 11) % 98}%`,
            top: `${(i * 37 + 7) % 95}%`,
            width: i % 5 === 0 ? 3.0 : 1.5,
            height: i % 5 === 0 ? 3.0 : 1.5,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#D4AF37" : "rgba(246, 238, 223, 0.55)",
            "--duration": `${2.0 + (i % 3) * 0.8}s`,
            "--delay": `${i * 0.15}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Luxury Border Outline */}
      <div className="absolute inset-4 border border-[#D4AF37]/15 rounded-[2rem] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center mb-10 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#D4AF37] uppercase mb-1.5"
        >
          {isHi ? "चतुर्थ अध्याय — मांगलिक बेला" : "Chapter IV — Celebrations"}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-display text-3xl md:text-5xl text-gold-gradient font-bold tracking-wide"
        >
          {t("events.title")}
        </motion.h2>

        <div className="flex items-center justify-center gap-3 mt-3 mb-2.5">
          <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-[10px] animate-pulse">✦</span>
          <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif italic text-xs md:text-sm text-[#FAF7F2]/80 max-w-md mx-auto px-4 leading-relaxed"
        >
          {t("events.sub")}
        </motion.p>
      </div>

      {/* Hanging Pendants Grid */}
      <div className="max-w-5xl w-full z-10 px-2 sm:px-4">

        {/* MOBILE GRID VIEW (2x2 + col-span-2) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid lg:hidden grid-cols-2 gap-x-4 gap-y-7"
        >
          {events.map((event, idx) => {
            const isFlipped = !!flippedCards[idx];
            const isHovered = hoveredIdx === idx;
            const IconComponent = event.icon;

            return (
              <motion.div
                key={event.id}
                variants={cardContainerVariants}
                className="flex flex-col items-center"
              >
                {/* Custom Marigold Flower Garland */}
                <MarigoldGarland />

                {/* Swaying & Flipping Card Container */}
                <motion.div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={(e) => toggleFlip(idx, e)}
                  whileHover={{ scale: 1.03 }}
                  animate={{
                    rotate: isHovered ? [-3.5, 3.5, -3.5] : [-1.5, 1.5, -1.5],
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{
                    rotate: {
                      duration: isHovered ? 1.8 : 4.5 + (idx % 3) * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.35,
                    },
                    rotateY: {
                      type: "spring",
                      stiffness: 85,
                      damping: 12,
                    },
                    scale: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }
                  }}
                  style={{ transformOrigin: "top center", perspective: 1000, transformStyle: "preserve-3d" }}
                  className="w-full relative mt-0.5 select-none h-[155px] cursor-pointer"
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full border border-[#D4AF37]/45 rounded-2xl p-3 flex flex-col justify-between shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
                    style={{
                      backfaceVisibility: "hidden",
                      background: event.bgGradient,
                    }}
                  >
                    {/* Interior dashed borders */}
                    <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/15 rounded-[0.9rem] pointer-events-none" />

                    {/* Gold filigree corners */}
                    <GoldCornerOrnaments />

                    {/* Content Top */}
                    <div className="flex items-center gap-2 z-10 relative">
                      {/* Icon circle with spin hover */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ type: "spring", stiffness: 180, damping: 10 }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 border border-[#D4AF37]/30 shadow-sm flex-shrink-0"
                      >
                        <IconComponent size={14} className="text-[#D4AF37]" style={{ color: event.iconColor }} />
                      </motion.div>
                      <h3 className="font-display font-bold text-[10.5px] sm:text-xs text-[#FAF7F2] tracking-wide truncate">
                        {t(event.titleKey).replace(/\s*ceremony/gi, "")}
                      </h3>
                    </div>

                    {/* Mid golden separator */}
                    <div className="w-10 h-[1px] bg-gradient-to-r from-[#D4AF37]/60 to-transparent my-1 z-10 relative" />

                    {/* Details */}
                    <div className="flex flex-col gap-1 z-10 relative">
                      <div className="flex items-center gap-1.5 text-[#FAF7F2]/90">
                        <Calendar size={10} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="font-serif text-[9px] font-medium leading-none">
                          {t(event.dateKey).replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s*/i, "")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#FAF7F2]/95 mt-0.5">
                        <Clock size={10} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="font-sans text-[8.5px] font-extrabold text-[#FFC83B] tracking-wide leading-none">
                          {t(event.timeKey)}
                        </span>
                      </div>
                    </div>

                    {/* Tap instruction */}
                    <div className="flex items-center justify-between text-[7px] text-[#FAF7F2]/45 uppercase tracking-widest z-10 mt-1 select-none">
                      <span>Click to Open</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px]">{event.emoji}</span>
                        <RotateCw size={8} className="animate-spin-slow" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#3B050B]/98 to-[#1F0104]/98 border border-[#D4AF37]/70 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xl text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {/* Interior dashed borders */}
                    <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/20 rounded-[0.9rem] pointer-events-none" />

                    {/* Gold filigree corners */}
                    <GoldCornerOrnaments />

                    {/* Heading */}
                    <div className="flex items-center justify-center gap-1.5 z-10 relative">
                      <span className="text-[10px]">{event.emoji}</span>
                      <h4 className="font-display font-extrabold text-[9px] text-[#D4AF37] uppercase tracking-wider">
                        {isHi ? "विवरण" : "Ceremony Description"}
                      </h4>
                    </div>

                    {/* Description */}
                    <p className="font-serif text-[9px] leading-relaxed text-[#FAF7F2]/90 px-1 my-1 overflow-y-auto max-h-[70px] custom-scrollbar-thin">
                      {t(event.descKey)}
                    </p>

                    {/* Return instruction */}
                    <div className="flex items-center justify-center gap-1 text-[7px] text-[#D4AF37]/60 uppercase tracking-wider z-10 select-none">
                      <ArrowLeft size={7} />
                      <span>Back</span>
                    </div>
                  </div>

                  {/* Hanging Brass Bell */}
                  <HangingBrassBell />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Highlights: Wedding Ceremony mobile card */}
          <motion.div
            variants={cardContainerVariants}
            className="col-span-2 flex flex-col items-center mt-2"
          >
            {/* Custom Marigold Flower Garland */}
            <MarigoldGarland isWedding={true} />

            <motion.div
              onMouseEnter={() => setHoveredIdx(4)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={(e) => toggleFlip(4, e)}
              whileHover={{ scale: 1.03 }}
              animate={{
                rotate: hoveredIdx === 4 ? [-2.5, 2.5, -2.5] : [-1.0, 1.0, -1.0],
                rotateY: !!flippedCards[4] ? 180 : 0,
              }}
              transition={{
                rotate: {
                  duration: hoveredIdx === 4 ? 1.6 : 4.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  type: "spring",
                  stiffness: 85,
                  damping: 12,
                },
                scale: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }
              }}
              style={{ transformOrigin: "top center", perspective: 1000, transformStyle: "preserve-3d" }}
              className="w-full relative mt-0.5 select-none h-[155px] cursor-pointer"
            >
              {/* FRONT FACE */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl p-4 border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(212,175,55,0.25)] flex flex-col justify-between"
                style={{
                  backfaceVisibility: "hidden",
                  background: weddingEvent.bgGradient,
                }}
              >
                {/* Interior dashed border */}
                <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/35 rounded-[0.9rem] pointer-events-none" />

                {/* Gold filigree corners */}
                <GoldCornerOrnaments />

                {/* Content layout */}
                <div className="flex items-center gap-3.5 z-10 relative">
                  {/* Glowing icon wrapper */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ type: "spring", stiffness: 180, damping: 10 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#F3D27F] to-[#A68018] border border-[#FAF7F2]/30 shadow-md flex-shrink-0 animate-pulse-glow"
                  >
                    <Flame size={20} className="text-[#4A0E0E]" />
                  </motion.div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[7.5px] font-bold text-[#D4AF37] tracking-[0.25em] uppercase font-sans bg-[#FAF7F2]/10 px-2 py-0.5 rounded-full leading-none">
                        Shubh Pheras
                      </span>
                      <span className="text-[#D4AF37] text-xs">✦</span>
                    </div>
                    <h3 className="font-display font-extrabold text-sm text-[#FAF7F2] mt-1 select-none leading-none">
                      {t(weddingEvent.titleKey)}
                    </h3>
                  </div>
                </div>

                {/* Time details */}
                <div className="flex items-center gap-4 pt-2 border-t border-[#D4AF37]/20 z-10 relative">
                  <div className="flex items-center gap-1 text-[#FAF7F2]/90">
                    <Calendar size={10.5} className="text-[#D4AF37]" />
                    <span className="font-serif text-[9px] leading-none">
                      {t(weddingEvent.dateKey).replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s*/i, "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#FAF7F2]/95">
                    <Clock size={10.5} className="text-[#D4AF37]" />
                    <span className="font-sans text-[8.5px] font-extrabold text-[#FFC83B] tracking-wide leading-none">
                      {t(weddingEvent.timeKey)}
                    </span>
                  </div>
                </div>

                {/* Footer trigger */}
                <div className="flex items-center justify-between text-[7px] text-[#D4AF37]/80 uppercase tracking-widest z-10 select-none">
                  <span>Reveal Royal Details</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{weddingEvent.emoji}</span>
                    <RotateCw size={8} className="animate-spin-slow" />
                  </div>
                </div>
              </div>

              {/* BACK FACE */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#3B050B] to-[#1F0104] border-2 border-[#D4AF37] rounded-2xl p-4 flex flex-col justify-between shadow-2xl text-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Interior dashed border */}
                <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/35 rounded-[0.9rem] pointer-events-none" />

                {/* Gold filigree corners */}
                <GoldCornerOrnaments />

                {/* Title */}
                <h4 className="font-display font-extrabold text-[10px] text-[#D4AF37] uppercase tracking-wider z-10 relative">
                  {isHi ? "विवाह संस्कार" : "Holy Wedding Ceremony"}
                </h4>

                {/* Desc */}
                <p className="font-serif text-[9.5px] leading-relaxed text-[#FAF7F2]/95 px-2 my-1 overflow-y-auto max-h-[75px] custom-scrollbar-thin">
                  {t(weddingEvent.descKey)}
                </p>

                {/* Return */}
                <div className="flex items-center justify-center gap-1.5 text-[7px] text-[#D4AF37]/75 uppercase tracking-wider z-10 select-none">
                  <ArrowLeft size={7} />
                  <span>Return to Schedule</span>
                </div>
              </div>

              {/* Hanging Brass Bell */}
              <HangingBrassBell isWedding={true} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* DESKTOP GRID VIEW (5 Column single row) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="hidden lg:grid grid-cols-5 gap-4"
        >
          {[...events, weddingEvent].map((event, idx) => {
            const isWedding = event.id === "wedding";
            const isFlipped = !!flippedCards[idx];
            const isHovered = hoveredIdx === idx;
            const IconComponent = event.icon;

            return (
              <div key={event.id} className="flex flex-col items-center">
                {/* Custom Marigold Flower Garland */}
                <MarigoldGarland isWedding={isWedding} />

                {/* Swaying & Flipping Card Container */}
                <motion.div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={(e) => toggleFlip(idx, e)}
                  whileHover={{ scale: 1.04 }}
                  animate={{
                    rotate: isHovered ? [-3, 3, -3] : [-1.2, 1.2, -1.2],
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{
                    rotate: {
                      duration: isHovered ? 1.8 : 5.0 + (idx % 3) * 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.4,
                    },
                    rotateY: {
                      type: "spring",
                      stiffness: 85,
                      damping: 12,
                    },
                    scale: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }
                  }}
                  style={{ transformOrigin: "top center", perspective: 1000, transformStyle: "preserve-3d" }}
                  className="w-full relative mt-0.5 select-none h-[205px] cursor-pointer"
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl p-4.5 flex flex-col justify-between text-left"
                    style={{
                      backfaceVisibility: "hidden",
                      border: isWedding ? "2px solid #D4AF37" : "1.5px solid rgba(212, 175, 55, 0.4)",
                      boxShadow: isWedding
                        ? "0 10px 30px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                        : isHovered
                          ? "0 8px 25px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                          : "0 5px 18px rgba(0, 0, 0, 0.35)",
                      borderColor: isHovered || isWedding ? "#D4AF37" : "rgba(212, 175, 55, 0.4)",
                      background: event.bgGradient,
                    }}
                  >
                    {/* Interior dashed border */}
                    <div className="absolute inset-[5px] border border-dashed border-[#D4AF37]/15 rounded-[0.9rem] pointer-events-none" />

                    {/* Gold filigree corners */}
                    <GoldCornerOrnaments />

                    {/* Icon Circle */}
                    <div className="flex items-center justify-between mb-3 z-10 relative">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ type: "spring", stiffness: 180, damping: 10 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-[#D4AF37]/25 shadow-sm"
                      >
                        <IconComponent size={16} style={{ color: event.iconColor }} />
                      </motion.div>
                      <span className="text-[7.5px] font-extrabold text-[#D4AF37] tracking-[0.2em] uppercase font-sans">
                        {isWedding ? "Vivah" : event.id}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="z-10 relative">
                      <h3 className="font-display font-extrabold text-xs sm:text-xs.5 text-[#FAF7F2] leading-tight select-none">
                        {t(event.titleKey)}
                      </h3>
                      <div className="w-7 h-[1.5px] bg-[#D4AF37]/45 my-2" />
                    </div>

                    {/* Date/Time Details */}
                    <div className="flex flex-col gap-1 z-10 relative">
                      <div className="flex items-center gap-1.5 text-[#FAF7F2]/90">
                        <Calendar size={11} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="font-serif text-[9.5px] leading-none tracking-wide">
                          {t(event.dateKey).replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s*/i, "")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#FAF7F2]/95 mt-0.5">
                        <Clock size={11} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="font-sans text-[9px] font-extrabold text-[#FFC83B] tracking-wider leading-none">
                          {t(event.timeKey)}
                        </span>
                      </div>
                    </div>

                    {/* Tap indicator */}
                    <div className="flex items-center justify-between text-[7px] text-[#FAF7F2]/40 uppercase tracking-widest mt-1.5 z-10 relative">
                      <span>Click to Read</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px]">{event.emoji}</span>
                        <RotateCw size={8} className="animate-spin-slow" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#3B050B]/98 to-[#1F0104]/98 border border-[#D4AF37] rounded-2xl p-4.5 flex flex-col justify-between text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                    }}
                  >
                    {/* Interior dashed border */}
                    <div className="absolute inset-[5px] border border-dashed border-[#D4AF37]/20 rounded-[0.9rem] pointer-events-none" />

                    {/* Gold filigree corners */}
                    <GoldCornerOrnaments />

                    {/* Heading */}
                    <div className="flex items-center justify-center gap-1.5 z-10 relative">
                      <span className="text-xs">{event.emoji}</span>
                      <h4 className="font-display font-extrabold text-[9.5px] text-[#D4AF37] uppercase tracking-wider">
                        {isWedding ? t("events.title").replace(/\s*events/gi, "") : "Ceremony Info"}
                      </h4>
                    </div>

                    {/* Desc */}
                    <p className="font-serif text-[9.5px] leading-relaxed text-[#FAF7F2]/90 px-1 mt-1 overflow-y-auto max-h-[95px] custom-scrollbar-thin text-center">
                      {t(event.descKey)}
                    </p>

                    {/* Return instruction */}
                    <div className="flex items-center justify-center gap-1 text-[7.5px] text-[#D4AF37]/65 uppercase tracking-wider z-10 select-none">
                      <ArrowLeft size={7} />
                      <span>Back to Card</span>
                    </div>
                  </div>

                  {/* Hanging Brass Bell */}
                  <HangingBrassBell isWedding={isWedding} />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
