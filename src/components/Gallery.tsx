"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

const GOLD = "#D4AF37";

interface Photo {
  src: string;
  alt: string;
  category: "all" | "ceremonies" | "moments" | "venue";
  title: string;
  titleHi: string;
}

const photos: Photo[] = [
  {
    src: "/assets/gallery-1.webp",
    alt: "Together",
    category: "moments",
    title: "The Royal Union",
    titleHi: "शाही बंधन"
  },
  {
    src: "/assets/gallery-2.webp",
    alt: "Mehendi",
    category: "ceremonies",
    title: "Mehndi Rituals",
    titleHi: "मेहंदी रस्म"
  },
  {
    src: "/assets/gallery-3.webp",
    alt: "Haldi",
    category: "ceremonies",
    title: "Haldi Ceremony",
    titleHi: "हल्दी रस्म"
  },
  {
    src: "/assets/gallery-4.webp",
    alt: "Decor",
    category: "venue",
    title: "Royal Mandap Decor",
    titleHi: "शाही मंडप"
  },
  {
    src: "/assets/gallery-5.webp",
    alt: "Vows",
    category: "ceremonies",
    title: "The Sacred Vows",
    titleHi: "सात फेरे"
  },
  {
    src: "/assets/gallery-6.webp",
    alt: "Palace",
    category: "venue",
    title: "Wedding Venue Entrance",
    titleHi: "विवाह स्थल प्रवेश द्वार"
  },
  {
    src: "/assets/gallery-7.webp",
    alt: "Turban",
    category: "moments",
    title: "Shagun & Sehra",
    titleHi: "सगाई एवं सेहरा"
  },
  {
    src: "/assets/gallery-8.webp",
    alt: "Rings",
    category: "moments",
    title: "Engagement Rings",
    titleHi: "अंगूठी रस्म"
  }
];

// Gold Clip/Pin SVG element at the top of each polaroid keepsake card
function RoyalKeepsakePin() {
  return (
    <svg
      className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-6 text-[#D4AF37] pointer-events-none drop-shadow-md z-20"
      viewBox="0 0 100 60"
      fill="currentColor"
    >
      {/* Decorative ornate metallic clip */}
      <path d="M20,40 Q50,15 80,40 Q85,45 80,50 Q50,25 20,50 Q15,45 20,40 Z" opacity="0.85" />
      <circle cx="50" cy="20" r="6" fill="#D4AF37" stroke="#FFFDF8" strokeWidth="1.5" />
      <path d="M 46 20 L 54 20 M 50 16 L 50 24" stroke="#FFFDF8" strokeWidth="1.5" />
    </svg>
  );
}

export default function Gallery() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "ceremonies" | "moments" | "venue">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return photos;
    return photos.filter((p) => p.category === activeTab);
  }, [activeTab]);

  // Reset mobile index on tab change to prevent out-of-bounds error
  useEffect(() => {
    setMobileIndex(0);
  }, [activeTab]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : (prev as number) - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : (prev as number) + 1));
  };

  const handleMobilePrev = () => {
    setMobileIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="gallery"
      className="relative py-12 md:py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 90%, #FFFDF8 0%, #FAF6EF 75%, #F4ECE0 100%)",
      }}
    >
      {/* Sparkle effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 41 + 12) % 96}%`,
            top: `${(i * 31 + 6) % 94}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(212, 175, 55, 0.4)",
            "--duration": `${2.5 + (i % 3) * 0.7}s`,
            "--delay": `${i * 0.3}s`,
          } as React.CSSProperties}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.55em",
              color: "#6B0F1A",
              textTransform: "uppercase",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            Chapter IX — Gallery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 500,
              color: "#5A4634",
              letterSpacing: "0.12em",
              marginBottom: "0.75rem",
            }}
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: "0.95rem",
              color: "#6B0F1A",
              opacity: 0.85,
              letterSpacing: "0.08em",
            }}
          >
            {t("gallery.sub")}
          </motion.p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ height: 1, width: 45, background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3))" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.85rem" }}>✦</span>
            <div style={{ height: 1, width: 45, background: "linear-gradient(to left, transparent, rgba(212, 175, 55, 0.3))" }} />
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {(["all", "ceremonies", "moments", "venue"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-serif text-[10px] md:text-[11px] tracking-[0.18em] font-bold uppercase transition-all duration-500 cursor-pointer relative ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#E8B04A] text-[#FFFDF8] shadow-md shadow-[#D4AF37]/20"
                  : "bg-white/80 border border-[#D4AF37]/30 text-[#5A4634] hover:bg-white/100"
              }`}
            >
              {tab === "all" ? "All Moments" : tab === "ceremonies" ? "Ceremonies" : tab === "moments" ? "Moments" : "Venue Details"}
              {activeTab === tab && (
                <motion.span
                  layoutId="activeTabGlow"
                  className="absolute inset-[-2.5px] rounded-full border border-[#D4AF37]/40 pointer-events-none"
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── DESKTOP/TABLET GRID VIEW (Visible on sm and up) ── */}
        <motion.div
          layout
          className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => {
              const displayTitle = locale === "hi" ? photo.titleHi : photo.title;

              const initTilt = {
                0: -2.5,
                1: 1.8,
                2: -1.2,
                3: 2.5,
                4: -2.0,
                5: 1.5,
                6: -1.8,
                7: 2.2,
              }[index % 8] || 0;

              return (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9, rotate: initTilt }}
                  animate={{ opacity: 1, scale: 1, rotate: initTilt }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{
                    scale: 1.04,
                    y: -10,
                    rotate: 0,
                    boxShadow: "0 20px 45px rgba(90, 70, 52, 0.16), 0 0 18px rgba(212, 175, 55, 0.3)",
                    zIndex: 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                  }}
                  onClick={() => setLightboxIndex(index)}
                  className="group cursor-pointer rounded-2xl bg-[#FAF6EF]/90 border border-[#D4AF37]/35 p-3.5 pb-6 shadow-lg shadow-[#5A4634]/5 relative flex flex-col justify-between"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RoyalKeepsakePin />

                  <div className="overflow-hidden rounded-lg aspect-[3/4] relative border border-[#D4AF37]/15">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5A4634]/15 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="pt-4 text-center">
                    <h3 className="font-cursive text-[#6B0F1A] text-lg font-normal tracking-wide leading-snug select-none">
                      {displayTitle}
                    </h3>
                    <p className="font-sans text-[#D4AF37] text-[9px] font-bold tracking-[0.2em] uppercase mt-1">
                      {photo.category === "all" ? "moment" : photo.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── MOBILE COVER-FLOW SWIPEABLE CAROUSEL (Visible on mobile only) ── */}
        <div className="flex sm:hidden flex-col items-center relative w-full overflow-hidden select-none px-2 py-4">
          <div className="relative w-full flex items-center justify-center min-h-[350px]">
            
            {/* Left Button */}
            <button
              onClick={handleMobilePrev}
              className="absolute left-[-2px] z-30 w-10 h-10 rounded-full border border-[#D4AF37]/35 bg-[#FFFDF8]/95 shadow-md text-[#5A4634] flex items-center justify-center cursor-pointer active:scale-90 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Viewport container wrapping the sliding flex track */}
            <div className="w-full overflow-hidden py-4">
              <motion.div
                animate={{ x: `calc(50vw - 110px - ${mobileIndex * 236}px)` }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="flex gap-4 items-center"
                style={{ width: "fit-content" }}
              >
                {filteredPhotos.map((photo, idx) => {
                  const isActive = idx === mobileIndex;
                  const displayTitle = locale === "hi" ? photo.titleHi : photo.title;

                  return (
                    <motion.div
                      key={photo.src}
                      animate={{
                        scale: isActive ? 1.0 : 0.82,
                        opacity: isActive ? 1.0 : 0.45,
                        rotate: isActive ? 1.5 : idx < mobileIndex ? -4 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                      drag={isActive ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.5}
                      onDragEnd={(e, info) => {
                        const swipeThreshold = 45;
                        if (info.offset.x < -swipeThreshold) {
                          handleMobileNext();
                        } else if (info.offset.x > swipeThreshold) {
                          handleMobilePrev();
                        }
                      }}
                      onClick={() => {
                        if (isActive) {
                          setLightboxIndex(idx);
                        } else {
                          setMobileIndex(idx);
                        }
                      }}
                      className="cursor-pointer rounded-2xl bg-[#FAF6EF]/90 border border-[#D4AF37]/35 p-3 pb-5 shadow-lg relative flex flex-col justify-between w-[220px] flex-shrink-0"
                      style={{
                        touchAction: "none",
                        boxShadow: isActive 
                          ? "0 15px 35px rgba(90, 70, 52, 0.15), 0 0 10px rgba(212, 175, 55, 0.1)" 
                          : "0 5px 15px rgba(0,0,0,0.05)"
                      }}
                    >
                      <RoyalKeepsakePin />

                      <div className="overflow-hidden rounded-lg aspect-[3/4] relative border border-[#D4AF37]/15 pointer-events-none">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#5A4634]/15 via-transparent to-transparent" />
                      </div>

                      <div className="pt-3 text-center">
                        <h3 className="font-cursive text-[#6B0F1A] text-base font-normal tracking-wide leading-snug">
                          {displayTitle}
                        </h3>
                        <p className="font-sans text-[#D4AF37] text-[8px] font-bold tracking-[0.2em] uppercase mt-0.5">
                          {photo.category === "all" ? "moment" : photo.category}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Button */}
            <button
              onClick={handleMobileNext}
              className="absolute right-[-2px] z-30 w-10 h-10 rounded-full border border-[#D4AF37]/35 bg-[#FFFDF8]/90 shadow-md text-[#5A4634] flex items-center justify-center cursor-pointer active:scale-90 transition-all"
            >
              <ChevronRight size={20} />
            </button>

          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-2 mt-4 z-10">
            {filteredPhotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  mobileIndex === i
                    ? "bg-[#D4AF37] scale-125 shadow-sm"
                    : "bg-[#D4AF37]/25"
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Slider Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Upper header details */}
            <div className="absolute top-6 left-1/2 translate-x-[-50%] text-center z-[10000] pointer-events-none">
              <h2 className="font-display text-[#FAF7F2] text-sm md:text-base tracking-[0.2em] font-semibold uppercase mb-0.5">
                {locale === "hi" ? filteredPhotos[lightboxIndex].titleHi : filteredPhotos[lightboxIndex].title}
              </h2>
              <span className="font-cursive text-[#D4AF37] text-base">
                {filteredPhotos[lightboxIndex].category}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 hover:border-white/50 text-white flex items-center justify-center cursor-pointer bg-black/40 transition-all z-[10000]"
            >
              <X size={18} />
            </button>

            {/* Slider container */}
            <div className="relative flex items-center justify-center w-full max-w-4xl h-[70vh] px-4 md:px-12">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-1 md:left-4 w-11 h-11 rounded-full border border-white/20 hover:border-white/60 text-white flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/70 transition-all z-20"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Main Image Slider View */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-full max-w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl"
              >
                <img
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].alt}
                  className="max-h-[70vh] max-w-full object-contain display-block"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-1 md:right-4 w-11 h-11 rounded-full border border-white/20 hover:border-white/60 text-white flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/70 transition-all z-20"
              >
                <ChevronRight size={22} />
              </button>

            </div>

            {/* Slide Index Counter indicator */}
            <div className="absolute bottom-6 font-serif text-[10px] tracking-[0.2em] text-[#FAF7F2]/60 uppercase">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
