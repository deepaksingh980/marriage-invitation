"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Gift as GiftIcon, QrCode } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

export default function Gift() {
  const { t, locale } = useTranslation();
  const [copied, setCopied] = useState(false);
  const upiId = "deepak.chandani@upi";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gift" className="relative py-12 md:py-24 px-4 md:px-6 bg-background overflow-hidden border-t border-gold/15">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-leaf-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold-light/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans tracking-[0.25em] text-[10px] text-text-grey uppercase mb-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={locale}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {t("gift.sub")}
              </motion.span>
            </AnimatePresence>
          </p>
          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.12em] font-light text-shine mb-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={locale}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {t("gift.title")}
              </motion.span>
            </AnimatePresence>
          </h2>
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-12 bg-gold/30" />
            <GiftIcon className="h-4 w-4 text-gold-dark" />
            <div className="h-[1px] w-12 bg-gold/30" />
          </div>
        </div>

        {/* Gift Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Message and Bank info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between rounded-2xl glass-premium p-8 border border-gold/20 bg-white"
          >
            <div className="space-y-4 font-sans text-xs">
              <span className="font-serif text-xs text-gold-dark tracking-widest uppercase block font-medium">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {t("gift.note")}
                  </motion.span>
                </AnimatePresence>
              </span>
              <h3 className="font-serif text-xl text-luxury-dark font-medium uppercase tracking-wider">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    {t("gift.shagun")}
                  </motion.span>
                </AnimatePresence>
              </h3>
              <p className="text-luxury-dark/80 leading-relaxed font-light min-h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    {t("gift.desc")}
                  </motion.span>
                </AnimatePresence>
              </p>
            </div>

            {/* Bank details */}
            <div className="mt-8 space-y-4 pt-6 border-t border-gold-light/35 font-sans text-xs">
              <div className="space-y-1">
                <span className="text-gold-dark/60 tracking-wider uppercase font-semibold text-[10px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={locale}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {t("gift.bank")}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <p className="font-serif text-sm text-luxury-dark/95 font-light tracking-wide">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={locale}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {t("gift.bankName")}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-gold-dark/60 tracking-wider uppercase font-semibold text-[10px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={locale}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {t("gift.holder")}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <p className="font-serif text-sm text-luxury-dark/95 font-light tracking-wide">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={locale}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {t("couple.groom.name")}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-gold-dark/60 tracking-wider uppercase font-semibold text-[10px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={locale}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {t("gift.number")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <p className="font-serif text-sm text-luxury-dark/95 font-light tracking-wide">
                    987654321012
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-gold-dark/60 tracking-wider uppercase font-semibold text-[10px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={locale}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {t("gift.ifsc")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <p className="font-serif text-sm text-luxury-dark/95 font-light tracking-wide">
                    ROYB0001234
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: UPI Scan & Pay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-between rounded-2xl glass-premium p-8 border border-gold-gradient text-center bg-white"
          >
            <div className="space-y-2 font-sans text-xs">
              <span className="font-serif text-[9px] tracking-widest text-gold-dark bg-gold-light/30 border border-gold/25 px-3 py-1 bg-opacity-70 rounded-full uppercase">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t("gift.qr")}
                  </motion.span>
                </AnimatePresence>
              </span>
              <h3 className="font-serif text-lg text-luxury-dark font-medium mt-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t("gift.qrTitle")}
                  </motion.span>
                </AnimatePresence>
              </h3>
            </div>

            {/* QR Scanner Frame */}
            <div className="relative h-40 w-40 rounded-xl border border-gold/25 bg-background p-4 flex items-center justify-center group my-6 overflow-hidden shadow-inner">
              {/* Scan Bar animation */}
              <div className="absolute inset-x-0 h-[1.5px] bg-gold-gradient animate-bounce [animation-duration:2.5s] top-0 shadow-[0_0_8px_#D4B06A] z-10" />
              
              <QrCode className="h-full w-full text-gold-dark opacity-90 transition-transform duration-500 group-hover:scale-103" />
            </div>

            {/* UPI ID Copy Field */}
            <div className="w-full space-y-3 font-sans text-xs">
              <p className="text-text-grey">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t("gift.upi")}
                  </motion.span>
                </AnimatePresence>
              </p>
              
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-background border border-gold/15 rounded-lg shadow-sm">
                <span className="font-mono text-xs text-luxury-dark/85 font-light select-all">
                  {upiId}
                </span>
                
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-gold-light/10 border border-transparent hover:border-gold/20 text-gold-dark active:scale-90 transition-premium cursor-pointer focus:outline-none"
                  title="Copy UPI ID"
                >
                  {copied ? (
                    <span className="text-[10px] text-emerald-600 font-serif font-semibold">
                      {locale === "hi" ? "कॉपी हो गया!" : "Copied!"}
                    </span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
