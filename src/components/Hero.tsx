"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const GOLD = "#D4AF37";
const GOLD_SOFT = "rgba(212, 175, 55, 0.4)";

function GatePanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #8B1A28 0%, #6B0F1A 35%, #4A0A12 100%)",
        position: "relative",
        overflow: "hidden",
        borderRight: isLeft ? `4px solid ${GOLD}` : undefined,
        borderLeft: !isLeft ? `4px solid ${GOLD}` : undefined,
        boxShadow: isLeft
          ? `inset -6px 0 30px rgba(0,0,0,0.3), -4px 0 20px rgba(212,175,55,0.2)`
          : `inset 6px 0 30px rgba(0,0,0,0.3), 4px 0 20px rgba(212,175,55,0.2)`,
      }}
    >
      {/* Diamond lattice */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: `repeating-linear-gradient(${isLeft ? 45 : -45}deg, ${GOLD} 0, ${GOLD} 1px, transparent 0, transparent 50%)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vertical centre line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "6%",
          bottom: "6%",
          width: "1.5px",
          transform: "translateX(-50%)",
          background: `linear-gradient(to bottom, transparent, ${GOLD_SOFT} 20%, ${GOLD_SOFT} 80%, transparent)`,
        }}
      />

      {/* Horizontal centre bar */}
      <div
        style={{
          position: "absolute",
          left: "5%",
          right: "5%",
          top: "50%",
          height: "2px",
          transform: "translateY(-50%)",
          background: `linear-gradient(to ${isLeft ? "right" : "left"}, transparent, ${GOLD_SOFT} 30%, ${GOLD_SOFT} 70%, transparent)`,
        }}
      />

      {/* Door boss row — inner edge */}
      <div
        style={{
          position: "absolute",
          [isLeft ? "right" : "left"]: "12px",
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "32px 0",
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: `1.5px solid ${GOLD_SOFT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(212,175,55,0.08)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E8B04A",
                boxShadow: "0 0 6px #E8B04A",
              }}
            />
          </div>
        ))}
      </div>

      {/* Top arch */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          height: 70,
          borderTop: `1.5px solid ${GOLD_SOFT}`,
          borderLeft: `1.5px solid ${GOLD_SOFT}`,
          borderRight: `1.5px solid ${GOLD_SOFT}`,
          borderRadius: "50% / 100% 100% 0 0",
        }}
      />

      {/* Bottom arch */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          height: 55,
          borderBottom: `1.5px solid ${GOLD_SOFT}`,
          borderLeft: `1.5px solid ${GOLD_SOFT}`,
          borderRight: `1.5px solid ${GOLD_SOFT}`,
          borderRadius: "0 0 50% / 0 0 100% 100%",
        }}
      />

      {/* Sanskrit inscription */}
      <div
        className="font-serif font-bold tracking-widest text-[#D4AF37]"
        style={{
          position: "absolute",
          [isLeft ? "left" : "right"]: "20%",
          top: "50%",
          transform: "translateY(-50%)",
          writingMode: "vertical-lr",
          fontSize: "1.0rem",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {isLeft ? "शुभ विवाह" : "मंगल मिलन"}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t, locale } = useTranslation();

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 50%, #FFFDF8 0%, #FAF6EF 60%, #F7F1E6 100%)"
      }}
    >
      {/* LEFT PALACE GATE (Auto-opens on mount) */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{ delay: 0.5, duration: 1.8, ease: [0.25, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "50.5%",
          zIndex: 20,
          willChange: "transform",
        }}
      >
        <GatePanel side="left" />
      </motion.div>

      {/* RIGHT PALACE GATE (Auto-opens on mount) */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ delay: 0.5, duration: 1.8, ease: [0.25, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "50.5%",
          zIndex: 20,
          willChange: "transform",
        }}
      >
        <GatePanel side="right" />
      </motion.div>

      {/* MAIN HERO CONTENT (Revealed behind the gates) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Corner ornaments for reveal card background */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/25 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/25 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/25 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/25 rounded-br-lg pointer-events-none" />

        {/* Floating flower petals */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${8 + i * 16}%`,
              fontSize: "1.1rem",
              opacity: 0.35,
              color: "#D8A28C",
            }}
            animate={{
              y: ["-5vh", "105vh"],
              rotate: [0, 240 + i * 40],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: 6 + i * 1.0,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🌸
          </motion.div>
        ))}

        <div className="w-full max-w-5xl h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-10 relative">

          {/* Left Column: Groom Portrait (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center w-[28%] max-w-[280px]"
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
                }}
              >
                <img src="/images/groom.jpeg" alt="Groom" className="w-full h-full object-cover animate-pulse-glow" />
              </div>
              <p className="text-center font-serif italic text-[11px] mt-3 text-[#5A4634] tracking-widest uppercase font-semibold">{t("couple.groom.role")}</p>
            </motion.div>
          </motion.div>

          {/* Center Column: Details, hearts, cursive names, Ganesha */}
          <div className="flex flex-col items-center justify-center flex-1 text-center py-6">

            {/* Small Ganesha on top center */}
            <motion.img
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
              src="/images/ganesha.png"
              alt="Ganesha Icon"
              className="w-10 h-10 md:w-12 md:h-12 object-contain mb-3 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]"
            />

            {/* Double Interlocking Hearts Outline */}
            <div className="flex justify-center items-center h-10 w-16 mb-2 mt-1 relative">
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
            </div>

            {/* Cursive Couple Names */}
            <h2 className="font-cursive text-4xl md:text-5.5xl text-[#6B0F1A] font-normal leading-tight my-1 select-none">
              {locale === "hi" ? "दीपक" : "Deepak"} & {locale === "hi" ? "चंदनी" : "Chandani"}
            </h2>

            {/* "Are Getting Married" */}
            <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#5A4634] font-semibold uppercase mb-4 mt-2">
              Are Getting Married
            </p>

            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4" />

            {/* Wedding Date */}
            <p className="font-serif text-xs md:text-sm tracking-[0.3em] text-[#D4AF37] font-bold">
              07 • 08 • 09 • 10 FEB 2027
            </p>
            <p className="font-serif text-[10px] md:text-xs text-[#5A4634]/75 tracking-[0.15em] mt-1">
              Palamu, Jharkhand
            </p>

            {/* Mobile-only Bride & Groom side-by-side bottom display */}
            <div className="flex md:hidden items-center justify-center gap-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 1.1, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-40 rounded-2xl border-2 border-[#D4AF37] overflow-hidden shadow-lg"
                >
                  <img src="/images/groom.jpeg" alt="Groom" className="w-full h-full object-cover" />
                </motion.div>
                <span className="text-[9px] text-[#5A4634]/85 font-serif font-bold uppercase mt-2.5 tracking-wider">{t("couple.groom.role")}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="w-28 h-40 rounded-2xl border-2 border-[#D4AF37] overflow-hidden shadow-lg"
                >
                  <img src="/images/bride.jpeg" alt="Bride" className="w-full h-full object-cover" />
                </motion.div>
                <span className="text-[9px] text-[#5A4634]/85 font-serif font-bold uppercase mt-2.5 tracking-wider">{t("couple.bride.role")}</span>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Bride Portrait (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            className="hidden md:flex flex-col items-center justify-center w-[28%] max-w-[280px]"
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
                }}
              >
                <img src="/images/bride.jpeg" alt="Bride" className="w-full h-full object-cover animate-pulse-glow" />
              </div>
              <p className="text-center font-serif italic text-[11px] mt-3 text-[#5A4634] tracking-widest uppercase font-semibold">{t("couple.bride.role")}</p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <div
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
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.45em",
            color: "#5A4634",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          Scroll
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
      </div>
    </section>
  );
}
