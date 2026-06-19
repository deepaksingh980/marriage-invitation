"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   PLAYLIST
   Track 1 is a live Wikipedia Commons OGG (works immediately).
   Tracks 2-5 expect MP3 files in /public/audio/ — drop your own
   Indian wedding songs there with the matching filenames.
   The player silently skips any track that fails to load.
   ───────────────────────────────────────────────────────────── */
export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

export const PLAYLIST: Track[] = [
  {
    id: 1,
    title: "Shehnai",
    artist: "Ustad Bismillah Khan",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Shehnai_by_Bismillah_Khan.ogg",
  },
  {
    id: 2,
    title: "Mehndi Laga Ke Rakhna",
    artist: "Shaadi Classic",
    src: "/audio/mehndi-laga-ke-rakhna.mp3",
  },
  {
    id: 3,
    title: "Tujhe Dekha To",
    artist: "DDLJ · Instrumental",
    src: "/audio/tujhe-dekha-to.mp3",
  },
  {
    id: 4,
    title: "Saat Phere",
    artist: "Traditional Shaadi",
    src: "/audio/saat-phere.mp3",
  },
  {
    id: 5,
    title: "Mere Hath Mein",
    artist: "Fanaa · Melody",
    src: "/audio/mere-hath-mein.mp3",
  },
];

/* ─────────────────────────────────────────────────────────────
   Context shape
   ───────────────────────────────────────────────────────────── */
interface AudioContextType {
  isPlaying: boolean;
  currentTrack: Track;
  trackIndex: number;
  togglePlay: () => void;
  playAudio: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

/* ─────────────────────────────────────────────────────────────
   Provider
   ───────────────────────────────────────────────────────────── */
export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [trackIndex, setTrackIndex]       = useState(0);
  const [isPlaying,  setIsPlaying]        = useState(false);
  const audioRef        = useRef<HTMLAudioElement | null>(null);
  const indexRef        = useRef(0);   // mirror of trackIndex for callbacks
  const shouldPlayRef   = useRef(false); // whether we want audio to play
  const errorCountRef   = useRef(0);   // consecutive load errors — prevents infinite loop

  /* Build / rebuild audio element whenever the track changes */
  useEffect(() => {
    /* Tear down previous element */
    const prev = audioRef.current;
    if (prev) {
      prev.pause();
      prev.src = "";
    }

    const track = PLAYLIST[trackIndex];
    const audio = new Audio();
    audio.preload = "auto"; // start buffering immediately so first play is instant
    audio.loop    = false;
    audio.volume  = 0.42;
    audio.src     = track.src;
    audioRef.current  = audio;
    indexRef.current  = trackIndex;
    errorCountRef.current = 0; // reset error counter for new track

    /* Auto-advance when track ends naturally */
    const onEnded = () => {
      const next = (indexRef.current + 1) % PLAYLIST.length;
      setTrackIndex(next);
    };

    /* Skip to next track if file fails — but stop after trying every track once */
    const onError = () => {
      errorCountRef.current += 1;
      if (errorCountRef.current >= PLAYLIST.length) {
        // All tracks failed — stop trying
        setIsPlaying(false);
        return;
      }
      const next = (indexRef.current + 1) % PLAYLIST.length;
      setTrackIndex(next);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    /* If we were already playing (e.g. user hit Next), resume on the new track */
    if (shouldPlayRef.current) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
    };
  // isPlaying intentionally excluded — we use shouldPlayRef instead
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  /* Called from LoadingScreen when user clicks Enter (parda) */
  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    shouldPlayRef.current = true;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        /* Browser blocked — user will need to click the navbar button */
        shouldPlayRef.current = false;
      });
  }, []);

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    shouldPlayRef.current = false;
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  const nextTrack = useCallback(() => {
    errorCountRef.current = 0;
    setTrackIndex((i) => (i + 1) % PLAYLIST.length);
  }, []);

  const prevTrack = useCallback(() => {
    errorCountRef.current = 0;
    setTrackIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, []);

  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentTrack: PLAYLIST[trackIndex],
      trackIndex,
      togglePlay,
      playAudio,
      nextTrack,
      prevTrack,
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
