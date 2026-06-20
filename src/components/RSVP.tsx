"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const GOLD = "#C9912E";
const SAFFRON = "#E8B84B";

type Attendance = "yes" | "no" | null;
type Meal = "veg" | "nonveg" | null;

interface FormState {
  name: string;
  email: string;
  phone: string;
  guests: string;
  attendance: Attendance;
  meal: Meal;
  message: string;
}

const initForm: FormState = {
  name: "",
  email: "",
  phone: "",
  guests: "1",
  attendance: null,
  meal: null,
  message: "",
};

export default function RSVP() {
  const { t, locale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.5)",
    border: `1px solid ${GOLD}44`,
    borderRadius: "0.6rem",
    padding: "0.7rem 1rem",
    color: "var(--foreground)",
    fontFamily: "var(--font-sans), sans-serif",
    fontSize: "0.82rem",
    fontWeight: 400,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans), sans-serif",
    fontSize: "0.58rem",
    letterSpacing: "0.32em",
    color: "var(--gold)",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: "0.35rem",
    display: "block",
  };

  return (
    <section
      id="rsvp"
      className="relative py-12 md:py-24 px-4 md:px-6 w-full flex flex-col items-center"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Decorative stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${(i * 37 + 9) % 97}%`,
            top: `${(i * 59 + 5) % 95}%`,
            width: i % 4 === 0 ? 2.5 : 1.5,
            height: i % 4 === 0 ? 2.5 : 1.5,
            borderRadius: "50%",
            background: "rgba(201, 145, 46, 0.3)",
            "--duration": `${1.5 + (i % 5) * 0.5}s`,
            "--delay": `${(i * 0.18) % 5}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Ambient warm glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(201,145,46,0.03) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Chapter header */}
      <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 10 }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.55em",
            color: "var(--burgundy-light)",
            textTransform: "uppercase",
            marginBottom: "1rem",
            fontWeight: 500,
          }}
        >
          Chapter X — RSVP
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "clamp(2rem, 6vw, 3.8rem)",
            fontWeight: 500,
            color: "var(--burgundy)",
            letterSpacing: "0.15em",
            marginBottom: "0.5rem",
          }}
        >
          {t("rsvp.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "var(--font-serif), serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "var(--burgundy-light)",
            opacity: 0.8,
            letterSpacing: "0.08em",
          }}
        >
          {t("rsvp.sub")}
        </motion.p>
      </div>

      {/* Floating invitation card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="animate-frame-sway"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: isOpen ? 620 : 420,
          transition: "max-width 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Outer envelope / card shell */}
        <div
          style={{
            borderRadius: "1.5rem",
            border: `2px solid ${GOLD}`,
            background: "var(--cream-dark)",
            backdropFilter: "blur(12px)",
            boxShadow: `0 15px 45px rgba(107, 15, 26, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.4)`,
            overflow: "hidden",
          }}
        >
          {/* Card top — always visible */}
          <div
            style={{
              padding: "2.5rem 2rem",
              textAlign: "center",
              borderBottom: isOpen ? `1px solid rgba(201, 145, 46, 0.2)` : "none",
              cursor: isOpen ? "default" : "pointer",
            }}
            onClick={() => !isOpen && setIsOpen(true)}
          >
            {/* Decorative top ornament */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <div style={{ height: 1, width: 48, background: `linear-gradient(to right,transparent,rgba(201, 145, 46, 0.3))` }} />
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: "1.1rem", color: "var(--gold)" }}
              >
                ✦
              </motion.span>
              <div style={{ height: 1, width: 48, background: `linear-gradient(to left,transparent,rgba(201, 145, 46, 0.3))` }} />
            </div>

            <p
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-serif), serif",
                fontStyle: locale === "hi" ? "normal" : "italic",
                fontSize: locale === "hi" ? "0.95rem" : "0.85rem",
                color: "var(--foreground)",
                opacity: 0.8,
                letterSpacing: locale === "hi" ? "0.05em" : "0.15em",
                marginBottom: "0.6rem",
                fontWeight: locale === "hi" ? 500 : 400,
              }}
            >
              {locale === "hi" ? "अपने परिजनों के साथ" : "Together with their families"}
            </p>
            <h3
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-display), serif",
                fontSize: locale === "hi" ? "clamp(1.2rem, 3.5vw, 1.8rem)" : "clamp(1.4rem, 4vw, 2.1rem)",
                fontWeight: 600,
                letterSpacing: locale === "hi" ? "0.05em" : "0.18em",
                color: "var(--burgundy)",
                marginBottom: "0.5rem",
              }}
            >
              {locale === "hi" ? "दीपक संग चांदनी" : "DEEPAK WEDS CHANDANI"}
            </h3>
            <p
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-serif), serif",
                fontStyle: locale === "hi" ? "normal" : "italic",
                fontSize: locale === "hi" ? "0.9rem" : "0.85rem",
                color: "var(--foreground)",
                opacity: 0.8,
                letterSpacing: locale === "hi" ? "0.03em" : "0.12em",
                marginBottom: "1.2rem",
                lineHeight: locale === "hi" ? 1.45 : 1.2,
                fontWeight: locale === "hi" ? 500 : 400,
              }}
            >
              {locale === "hi" ? "आपको अपने पावन विवाह उत्सव में शामिल होने के लिए सादर आमंत्रित करते हैं" : "request the honour of your presence"}
            </p>
            <p
              style={{
                fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-sans), sans-serif",
                fontSize: locale === "hi" ? "0.8rem" : "0.75rem",
                color: "var(--burgundy-light)",
                fontWeight: locale === "hi" ? 600 : 500,
                letterSpacing: locale === "hi" ? "0.05em" : "0.1em",
              }}
            >
              {locale === "hi" ? "10 फरवरी, 2027 — पलामू, झारखंड" : "10 February 2027 — Palamu, Jharkhand"}
            </p>

            {!isOpen && (
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ marginTop: "1.5rem" }}
              >
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.8rem",
                    background: `linear-gradient(135deg,${SAFFRON},${GOLD})`,
                    color: "var(--burgundy-dark)",
                    fontFamily: locale === "hi" ? "var(--font-noto-devanagari)" : "var(--font-sans), sans-serif",
                    fontWeight: 600,
                    fontSize: locale === "hi" ? "0.75rem" : "0.65rem",
                    letterSpacing: locale === "hi" ? "0.05em" : "0.2em",
                    textTransform: locale === "hi" ? "none" : "uppercase",
                    border: "none",
                    borderRadius: "2rem",
                    cursor: "pointer",
                    boxShadow: `0 8px 25px rgba(201, 145, 46, 0.25)`,
                  }}
                >
                  {locale === "hi" ? "✦ निमंत्रण पत्र खोलें" : "✦ Open Invitation"}
                </button>
              </motion.div>
            )}
          </div>

          {/* Card body — form, slides open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "2rem 2rem 2.5rem" }}>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: "center", padding: "2rem 0" }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            border: `2px solid rgba(201, 145, 46, 0.3)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1.5rem",
                            background: "rgba(201, 145, 46, 0.1)",
                          }}
                        >
                          <span style={{ fontSize: "1.6rem", color: "var(--gold)" }}>
                            {form.attendance === "yes" ? "💍" : "🙏"}
                          </span>
                        </motion.div>
                        <h4
                          style={{
                            fontFamily: "var(--font-display), serif",
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            color: "var(--burgundy)",
                            letterSpacing: "0.05em",
                            marginBottom: "0.75rem",
                          }}
                        >
                          {form.attendance === "yes"
                            ? t("rsvp.success.acceptTitle")
                            : t("rsvp.success.declineTitle")}
                        </h4>
                        <p
                          style={{
                            fontFamily: "var(--font-serif), serif",
                            fontSize: "0.82rem",
                            color: "var(--foreground)",
                            opacity: 0.8,
                            lineHeight: 1.6,
                            marginBottom: "0.75rem",
                          }}
                        >
                          {form.attendance === "yes"
                            ? t("rsvp.success.acceptDesc")
                            : t("rsvp.success.declineDesc")}
                        </p>
                        {form.email && (
                          <p
                            style={{
                              fontFamily: "var(--font-sans), sans-serif",
                              fontSize: "0.72rem",
                              color: "var(--gold)",
                              letterSpacing: "0.05em",
                              opacity: 0.85,
                            }}
                          >
                            📧 A confirmation email has been sent to {form.email}
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
                      >
                        {/* Attendance toggle */}
                        <div>
                          <span style={labelStyle}>{t("rsvp.attendance")}</span>
                          <div style={{ display: "flex", gap: "0.75rem" }}>
                            {(["yes", "no"] as Attendance[]).map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, attendance: v }))}
                                style={{
                                  flex: 1,
                                  padding: "0.65rem",
                                  borderRadius: "0.6rem",
                                  border: `1.5px solid ${form.attendance === v ? "var(--gold)" : "rgba(201, 145, 46, 0.2)"}`,
                                  background: form.attendance === v ? "rgba(201, 145, 46, 0.15)" : "rgba(255, 255, 255, 0.35)",
                                  color: form.attendance === v ? "var(--burgundy)" : "var(--foreground)",
                                  fontFamily: "var(--font-sans), sans-serif",
                                  fontWeight: form.attendance === v ? 600 : 400,
                                  fontSize: "0.75rem",
                                  letterSpacing: "0.15em",
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                              >
                                {v === "yes" ? t("rsvp.yes") : t("rsvp.no")}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Two-column name + guests */}
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0.8rem" }}>
                          <div>
                            <label style={labelStyle}>{t("rsvp.name")}</label>
                            <input
                              required
                              value={form.name}
                              onChange={(e) => set("name")(e.target.value)}
                              style={inputStyle}
                              placeholder={t("rsvp.namePlaceholder")}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>{t("rsvp.guests")}</label>
                            <select
                              value={form.guests}
                              onChange={(e) => set("guests")(e.target.value)}
                              style={{ ...inputStyle, cursor: "pointer" }}
                            >
                              {["1", "2", "3", "4", "5+"].map((g) => (
                                <option key={g} value={g} style={{ background: "#FDF5E8", color: "#1A0805" }}>
                                  {g}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Email + Phone row */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                          <div>
                            <label style={labelStyle}>{t("rsvp.form.emailLabel")}</label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => set("email")(e.target.value)}
                              style={inputStyle}
                              placeholder={t("rsvp.form.emailPlaceholder")}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>
                              {locale === "hi" ? "मोबाइल नंबर" : "Mobile Number"}
                            </label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => set("phone")(e.target.value)}
                              style={inputStyle}
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        {/* Meal preference */}
                        <div>
                          <span style={labelStyle}>{t("rsvp.meal")}</span>
                          <div style={{ display: "flex", gap: "0.75rem" }}>
                            {(["veg", "nonveg"] as Meal[]).map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, meal: v }))}
                                style={{
                                  flex: 1,
                                  padding: "0.6rem",
                                  borderRadius: "0.6rem",
                                  border: `1.5px solid ${form.meal === v ? "var(--gold)" : "rgba(201, 145, 46, 0.2)"}`,
                                  background: form.meal === v ? "rgba(201, 145, 46, 0.15)" : "rgba(255, 255, 255, 0.35)",
                                  color: form.meal === v ? "var(--burgundy)" : "var(--foreground)",
                                  fontFamily: "var(--font-sans), sans-serif",
                                  fontWeight: form.meal === v ? 600 : 400,
                                  fontSize: "0.7rem",
                                  letterSpacing: "0.1em",
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                              >
                                {v === "veg" ? t("rsvp.veg") : t("rsvp.nonveg")}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label style={labelStyle}>{t("rsvp.message")}</label>
                          <textarea
                            rows={3}
                            value={form.message}
                            onChange={(e) => set("message")(e.target.value)}
                            style={{ ...inputStyle, resize: "vertical" }}
                            placeholder={t("rsvp.messagePlaceholder")}
                          />
                        </div>

                        {error && (
                          <p
                            style={{
                              fontFamily: "var(--font-sans), sans-serif",
                              fontSize: "0.72rem",
                              color: "#C62828",
                              letterSpacing: "0.04em",
                              textAlign: "center",
                              margin: "0",
                              padding: "0.6rem 0.8rem",
                              background: "rgba(198,40,40,0.06)",
                              borderRadius: "0.5rem",
                              border: "1px solid rgba(198,40,40,0.2)",
                            }}
                          >
                            ⚠️ {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={loading || !form.attendance}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            padding: "0.9rem",
                            background: loading || !form.attendance
                              ? "rgba(201, 145, 46, 0.15)"
                              : `linear-gradient(135deg,${SAFFRON},${GOLD})`,
                            color: loading || !form.attendance ? "rgba(26, 8, 5, 0.4)" : "var(--burgundy-dark)",
                            fontFamily: "var(--font-sans), sans-serif",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            border: "none",
                            borderRadius: "0.75rem",
                            cursor: loading || !form.attendance ? "not-allowed" : "pointer",
                            boxShadow: loading || !form.attendance ? "none" : `0 8px 25px rgba(201, 145, 46, 0.2)`,
                            transition: "all 0.3s",
                          }}
                        >
                          {loading ? (
                            <motion.span
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              style={{ display: "inline-block", fontSize: "0.9rem" }}
                            >
                              ✦
                            </motion.span>
                          ) : (
                            t("rsvp.submit")
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
