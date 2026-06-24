"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Sparkles / Notes emanating from the Shehnai bell
interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotate: number;
  char: string;
}

function MusicNotesEmanating({ side }: { side: "left" | "right" }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const chars = ["♪", "♫", "✨", "✦", "♩", "ℳ"];
    let idCounter = 0;

    const interval = setInterval(() => {
      const newParticle: Particle = {
        id: idCounter++,
        x: 0,
        y: 0,
        scale: 0.4 + Math.random() * 0.6,
        opacity: 0.9,
        rotate: Math.random() * 360,
        char: chars[Math.floor(Math.random() * chars.length)],
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
      {particles.map((p) => {
        // Left player shehnai bell is at top-right (around x: 75%, y: 15%)
        // Right player shehnai bell is at top-left (around x: 25%, y: 15%)
        const startX = side === "left" ? "75%" : "25%";
        const startY = "18%";

        // Left note flows right and up. Right note flows left and up.
        const endX = side === "left"
          ? ["0px", `${40 + Math.random() * 60}px`, `${80 + Math.random() * 100}px`]
          : ["0px", `-${40 + Math.random() * 60}px`, `-${80 + Math.random() * 100}px`];

        return (
          <motion.div
            key={p.id}
            initial={{
              position: "absolute",
              left: startX,
              top: startY,
              x: 0,
              y: 0,
              scale: 0.2,
              opacity: 0.9,
              rotate: p.rotate,
            }}
            animate={{
              x: endX,
              y: ["0px", `-${30 + Math.random() * 50}px`, `-${80 + Math.random() * 100}px`],
              scale: [0.2, p.scale, p.scale * 0.8],
              opacity: [0.9, 0.9, 0],
              rotate: p.rotate + (side === "left" ? 90 : -90),
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
            style={{
              color: "#FFDF8A",
              textShadow: "0 0 8px rgba(212, 175, 55, 0.9), 0 0 15px rgba(212, 175, 55, 0.6)",
              fontSize: "clamp(12px, 3.5vw, 24px)",
              fontFamily: "serif",
              transformOrigin: "center",
            }}
          >
            {p.char}
          </motion.div>
        );
      })}
    </div>
  );
}

export type PlayerState =
  | "hidden"
  | "entering"
  | "playing"
  | "exiting";

interface ShehnaiPlayersProps {
  state: PlayerState;
}

export default function ShehnaiPlayers({ state }: ShehnaiPlayersProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  if (state === "hidden") return null;

  // Responsive styling positions
  const leftPosition = isMobile ? { left: "-2%", bottom: "0vh" } : { left: "10vw", bottom: "0vh" };
  const rightPosition = isMobile ? { right: "-2%", bottom: "0vh" } : { right: "10vw", bottom: "0vh" };
  
  const playerWidth = isMobile ? 180 : 380;
  const playerHeight = isMobile ? 180 : 380;

  // Walk-in and walk-out transitions
  const leftVariants = {
    initial: {
      x: "-120%",
      y: 0,
      opacity: 0,
    },
    entering: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.2,
        ease: "easeOut" as const,
      },
    },
    playing: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exiting: {
      x: "-120%",
      y: 0,
      opacity: 0,
      transition: {
        duration: 2.5,
        ease: "easeIn" as const,
      },
    },
  };

  const rightVariants = {
    initial: {
      x: "120%",
      y: 0,
      opacity: 0,
    },
    entering: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 2.2,
        ease: "easeOut" as const,
      },
    },
    playing: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exiting: {
      x: "120%",
      y: 0,
      opacity: 0,
      transition: {
        duration: 2.5,
        ease: "easeIn" as const,
      },
    },
  };

  // Playing animations (breathing + swaying + turban tassels moving)
  const leftPlayingAnims = {
    y: [0, -6, 2, -4, 0],
    rotate: [0, 1.5, -1, 2, 0],
    scaleX: [1, 1.015, 0.99, 1.015, 1],
    scaleY: [1, 0.985, 1.01, 0.985, 1],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const rightPlayingAnims = {
    y: [0, -5, 3, -3, 0],
    rotate: [0, -1.8, 1.2, -1.5, 0],
    scaleX: [1, 1.012, 0.992, 1.012, 1],
    scaleY: [1, 0.988, 1.008, 0.988, 1],
    transition: {
      duration: 4.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.2, // slight offset to feel natural
    },
  };

  return (
    <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none select-none z-35 overflow-hidden">
      <AnimatePresence>
        {/* Left Shehnai Player */}
        <motion.div
          key="left-player"
          variants={leftVariants}
          initial="initial"
          animate={state === "playing" ? "playing" : state}
          exit="exiting"
          style={{
            position: "absolute",
            ...leftPosition,
            width: playerWidth,
            height: playerHeight,
            transformOrigin: "bottom center",
          }}
        >
          <motion.div
            animate={state === "playing" ? leftPlayingAnims : undefined}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/shehnai_player_left.png"
              alt="Royal Shehnai Player Left"
              fill
              priority
              unoptimized
              sizes={isMobile ? "180px" : "380px"}
              className="object-contain"
            />
            
            {/* Musical notes flowing out */}
            {state === "playing" && <MusicNotesEmanating side="left" />}
          </motion.div>
        </motion.div>

        {/* Right Shehnai Player */}
        <motion.div
          key="right-player"
          variants={rightVariants}
          initial="initial"
          animate={state === "playing" ? "playing" : state}
          exit="exiting"
          style={{
            position: "absolute",
            ...rightPosition,
            width: playerWidth,
            height: playerHeight,
            transformOrigin: "bottom center",
          }}
        >
          <motion.div
            animate={state === "playing" ? rightPlayingAnims : undefined}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src="/images/shehnai_player_right.png"
              alt="Royal Shehnai Player Right"
              fill
              priority
              unoptimized
              sizes={isMobile ? "180px" : "380px"}
              className="object-contain"
            />
            
            {/* Musical notes flowing out */}
            {state === "playing" && <MusicNotesEmanating side="right" />}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
