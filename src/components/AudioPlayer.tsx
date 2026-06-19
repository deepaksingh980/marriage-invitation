"use client";

import React from "react";
import { useAudio } from "@/context/AudioContext";
import { Music, VolumeX } from "lucide-react";

export function AudioPlayer() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full glass-premium transition-premium duration-500 hover:scale-110 active:scale-95 animate-pulse-glow focus:outline-none bg-white cursor-pointer"
        aria-label="Toggle Traditional Wedding Music"
      >
        {/* Glow background */}
        <span className="absolute inset-0 rounded-full bg-saffron/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {isPlaying ? (
          <div className="flex items-center justify-center relative">
            <Music className="h-5 w-5 text-gold-dark absolute animate-bounce" />
            
            {/* Pulsing circular shehnai rings */}
            <span className="absolute w-8 h-8 rounded-full border border-saffron/30 animate-ping [animation-duration:1.8s]" />
            <span className="absolute w-10 h-10 rounded-full border border-gold/20 animate-ping [animation-duration:2.5s]" />
          </div>
        ) : (
          <VolumeX className="h-5 w-5 text-gold-dark transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
