"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { MapPin, Navigation, Compass } from "lucide-react";

// Hanging garland string above each venue plaque
function MarigoldGarland() {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none mb-1.5">
      <div className="w-4 h-0.5 bg-[#D4AF37] opacity-60 rounded-full" />
      <div className="w-[0.5px] h-2.5 bg-[#D4AF37]/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_4px_rgba(255,107,53,0.5)] border border-[#FAF7F2]/10" />
      <div className="w-2 h-2 rounded-full bg-[#FFB703] shadow-[0_0_4px_rgba(255,183,3,0.5)] border border-[#FAF7F2]/10 -mt-0.5" />
      <div className="w-[0.5px] h-2 bg-[#D4AF37]/50" />
    </div>
  );
}

// Glowing stars in plaque corners
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

// Animated mock vector map illustration
function AnimatedVectorMap({ googleMapsUrl }: { googleMapsUrl: string }) {
  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full h-[75px] sm:h-[95px] rounded-xl overflow-hidden bg-[#2A0508]/60 border border-[#D4AF37]/25 hover:border-[#D4AF37]/65 transition-colors duration-300 mt-3 group"
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      />

      {/* Decorative dashed road paths */}
      <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 25 C30 20, 60 70, 100 65" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M25 0 C40 30, 10 70, 80 100" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M70 0 L70 100" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1 4" />
      </svg>

      {/* Pulsing Beacon in Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 animate-ping absolute" />
        <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 animate-pulse absolute" />
        <MapPin size={18} className="text-[#FFC83B] relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-bounce" />
      </div>

      {/* Tap Instruction Indicator */}
      <div className="absolute bottom-1 right-2 text-[7px] text-[#D4AF37]/70 uppercase tracking-widest pointer-events-none group-hover:text-[#FFC83B] transition-colors">
        <span>Click to View Map ✦</span>
      </div>

      <div className="absolute top-1 left-2 text-[6.5px] text-[#FAF7F2]/40 uppercase tracking-widest pointer-events-none">
        <span>GPS coordinates mapped</span>
      </div>
    </a>
  );
}

export default function Venue() {
  const { t, locale } = useTranslation();
  const isHi = locale === "hi";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const venues = [
    {
      id: "tilak",
      titleEn: "Tilak Ceremony Venue",
      titleHi: "तिलक समारोह स्थल",
      hostEn: "Er. V. Prasad Niwas",
      hostHi: "इंजी. वी. प्रसाद निवास",
      address: "Vill Panti, Po- Karimandih, PS: Mohammad Ganj, Dist: Palamu, Jharkhand 822115",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Er.+V.+Prasad+Niwas+Vill+Panti+Po+Karimandih+PS+Mohammad+Ganj+Dist+Palamu+Jharkhand+822115",
      bgGradient: "linear-gradient(135deg, #6A2510 0%, #3A1005 100%)",
    },
    {
      id: "wedding",
      titleEn: "Wedding Ceremony Venue",
      titleHi: "शुभ विवाह स्थल",
      hostEn: "Mr. Satish Chandravanshi",
      hostHi: "श्री सतीश चंद्रवंशी निवास",
      address: "Vill- badepur, po- badepur, ps- japla, dist palamu, jharkhand 822116",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mr.+Satish+singh+Vill+badepur+po+badepur+ps+japla+dist+palamu+jharkhand+822116",
      bgGradient: "linear-gradient(135deg, #701019 0%, #3C050B 100%)",
    }
  ];

  return (
    <section
      id="venue"
      className="relative py-12 md:py-16 px-4 md:px-6 w-full flex flex-col items-center justify-center min-h-[85vh] md:min-h-[92vh] animate-bg-luxury-light overflow-hidden"
      style={{
        boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Background Mandala Watermarks */}
      <div className="absolute top-12 left-12 w-48 h-48 rounded-full border border-[#D4AF37]/5 pointer-events-none select-none animate-spin-slow opacity-25" />
      <div className="absolute bottom-12 right-12 w-56 h-56 rounded-full border border-[#D4AF37]/5 pointer-events-none select-none animate-spin-slow opacity-25" />

      {/* Background Twinkling Stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 37 + 19) % 99}%`,
            top: `${(i * 41 + 13) % 96}%`,
            width: i % 4 === 0 ? 2.5 : 1.2,
            height: i % 4 === 0 ? 2.5 : 1.2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#D4AF37" : "rgba(107, 15, 26, 0.25)",
            "--duration": `${2.5 + (i % 3) * 0.7}s`,
            "--delay": `${i * 0.2}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Luxury Border Outline */}
      <div className="absolute inset-4 border border-[#D4AF37]/35 rounded-[2rem] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-4xl text-center flex flex-col justify-between items-center">
        {/* Chapter Header */}
        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-[#6B0F1A] uppercase mb-1.5"
          >
            {isHi ? "सप्तम अध्याय — उत्सव स्थल" : "Chapter VII — The Venues"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-4xl text-gold-gradient font-extrabold tracking-wide drop-shadow-sm"
          >
            {isHi ? "विवाह एवं मांगलिक स्थल" : "Celebration Venues"}
          </motion.h2>

          <div className="flex items-center justify-center gap-3 mt-3.5 mb-1.5">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#6B0F1A]/40" />
            <span className="text-[#6B0F1A] text-[8px] animate-pulse">✦</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#6B0F1A]/40" />
          </div>
        </div>

        {/* Plaques Layout (Grid with flex details, 100% compact on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 w-full max-w-3xl mt-2 px-1">
          {venues.map((venue, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={venue.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex flex-col items-center"
              >
                {/* Suspended Marigold Hanger */}
                <MarigoldGarland />

                {/* Hanging Plaque Card */}
                <motion.div
                  animate={{
                    rotate: isHovered ? [-2, 2, -2] : [-0.8, 0.8, -0.8]
                  }}
                  transition={{
                    duration: 5.0 + (idx * 0.9),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.4
                  }}
                  style={{ transformOrigin: "top center", perspective: 1000, background: venue.bgGradient }}
                  className="w-full relative mt-0.5 rounded-2xl border border-[#D4AF37]/45 p-4 flex flex-col justify-between shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
                >
                  {/* Decorative dashed boundary frame */}
                  <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/15 rounded-[0.9rem] pointer-events-none" />

                  {/* Corner Ornaments */}
                  <GoldCornerOrnaments />

                  {/* Header / host */}
                  <div className="z-10 relative text-left">
                    <span className="text-[7px] font-bold text-[#D4AF37] tracking-[0.25em] uppercase bg-[#FAF7F2]/10 px-2 py-0.5 rounded-full leading-none">
                      {isHi ? venue.titleHi : venue.titleEn}
                    </span>
                    <h3 className="font-display font-extrabold text-[13.5px] sm:text-[15px] text-[#FAF7F2] mt-1.5 tracking-wide leading-none">
                      {isHi ? venue.hostHi : venue.hostEn}
                    </h3>
                  </div>

                  {/* Divider line */}
                  <div className="w-10 h-[1px] bg-[#D4AF37]/35 my-2 z-10 relative" />

                  {/* Address Content */}
                  <div className="flex items-start gap-2.5 text-left z-10 relative">
                    <div className="w-6 h-6 rounded-lg bg-white/5 border border-[#D4AF37]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Compass size={12} className="text-[#D4AF37]" />
                    </div>
                    <p className="font-serif text-[10.5px] sm:text-[11px] leading-relaxed text-[#FAF7F2]/90">
                      {venue.address}
                    </p>
                  </div>

                  {/* Animated Mock Map */}
                  <AnimatedVectorMap googleMapsUrl={venue.mapsUrl} />

                  {/* Directions CTA Button */}
                  <a
                    href={venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 flex items-center justify-center gap-1.5 py-1.5 px-4 mt-3 bg-gradient-to-r from-[#D4AF37] to-[#A68018] text-[#FAF7F2] font-sans font-bold text-[8px] uppercase tracking-widest rounded-full shadow-[0_4px_12px_rgba(212,175,55,0.25)] hover:scale-[1.03] transition-transform duration-300"
                  >
                    <Navigation size={9} />
                    <span>{isHi ? "नक्शा एवं दिशा-निर्देश" : "Get Directions"}</span>
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
