"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Home, Heart, Calendar, Camera, Users, MapPin, Mail } from "lucide-react";

/* ── Nav Items ──────────────────────────────────── */
const NAV_ITEMS = [
  { id: "hero", href: "#hero", Icon: Home, label: "Home" },
  { id: "couple", href: "#couple", Icon: Heart, label: "Couple" },
  { id: "events", href: "#events", Icon: Calendar, label: "Events" },
  { id: "family", href: "#family", Icon: Users, label: "Family" },
  { id: "gallery", href: "#gallery", Icon: Camera, label: "Gallery" },
  { id: "venue", href: "#venue", Icon: MapPin, label: "Venue" },
  { id: "rsvp", href: "#rsvp", Icon: Mail, label: "RSVP" },
] as const;

type SectionId = typeof NAV_ITEMS[number]["id"];

/* ── Palette ────────────────────────────────────── */
const GOLD = "#D4AF37";
const SAFFRON = "#E8B04A";
const CREAM = "#FDF5E8";

/* ── Ripple Effect ──────────────────────────────── */
function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 3.5, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: x - 14,
        top: y - 14,
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${SAFFRON}55, transparent)`,
        pointerEvents: "none",
      }}
    />
  );
}

/* ── Single Nav Button ──────────────────────────── */
function NavButton({
  item,
  isActive,
  onClick,
  mountDelay,
}: {
  item: typeof NAV_ITEMS[number];
  isActive: boolean;
  onClick: () => void;
  mountDelay: number;
}) {
  const { Icon, label } = item;
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const handleClick = () => {
    /* Add ripple at center of button */
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const id = rippleId.current++;
      setRipples((r) => [...r, { id, x: cx, y: cy }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
    }
    onClick();
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: mountDelay }}
      whileTap={{ scale: 0.86 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.2rem",
        padding: "0.35rem 0.5rem 0.3rem",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        position: "relative",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        minWidth: 44,
        minHeight: 48,
        overflow: "hidden",
        borderRadius: "0.85rem",
      }}
      aria-label={label}
    >
      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((rp) => (
          <Ripple key={rp.id} x={rp.x} y={rp.y} />
        ))}
      </AnimatePresence>

      {/* Active background pill */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeBg"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            style={{
              position: "absolute",
              inset: "4px 2px",
              borderRadius: "0.75rem",
              background: `linear-gradient(145deg, rgba(212,175,55,0.18), rgba(232,176,74,0.10))`,
              border: `1px solid rgba(212,175,55,0.25)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Top gold bar indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="topBar"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "absolute",
              top: 0,
              left: "18%",
              right: "18%",
              height: 3,
              borderRadius: "0 0 4px 4px",
              background: `linear-gradient(90deg, ${SAFFRON}, ${GOLD}, ${SAFFRON})`,
              boxShadow: `0 0 10px ${GOLD}BB, 0 0 20px ${GOLD}44`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon container */}
      <motion.div
        animate={
          isActive
            ? { y: -2, scale: 1.2 }
            : { y: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Glow ring around active icon */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${GOLD}40 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Heart special beat animation for Couple */}
        <motion.div
          animate={
            isActive && item.id === "couple"
              ? { scale: [1, 1.3, 1, 1.15, 1] }
              : isActive
                ? { rotate: [0, -8, 8, 0] }
                : { rotate: 0, scale: 1 }
          }
          transition={
            isActive && item.id === "couple"
              ? { duration: 0.9, repeat: Infinity, repeatDelay: 0.6 }
              : isActive
                ? { duration: 0.5, delay: 0.1 }
                : {}
          }
        >
          <Icon
            size={isActive ? 22 : 18}
            strokeWidth={isActive ? 2.4 : 1.7}
            fill={isActive && item.id === "couple" ? `${SAFFRON}55` : "none"}
            style={{
              color: isActive ? SAFFRON : "rgba(212,175,55,0.38)",
              transition: "color 0.3s ease, filter 0.3s ease",
              filter: isActive
                ? `drop-shadow(0 0 5px ${GOLD}99) drop-shadow(0 0 10px ${GOLD}44)`
                : "none",
              display: "block",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.span
        animate={
          isActive
            ? { opacity: 1, y: 0, scale: 1.05 }
            : { opacity: 0.36, y: 0, scale: 1 }
        }
        transition={{ duration: 0.25 }}
        style={{
          fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
          fontSize: "0.46rem",
          fontWeight: isActive ? 800 : 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: isActive ? SAFFRON : "rgba(212,175,55,0.38)",
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 2,
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

/* ── Shimmer Line at top of bar ─────────────────── */
function ShimmerLine() {
  return (
    <motion.div
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${SAFFRON}60 40%, ${GOLD} 50%, ${SAFFRON}60 60%, transparent 100%)`,
        pointerEvents: "none",
        borderRadius: "1.25rem 1.25rem 0 0",
      }}
    />
  );
}

/* ── Floating Sparkles ──────────────────────────── */
function FloatingSparkles() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.8,
            delay: i * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: -8,
            left: `${20 + i * 30}%`,
            fontSize: 8,
            color: SAFFRON,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          ✦
        </motion.div>
      ))}
    </>
  );
}

/* ── Main Export ────────────────────────────────── */
export default function MobileBottomNav() {
  const [active, setActive] = useState<SectionId>("hero");
  const [mounted, setMounted] = useState(false);

  /* Mount slide-up entrance */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* IntersectionObserver — auto-detect active section */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const ratios: Record<string, number> = {};
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          const best = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActive(best[0] as SectionId);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: SectionId) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.1 }}
            style={{ position: "relative" }}
          >
            {/* Floating sparkles above bar */}
            <FloatingSparkles />

            {/* The nav bar */}
            <div
              style={{
                background: `linear-gradient(150deg, rgba(78,10,20,0.97) 0%, rgba(45,5,12,0.99) 100%)`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderTop: `1.5px solid rgba(212,175,55,0.22)`,
                borderRadius: "1.4rem 1.4rem 0 0",
                boxShadow: [
                  "0 -12px 50px rgba(107,15,26,0.55)",
                  "0 -2px 0 rgba(212,175,55,0.12)",
                  "inset 0 1px 0 rgba(232,176,74,0.08)",
                ].join(", "),
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "0.4rem 0.15rem 0.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Animated shimmer sweep */}
              <ShimmerLine />

              {/* Background radial glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Nav buttons */}
              {NAV_ITEMS.map((item, i) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isActive={active === item.id}
                  onClick={() => scrollTo(item.id)}
                  mountDelay={i * 0.055}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
