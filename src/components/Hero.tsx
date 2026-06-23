"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";

const GOLD = "#D4AF37";

// Premium Rose Petals Rain falling in the background of the Hero section
function RosePetals() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);
  const count = isMobile ? 6 : 18;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[15]">
      {Array.from({ length: count }).map((_, i) => {
        const duration = 10 + (i % 5) * 2.5;
        const delay = 0.1 + (i * 0.7) % 8;
        const scale = 0.5 + (i % 3) * 0.25;
        return (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 17) % 95}vw`,
              y: -30,
              rotate: i * 25,
              scale: scale,
            }}
            animate={{
              y: "110vh",
              x: [null, `${((i * 17) % 95) + (i % 2 === 0 ? 8 : -8)}vw`],
              rotate: [null, i * 25 + 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
            className="absolute w-3.5 h-4.5 rounded-tl-[60%] rounded-br-[65%] bg-gradient-to-tr from-[#D62246] to-[#FFA0A0] opacity-55 filter blur-[0.4px]"
            style={{
              transformOrigin: "center",
            }}
          />
        );
      })}
    </div>
  );
}

// Sparkles shooting out from the door seam during opening
function OpeningParticles() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);
  const count = isMobile ? 8 : 24;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-35">
      {Array.from({ length: count }).map((_, i) => {
        const isLeft = i % 2 === 0;
        const delay = (i * 0.08) % 0.6;
        const dur = 2.2 + (i % 3) * 0.5;
        const size = 3 + (i % 4);
        return (
          <motion.div
            key={i}
            initial={{
              x: "50vw",
              y: `${25 + (i * 3.5) % 55}vh`,
              scale: 0.1,
              opacity: 0,
            }}
            animate={{
              x: isLeft ? ["50vw", "15vw", "-10vw"] : ["50vw", "85vw", "110vw"],
              y: [`${25 + (i * 3.5) % 55}vh`, `${40 + (i * 5) % 50}vh`],
              scale: [0.1, 1.6, 0.4],
              opacity: [0, 0.95, 0.95, 0],
            }}
            transition={{
              duration: dur,
              delay: delay,
              ease: "easeOut",
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: "#FFFDF8",
              boxShadow: "0 0 10px #FFDF8A, 0 0 20px #E8B84B",
            }}
          />
        );
      })}
    </div>
  );
}

// Extra rose petals flying out specifically from the opening door gap
function OpeningPetals() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);
  const count = isMobile ? 6 : 16;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-35">
      {Array.from({ length: count }).map((_, i) => {
        const isLeft = i % 2 === 0;
        const delay = (i * 0.1) % 0.7;
        const dur = 2.5 + (i % 4) * 0.4;
        const startY = `${20 + (i * 5.5) % 65}vh`;
        return (
          <motion.div
            key={i}
            initial={{
              x: "50vw",
              y: startY,
              rotate: i * 30,
              scale: 0.3,
              opacity: 0,
            }}
            animate={{
              x: isLeft ? ["50vw", "20vw", "-15vw"] : ["50vw", "80vw", "115vw"],
              y: [startY, `${38 + (i * 4.5) % 55}vh`],
              rotate: i * 30 + (isLeft ? -360 : 360),
              scale: [0.3, 1.3, 0.6],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: dur,
              delay: delay,
              ease: "easeOut",
            }}
            className="absolute w-4 h-5 rounded-tl-[60%] rounded-br-[65%] bg-gradient-to-tr from-[#D62246] to-[#FFA0A0]"
            style={{
              filter: "blur(0.3px)",
            }}
          />
        );
      })}
    </div>
  );
}

// Traditional Gold Engravings on the Palace Doors
const DoorCarvings = ({ side, glowing }: { side: "left" | "right"; glowing: boolean }) => {
  const glowStyle = glowing
    ? {
      filter: "drop-shadow(0 0 10px rgba(212,175,55,1)) drop-shadow(0 0 24px rgba(212,175,55,0.8))",
      stroke: "#FFF1C5",
      transition: "all 1.0s ease-in-out",
    }
    : {
      filter: "drop-shadow(0 0 2px rgba(212,175,55,0.5))",
      stroke: "#D4AF37",
      transition: "all 0.5s ease-in-out",
    };

  return (
    <svg
      className="absolute inset-0 w-full h-full p-4 pointer-events-none"
      viewBox="0 0 250 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rich maroon base fill panels */}
      <rect x="8" y="8" width="234" height="584" rx="12" fill="rgba(90,21,53,0.35)" />

      {/* Outer Gold Border Frame */}
      <rect
        x="8" y="8" width="234" height="584" rx="12"
        stroke="#D4AF37" strokeWidth="2.5"
        style={glowStyle}
      />
      <rect
        x="18" y="18" width="214" height="564" rx="7"
        stroke="#D4AF37" strokeWidth="1"
        strokeDasharray="5 3"
        style={glowStyle}
      />

      {/* Mughal Scalloped Arch — filled with soft maroon glow */}
      <path
        d={
          side === "left"
            ? "M 22 540 L 22 220 C 22 120, 105 78, 246 78 L 246 540 Z"
            : "M 228 540 L 228 220 C 228 120, 145 78, 4 78 L 4 540 Z"
        }
        fill="rgba(122,33,71,0.22)"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeOpacity="0.85"
        style={glowStyle}
      />

      {/* Inner arch detail line */}
      <path
        d={
          side === "left"
            ? "M 35 520 L 35 230 C 35 145, 110 108, 232 108 L 232 520 Z"
            : "M 215 520 L 215 230 C 215 145, 140 108, 18 108 L 18 520 Z"
        }
        stroke="#D4AF37"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
        style={glowStyle}
      />

      {/* Center Door Medallion (lotus / handle area) */}
      <circle
        cx={side === "left" ? 230 : 20}
        cy="300"
        r="32"
        fill="rgba(122,33,71,0.3)"
        stroke="#D4AF37"
        strokeWidth="2"
        style={glowStyle}
      />
      <circle
        cx={side === "left" ? 230 : 20}
        cy="300"
        r="20"
        fill="rgba(212,175,55,0.08)"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeDasharray="3 1"
        style={glowStyle}
      />
      {/* Gold door handle knob */}
      <circle
        cx={side === "left" ? 230 : 20}
        cy="300"
        r="7"
        fill="#D4AF37"
        style={glowStyle}
      />

      {/* Hanging Temple Bell */}
      {side === "left" ? (
        <g transform="translate(125, 165)" style={glowStyle}>
          <line x1="0" y1="-55" x2="0" y2="0" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M -13 12 C -13 -2, 13 -2, 13 12 L 16 26 L -16 26 Z" fill="rgba(212,175,55,0.18)" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="0" cy="30" r="4" fill="#D4AF37" />
          <line x1="-16" y1="22" x2="16" y2="22" stroke="#D4AF37" strokeWidth="1.2" />
          <line x1="-8" y1="26" x2="-8" y2="22" stroke="#D4AF37" strokeWidth="0.8" />
          <line x1="8" y1="26" x2="8" y2="22" stroke="#D4AF37" strokeWidth="0.8" />
        </g>
      ) : (
        <g transform="translate(125, 165)" style={glowStyle}>
          <line x1="0" y1="-55" x2="0" y2="0" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M -13 12 C -13 -2, 13 -2, 13 12 L 16 26 L -16 26 Z" fill="rgba(212,175,55,0.18)" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="0" cy="30" r="4" fill="#D4AF37" />
          <line x1="-16" y1="22" x2="16" y2="22" stroke="#D4AF37" strokeWidth="1.2" />
          <line x1="-8" y1="26" x2="-8" y2="22" stroke="#D4AF37" strokeWidth="0.8" />
          <line x1="8" y1="26" x2="8" y2="22" stroke="#D4AF37" strokeWidth="0.8" />
        </g>
      )}

      {/* Floral mandala center motif */}
      <circle cx="125" cy="430" r="28" fill="rgba(122,33,71,0.2)" stroke="#D4AF37" strokeWidth="1.2" style={glowStyle} />
      <circle cx="125" cy="430" r="18" fill="rgba(212,175,55,0.06)" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 1" style={glowStyle} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={125 + 10 * Math.cos(angle * Math.PI / 180)}
          y1={430 + 10 * Math.sin(angle * Math.PI / 180)}
          x2={125 + 24 * Math.cos(angle * Math.PI / 180)}
          y2={430 + 24 * Math.sin(angle * Math.PI / 180)}
          stroke="#D4AF37" strokeWidth="1"
          style={glowStyle}
        />
      ))}
      <circle cx="125" cy="430" r="4" fill="#D4AF37" style={glowStyle} />

      {/* Palace Jali diagonal lattice */}
      <g opacity="0.14" style={{ stroke: "#D4AF37", strokeWidth: 0.7 }}>
        {Array.from({ length: 8 }).map((_, k) => {
          const offset = k * 40;
          return (
            <React.Fragment key={k}>
              {side === "left" ? (
                <>
                  <line x1="22" y1={300 + offset} x2={240} y2={110 + offset} />
                  <line x1="22" y1={520 - offset} x2={240} y2={310 - offset} />
                </>
              ) : (
                <>
                  <line x1="10" y1={300 + offset} x2={228} y2={110 + offset} />
                  <line x1="10" y1={520 - offset} x2={228} y2={310 - offset} />
                </>
              )}
            </React.Fragment>
          );
        })}
      </g>

      {/* Traditional Corner Flourishes */}
      <path d="M 28 28 L 50 28 A 22 22 0 0 1 28 50 Z" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" strokeWidth="1.5" style={glowStyle} />
      <path d="M 222 28 L 200 28 A 22 22 0 0 0 222 50 Z" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" strokeWidth="1.5" style={glowStyle} />
      <path d="M 28 572 L 50 572 A 22 22 0 0 0 28 550 Z" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" strokeWidth="1.5" style={glowStyle} />
      <path d="M 222 572 L 200 572 A 22 22 0 0 1 222 550 Z" fill="rgba(212,175,55,0.2)" stroke="#D4AF37" strokeWidth="1.5" style={glowStyle} />

      {/* Top center crest */}
      <path d="M 95 30 Q 125 18 155 30" stroke="#D4AF37" strokeWidth="1.5" fill="none" style={glowStyle} />
      <path d="M 108 30 Q 125 22 142 30" stroke="#D4AF37" strokeWidth="0.8" fill="none" style={glowStyle} />
      <circle cx="125" cy="22" r="4" fill="rgba(212,175,55,0.6)" stroke="#D4AF37" strokeWidth="1" style={glowStyle} />
    </svg>
  );
};

type DoorState = "blessing" | "pre-opening" | "opening" | "open";

interface HeroProps {
  onDoorsOpen?: () => void;
}

export default function Hero({ onDoorsOpen }: HeroProps) {
  const { t, locale } = useTranslation();
  const { playAudio } = useAudio();
  const [doorState, setDoorState] = useState<DoorState>("blessing");

  const handleEnter = useCallback(() => {
    if (doorState !== "blessing") return;
    playAudio();
    setDoorState("pre-opening");

    // Vibrate and leak light for 1.5 seconds, then open slowly
    setTimeout(() => {
      setDoorState("opening");
    }, 1500);

    // After majestic slow opening (3.0s), mark as fully open and reveal nav
    setTimeout(() => {
      setDoorState("open");
      onDoorsOpen?.();
    }, 4500);
  }, [doorState, playAudio, onDoorsOpen]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 50%, #FFFDF8 0%, #FAF6EF 60%, #F7F1E6 100%)",
      }}
    >
      {/* Background Rose Petals */}
      <RosePetals />

      {/* 3D PALACE DOORS OVERLAY */}
      <div
        className="absolute inset-0 z-30 pointer-events-none select-none"
        style={{ perspective: "1500px" }}
      >
        {/* Left Palace Door */}
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50%",
            height: "100%",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            pointerEvents: doorState === "blessing" ? "auto" : "none",
            background: "linear-gradient(160deg, #8B2E5A 0%, #7A2147 30%, #5C1535 65%, #3D0B22 100%)",
            boxShadow: "inset -3px 0 14px rgba(0,0,0,0.35), inset 0 0 60px rgba(122,33,71,0.4)",
            filter: "drop-shadow(-6px 12px 28px rgba(60,10,30,0.65))",
          }}
          animate={
            doorState === "pre-opening"
              ? {
                x: [0, -2, 1.5, -1, 1, -1.5, 0],
                rotateY: 0,
              }
              : doorState === "opening" || doorState === "open"
                ? {
                  rotateY: -95,
                }
                : {
                  rotateY: 0,
                }
          }
          transition={{
            duration: doorState === "pre-opening" ? 0.35 : 3.0,
            ease: "easeInOut",
            repeat: doorState === "pre-opening" ? Infinity : 0,
          }}
        >
          {/* Ornate Gold Carvings */}
          <DoorCarvings side="left" glowing={doorState !== "blessing"} />

          {/* Door 3D Thickness Side Face — gold edge */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "20px",
              height: "100%",
              transformOrigin: "right center",
              transform: "rotateY(90deg)",
              background: "linear-gradient(to right, #F3D27F, #D4AF37, #A68018)",
              boxShadow: "inset 1px 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(212,175,55,0.5)",
            }}
          />
        </motion.div>

        {/* Right Palace Door */}
        <motion.div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50%",
            height: "100%",
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
            pointerEvents: doorState === "blessing" ? "auto" : "none",
            background: "linear-gradient(200deg, #8B2E5A 0%, #7A2147 30%, #5C1535 65%, #3D0B22 100%)",
            boxShadow: "inset 3px 0 14px rgba(0,0,0,0.35), inset 0 0 60px rgba(122,33,71,0.4)",
            filter: "drop-shadow(6px 12px 28px rgba(60,10,30,0.65))",
          }}
          animate={
            doorState === "pre-opening"
              ? {
                x: [0, 2, -1.5, 1, -1, 1.5, 0],
                rotateY: 0,
              }
              : doorState === "opening" || doorState === "open"
                ? {
                  rotateY: 95,
                }
                : {
                  rotateY: 0,
                }
          }
          transition={{
            duration: doorState === "pre-opening" ? 0.35 : 3.0,
            ease: "easeInOut",
            repeat: doorState === "pre-opening" ? Infinity : 0,
          }}
        >
          {/* Ornate Gold Carvings */}
          <DoorCarvings side="right" glowing={doorState !== "blessing"} />

          {/* Door 3D Thickness Side Face — gold edge */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "20px",
              height: "100%",
              transformOrigin: "left center",
              transform: "rotateY(-90deg)",
              background: "linear-gradient(to left, #F3D27F, #D4AF37, #A68018)",
              boxShadow: "inset -1px 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(212,175,55,0.5)",
            }}
          />
        </motion.div>
      </div>

      {/* PRE-OPENING LIGHT LEAK CRACK — maroon-gold glow from center seam */}
      {doorState === "pre-opening" && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.1 }}
          animate={{ opacity: [0.4, 1, 0.55, 1], scaleX: [0.1, 1.6, 0.8, 1.2] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 left-[50%] w-3 -ml-[6px] z-35 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), #FFFDF8, rgba(212,175,55,0.4), transparent)",
            boxShadow: "0 0 20px rgba(255,223,138,0.9), 0 0 50px rgba(212,175,55,0.6), 0 0 80px rgba(122,33,71,0.35)",
          }}
        />
      )}

      {/* VOLUMETRIC LIGHT RAYS */}
      {doorState === "opening" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-25">
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.85, 0.85, 0], scale: [0.4, 1.6, 2.4] }}
            transition={{ duration: 3.0, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, #FFF8EE 0%, #FFDF8A 30%, #D4AF37 60%, #7A2147 90%, transparent 100%)",
              mixBlendMode: "screen",
            }}
          />
          {/* Maroon-gold volumetric light rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              initial={{ rotate: i * 45 - 20, scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 2.0, 2.8],
                opacity: [0, 0.75, 0.3, 0],
              }}
              transition={{ duration: 3.0, ease: "easeOut", delay: i * 0.04 }}
              className="absolute w-[140vw] h-[6vh] origin-center"
              style={{
                background: "linear-gradient(90deg, transparent 35%, rgba(255,223,138,0.8) 48%, rgba(255,248,238,0.9) 50%, rgba(255,223,138,0.8) 52%, transparent 65%)",
                mixBlendMode: "screen",
              }}
            />
          ))}
        </div>
      )}

      {/* FLYING PETALS & SPARKLES FROM GAP */}
      {doorState === "opening" && (
        <>
          <OpeningParticles />
          <OpeningPetals />
        </>
      )}

      {/* GANESHA BLESSING SCREEN OVERLAY */}
      <AnimatePresence>
        {doorState === "blessing" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-45 flex flex-col items-center justify-center px-5 select-none"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(61,11,34,0.72) 0%, rgba(92,21,53,0.85) 45%, rgba(35,4,18,0.92) 100%)",
            }}
          >
            {/* Pulsing and spinning circles behind Ganesha */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(16px, 4vw, 28px)" }}>
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.1, 0.25] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: 170, height: 170, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,184,75,0.25) 0%, transparent 65%)", filter: "blur(14px)" }}
              />
              {[80, 110, 140].map((size, ri) => (
                <motion.div
                  key={ri}
                  style={{ position: "absolute", width: size, height: size, border: `${ri === 1 ? "1px dashed" : "1px solid"} rgba(212,175,55,${0.45 - ri * 0.1})`, borderRadius: "50%" }}
                  animate={{ scale: [1, 1.06, 1], opacity: [0.7, 0.25, 0.7], rotate: ri === 1 ? [0, 360] : [0, -360] }}
                  transition={{ duration: 4 + ri * 1.2, repeat: Infinity, ease: ri === 1 ? "linear" : "easeInOut" }}
                />
              ))}
              {Array.from({ length: 6 }).map((_, pi) => (
                <motion.div
                  key={pi}
                  style={{ position: "absolute", width: 130, height: 130, display: "flex", alignItems: "flex-start", justifyContent: "center" }}
                  animate={{ rotate: [pi * 60, pi * 60 + 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <span style={{ fontSize: 11, marginTop: -4 }}>🌸</span>
                </motion.div>
              ))}
              <motion.div
                animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "clamp(80px, 20vw, 110px)",
                  height: "clamp(80px, 20vw, 110px)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Image
                  src="/assets/ganesha.webp"
                  alt="Lord Ganesha"
                  fill
                  priority
                  sizes="110px"
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.75))" }}
                />
              </motion.div>
            </div>

            {/* Mantra */}
            <p
              className="text-center font-bold"
              style={{
                fontFamily: "var(--font-noto-devanagari)",
                fontSize: "clamp(13px, 3.8vw, 18px)",
                letterSpacing: "0.18em",
                color: "#E8B84B",
                marginBottom: "clamp(10px, 2.5vw, 16px)",
                textShadow: "0 0 24px rgba(232,184,75,0.55)",
              }}
            >
              ॥ श्री गणेशाय नमः ॥
            </p>

            <div style={{ width: "min(260px, 68vw)", height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)", marginBottom: "clamp(10px, 2.5vw, 16px)" }} />

            {/* Family Line */}
            <p
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-lora)",
                fontSize: locale === "hi" ? "clamp(10px, 2.4vw, 14px)" : "clamp(9px, 2.2vw, 12px)",
                letterSpacing: locale === "hi" ? "0.08em" : "0.38em",
                color: "rgba(212,175,55,0.65)",
                textTransform: "uppercase",
                marginBottom: "clamp(10px, 2.5vw, 16px)",
                textAlign: "center",
                fontWeight: locale === "hi" ? 600 : 400,
              }}
            >
              {locale === "hi" ? "अपने परिजनों के साथ" : "Together With Their Families"}
            </p>

            {/* Couple Cursive Names */}
            <div style={{ textAlign: "center", marginBottom: "clamp(20px, 5vw, 32px)" }}>
              <span
                style={{
                  display: "block",
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-cursive)",
                  fontSize: locale === "hi" ? "clamp(26px, 7vw, 42px)" : "clamp(36px, 9.5vw, 68px)",
                  lineHeight: locale === "hi" ? 1.45 : 1.2,
                  fontWeight: locale === "hi" ? 700 : 400,
                  letterSpacing: locale === "hi" ? "0.05em" : "normal",
                  background: "linear-gradient(135deg, #F3D27F 0%, #E8B84B 40%, #D4AF37 70%, #F3D27F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 12px rgba(212,175,55,0.45))",
                }}
              >
                {locale === "hi" ? "दीपक" : "Deepak"}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-playfair)",
                  fontSize: locale === "hi" ? "clamp(12px, 3vw, 17px)" : "clamp(11px, 2.5vw, 15px)",
                  color: "rgba(212,175,55,0.65)",
                  letterSpacing: locale === "hi" ? "0.15em" : "0.5em",
                  margin: locale === "hi" ? "14px 0" : "10px 0",
                  fontWeight: locale === "hi" ? 600 : 400,
                }}
              >
                {locale === "hi" ? "✦ संग ✦" : "✦ Weds ✦"}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-cursive)",
                  fontSize: locale === "hi" ? "clamp(26px, 7vw, 42px)" : "clamp(36px, 9.5vw, 68px)",
                  lineHeight: locale === "hi" ? 1.45 : 1.2,
                  fontWeight: locale === "hi" ? 700 : 400,
                  letterSpacing: locale === "hi" ? "0.05em" : "normal",
                  background: "linear-gradient(135deg, #F3D27F 0%, #E8B84B 40%, #D4AF37 70%, #F3D27F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 12px rgba(212,175,55,0.45))",
                }}
              >
                {locale === "hi" ? "चांदनी" : "Chandani"}
              </span>
            </div>

            <div style={{ width: "min(200px, 55vw)", height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)", marginBottom: "clamp(18px, 4.5vw, 30px)" }} />

            {/* BUTTON (ROYAL SEAL) */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(14px, 3.5vw, 24px)" }}>
              {/* Pulse rings */}
              {[{ s: 140, b: "1.5px solid", o: 0.55, dur: 2.5 }, { s: 116, b: "1px dashed", o: 0.4, dur: 3.2 }, { s: 92, b: "1.5px solid", o: 0.65, dur: 2 }].map((r, ri) => (
                <motion.div
                  key={ri}
                  style={{ position: "absolute", width: r.s, height: r.s, border: `${r.b} rgba(212,175,55,${r.o})`, borderRadius: "50%" }}
                  animate={{ scale: [1, 1.09, 1], opacity: [r.o, r.o * 0.35, r.o], rotate: ri === 1 ? [0, 360] : undefined }}
                  transition={{ duration: r.dur, repeat: Infinity, ease: ri === 1 ? "linear" : "easeInOut" }}
                />
              ))}
              {[0, 0.5, 1].map(d => (
                <motion.div
                  key={d}
                  style={{ position: "absolute", width: 100, height: 100, border: "1.5px solid rgba(212,175,55,0.5)", borderRadius: "50%" }}
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, delay: d, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 10,
                  background: "radial-gradient(circle at 38% 32%, #7B1520 0%, #5C0E16 45%, #360009 100%)",
                  border: "2.5px solid #D4AF37",
                  boxShadow: "0 0 0 1px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: "10%", left: "18%", width: "38%", height: "28%", background: "linear-gradient(145deg, rgba(255,255,255,0.22), transparent)", borderRadius: "50%", transform: "rotate(-25deg)" }} />
                <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,20,45,0.35) 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px solid rgba(212,175,55,0.35)" }} />
                <motion.span
                  animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: 22, lineHeight: 1, filter: "drop-shadow(0 0 10px rgba(212,175,55,1))", zIndex: 1 }}
                >
                  ✦
                </motion.span>
                <span
                  style={{
                    fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-playfair)",
                    fontSize: locale === "hi" ? 8.5 : 7.5,
                    letterSpacing: locale === "hi" ? "0.05em" : "0.18em",
                    color: "#D4AF37",
                    textTransform: "uppercase",
                    zIndex: 1,
                    marginTop: 3,
                    textAlign: "center",
                    lineHeight: 1.3,
                    fontWeight: locale === "hi" ? 600 : 400,
                  }}
                >
                  {locale === "hi" ? "प्रवेश" : "Enter"}
                </span>
              </motion.button>
            </div>

            {/* CTA text */}
            <div style={{ textAlign: "center", marginBottom: "clamp(10px, 2.5vw, 18px)" }}>
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45], y: [0, -3, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-playfair)",
                  fontSize: locale === "hi" ? "clamp(10px, 2.6vw, 14px)" : "clamp(9px, 2.4vw, 13px)",
                  letterSpacing: locale === "hi" ? "0.08em" : "0.32em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                  fontWeight: locale === "hi" ? 600 : 400,
                }}
              >
                {locale === "hi" ? "✨ उत्सव में प्रवेश करें ✨" : "✨ ENTER THE CELEBRATION ✨"}
              </motion.p>
            </div>

            {/* Tap prompt */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <motion.div
                animate={{ y: [6, 0, 6, 0, 6], scale: [1, 1.2, 1, 1.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }}
                style={{ fontSize: "clamp(18px, 4.5vw, 24px)", filter: "drop-shadow(0 0 10px rgba(232,184,75,0.8))" }}
              >
                👆
              </motion.div>
              <motion.div
                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}
              >
                {[0, 0.15, 0.3].map(d => (
                  <motion.div
                    key={d}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: d }}
                    style={{ width: 8, height: 8, borderRight: "1.5px solid rgba(212,175,55,0.7)", borderTop: "1.5px solid rgba(212,175,55,0.7)", transform: "rotate(-45deg)" }}
                  />
                ))}
              </motion.div>
              <motion.p
                animate={{ opacity: [0.35, 0.85, 0.35] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-poppins)",
                  fontSize: locale === "hi" ? "clamp(9px, 2.2vw, 11px)" : "clamp(8px, 2vw, 10px)",
                  letterSpacing: locale === "hi" ? "0.1em" : "0.38em",
                  color: "rgba(212,175,55,0.6)",
                  textTransform: "uppercase",
                  marginTop: 4,
                  fontWeight: locale === "hi" ? 500 : 400,
                }}
              >
                {locale === "hi" ? "👇 शुरू करने के लिए यहाँ टैप करें 👇" : "👇 Tap Here To Begin 👇"}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HERO CONTENT (revealed behind the opening doors) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={
          doorState === "opening" || doorState === "open"
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1.05 }
        }
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Card corner ornaments */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/25 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/25 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/25 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/25 rounded-br-lg pointer-events-none" />

        <div className="w-full max-w-5xl h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 relative">

          {/* Left Column: Groom Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -12 }}
            animate={
              doorState === "opening" || doorState === "open"
                ? { opacity: 1, x: 0, rotateY: 0 }
                : { opacity: 0, x: -30, rotateY: -12 }
            }
            transition={{ duration: 1.6, delay: 0.45, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center w-[28%] max-w-[280px]"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full"
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  borderRadius: "24px",
                  border: `3px solid ${GOLD}`,
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(90, 70, 52, 0.12)",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/groom.jpeg"
                  alt="Groom"
                  fill
                  sizes="280px"
                  className="object-cover animate-pulse-glow"
                />
              </div>
              <p className="text-center font-serif italic text-[11px] mt-3 text-[#5A4634] tracking-widest uppercase font-semibold">{t("couple.groom.role")}</p>
            </motion.div>
          </motion.div>

          {/* Center Column: Ganesha, Interlocking Hearts, Couple Names, Date */}
          <div className="flex flex-col items-center justify-center flex-1 text-center py-6">

            {/* Center Ganesha reveal */}
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={
                doorState === "opening" || doorState === "open"
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1.15, opacity: 0 }
              }
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -3, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 md:w-12 md:h-12 relative mb-3"
              >
                <Image
                  src="/images/ganesha.png"
                  alt="Ganesha Icon"
                  fill
                  sizes="48px"
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.4))" }}
                />
              </motion.div>
            </motion.div>

            {/* Interlocking Hearts */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                doorState === "opening" || doorState === "open"
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 1.4, delay: 0.35, ease: "easeOut" }}
              className="flex justify-center items-center h-10 w-16 mb-2 mt-1 relative"
            >
              <motion.svg
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 text-[#D4AF37] absolute left-0 drop-shadow-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </motion.svg>
              <motion.svg
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="w-8 h-8 text-[#D8A28C] absolute right-0 drop-shadow-sm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </motion.svg>
            </motion.div>

            {/* Script Couple Names */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={
                doorState === "opening" || doorState === "open"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 15 }
              }
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              className="text-[#6B0F1A] font-normal leading-tight my-4 md:my-6 select-none"
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-cursive)",
                fontSize: locale === "hi" ? "clamp(26px, 6.5vw, 42px)" : "clamp(36px, 9.5vw, 68px)",
                fontWeight: locale === "hi" ? 700 : 400,
                letterSpacing: locale === "hi" ? "0.05em" : "normal",
              }}
            >
              {locale === "hi" ? "दीपक संग चांदनी" : "Deepak Weds Chandani"}
            </motion.h2>

            {/* "Are Getting Married" */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={
                doorState === "opening" || doorState === "open"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 1.4, delay: 0.75, ease: "easeOut" }}
              className="text-[#5A4634] font-semibold mb-5 mt-3"
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-sans), sans-serif",
                fontSize: locale === "hi" ? "clamp(11px, 2.5vw, 13px)" : "clamp(10px, 2vw, 12px)",
                letterSpacing: locale === "hi" ? "0.08em" : "0.4em",
                textTransform: locale === "hi" ? "none" : "uppercase",
              }}
            >
              {locale === "hi" ? "परिणय सूत्र में बंधने जा रहे हैं" : "Are Getting Married"}
            </motion.p>

            {/* Date and Location */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={
                doorState === "opening" || doorState === "open"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
            >
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4 mx-auto" />
              <p
                className="text-[#D4AF37] font-bold"
                style={{
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-serif), serif",
                  fontSize: locale === "hi" ? "clamp(12px, 3.2vw, 16px)" : "clamp(11px, 2.8vw, 14px)",
                  letterSpacing: locale === "hi" ? "0.08em" : "0.3em",
                }}
              >
                {locale === "hi" ? "10 फरवरी, 2027" : "10 FEB 2027"}
              </p>
              <p
                className="text-[#5A4634]/75 mt-1"
                style={{
                  fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-serif), serif",
                  fontSize: locale === "hi" ? "clamp(11px, 2.5vw, 13px)" : "clamp(10px, 2vw, 12px)",
                  letterSpacing: locale === "hi" ? "0.05em" : "0.15em",
                }}
              >
                {locale === "hi" ? "पलामू, झारखंड" : "Palamu, Jharkhand"}
              </p>
            </motion.div>

            {/* Mobile side-by-side reveal */}
            <div className="flex md:hidden items-center justify-center gap-6 mt-6" style={{ perspective: 800 }}>
              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: -8 }}
                animate={
                  doorState === "opening" || doorState === "open"
                    ? { opacity: 1, y: 0, rotateY: 0 }
                    : { opacity: 0, y: 20, rotateY: -8 }
                }
                transition={{ duration: 1.4, delay: 0.45, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-40 rounded-2xl border-2 border-[#D4AF37] overflow-hidden shadow-lg relative"
                >
                  <Image
                    src="/images/groom.jpeg"
                    alt="Groom"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </motion.div>
                <span className="text-[9px] text-[#5A4634]/85 font-serif font-bold uppercase mt-2.5 tracking-wider">{t("couple.groom.role")}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, rotateY: 8 }}
                animate={
                  doorState === "opening" || doorState === "open"
                    ? { opacity: 1, y: 0, rotateY: 0 }
                    : { opacity: 0, y: 20, rotateY: 8 }
                }
                transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-28 h-40 rounded-2xl border-2 border-[#D4AF37] overflow-hidden shadow-lg relative"
                >
                  <Image
                    src="/images/bride.jpeg"
                    alt="Bride"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </motion.div>
                <span className="text-[9px] text-[#5A4634]/85 font-serif font-bold uppercase mt-2.5 tracking-wider">{t("couple.bride.role")}</span>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Bride Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 12 }}
            animate={
              doorState === "opening" || doorState === "open"
                ? { opacity: 1, x: 0, rotateY: 0 }
                : { opacity: 0, x: 30, rotateY: 12 }
            }
            transition={{ duration: 1.6, delay: 0.55, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center w-[28%] max-w-[280px]"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0.5, -0.5, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-full"
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "2/3",
                  borderRadius: "24px",
                  border: `3px solid ${GOLD}`,
                  overflow: "hidden",
                  boxShadow: "0 15px 35px rgba(90, 70, 52, 0.12)",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/bride.jpeg"
                  alt="Bride"
                  fill
                  sizes="280px"
                  className="object-cover animate-pulse-glow"
                />
              </div>
              <p className="text-center font-serif italic text-[11px] mt-3 text-[#5A4634] tracking-widest uppercase font-semibold">{t("couple.bride.role")}</p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* DOWN SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={doorState === "open" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-sans), sans-serif",
            fontSize: locale === "hi" ? "0.7rem" : "0.58rem",
            letterSpacing: locale === "hi" ? "0.05em" : "0.45em",
            color: "#5A4634",
            textTransform: locale === "hi" ? "none" : "uppercase",
            opacity: 0.55,
            fontWeight: locale === "hi" ? 500 : 400,
          }}
        >
          {locale === "hi" ? "नीचे स्क्रॉल करें" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 16,
            height: 26,
            borderRadius: 8,
            border: "1.5px solid rgba(90, 70, 52, 0.35)",
            display: "flex",
            justifyContent: "center",
            paddingTop: 4,
          }}
        >
          <div
            style={{
              width: 3,
              height: 5,
              borderRadius: 1,
              background: "rgba(90, 70, 52, 0.5)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
