"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { AudioProvider } from "@/context/AudioContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "lenis/dist/lenis.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AudioProvider>
        <ReactLenis 
          root 
          options={{ 
            duration: 1.6, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            syncTouch: false,
          }}
        >
          {children}
        </ReactLenis>
      </AudioProvider>
    </LanguageProvider>
  );
}
