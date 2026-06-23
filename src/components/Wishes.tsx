"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

/* ── Design tokens ─────────────────────────────────────────── */
const GOLD    = "#D4AF37";
const SAFFRON = "#E8B04A";
const CRIMSON = "#6B0F1A";
const ROSE    = "#D8A28C";

const AVATAR_PALETTES = [
  { bg: "linear-gradient(135deg,#6B0F1A,#8B1A28)", text: "#F3D27F",  ring: "#D4AF37" },
  { bg: "linear-gradient(135deg,#7A3A1A,#A05A2A)", text: "#FDF5E8",  ring: "#D8A28C" },
  { bg: "linear-gradient(135deg,#2A3A5A,#3A5A8A)", text: "#F0F4FA",  ring: "#E8B04A" },
  { bg: "linear-gradient(135deg,#1A4A2A,#2A6A3A)", text: "#F0FAF2",  ring: "#9ABA6A" },
];

function getInitials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((n) => n[0] ?? "").join("").toUpperCase();
}

/* ── Types ──────────────────────────────────────────────────── */
interface Wish {
  id: string;
  name: string;
  relationEn: string;
  relationHi: string;
  messageEn: string;
  messageHi: string;
  dateEn: string;
  dateHi: string;
}

/* ── FloatingPetal ──────────────────────────────────────────── */
function FloatingPetal({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.span
      initial={{ y: "-6vh", rotate: 0, opacity: 0 }}
      animate={{ y: "108vh", rotate: 300, opacity: [0, 0.5, 0.5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: `${x}%`,
        top: 0,
        fontSize: "0.85rem",
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
      }}
    >
      🌸
    </motion.span>
  );
}

/* ── FormField ──────────────────────────────────────────────── */
function FormField({
  id, label, value, onChange, placeholder, asTextarea = false, required = false,
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  asTextarea?: boolean; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "0.75rem",
    border: `1.5px solid ${focused ? GOLD : "rgba(212,175,55,0.2)"}`,
    background: focused ? "rgba(255,254,250,0.95)" : "rgba(253,245,232,0.5)",
    color: "#3E2A1A",
    fontSize: "0.875rem",
    fontFamily: "var(--font-lora), serif",
    outline: "none",
    transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: focused
      ? `0 0 0 3px rgba(212,175,55,0.13), 0 4px 18px rgba(212,175,55,0.09)`
      : "0 2px 8px rgba(0,0,0,0.03)",
    resize: "none",
  };

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "0.45rem",
          fontFamily: "var(--font-poppins), sans-serif",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: focused ? CRIMSON : "rgba(74,10,18,0.58)",
          transition: "color 0.28s",
        }}
      >
        {label}
      </label>
      {asTextarea ? (
        <textarea
          id={id} required={required} rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{ ...fieldStyle, lineHeight: 1.75 }}
        />
      ) : (
        <input
          type="text" id={id} required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={fieldStyle}
        />
      )}
    </div>
  );
}

/* ── WishCard ───────────────────────────────────────────────── */
function WishCard({ wish, index, locale }: { wish: Wish; index: number; locale: string }) {
  const palette = AVATAR_PALETTES[index % AVATAR_PALETTES.length];
  const isHi    = locale === "hi";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,   scale: 1    }}
      exit={{ opacity: 0, scale: 0.94 }}
      whileHover={{ y: -5, boxShadow: `0 20px 48px rgba(90,70,52,0.12), 0 0 0 1.5px ${palette.ring}55` }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      style={{
        background: "linear-gradient(145deg, rgba(255,253,249,0.97) 0%, rgba(251,247,240,0.92) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212,175,55,0.22)",
        borderRadius: "1.25rem",
        padding: "1.35rem 1.5rem 1.15rem",
        boxShadow: "0 8px 28px rgba(90,70,52,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Colour accent top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2.5px",
        background: `linear-gradient(to right, transparent, ${palette.ring}, transparent)`,
        opacity: 0.75,
      }} />

      {/* Large decorative quote mark */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "0.35rem", right: "1rem",
        fontSize: "5rem", lineHeight: 1,
        fontFamily: "Georgia, serif",
        color: GOLD, opacity: 0.07,
        pointerEvents: "none", userSelect: "none",
      }}>
        ❞
      </div>

      {/* Avatar + name + date row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", marginBottom: "0.85rem" }}>

        {/* Monogram avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: palette.bg, color: palette.text,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-playfair), serif",
          fontSize: "0.82rem", fontWeight: 700,
          flexShrink: 0,
          boxShadow: `0 0 0 2.5px ${palette.ring}45, 0 4px 14px rgba(0,0,0,0.13)`,
          letterSpacing: "0.04em",
        }}>
          {getInitials(wish.name)}
        </div>

        {/* Name + relation */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "0.875rem", fontWeight: 600, color: "#3E2A1A",
            letterSpacing: "0.04em", marginBottom: "0.18rem",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {wish.name}
          </h4>
          <span style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontSize: "0.6rem", fontWeight: 600, color: CRIMSON,
            letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.72,
          }}>
            {isHi ? wish.relationHi : wish.relationEn}
          </span>
        </div>

        {/* Timestamp */}
        <span style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontSize: "0.58rem", color: "#9A8A7A",
          fontWeight: 400, flexShrink: 0,
          marginTop: "0.18rem", letterSpacing: "0.02em",
        }}>
          {isHi ? wish.dateHi : wish.dateEn}
        </span>
      </div>

      {/* Message */}
      <p style={{
        fontFamily: "var(--font-lora), serif",
        fontSize: "0.855rem", color: "#5C4638",
        lineHeight: 1.85, letterSpacing: "0.005em",
        marginBottom: "0.85rem",
      }}>
        {isHi ? wish.messageHi : wish.messageEn}
      </p>

      {/* Star row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.18rem" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
            style={{ fontSize: "0.68rem", color: GOLD }}
          >
            ★
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Wishes component ──────────────────────────────────── */
export default function Wishes() {
  const { t, locale } = useTranslation();

  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: "1", name: "Raju Kumar",
      relationEn: "Groom's Brother", relationHi: "वर के भाई",
      messageEn: "May your journey together be filled with endless love, laughter, and beautiful adventures! Welcome to the family, Chandani Didi!",
      messageHi: "ईश्वर करे आपका साथ हमेशा बना रहे, जीवन में ढेर सारा प्यार और खुशियाँ आएं! परिवार में आपका स्वागत है, चांदनी दीदी!",
      dateEn: "Just now", dateHi: "अभी-अभी",
    },
    {
      id: "2", name: "Golu Bhardwaj",
      relationEn: "Bride's Brother", relationHi: "वधू के भैया",
      messageEn: "So thrilled to celebrate your special union. Deepak, take care of our sister! Wishing you both a lifetime of happiness.",
      messageHi: "आप दोनों के शुभ विवाह के लिए बहुत-बहुत बधाई। दीपक, हमारी बहन का ध्यान रखना! आप दोनों के सुखी जीवन की कामना करता हूँ।",
      dateEn: "2 hours ago", dateHi: "२ घंटे पहले",
    },
    {
      id: "3", name: "Siddharth Malhotra",
      relationEn: "Best Friend", relationHi: "परम मित्र",
      messageEn: "Deepak, you found the one! Can't wait for the grand Sangeet performances. Cheers to the best couple ever!",
      messageHi: "दीपक भाई, तुम्हें जीवनसंगिनी मिल ही गई! संगीत संध्या में धमाल मचाने के लिए तैयार हूँ। सबसे बेहतरीन जोड़ी को बधाई!",
      dateEn: "1 day ago", dateHi: "१ दिन पहले",
    },
    {
      id: "4", name: "Meera & Rajiv Saxena",
      relationEn: "Family Friends", relationHi: "पारिवारिक मित्र",
      messageEn: "Sending our warmest blessings to Deepak and Chandani. May God bless this royal union with abundance, peace, and eternal romance.",
      messageHi: "दीपक और चांदनी को नवदंपति जीवन की हार्दिक शुभकामनाएं। भगवान गणेश आप दोनों के इस पवित्र गठबंधन को सुख और समृद्धि से परिपूर्ण करें।",
      dateEn: "2 days ago", dateHi: "२ दिन पहले",
    },
  ]);

  const [form, setForm]           = useState({ name: "", relation: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setWishes([
      {
        id: String(Date.now()),
        name: form.name,
        relationEn: form.relation || "Guest",
        relationHi: form.relation || "अतिथि",
        messageEn: form.message,
        messageHi: form.message,
        dateEn: "Just now",
        dateHi: "अभी-अभी",
      },
      ...wishes,
    ]);
    setForm({ name: "", relation: "", message: "" });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3500);
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const starCount = isMobile ? 6 : 18;
  const rawPetals = [9, 24, 39, 54, 68, 82];
  const petals = isMobile ? rawPetals.slice(0, 3) : rawPetals;

  return (
    <section
      id="wishes"
      className="relative py-20 md:py-28 px-4 md:px-6 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #FFFDF8 0%, #FAF6EF 50%, #F5ECE0 100%)" }}
    >
      {/* ── Background layer ── */}

      {/* Twinkling star dots */}
      {Array.from({ length: starCount }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 43 + 7) % 96}%`,
            top: `${(i * 57 + 13) % 92}%`,
            width: 2, height: 2, borderRadius: "50%",
            background: "rgba(212,175,55,0.38)",
            "--duration": `${2.4 + (i % 4) * 0.65}s`,
            "--delay": `${(i * 0.33) % 3.5}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Floating petals */}
      {petals.map((x, i) => (
        <FloatingPetal key={i} x={x} delay={i * 2.2} duration={11 + i * 1.4} />
      ))}

      {/* Ambient glow orbs */}
      <div className="absolute pointer-events-none blur-[90px] opacity-30" style={{ top: "8%",  left: "4%",  width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,176,74,0.18) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none blur-[110px] opacity-22" style={{ bottom: "8%", right: "4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(216,162,140,0.22) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none blur-[80px] opacity-20"  style={{ top: "45%", left: "45%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.58em", color: CRIMSON,
              textTransform: "uppercase", marginBottom: "0.6rem",
            }}
          >
            {t("wishes.sub")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-shine"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "0.13em",
              lineHeight: 1.08,
              marginBottom: "1rem",
            }}
          >
            {t("wishes.title")}
          </motion.h2>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.85rem" }}
          >
            <div style={{ height: 1, width: 50, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5))" }} />
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ color: ROSE, fontSize: "1.05rem" }}
            >
              ♥
            </motion.span>
            <div style={{ height: 1, width: 50, background: "linear-gradient(to left, transparent, rgba(212,175,55,0.5))" }} />
          </motion.div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ─── LEFT : Form panel ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <div
              style={{
                background: "linear-gradient(145deg, rgba(255,253,249,0.97) 0%, rgba(251,247,240,0.93) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(212,175,55,0.26)",
                borderRadius: "1.5rem",
                padding: "2.2rem",
                boxShadow: "0 18px 50px rgba(90,70,52,0.1), inset 0 1px 0 rgba(255,255,255,0.65)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gold top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
              {/* Dashed frame */}
              <div style={{ position: "absolute", inset: 6, border: "1px dashed rgba(212,175,55,0.14)", borderRadius: "1.1rem", pointerEvents: "none" }} />
              {/* Decorative corner ✦ */}
              {["top-3 left-3","top-3 right-3","bottom-3 left-3","bottom-3 right-3"].map((pos) => (
                <span key={pos} className={`absolute ${pos} text-[5px] opacity-20`} style={{ color: GOLD }}>✦</span>
              ))}

              {/* Form heading */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.7rem" }}>
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${SAFFRON}, ${GOLD})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 14px rgba(212,175,55,0.32)`,
                    fontSize: "1rem",
                  }}
                >
                  ✍️
                </motion.div>
                <h3 style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.05rem", fontWeight: 600, color: "#3E2A1A",
                  letterSpacing: "0.04em",
                }}>
                  {t("wishes.leave")}
                </h3>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <FormField
                  id="wish-name"
                  label={t("wishes.nameLabel")}
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder={t("wishes.namePlaceholder")}
                  required
                />
                <FormField
                  id="wish-relation"
                  label={t("wishes.relationLabel")}
                  value={form.relation}
                  onChange={(v) => setForm({ ...form, relation: v })}
                  placeholder={t("wishes.relationPlaceholder")}
                />
                <FormField
                  id="wish-message"
                  label={t("wishes.msgLabel")}
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  placeholder={t("wishes.msgPlaceholder")}
                  asTextarea
                  required
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.025, boxShadow: `0 14px 36px rgba(212,175,55,0.32)` }}
                  whileTap={{ scale: 0.965 }}
                  style={{
                    width: "100%",
                    padding: "0.88rem 1.5rem",
                    borderRadius: "0.75rem",
                    background: `linear-gradient(135deg, ${SAFFRON} 0%, ${GOLD} 50%, #C9912E 100%)`,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    color: "#FDF5E8",
                    fontFamily: "var(--font-poppins), sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    boxShadow: "0 6px 22px rgba(212,175,55,0.22)",
                    transition: "all 0.3s ease",
                    marginTop: "0.25rem",
                  }}
                >
                  <Send size={13} strokeWidth={2.5} />
                  {t("wishes.submit")}
                </motion.button>
              </form>

              {/* ── Success overlay ── */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.32 }}
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: "1.5rem",
                      background: "rgba(255,253,249,0.97)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.8rem",
                      padding: "2rem",
                      textAlign: "center",
                    }}
                  >
                    {/* Floating heart burst */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 0, x: (i - 2.5) * 22, opacity: 1, scale: 0.7 }}
                        animate={{ y: -70, opacity: 0, scale: 1.5 }}
                        transition={{ delay: i * 0.1, duration: 1.1, ease: "easeOut" }}
                        style={{ position: "absolute", fontSize: "1.1rem", color: ROSE, pointerEvents: "none" }}
                      >
                        ♥
                      </motion.span>
                    ))}

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.12 }}
                      style={{
                        width: 60, height: 60, borderRadius: "50%",
                        background: `linear-gradient(135deg, rgba(212,175,55,0.18), rgba(232,176,74,0.28))`,
                        border: `1.5px solid rgba(212,175,55,0.55)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.6rem",
                        boxShadow: `0 0 30px rgba(212,175,55,0.18)`,
                      }}
                    >
                      ✨
                    </motion.div>

                    <h4 style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.1rem", color: "#3E2A1A",
                      fontWeight: 600, letterSpacing: "0.08em",
                    }}>
                      {t("wishes.success.title")}
                    </h4>
                    <p style={{
                      fontFamily: "var(--font-lora), serif",
                      fontSize: "0.82rem", color: "#5C4638",
                      lineHeight: 1.75, maxWidth: "22rem",
                    }}>
                      {t("wishes.success.desc")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ─── RIGHT : Live wishes board ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Board header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" }}>

              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                {/* Pulsing live dot */}
                <div style={{ position: "relative", width: 10, height: 10 }}>
                  <motion.span
                    animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.7, repeat: Infinity }}
                    style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4CAF50", display: "block" }}
                  />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4CAF50", display: "block", zIndex: 1 }} />
                </div>
                <h3 style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1rem", fontWeight: 600, color: "#3E2A1A",
                  letterSpacing: "0.05em",
                }}>
                  {t("wishes.live")}
                </h3>
              </div>

              {/* Blessing count badge */}
              <motion.div
                key={wishes.length}
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{
                  background: `linear-gradient(135deg, rgba(107,15,26,0.1), rgba(107,15,26,0.18))`,
                  border: `1px solid rgba(107,15,26,0.25)`,
                  borderRadius: "2rem",
                  padding: "0.28rem 0.85rem",
                  display: "flex", alignItems: "center", gap: "0.35rem",
                }}
              >
                <span style={{ fontSize: "0.6rem", color: CRIMSON, fontWeight: 700, fontFamily: "var(--font-poppins), sans-serif", letterSpacing: "0.04em" }}>
                  {wishes.length} {wishes.length === 1 ? "Blessing" : "Blessings"}
                </span>
              </motion.div>
            </div>

            {/* Cards — no inner scroll; page scroll handles this */}
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "1rem",
              }}
            >
              <AnimatePresence initial={false}>
                {wishes.map((wish, index) => (
                  <WishCard key={wish.id} wish={wish} index={index} locale={locale} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
