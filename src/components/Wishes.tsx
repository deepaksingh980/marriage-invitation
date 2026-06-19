"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Star } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

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

export default function Wishes() {
  const { t, locale } = useTranslation();

  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: "1",
      name: "Raju Kumar",
      relationEn: "Groom's Brother",
      relationHi: "वर के भाई",
      messageEn: "May your journey together be filled with endless love, laughter, and beautiful adventures! Welcome to the family, Chandani Didi!",
      messageHi: "ईश्वर करे आपका साथ हमेशा बना रहे, जीवन में ढेर सारा प्यार और खुशियाँ आएं! परिवार में आपका स्वागत है, चांदनी दीदी!",
      dateEn: "Just now",
      dateHi: "अभी-अभी",
    },
    {
      id: "2",
      name: "Golu Bhardwaj",
      relationEn: "Bride's Brother",
      relationHi: "वधू के भैया",
      messageEn: "So thrilled to celebrate your special union. Deepak, take care of our sister! Wishing you both a lifetime of happiness.",
      messageHi: "आप दोनों के शुभ विवाह के लिए बहुत-बहुत बधाई। दीपक, हमारी बहन का ध्यान रखना! आप दोनों के सुखी जीवन की कामना करता हूँ।",
      dateEn: "2 hours ago",
      dateHi: "२ घंटे पहले",
    },
    {
      id: "3",
      name: "Siddharth Malhotra",
      relationEn: "Best Friend",
      relationHi: "परम मित्र",
      messageEn: "Deepak, you found the one! Can't wait for the grand Sangeet performances. Cheers to the best couple ever!",
      messageHi: "दीपक भाई, तुम्हें जीवनसंगिनी मिल ही गई! संगीत संध्या में धमाल मचाने के लिए तैयार हूँ। सबसे बेहतरीन जोड़ी को बधाई!",
      dateEn: "1 day ago",
      dateHi: "१ दिन पहले",
    },
    {
      id: "4",
      name: "Meera & Rajiv Saxena",
      relationEn: "Family Friends",
      relationHi: "पारिवारिक मित्र",
      messageEn: "Sending our warmest blessings to Deepak and Chandani. May God bless this royal union with abundance, peace, and eternal romance.",
      messageHi: "दीपक और चांदनी को नवदंपति जीवन की हार्दिक शुभकामनाएं। भगवान गणेश आप दोनों के इस पवित्र गठबंधन को सुख और समृद्धि से परिपूर्ण करें।",
      dateEn: "2 days ago",
      dateHi: "२ दिन पहले",
    },
  ]);

  const [form, setForm] = useState({ name: "", relation: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    const newWish: Wish = {
      id: String(Date.now()),
      name: form.name,
      relationEn: form.relation || "Guest",
      relationHi: form.relation || "अतिथि",
      messageEn: form.message,
      messageHi: form.message,
      dateEn: "Just now",
      dateHi: "अभी-अभी",
    };

    setWishes([newWish, ...wishes]);
    setForm({ name: "", relation: "", message: "" });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="wishes" className="relative py-12 md:py-24 px-4 md:px-6 bg-background overflow-hidden border-t border-gold/15">
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-leaf-pattern opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-90 h-90 rounded-full bg-rose-gold/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
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
                {t("wishes.sub")}
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
                {t("wishes.title")}
              </motion.span>
            </AnimatePresence>
          </h2>
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-12 bg-gold/30" />
            <MessageCircle className="h-4 w-4 text-gold-dark" />
            <div className="h-[1px] w-12 bg-gold/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl glass-premium p-8 border border-gold/20 relative bg-white">
              <h3 className="font-serif text-xl text-luxury-dark font-medium tracking-wider mb-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={locale}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    {t("wishes.leave")}
                  </motion.span>
                </AnimatePresence>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2 font-sans text-xs">
                  <label htmlFor="wish-name" className="text-gold-dark/80 tracking-widest uppercase font-medium">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={locale}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {t("wishes.nameLabel")}
                      </motion.span>
                    </AnimatePresence>
                  </label>
                  <input
                    type="text"
                    id="wish-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-gold/15 text-luxury-dark placeholder-luxury-dark/40 focus:border-gold/60 focus:outline-none transition-premium font-light text-sm"
                    placeholder={t("wishes.namePlaceholder")}
                  />
                </div>

                {/* Relation */}
                <div className="space-y-2 font-sans text-xs">
                  <label htmlFor="wish-relation" className="text-gold-dark/80 tracking-widest uppercase font-medium">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={locale}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {t("wishes.relationLabel")}
                      </motion.span>
                    </AnimatePresence>
                  </label>
                  <input
                    type="text"
                    id="wish-relation"
                    value={form.relation}
                    onChange={(e) => setForm({ ...form, relation: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-gold/15 text-luxury-dark placeholder-luxury-dark/40 focus:border-gold/60 focus:outline-none transition-premium font-light text-sm"
                    placeholder={t("wishes.relationPlaceholder")}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2 font-sans text-xs">
                  <label htmlFor="wish-message" className="text-gold-dark/80 tracking-widest uppercase font-medium">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={locale}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        {t("wishes.msgLabel")}
                      </motion.span>
                    </AnimatePresence>
                  </label>
                  <textarea
                    id="wish-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-gold/15 text-luxury-dark placeholder-luxury-dark/40 focus:border-gold/60 focus:outline-none transition-premium font-light text-sm resize-none"
                    placeholder={t("wishes.msgPlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gold-gradient text-white font-semibold text-xs tracking-wider transition-premium hover:shadow-lg hover:shadow-gold/10 hover:scale-[1.01] active:scale-95 cursor-pointer focus:outline-none"
                >
                  <Send className="h-3 w-3 fill-white" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={locale}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t("wishes.submit")}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </form>

              {/* Toast response */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/95 backdrop-blur-sm p-6 text-center border border-gold"
                  >
                    <div className="space-y-3">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-light/20 border border-gold/45">
                        <Star className="h-5 w-5 text-gold-dark fill-gold-light/10" />
                      </div>
                      <h4 className="font-serif text-lg text-luxury-dark uppercase font-medium tracking-wider">
                        {t("wishes.success.title")}
                      </h4>
                      <p className="font-sans text-xs text-luxury-dark/80 leading-normal font-light">
                        {t("wishes.success.desc")}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Live Wishes */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-lg text-luxury-dark font-medium tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={locale}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {t("wishes.live")}
                </motion.span>
              </AnimatePresence>
            </h3>

            <div className="grid grid-cols-1 gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="rounded-xl border border-gold/15 bg-white/70 p-6 space-y-3 font-sans text-xs shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-sm text-luxury-dark font-medium uppercase tracking-wide">
                          {wish.name}
                        </h4>
                        <span className="text-[10px] text-text-grey">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={locale}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {locale === "hi" ? wish.relationHi : wish.relationEn}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      </div>
                      <span className="text-[10px] text-gold-dark/80 font-medium">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={locale}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {locale === "hi" ? wish.dateHi : wish.dateEn}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    </div>
                    <p className="text-luxury-dark/80 font-light leading-relaxed text-sm font-sans">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={locale}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="block"
                        >
                          {locale === "hi" ? wish.messageHi : wish.messageEn}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
