"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const GOLD = "#D4AF37";

// Elegant corner flourish SVG component to dress up the palace photo frame
function GoldCornerFlourish({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotation = {
    tl: "rotate-0 top-3 left-3",
    tr: "rotate-90 top-3 right-3",
    bl: "rotate-270 bottom-3 left-3",
    br: "rotate-180 bottom-3 right-3",
  }[position];

  return (
    <svg
      className={`absolute w-8 h-8 text-[#D4AF37]/50 pointer-events-none ${rotation}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
    >
      {/* Royal corner scroll design */}
      <path d="M 0 50 Q 20 20 50 0 M 0 30 Q 30 30 30 0 M 0 10 L 10 0 M 0 100 L 0 0 L 100 0" />
    </svg>
  );
}

export default function Welcome() {
  const { t } = useTranslation();

  return (
    <section
      id="welcome"
      className="relative py-12 md:py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 10%, #FFFDF8 0%, #FAF6EF 70%, #F5EFE4 100%)",
      }}
    >
      {/* Decorative stars */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 31 + 14) % 95}%`,
            top: `${(i * 47 + 7) % 92}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(212, 175, 55, 0.45)",
            "--duration": `${3.0 + (i % 3) * 0.8}s`,
            "--delay": `${i * 0.4}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Floating background orbs */}
      <div
        className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-40 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 75%)" }}
      />
      <div
        className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-40 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(107,15,26,0.04) 0%, transparent 75%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Royal Framed Palace Illustration with rotating Mandala */}
          <div className="lg:col-span-5 flex justify-center relative select-none">
            
            {/* Spinning Gold Mandala Emblem Backdrop */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 md:-inset-16 pointer-events-none opacity-10 flex items-center justify-center z-0"
            >
              <svg className="w-full h-full max-w-[420px] text-[#D4AF37]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0c-1.3 0-2.5 1.2-2.5 2.5v4.3c-7.3.7-13.9 4.3-18.4 9.7L26 13.4c-.9-.9-2.4-.9-3.3 0s-.9 2.4 0 3.3l3.1 3.1c-5.4 4.5-9 11.1-9.7 18.4H11.8c-1.3 0-2.5 1.2-2.5 2.5s1.2 2.5 2.5 2.5h4.3c.7 7.3 4.3 13.9 9.7 18.4l-3.1 3.1c-.9.9-.9 2.4 0 3.3.9.9 2.4.9 3.3 0l3.1-3.1c4.5 5.4 11.1 9 18.4 9.7v4.3c0 1.3 1.2 2.5 2.5 2.5s2.5-1.2 2.5-2.5v-4.3c7.3-.7 13.9-4.3 18.4-9.7l3.1 3.1c.9.9 2.4.9 3.3 0s.9-2.4 0-3.3l-3.1-3.1c5.4-4.5 9-11.1 9.7-18.4h4.3c1.3 0 2.5-1.2 2.5-2.5s-1.2-2.5-2.5-2.5h-4.3c-.7-7.3-4.3-13.9-9.7-18.4l3.1-3.1c.9-.9.9-2.4 0-3.3s-2.4-.9-3.3 0l-3.1 3.1C66.4 8.5 59.8 4.9 52.5 4.2V2.5C52.5 1.2 51.3 0 50 0zm0 10c22.1 0 40 17.9 40 40S72.1 90 50 90 10 72.1 10 50s17.9-40 40-40zm0 15c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25z" />
              </svg>
            </motion.div>

            {/* Main Picture Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-[340px] md:max-w-[360px] z-10"
            >
              {/* Outer Fine Gold Line Border with Padding */}
              <div className="w-full p-4 border border-[#D4AF37]/55 rounded-[32px] bg-white/70 shadow-2xl backdrop-blur-sm relative">
                
                {/* Gold Corner SVGs */}
                <GoldCornerFlourish position="tl" />
                <GoldCornerFlourish position="tr" />
                <GoldCornerFlourish position="bl" />
                <GoldCornerFlourish position="br" />

                {/* Inner Image Frame */}
                <div className="relative w-full aspect-[4/5] rounded-[22px] overflow-hidden border-2 border-[#D4AF37]/75 bg-gradient-to-b from-[#FAF6EF] to-[#EAE0D0]">
                  <img
                    src="/assets/palace.webp"
                    alt="Wedding Venue watercolor"
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  {/* Elegant vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5A4634]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Flower Petal Overlay */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 text-3xl z-20 pointer-events-none drop-shadow-md"
              >
                🌸
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-3 -right-3 text-3xl z-20 pointer-events-none drop-shadow-md"
              >
                🌸
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Royal Invitation Typography */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
            
            {/* Elegant Emblem & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center lg:items-start mb-4"
            >
              <div className="flex items-center gap-3.5 mb-2">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#6B0F1A]" />
                <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] text-[#6B0F1A] font-bold uppercase">
                  A Royal Welcome
                </span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#6B0F1A]" />
              </div>
              
              <h2 className="font-display text-3xl md:text-4.5xl text-[#5A4634] leading-tight font-medium tracking-wide">
                {t("welcome.heading")}
              </h2>
            </motion.div>

            {/* Decorative Gold Leaf Accent Line */}
            <div className="h-[2px] w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent lg:bg-gradient-to-r lg:from-[#D4AF37] lg:to-transparent mb-8 mx-auto lg:mx-0" />

            {/* Luxurious Quote Paper Block */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="relative p-6 md:p-8 rounded-[24px] bg-[#FAF6EF]/90 border border-[#D4AF37]/35 shadow-xl shadow-[#5A4634]/5 backdrop-blur-md mb-6 relative overflow-hidden"
              style={{
                backgroundImage: "radial-gradient(circle at 100% 100%, rgba(212,175,55,0.03) 0%, transparent 60%)"
              }}
            >
              {/* Filigree corner accents inside the card */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4AF37]/30 rounded-tl" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D4AF37]/30 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D4AF37]/30 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4AF37]/30 rounded-br" />

              {/* Large Stylized Quote Sign */}
              <span className="absolute top-2 left-5 font-serif text-5xl text-[#D4AF37] opacity-35 select-none leading-none">“</span>
              
              <p className="font-serif italic text-base md:text-[1.12rem] text-[#6B0F1A] leading-relaxed pt-3 px-4 pb-4 select-none tracking-wide text-center">
                {t("welcome.quote")}
              </p>

              <div className="h-[1px] w-[50%] bg-[#D4AF37]/20 mx-auto mb-4" />

              <p className="font-serif text-xs md:text-sm text-[#5A4634]/90 leading-relaxed text-justify md:text-left font-medium">
                {t("welcome.desc")}
              </p>
            </motion.div>

            {/* Custom Monogram Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-4 mt-2"
            >
              <div className="w-10 h-[1.5px] bg-[#D4AF37]/45" />
              <div className="font-cursive text-xl md:text-2xl text-[#D4AF37] font-semibold tracking-widest select-none flex items-center gap-3">
                <span>D</span>
                <span className="text-sm">✦</span>
                <span>C</span>
              </div>
              <div className="w-10 h-[1.5px] bg-[#D4AF37]/45" />
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
