"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import Image from "next/image";

const GOLD = "#D4AF37";

// Traditional Diya (Oil Lamp) SVG Icon
const DiyaIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C12 2 9 6 9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6 12 2 12 2Z" fill="#E8B04A" stroke="#D4AF37" strokeWidth="0.8" />
    <path d="M3 13C3 13 6 15 12 15C18 15 21 13 21 13C21 17.5 17 21 12 21C7 21 3 17.5 3 13Z" fill="rgba(212,175,55,0.1)" />
  </svg>
);

// Royal Crest Lineage SVG Icon
const LineageCrestIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v8M9 11h6" />
  </svg>
);

// Floating Gold Dust Particle System
function GoldDustBackground() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const [particles] = useState(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: 1.5 + Math.random() * 2,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.45,
    }))
  );

  const visibleParticles = isMobile ? particles.slice(0, 8) : particles;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {visibleParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%", x: `${p.x}%`, opacity: 0 }}
          animate={{
            y: "-10%",
            x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 10}%`],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #F3D27F 0%, #D4AF37 70%, transparent 100%)",
            boxShadow: isMobile ? "none" : "0 0 8px #D4AF37",
          }}
        />
      ))}
    </div>
  );
}

// Royal Interwoven Monogram Crest
const MonogramCrest = ({ letter }: { letter: string }) => (
  <div className="flex flex-col items-center mb-3 select-none">
    <div className="relative w-8 h-8 flex items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white/40 shadow-[0_2px_5px_rgba(212,175,55,0.12)]">
      {/* Outer slow spinning dash aura */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-2px] border border-dashed border-[#D4AF37]/25 rounded-full"
      />
      <span className="font-display text-[10.5px] text-[#D4AF37] font-extrabold tracking-widest leading-none mt-[1px]">
        {letter}
      </span>
    </div>
    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent mt-1.5" />
  </div>
);

// Rotating Golden Mandala with Pulse heart and glowing Ampersand
function MandalaConnector({ variants }: { variants: any }) {
  return (
    <motion.div
      variants={variants}
      className="relative flex items-center justify-center w-28 h-28 my-6 md:my-0 select-none z-10 self-center"
    >
      {/* Outer slow-spinning decorative ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 text-[#D4AF37]/20"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="41" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const x = 50 + 41 * Math.cos(angle);
            const y = 50 + 41 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="2" fill="currentColor" stroke="none" />;
          })}
        </svg>
      </motion.div>

      {/* Inner counter-rotating mandala filigree */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-20 h-20 text-[#D4AF37]/30"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d="M50 50 C25 25, 25 75, 50 50"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="25" strokeDasharray="1 2" />
        </svg>
      </motion.div>

      {/* Pulsing red-gold heart aura in the very center */}
      <motion.div
        animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.65, 0.95, 0.65] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-12 h-12 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[#6B0F1A]/10 rounded-full blur-md" />
        <span className="text-[#6B0F1A] text-2.5xl drop-shadow-[0_0_10px_rgba(107,15,26,0.35)]">♥</span>
      </motion.div>

      {/* Elegant floating ampersand on top */}
      <span
        className="absolute font-cursive text-[3.4rem] text-[#D4AF37] z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
        style={{ fontFamily: "var(--font-cursive), cursive", lineHeight: 1 }}
      >
        &
      </span>
    </motion.div>
  );
}

function FloatingFrame({
  src,
  alt,
  role,
  name,
  parents,
  dob,
  quote,
  accentColor,
  variants,
}: {
  src: string;
  alt: string;
  role: string;
  name: string;
  parents: string;
  dob: string;
  quote: string;
  accentColor: string;
  variants: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const tX = (relX - 0.5) * 2;
    const tY = (relY - 0.5) * 2;

    setCoords({
      x: tX,
      y: tY,
      shineX: relX * 100,
      shineY: relY * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, shineX: 50, shineY: 50 });
  };

  const tiltAngleX = isHovered ? coords.x * 12 : 0; // Rotate Y
  const tiltAngleY = isHovered ? coords.y * -12 : 0; // Rotate X
  const imgTranslateX = isHovered ? coords.x * -7 : 0;
  const imgTranslateY = isHovered ? coords.y * -7 : 0;

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      className="flex flex-col items-center w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Image frame wrapper with concentric pulsing Mehrab-shaped rings */}
      <motion.div
        className="h-person"
        style={{
          position: "relative",
          marginBottom: "1.5rem",
          zIndex: 10,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: tiltAngleY,
          rotateY: tiltAngleX,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Pulsing outline rings customized with Mehrab dome arch curve shapes */}
        <div className="r1" style={{ borderColor: accentColor, borderRadius: "200px 200px 28px 28px" }} />
        <div className="r2" style={{ borderColor: accentColor, borderRadius: "200px 200px 32px 32px" }} />
        <div className="r3" style={{ borderColor: accentColor, borderRadius: "200px 200px 36px 36px" }} />

        {/* Outer border & image box with Rajasthani dome arch styling */}
        <div
          style={{
            position: "relative",
            width: "clamp(200px, 28vw, 310px)",
            height: "clamp(270px, 38vw, 420px)",
            borderRadius: "200px 200px 24px 24px",
            overflow: "hidden",
            border: `3px solid ${accentColor}`,
            boxShadow: isHovered
              ? `0 24px 50px rgba(212, 175, 55, 0.25)`
              : `0 12px 35px rgba(90, 70, 52, 0.08)`,
            background: "var(--cream-dark)",
            transformStyle: "preserve-3d",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Image with depth parallax */}
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
            animate={{
              x: imgTranslateX,
              y: imgTranslateY,
              scale: isHovered ? 1.15 : 1.05,
            }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 200px, 310px"
              className="object-cover"
            />
          </motion.div>

          {/* Dynamic Light Sheen overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 5,
              background: isHovered
                ? `radial-gradient(circle at ${coords.shineX}% ${coords.shineY}%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`
                : "transparent",
              mixBlendMode: "overlay",
              transition: "background 0.15s ease",
            }}
          />
        </div>
      </motion.div>

      {/* Parchment Invitation Card details below the image */}
      <div
        className="w-full max-w-[340px] px-5 py-6 rounded-[24px] border relative overflow-hidden text-center mt-3 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(250, 246, 239, 0.96) 0%, rgba(245, 236, 224, 0.88) 100%)",
          borderColor: isHovered ? "rgba(212, 175, 55, 0.65)" : "rgba(212, 175, 55, 0.35)",
          boxShadow: isHovered 
            ? "0 22px 55px rgba(107, 15, 26, 0.12)" 
            : "0 12px 35px rgba(90, 70, 52, 0.04)",
        }}
      >
        {/* Fine dashed inner frame */}
        <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/15 rounded-[1.2rem] pointer-events-none" />

        {/* Tiny filigree corners */}
        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/25 rounded-tl pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#D4AF37]/25 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#D4AF37]/25 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/25 rounded-br pointer-events-none" />

        {/* Monogram crest */}
        <MonogramCrest letter={role === "THE GROOM" || role === "वर" ? "D" : "C"} />

        <p className="font-sans text-[10px] tracking-[0.25em] text-[#D4AF37] font-bold uppercase mb-1">
          {role}
        </p>

        <h3 className="font-display text-2xl text-[#5A4634] font-semibold mb-2.5 tracking-wide">
          {name}
        </h3>

        {/* Lineage and Birth Details Grid */}
        <div className="flex flex-col gap-2.5 mb-3.5 px-2">
          {/* Parents Lineage */}
          <div className="flex items-center justify-center gap-2 text-[#5A4634]/85">
            <LineageCrestIcon />
            <p className="font-serif text-[0.78rem] tracking-wide leading-relaxed text-center">
              {parents}
            </p>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
            <DiyaIcon />
            <p className="font-serif text-[0.76rem] font-semibold tracking-wider uppercase">
              {dob}
            </p>
          </div>
        </div>

        <div className="h-[1px] w-[45%] bg-[#D4AF37]/20 mx-auto mb-3.5" />

        <p className="font-serif italic text-xs md:text-[0.82rem] text-[#6B0F1A] leading-relaxed border-l-2 border-[#D4AF37]/45 pl-3.5 text-left select-none">
          {quote}
        </p>
      </div>
    </motion.div>
  );
}

// Framer motion variants for the staggered layout
const cardContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const leftCardVariants = {
  hidden: { opacity: 0, x: -70, y: 15 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 75,
      damping: 16,
      duration: 0.9,
    },
  },
};

const rightCardVariants = {
  hidden: { opacity: 0, x: 70, y: 15 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 75,
      damping: 16,
      duration: 0.9,
    },
  },
};

const connectorVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -45 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 13,
      duration: 0.8,
    },
  },
};

export default function BrideGroom() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative py-12 md:py-24 px-4 md:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 50%, #FFFDF8 0%, #FAF6EF 70%, #F5ECE0 100%)",
      }}
    >
      {/* Decorative starlight twinkle */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 37 + 7) % 97}%`,
            top: `${(i * 53 + 11) % 95}%`,
            width: i % 3 === 0 ? 3 : 1.5,
            height: i % 3 === 0 ? 3 : 1.5,
            borderRadius: "50%",
            background: "rgba(212, 175, 55, 0.45)",
            "--duration": `${2.5 + (i % 4) * 0.7}s`,
            "--delay": `${(i * 0.3) % 4}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Floating interactive gold dust particles background */}
      <GoldDustBackground />

      {/* Ambient warm gold orbs */}
      <div
        className="absolute top-[20%] left-[10%] w-[320px] h-[320px] rounded-full pointer-events-none opacity-40 blur-[80px] z-0"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 75%)" }}
      />
      <div
        className="absolute bottom-[20%] right-[10%] w-[320px] h-[320px] rounded-full pointer-events-none opacity-40 blur-[80px] z-0"
        style={{ background: "radial-gradient(circle, rgba(216,162,140,0.04) 0%, transparent 75%)" }}
      />

      {/* Slow spinning Mandala Backdrop in center */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-[0.035] flex items-center justify-center z-0"
      >
        <svg className="w-full h-full text-[#D4AF37]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0c-1.3 0-2.5 1.2-2.5 2.5v4.3c-7.3.7-13.9 4.3-18.4 9.7L26 13.4c-.9-.9-2.4-.9-3.3 0s-.9 2.4 0 3.3l3.1 3.1c-5.4 4.5-9 11.1-9.7 18.4H11.8c-1.3 0-2.5 1.2-2.5 2.5s1.2 2.5 2.5 2.5h4.3c.7 7.3 4.3 13.9 9.7 18.4l-3.1 3.1c-.9.9-.9 2.4 0 3.3.9.9 2.4.9 3.3 0l3.1-3.1c4.5 5.4 11.1 9 18.4 9.7v4.3c0 1.3 1.2 2.5 2.5 2.5s2.5-1.2 2.5-2.5v-4.3c7.3-.7 13.9-4.3 18.4-9.7l3.1 3.1c.9.9 2.4.9 3.3 0s.9-2.4 0-3.3l-3.1-3.1c5.4-4.5 9-11.1 9.7-18.4h4.3c1.3 0 2.5-1.2 2.5-2.5s-1.2-2.5-2.5-2.5h-4.3c-.7-7.3-4.3-13.9-9.7-18.4l3.1-3.1c.9-.9.9-2.4 0-3.3s-2.4-.9-3.3 0l-3.1 3.1C66.4 8.5 59.8 4.9 52.5 4.2V2.5C52.5 1.2 51.3 0 50 0zm0 10c22.1 0 40 17.9 40 40S72.1 90 50 90 10 72.1 10 50s17.9-40 40-40zm0 15c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25z" />
        </svg>
      </motion.div>

      <div className="max-w-[1100px] mx-auto relative z-10">

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.55em",
              color: "#6B0F1A",
              textTransform: "uppercase",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            Chapter III — The Couple
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "#5A4634",
              marginBottom: "1.5rem",
            }}
          >
            {t("couple.title")}
          </motion.h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3))" }} />
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ color: "var(--gold)", fontSize: "0.95rem" }}
            >
              ✦
            </motion.span>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, rgba(212, 175, 55, 0.3))" }} />
          </div>
        </div>

        {/* Staggered Couple Layout */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-4 justify-items-center items-start"
        >
          {/* Groom Card */}
          <FloatingFrame
            src="/images/groom.jpeg"
            alt="Groom"
            role={t("couple.groom.role")}
            name={t("couple.groom.name")}
            parents={t("couple.groom.parents")}
            dob={t("couple.groom.dob")}
            quote={t("couple.groom.quote")}
            accentColor={GOLD}
            variants={leftCardVariants}
          />

          {/* Central Rotating Mandala connector */}
          <MandalaConnector variants={connectorVariants} />

          {/* Bride Card */}
          <FloatingFrame
            src="/images/bride.jpeg"
            alt="Bride"
            role={t("couple.bride.role")}
            name={t("couple.bride.name")}
            parents={t("couple.bride.parents")}
            dob={t("couple.bride.dob")}
            quote={t("couple.bride.quote")}
            accentColor={GOLD}
            variants={rightCardVariants}
          />
        </motion.div>

        {/* Devanagari blessing at bottom */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-center text-xl md:text-2xl text-[#6B0F1A] tracking-wider mt-12 md:mt-18 font-semibold font-serif select-none"
        >
          ॥ विवाहे मंगलम् ॥
        </motion.p>
      </div>
    </section>
  );
}
