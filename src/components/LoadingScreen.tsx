"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(iv);
          setTimeout(onComplete, 400); // Brief delay for smooth fade
          return 100;
        }
        return Math.min(100, p + Math.random() * 28 + 12);
      });
    }, 75);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden select-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 25%, #250500 0%, #120100 45%, #070000 100%)" }}>
      {/* Background Ornament Frames */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { pos: "top-0 left-0", radii: "0 0 100% 0", noBorder: ["borderRight", "borderBottom"] },
          { pos: "top-0 right-0", radii: "0 0 100% 0", noBorder: ["borderLeft", "borderBottom"] },
          { pos: "bottom-0 left-0", radii: "0 100% 0 0", noBorder: ["borderRight", "borderTop"] },
          { pos: "bottom-0 right-0", radii: "0 100% 0 0", noBorder: ["borderLeft", "borderTop"] },
        ].map((c, i) => (
          <div key={i} className={`absolute ${c.pos} w-28 h-28`} style={{ border: "1px solid rgba(212,175,55,0.08)", borderRadius: c.radii, [c.noBorder[0]]: "none", [c.noBorder[1]]: "none" }} />
        ))}
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20"
        >
          {/* Breathing Ganesha Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
            className="w-[68px] h-[68px] flex items-center justify-center mb-[22px]"
            style={{ border: "1px solid rgba(212,175,55,0.3)", borderRadius: "50%" }}
          >
            <Image
              src="/assets/ganesha.webp"
              alt="Ganesha"
              width={44}
              height={44}
              priority
              className="object-contain"
              style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.7))" }}
            />
          </motion.div>

          {/* Traditional Text */}
          <p
            className="mb-[18px] text-[15px] select-none text-center"
            style={{
              fontFamily: "var(--font-noto-devanagari)",
              color: "#D4AF37",
              letterSpacing: "0.25em",
              textShadow: "0 0 16px rgba(212,175,55,0.5)"
            }}
          >
            ॥ श्री गणेशाय नमः ॥
          </p>

          {/* Progress Bar */}
          <div className="w-[160px] h-[1.5px] rounded bg-[rgba(212,175,55,0.12)] overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, #A68018, #D4AF37, #F3D27F)",
                width: `${progress}%`
              }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Progress Percentage */}
          <span
            className="mt-2 text-[10px] select-none"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "rgba(212,175,55,0.45)",
              letterSpacing: "0.4em"
            }}
          >
            {Math.round(progress)}%
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
