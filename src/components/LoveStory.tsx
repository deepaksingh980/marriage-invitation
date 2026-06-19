"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const GOLD = "#D4AF37";
const SAFFRON = "#E8B04A";
const ROSE = "#D8A28C";

const milestoneIcons = ["✦", "♥", "❋"];
const milestoneColors = [SAFFRON, ROSE, GOLD];
const PREVIEW_WORDS = 22;

function GoldDustBackground() {
  const [particles] = useState(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 1.5 + Math.random() * 2,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.12 + Math.random() * 0.35,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "110%", x: `${p.x}%`, opacity: 0 }}
          animate={{
            y: "-10%",
            x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 7}%`],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #F3D27F 0%, #D4AF37 70%, transparent 100%)",
            boxShadow: "0 0 6px #D4AF37",
          }}
        />
      ))}
    </div>
  );
}

function TimelineChakraNode({
  color,
  icon,
  isHovered,
}: {
  color: string;
  icon: string;
  isHovered: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center w-14 h-14 rounded-full select-none">
      <motion.div
        animate={{ rotate: isHovered ? 360 : [0, 360] }}
        transition={
          isHovered
            ? { duration: 4.5, repeat: Infinity, ease: "linear" }
            : { duration: 25, repeat: Infinity, ease: "linear" }
        }
        className="absolute inset-0"
        style={{ color }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="39" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={50 + 39 * Math.cos(angle)}
                y1={50 + 39 * Math.sin(angle)}
                x2={50 + 45 * Math.cos(angle)}
                y2={50 + 45 * Math.sin(angle)}
              />
            );
          })}
        </svg>
      </motion.div>

      <div
        className="w-10 h-10 rounded-full flex items-center justify-center relative bg-[#FFFDF8] border transition-all duration-300"
        style={{
          borderColor: color,
          boxShadow: isHovered
            ? `0 0 16px ${color}66, 0 4px 18px ${color}33`
            : `0 0 0 4px ${color}10, 0 4px 12px ${color}15`,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.28, 1], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-4px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}30 0%, transparent 70%)` }}
        />
        <span style={{ fontSize: "1.1rem", color }} className="relative z-10">
          {icon}
        </span>
      </div>
    </div>
  );
}

function MilestoneCard({
  chapter,
  yearKey,
  titleKey,
  descKey,
  color,
  align,
  t,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  chapter: string;
  yearKey: string;
  titleKey: string;
  descKey: string;
  color: string;
  align: "left" | "right" | "mobile";
  t: (k: string) => string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLeft = align === "left";

  const fullText = t(descKey);
  const words = fullText.split(/\s+/);
  const hasMore = words.length > PREVIEW_WORDS;
  const previewText = words.slice(0, PREVIEW_WORDS).join(" ");
  const remainingText = words.slice(PREVIEW_WORDS).join(" ");

  const storyStyle: React.CSSProperties = {
    fontFamily: "var(--font-lora), serif",
    fontSize: "0.875rem",
    color: "#5C4638",
    lineHeight: 1.9,
    letterSpacing: "0.008em",
    textAlign: isLeft ? "right" : "left",
  };

  return (
    <motion.div
      layout
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={expanded ? {} : { y: -5, scale: 1.012 }}
      transition={{ layout: { duration: 0.42, ease: [0.4, 0, 0.2, 1] }, type: "spring", stiffness: 180, damping: 20 }}
      className="relative rounded-2xl overflow-hidden border"
      style={{
        background: "linear-gradient(145deg, rgba(255,253,249,0.95) 0%, rgba(251,247,240,0.90) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: isHovered || expanded ? color : "rgba(212,175,55,0.22)",
        boxShadow: expanded
          ? `0 28px 55px rgba(90,70,52,0.15), 0 0 32px ${color}18, inset 0 1px 0 rgba(255,255,255,0.6)`
          : isHovered
          ? `0 20px 45px rgba(90,70,52,0.11), 0 0 24px ${color}15, inset 0 1px 0 rgba(255,255,255,0.5)`
          : `0 8px 32px rgba(90,70,52,0.05), inset 0 1px 0 rgba(255,255,255,0.38)`,
      }}
    >
      {/* Top accent bar */}
      <motion.div
        animate={{ opacity: isHovered || expanded ? 1 : 0.52 }}
        transition={{ duration: 0.25 }}
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
      />

      {/* Dashed inner frame */}
      <div className="absolute inset-[4px] border border-dashed border-[#D4AF37]/12 rounded-[0.9rem] pointer-events-none" />

      <div className="p-6 md:p-8 relative z-10" style={{ textAlign: isLeft ? "right" : "left" }}>

        {/* Chapter label */}
        <p className="select-none mb-1" style={{
          fontFamily: "var(--font-poppins), sans-serif",
          fontSize: "0.56rem", fontWeight: 700, color,
          letterSpacing: "0.55em", textTransform: "uppercase", opacity: 0.68,
        }}>
          {chapter}
        </p>

        {/* Date */}
        <p className="select-none mb-3" style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: "0.65rem", fontWeight: 700, color,
          letterSpacing: "0.28em", textTransform: "uppercase",
        }}>
          {t(yearKey)}
        </p>

        {/* Title */}
        <h3 className="mb-1" style={{
          fontFamily: "var(--font-great-vibes), cursive",
          fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
          fontWeight: 400, color: "#3E2A1A", lineHeight: 1.2,
        }}>
          {t(titleKey)}
        </h3>

        {/* Ornamental divider */}
        <div className="mb-4" style={{ display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start" }}>
          <span style={{ color, fontSize: "0.7rem", letterSpacing: "0.3em" }}>— ✦ —</span>
        </div>

        {/* ── Story with read-more ── */}
        <div className="relative">

          {/* Preview text — always visible */}
          <p style={storyStyle}>
            {previewText}
            {!expanded && hasMore && (
              <span style={{ opacity: 0.4, fontStyle: "italic" }}>&thinsp;…</span>
            )}
          </p>

          {/* Fade veil over preview when collapsed */}
          <AnimatePresence>
            {!expanded && hasMore && (
              <motion.div
                key="veil"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(252,249,243,0.96))" }}
              />
            )}
          </AnimatePresence>

          {/* Expanded remaining text */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="remaining"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <p style={{ ...storyStyle, marginTop: "0.08rem" }}>
                  &nbsp;{remainingText}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Read More / Show Less */}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: isLeft ? "flex-end" : "flex-start", marginTop: "0.9rem" }}>

            {/* Thin rule above button */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: isLeft ? "flex-end" : "flex-start", gap: "0.45rem" }}>
              <div style={{ width: 36, height: 1, background: `linear-gradient(to ${isLeft ? "left" : "right"}, transparent, ${color}50)` }} />

              <motion.button
                onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
                whileHover={{ x: expanded ? -2 : 2, opacity: 0.82 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.3rem 0",
                  fontFamily: "var(--font-lora), serif",
                  fontSize: "0.76rem", fontStyle: "italic",
                  color, letterSpacing: "0.07em",
                  display: "flex", alignItems: "center", gap: "0.3rem",
                }}
              >
                {expanded
                  ? <><span style={{ fontSize: "0.68rem", fontStyle: "normal" }}>↑</span> Show Less</>
                  : <>Read More <span style={{ fontSize: "0.85rem", fontStyle: "normal" }}>→</span></>
                }
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-2 left-2 text-[5px] opacity-18" style={{ color }}>✦</div>
      <div className="absolute top-2 right-2 text-[5px] opacity-18" style={{ color }}>✦</div>
      <div className="absolute bottom-2 left-2 text-[5px] opacity-18" style={{ color }}>✦</div>
      <div className="absolute bottom-2 right-2 text-[5px] opacity-18" style={{ color }}>✦</div>
    </motion.div>
  );
}

export default function LoveStory() {
  const { t } = useTranslation();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const milestones = [
    { key: "m1", chapter: "Chapter I",   align: "left"  as const, icon: milestoneIcons[0], color: milestoneColors[0] },
    { key: "m2", chapter: "Chapter II",  align: "right" as const, icon: milestoneIcons[1], color: milestoneColors[1] },
    { key: "m3", chapter: "Chapter III", align: "left"  as const, icon: milestoneIcons[2], color: milestoneColors[2] },
  ];

  return (
    <section
      id="story"
      className="relative py-16 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #FFFDF8 0%, #FAF6EF 55%, #F5ECE0 100%)" }}
    >
      {/* Twinkling stars */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 41 + 5) % 98}%`,
            top: `${(i * 67 + 9) % 96}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(201,145,46,0.35)",
            "--duration": `${2.2 + (i % 4) * 0.75}s`,
            "--delay": `${(i * 0.3) % 4}s`,
          } as React.CSSProperties}
        />
      ))}

      <GoldDustBackground />

      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[120px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(232,176,74,0.12) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1020px] mx-auto relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.58em",
              color: "#6B0F1A",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
              fontWeight: 700,
            }}
          >
            Their Love Journey
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
              color: "#C9912E",
              letterSpacing: "0.03em",
              lineHeight: 1.3,
              marginBottom: "0.4rem",
            }}
          >
            {t("story.sub")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 800,
              color: "#3E2A1A",
              letterSpacing: "0.14em",
              lineHeight: 1.05,
            }}
          >
            {t("story.title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div style={{ height: 1, width: 55, background: "linear-gradient(to right, transparent, rgba(212,175,55,0.45))" }} />
            <span style={{ color: GOLD, fontSize: "0.7rem", letterSpacing: "0.4em" }}>✦ ✦ ✦</span>
            <div style={{ height: 1, width: 55, background: "linear-gradient(to left, transparent, rgba(212,175,55,0.45))" }} />
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* DESKTOP */}
          <div className="hidden md:block relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-[1.5px] -translate-x-1/2"
              style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}50 6%, ${GOLD}50 94%, transparent)` }}
            >
              <motion.div
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, #FFF 0%, ${SAFFRON} 60%, transparent 100%)`,
                  boxShadow: `0 0 14px 4px ${SAFFRON}, 0 0 28px 8px ${SAFFRON}66`,
                }}
              />
            </div>

            <div className="flex flex-col gap-14 relative z-10">
              {milestones.map((m, idx) => {
                const isLeft = m.align === "left";
                const isHovered = hoveredNode === m.key;
                return (
                  <div key={m.key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-0 w-full">
                    {isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: -55 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.95, delay: idx * 0.08, ease: "easeOut" }}
                        className="pr-8"
                      >
                        <MilestoneCard
                          chapter={m.chapter}
                          yearKey={`story.${m.key}.year`}
                          titleKey={`story.${m.key}.title`}
                          descKey={`story.${m.key}.desc`}
                          color={m.color}
                          align="left"
                          t={t}
                          isHovered={isHovered}
                          onMouseEnter={() => setHoveredNode(m.key)}
                          onMouseLeave={() => setHoveredNode(null)}
                        />
                      </motion.div>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center justify-center w-14">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, type: "spring", stiffness: 140 }}
                      >
                        <TimelineChakraNode color={m.color} icon={m.icon} isHovered={isHovered} />
                      </motion.div>
                    </div>

                    {!isLeft ? (
                      <motion.div
                        initial={{ opacity: 0, x: 55 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.95, delay: idx * 0.08, ease: "easeOut" }}
                        className="pl-8"
                      >
                        <MilestoneCard
                          chapter={m.chapter}
                          yearKey={`story.${m.key}.year`}
                          titleKey={`story.${m.key}.title`}
                          descKey={`story.${m.key}.desc`}
                          color={m.color}
                          align="right"
                          t={t}
                          isHovered={isHovered}
                          onMouseEnter={() => setHoveredNode(m.key)}
                          onMouseLeave={() => setHoveredNode(null)}
                        />
                      </motion.div>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden relative px-2">
            <div
              className="absolute left-[22px] top-0 bottom-0 w-[1.5px]"
              style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}50 5%, ${GOLD}50 95%, transparent)` }}
            />
            <div className="flex flex-col gap-8 relative z-10">
              {milestones.map((m, idx) => {
                const isHovered = hoveredNode === m.key;
                return (
                  <div key={m.key} className="flex items-start gap-4 relative w-full pl-10">
                    <div className="absolute left-0 top-4 -translate-x-[1px]">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 0.85, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 140 }}
                      >
                        <TimelineChakraNode color={m.color} icon={m.icon} isHovered={isHovered} />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: 28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                      className="flex-1"
                    >
                      <MilestoneCard
                        chapter={m.chapter}
                        yearKey={`story.${m.key}.year`}
                        titleKey={`story.${m.key}.title`}
                        descKey={`story.${m.key}.desc`}
                        color={m.color}
                        align="mobile"
                        t={t}
                        isHovered={isHovered}
                        onMouseEnter={() => setHoveredNode(m.key)}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Footer heart ── */}
        <div className="text-center mt-14">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, type: "spring" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 62,
              height: 62,
              borderRadius: "50%",
              border: `1.5px solid ${GOLD}40`,
              background: `radial-gradient(circle, ${GOLD}15 0%, var(--background) 70%)`,
              boxShadow: "0 8px 28px rgba(107,15,26,0.06)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.22, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontSize: "1.6rem", color: "#D8A28C" }}
            >
              ♥
            </motion.span>
          </motion.div>
          <p
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
              color: "#8B1A28",
              marginTop: "0.9rem",
              letterSpacing: "0.04em",
            }}
          >
            And forever begins…
          </p>
        </div>

      </div>
    </section>
  );
}
