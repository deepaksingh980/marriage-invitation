"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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

function getDiff(idx: number, active: number, total: number) {
  let d = idx - active;
  if (d < -total / 2) d += total;
  if (d > total / 2) d -= total;
  return d;
}

function RosePetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-1">
      {Array.from({ length: 18 }).map((_, i) => {
        const duration = 10 + (i % 5) * 2.5;
        const delay = (i * 0.7) % 8;
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

export default function Gallery() {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "ceremonies" | "moments" | "venue">("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return photos;
    return photos.filter((p) => p.category === activeTab);
  }, [activeTab]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  // Window resize listener to handle dynamic offsets
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? 0 : prev === 0 ? photos.length - 1 : prev - 1));
    } else {
      setActiveIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? 0 : prev === photos.length - 1 ? 0 : prev + 1));
    } else {
      setActiveIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 55;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const handleLightboxDragEnd = (event: any, info: any) => {
    const thresholdX = 65;
    const thresholdY = 85;

    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    // Swipe vertically (up/down) -> Close modal
    if (Math.abs(offsetY) > thresholdY) {
      setLightboxIndex(null);
      return;
    }

    // Swipe horizontally (left/right) -> Loop Next/Prev images
    if (Math.abs(offsetX) > thresholdX) {
      if (offsetX > 0) {
        setLightboxIndex((prev) => (prev === null ? 0 : prev === 0 ? photos.length - 1 : prev - 1));
      } else {
        setLightboxIndex((prev) => (prev === null ? 0 : prev === photos.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const offset = isMobile ? 85 : 155;

  return (
    <section
      id="gallery"
      className="relative h-screen lg:h-[100dvh] w-full px-4 md:px-8 overflow-hidden select-none flex items-center justify-center py-2 md:py-4"
      style={{
        background: "radial-gradient(circle at 50% 50%, #FFFDF8 0%, #FAF6EF 75%, #F4ECE0 100%)",
      }}
    >
      {/* Background Sparkles & Twinkle stars */}
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 37 + 14) % 96}%`,
            top: `${(i * 43 + 7) % 94}%`,
            width: i % 5 === 0 ? 3 : 1.5,
            height: i % 5 === 0 ? 3 : 1.5,
            borderRadius: "50%",
            background: i % 2 === 0 ? "rgba(212, 175, 55, 0.4)" : "rgba(107, 15, 26, 0.12)",
            "--duration": `${2.5 + (i % 3) * 0.7}s`,
            "--delay": `${i * 0.3}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Floating Rose Petals Backdrop */}
      <RosePetals />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center justify-center gap-1.5 md:gap-3 h-full max-h-full">

        {/* Ornate Ganesha Header (Matches Udaipur luxury references) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mb-0 pointer-events-none select-none flex-shrink-0"
        >
          <img src="/assets/ganesha.webp" alt="Ganesha" className="w-8 h-8 md:w-12 md:h-12 object-contain animate-float" />
          <p className="font-serif text-[#D4AF37] text-[9px] md:text-[10px] tracking-widest mt-1 font-bold hidden md:block">॥ श्री गणेशाय नमः ॥</p>
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-0 flex-shrink-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.45em",
              color: "#6B0F1A",
              textTransform: "uppercase",
              marginBottom: "0.2rem",
              fontWeight: 600,
            }}
          >
            {locale === "hi" ? "अध्याय सप्तम — दीर्घा" : "Chapter VII — Gallery"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
              fontWeight: 500,
              color: "#5A4634",
              letterSpacing: "0.08em",
              marginBottom: "0.1rem",
            }}
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block"
            style={{
              fontFamily: "var(--font-serif), serif",
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "#6B0F1A",
              opacity: 0.85,
              letterSpacing: "0.05em",
            }}
          >
            {t("gallery.sub")}
          </motion.p>
          <div className="hidden md:flex" style={{ alignItems: "center", justifyItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "0.3rem" }}>
            <div style={{ height: 1, width: 35, background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3))" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.75rem" }}>✦</span>
            <div style={{ height: 1, width: 35, background: "linear-gradient(to left, transparent, rgba(212, 175, 55, 0.3))" }} />
          </div>
        </div>

        {/* Categories Tab Selector with glassmorphic sliding indicator */}
        <div className="flex justify-center flex-wrap gap-1.5 md:gap-2 mb-0 max-w-full flex-shrink-0">
          {(["all", "ceremonies", "moments", "venue"] as const).map((tab) => {
            const isSelected = activeTab === tab;
            let tabLabel = "All Moments";
            if (locale === "hi") {
              tabLabel = tab === "all" ? "सभी यादें" : tab === "ceremonies" ? "धार्मिक रस्में" : tab === "moments" ? "सुंदर पल" : "शुभ स्थल";
            } else {
              tabLabel = tab === "all" ? "All Moments" : tab === "ceremonies" ? "Ceremonies" : tab === "moments" ? "Moments" : "Venue Details";
            }

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-full font-serif text-[8px] md:text-[10px] tracking-[0.12em] md:tracking-[0.16em] font-bold uppercase transition-colors duration-500 cursor-pointer relative ${isSelected
                    ? "text-[#FFFDF8]"
                    : "text-[#5A4634] hover:text-[#D4AF37]"
                  }`}
              >
                <span className="relative z-10">{tabLabel}</span>
                {isSelected ? (
                  <motion.span
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8B04A] shadow-md shadow-[#D4AF37]/25 border border-[#D4AF37]/35"
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-white/70 border border-[#D4AF37]/15 hover:bg-white/100 transition-colors pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── 3D COVERFLOW SLIDER STACK ── */}
        <div className="relative w-full flex items-center justify-center my-0 overflow-visible pt-0 pb-0 flex-grow flex-shrink-1 min-h-0">

          {/* Circular Gold Navigation Buttons */}
          <button
            onClick={() => handlePrev()}
            className="absolute left-1 md:left-10 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-[#D4AF37]/50 bg-[#FFFDF8]/90 text-[#5A4634] hover:text-[#D4AF37] hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            <ChevronLeft size={20} className="md:w-[22px] md:h-[22px]" />
          </button>

          {/* 3D Scene Wrapper */}
          <div
            style={{
              perspective: 1200,
              transformStyle: "preserve-3d",
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              height: isMobile ? "270px" : "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatePresence initial={false}>
              {filteredPhotos.map((photo, idx) => {
                const globalIdx = photos.findIndex((p) => p.src === photo.src);
                const d = getDiff(idx, activeIndex, filteredPhotos.length);
                const absD = Math.abs(d);

                // Hide cards that are far away from index viewport range
                if (absD > 2) return null;

                const scale = 1 - absD * 0.15;
                const rotateY = d * -36;
                const x = d * offset;
                const z = -absD * 150;
                const opacity = 1 - absD * 0.35;
                const zIndex = 10 - absD;

                const displayTitle = locale === "hi" ? photo.titleHi : photo.title;

                return (
                  <motion.div
                    key={photo.src}
                    drag={d === 0 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={handleDragEnd}
                    animate={{
                      scale: scale,
                      rotateY: rotateY,
                      x: x,
                      z: z,
                      opacity: opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 17,
                    }}
                    onClick={() => {
                      if (d === 0) {
                        setLightboxIndex(globalIdx);
                      } else {
                        setActiveIndex(idx);
                      }
                    }}
                    className={`absolute rounded-3xl bg-gradient-to-b from-[#FFFDF8] to-[#FAF6EF] p-2 md:p-2.5 pb-4 md:pb-6 border-2 border-[#D4AF37]/50 shadow-xl flex flex-col justify-between overflow-hidden ${d === 0 ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                      }`}
                    style={{
                      width: isMobile ? "185px" : "245px",
                      height: isMobile ? "265px" : "345px",
                      transformStyle: "preserve-3d",
                      zIndex: zIndex,
                      touchAction: "none",
                      boxShadow: d === 0
                        ? "0 20px 45px rgba(107,15,26,0.14), 0 0 25px rgba(212,175,55,0.3)"
                        : "0 8px 25px rgba(0,0,0,0.15)"
                    }}
                  >
                    {/* Double outline decorative borders */}
                    <div className="absolute inset-[3px] border border-dashed border-[#D4AF37]/20 rounded-[20px] pointer-events-none" />

                    {/* Ornate corner leaf sparkles */}
                    <div className="absolute top-1.5 left-1.5 text-[7px] text-[#D4AF37]/45 pointer-events-none">✦</div>
                    <div className="absolute top-1.5 right-1.5 text-[7px] text-[#D4AF37]/45 pointer-events-none">✦</div>
                    <div className="absolute bottom-1.5 left-1.5 text-[7px] text-[#D4AF37]/45 pointer-events-none">✦</div>
                    <div className="absolute bottom-1.5 right-1.5 text-[7px] text-[#D4AF37]/45 pointer-events-none">✦</div>

                    {/* Photo frame */}
                    <div
                      className="overflow-hidden rounded-xl aspect-[3/4] relative border border-[#D4AF37]/25 bg-[#FAF7F2] select-none pointer-events-none"
                      style={{
                        transform: "translateZ(25px)",
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover pointer-events-none"
                      />

                      {/* Dark overlay showing title in coverflow card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-3 md:p-4 text-center pointer-events-none">
                        <h3 className="font-display text-[#FAF7F2] text-xs md:text-sm font-bold tracking-wide select-none leading-tight">
                          {displayTitle}
                        </h3>
                        <p className="font-sans text-[#D4AF37] text-[7px] md:text-[8px] font-extrabold tracking-[0.25em] uppercase mt-1 select-none">
                          {photo.category === "all" ? "moment" : photo.category}
                        </p>
                      </div>
                    </div>

                    {/* Elegant footer detail card spacing to give Udaipur depth feel */}
                    <div className="text-center pt-1 md:pt-2 select-none pointer-events-none">
                      <span className="text-[#6B0F1A] text-[8px] md:text-[9px] font-bold tracking-wider font-sans uppercase">
                        {d === 0 ? (locale === "hi" ? "✦ दबाकर खोलें ✦" : "✦ View Moment ✦") : "✦ Select ✦"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <button
            onClick={() => handleNext()}
            className="absolute right-1 md:right-10 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-[#D4AF37]/50 bg-[#FFFDF8]/90 text-[#5A4634] hover:text-[#D4AF37] hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            <ChevronRight size={20} className="md:w-[22px] md:h-[22px]" />
          </button>

        </div>

        {/* Carousel Slider Dot Navigation */}
        <div className="flex justify-center items-center gap-1.5 -mt-1 md:-mt-3 flex-shrink-0 z-20">
          {filteredPhotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === i
                  ? "bg-[#D4AF37] w-3.5 shadow-sm"
                  : "bg-[#D4AF37]/35"
                }`}
            />
          ))}
        </div>

      </div>

      {/* Fullscreen Immersive Lightbox Slider with Drag Gestures */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[9999] flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Upper header details */}
            <div className="absolute top-6 left-1/2 translate-x-[-50%] text-center z-[10000] pointer-events-none select-none">
              <h2 className="font-display text-[#FAF7F2] text-sm md:text-base tracking-[0.2em] font-semibold uppercase mb-0.5 animate-pulse">
                {locale === "hi" ? photos[lightboxIndex].titleHi : photos[lightboxIndex].title}
              </h2>
              <span className="font-cursive text-[#D4AF37] text-base">
                {photos[lightboxIndex].category}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 hover:border-white/50 hover:scale-105 text-white flex items-center justify-center cursor-pointer bg-black/40 transition-all z-[10000]"
            >
              <X size={18} />
            </button>

            {/* Slider container with Swipe gestures */}
            <div className="relative flex items-center justify-center w-full max-w-4xl h-[60vh] md:h-[65vh] px-4 md:px-12">

              {/* Prev Button */}
              <button
                onClick={(e) => handlePrev(e)}
                className="absolute left-1 md:left-4 w-11 h-11 rounded-full border border-white/20 hover:border-white/60 hover:scale-105 text-white flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/70 transition-all z-20"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Main Image Slider View (Draggable 2D Swipes) */}
              <motion.div
                key={lightboxIndex}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.6}
                onDragEnd={handleLightboxDragEnd}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-full max-w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-black cursor-grab active:cursor-grabbing select-none"
              >
                <img
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].alt}
                  className="max-h-[60vh] md:max-h-[65vh] max-w-full object-contain block pointer-events-none"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => handleNext(e)}
                className="absolute right-1 md:right-4 w-11 h-11 rounded-full border border-white/20 hover:border-white/60 hover:scale-105 text-white flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/70 transition-all z-20"
              >
                <ChevronRight size={22} />
              </button>

            </div>

            {/* Gesture Guide text */}
            <p className="absolute bottom-28 text-[9px] text-[#FAF7F2]/40 tracking-widest uppercase select-none pointer-events-none text-center">
              {locale === "hi"
                ? "← बदलने के लिए बाएँ/दाएँ खींचें | बंद करने के लिए ऊपर/नीचे खींचें →"
                : "← Swipe Left/Right to Loop | Swipe Up/Down to Close →"}
            </p>

            {/* Interactive thumbnails indicator row */}
            <div
              className="absolute bottom-8 flex gap-2.5 justify-center max-w-[95vw] overflow-x-auto px-4 py-2 z-[10000] no-scrollbar scroll-smooth select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((photo, idx) => {
                const isSelected = idx === lightboxIndex;
                return (
                  <motion.div
                    key={photo.src}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative w-11 h-15 rounded-md overflow-hidden cursor-pointer transition-all duration-300 flex-shrink-0 ${isSelected
                        ? "border-2 border-[#D4AF37] scale-110 shadow-[0_0_12px_rgba(212,175,55,0.45)] opacity-100"
                        : "opacity-40 border border-white/10"
                      }`}
                  >
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
