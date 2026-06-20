"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
const GOLD = "#D4AF37";
const SAFFRON = "#E8B04A";

interface Petal {
  id: number;
  x: number;
  rotate: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const PETAL_COLORS = [
  "#E8B04A", "#D4AF37", "#D4607A", "#E8A0B0",
  "#FAC3D0", "#F5E6C8", "#C8A87A", "#E07055",
];

function generatePetals(n: number): Petal[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    rotate: Math.random() * 360,
    size: 6 + Math.random() * 10,
    duration: 5 + Math.random() * 6,
    delay: Math.random() * 8,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
  }));
}

function PetalShower({ active }: { active: boolean }) {
  const [petals] = useState(() => generatePetals(40));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <AnimatePresence>
        {active &&
          petals.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: -20, x: `${p.x}vw`, opacity: 0, rotate: p.rotate }}
              animate={{
                y: "110vh",
                x: [`${p.x}vw`, `${p.x + (Math.random() - 0.5) * 15}vw`],
                opacity: [0, 0.85, 0.85, 0],
                rotate: p.rotate + 360,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeIn",
              }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size * 0.7,
                borderRadius: "50% 0 50% 0",
                background: p.color,
                opacity: 0.75,
                filter: "blur(0.5px)",
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const { t, locale } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setShowPetals(true), 800);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 0%, var(--burgundy) 0%, var(--burgundy-dark) 45%, #30060B 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
      }}
    >
      {/* Flower shower */}
      <PetalShower active={showPetals} />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 47 + 13) % 97}%`,
            top: `${(i * 63 + 7) % 95}%`,
            width: i % 3 === 0 ? 2.5 : 1.5,
            height: i % 3 === 0 ? 2.5 : 1.5,
            borderRadius: "50%",
            background: i % 5 === 0 ? SAFFRON : "rgba(246,238,223,0.65)",
            "--duration": `${1.5 + (i % 6) * 0.5}s`,
            "--delay": `${(i * 0.21) % 5}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Warm glow rings */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(90vw,700px)",
          height: "min(90vw,700px)",
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(232,176,74,0.06) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "min(80vw,600px)",
          height: "min(80vw,600px)",
          borderRadius: "50%",
          border: "1px dashed rgba(212,175,55,0.06)",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 700 }}>

        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-poppins),sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.55em",
            color: "rgba(232,176,74,0.5)",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          Chapter XI — Final Blessings
        </motion.p>

        {/* Ganesha reappears */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}
        >
          {/* Outer aura */}
          <motion.div
            animate={visible ? { scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: -24,
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(232,176,74,0.15) 0%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Sacred light rays */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              animate={visible ? { opacity: [0.1, 0.4, 0.1], scaleY: [0.8, 1.1, 0.8] } : {}}
              transition={{ duration: 3 + (i % 4) * 0.5, delay: i * 0.2, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 2,
                height: "140px",
                transformOrigin: "50% 0",
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-50%)`,
                background: `linear-gradient(to bottom,${SAFFRON}66,transparent)`,
                pointerEvents: "none",
              }}
            />
          ))}

          <motion.img
            src="/images/ganesha.png"
            alt="Lord Ganesha"
            animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "clamp(140px,25vw,200px)",
              height: "clamp(140px,25vw,200px)",
              objectFit: "contain",
              filter: `drop-shadow(0 0 30px rgba(232,176,74,0.5)) drop-shadow(0 0 60px rgba(212,175,55,0.3))`,
              position: "relative",
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* Sanskrit invocation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            fontFamily: "var(--font-playfair),serif",
            fontSize: "clamp(1rem,3vw,1.4rem)",
            fontWeight: 300,
            color: SAFFRON,
            letterSpacing: "0.15em",
            textShadow: `0 0 20px ${SAFFRON}55`,
            marginBottom: "1.5rem",
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        {/* Thank you heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
          className="shimmer-text"
          style={{
            fontFamily: "var(--font-playfair),serif",
            fontSize: "clamp(2rem,7vw,4.5rem)",
            fontWeight: 300,
            letterSpacing: "0.12em",
            marginBottom: "1.5rem",
          }}
        >
          {t("footer.thankyou")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            fontFamily: "var(--font-playfair),serif",
            fontStyle: "italic",
            fontSize: "clamp(0.95rem,2.5vw,1.2rem)",
            color: "rgba(246,238,223,0.45)",
            letterSpacing: "0.12em",
            marginBottom: "1rem",
            lineHeight: 1.7,
          }}
        >
          {t("footer.blessing")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.7 }}
          style={{
            fontFamily: "var(--font-playfair),serif",
            fontSize: "clamp(1.1rem,3.5vw,1.8rem)",
            fontWeight: 400,
            letterSpacing: "0.25em",
            background: `linear-gradient(135deg,${SAFFRON},${GOLD},#FAF7F2,${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "3rem",
          }}
        >
          DEEPAK ✦ CHANDANI
        </motion.p>

        {/* Date line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={visible ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.9 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          <div style={{ height: 1, width: 80, background: `linear-gradient(to right,transparent,${GOLD}55)` }} />
          <span
            style={{
              fontFamily: "var(--font-poppins),sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: "rgba(232,176,74,0.5)",
              textTransform: "uppercase",
            }}
          >
            10 February 2027 · Palamu, Jharkhand
          </span>
          <div style={{ height: 1, width: 80, background: `linear-gradient(to left,transparent,${GOLD}55)` }} />
        </motion.div>
      </div>

      {/* Bottom nav links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.2 }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem 2rem",
          marginBottom: "3rem",
        }}
      >
        {["#couple", "#story", "#events", "#countdown", "#venue", "#family", "#gallery", "#rsvp"].map((href) => (
          <a
            key={href}
            href={href}
            style={{
              fontFamily: "var(--font-poppins),sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.3em",
              color: "rgba(232,176,74,0.4)",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = SAFFRON)}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(232,176,74,0.4)")}
          >
            {href.replace("#", "")}
          </a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.4 }}
        style={{
          position: "relative",
          zIndex: 10,
          fontFamily: "var(--font-poppins),sans-serif",
          fontSize: "0.6rem",
          color: "rgba(246,238,223,0.2)",
          letterSpacing: "0.15em",
          textAlign: "center",
        }}
      >
        {t("footer.made")} · {locale === "hi" ? "दीपक संग चांदनी" : "Deepak Weds Chandani"} Wedding 2027
      </motion.p>

      {/* Developer credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.7 }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginTop: "1.25rem",
        }}
      >
        <div
          style={{
            width: 120,
            height: 1,
            background: "linear-gradient(to right,transparent,rgba(212,175,55,0.32),transparent)",
            margin: "0 auto 0.75rem",
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-poppins),sans-serif",
            fontSize: "0.62rem",
            color: "rgba(246,238,223,0.45)",
            letterSpacing: "0.14em",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          {locale === "hi" ? "डिज़ाइन एवं डेवलपमेंट " : "Designed & Developed by "}
          <a
            href="https://deepak-portfolio-lilac.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#D4AF37",
              textDecoration: "none",
              transition: "color 0.3s ease",
              cursor: "pointer",
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#D8A28C";
              el.style.textDecorationLine = "underline";
              el.style.textDecorationColor = "rgba(216,162,140,0.55)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#D4AF37";
              el.style.textDecorationLine = "none";
            }}
          >
            {locale === "hi" ? "दीपक कुमार" : "Deepak Kumar"}
          </a>
          <span style={{ color: "rgba(212,175,55,0.4)", margin: "0 0.4em" }}>·</span>
          <a
            href="tel:9801558387"
            style={{
              color: "rgba(246,238,223,0.55)",
              textDecoration: "none",
              transition: "color 0.3s ease",
              cursor: "pointer",
              letterSpacing: "0.12em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "#D8A28C";
              el.style.textDecorationLine = "underline";
              el.style.textDecorationColor = "rgba(216,162,140,0.55)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.color = "rgba(246,238,223,0.55)";
              el.style.textDecorationLine = "none";
            }}
          >
            9801558387
          </a>
        </p>
      </motion.div>
    </footer>
  );
}
