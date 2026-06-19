"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  playAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

/* Single premium Indian wedding track */
const TRACK_URL = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Shehnai_by_Bismillah_Khan.ogg";

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const triggeredRef = useRef(false);

  /* Initialize audio element once */
  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playAudio = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      triggeredRef.current = true;
    } catch {
      /* Browser blocked autoplay — wait for user click */
    }
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
