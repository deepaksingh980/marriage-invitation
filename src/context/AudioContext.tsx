"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   PLAYLIST
   Only include tracks that actually exist.
   The Wikipedia Commons Shehnai is the primary track — it loops forever.
   Add local MP3s to /public/audio/ and append entries here when available.
   ───────────────────────────────────────────────────────────────────────────── */
export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}

export const PLAYLIST: Track[] = [
  {
    id: 1,
    title: "Wedding Theme",
    artist: "Traditional Instrumental",
    src: "/audio/wedingsongs.mpeg",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Web Audio API ambient synth — last-resort fallback (e.g. OGG unsupported
   on Safari, or network blocked).
   Generates a soft Indian Sa-Pa drone chord at very low volume.
   ───────────────────────────────────────────────────────────────────────────── */
interface SynthHandle {
  start: () => void;
  stop: () => void;
}

function buildAmbientSynth(): SynthHandle | null {
  if (typeof window === "undefined") return null;
  try {
    const ac = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();

    const master = ac.createGain();
    master.gain.value = 0;
    master.connect(ac.destination);

    // Sa-Pa-Sa' drone (C3-G3-C4) — soft sine waves
    const partials: [number, number][] = [
      [130.81, 0.18], // Sa  (C3)
      [196.0, 0.14], // Pa  (G3)
      [261.63, 0.10], // Sa' (C4)
      [392.0, 0.06], // Pa' (G4) — warmth
    ];

    const oscs: OscillatorNode[] = [];
    partials.forEach(([freq, amp]) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      gain.gain.value = amp;
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(master);
      oscs.push(osc);
    });

    // Very slow tremolo (breathing feel — 0.25 Hz)
    const lfo = ac.createOscillator();
    const lfoGain = ac.createGain();
    lfo.frequency.value = 0.25;
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    return {
      start() {
        if (ac.state === "suspended") ac.resume();
        oscs.forEach((o) => { try { o.start(); } catch (_) { /* already started */ } });
        master.gain.cancelScheduledValues(ac.currentTime);
        master.gain.setValueAtTime(0, ac.currentTime);
        master.gain.linearRampToValueAtTime(0.09, ac.currentTime + 4);
      },
      stop() {
        master.gain.cancelScheduledValues(ac.currentTime);
        master.gain.setTargetAtTime(0, ac.currentTime, 0.4);
        setTimeout(() => {
          oscs.forEach((o) => { try { o.stop(); } catch (_) { /* */ } });
          try { lfo.stop(); } catch (_) { /* */ }
          ac.close();
        }, 1500);
      },
    };
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   Context shape
   ───────────────────────────────────────────────────────────────────────────── */
interface AudioContextType {
  isPlaying: boolean;
  currentTrack: Track;
  trackIndex: number;
  togglePlay: () => void;
  playAudio: (customVolume?: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

/* ─────────────────────────────────────────────────────────────────────────────
   AudioProvider
   ───────────────────────────────────────────────────────────────────────────── */
export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Initialize wantPlayRef to false as requested. Audio starts only after the user
  // interacts by clicking the "Enter The Celebration" button.
  const wantPlayRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCountRef = useRef(0);
  const synthRef = useRef<SynthHandle | null>(null);

  const MAX_RETRIES = 3;
  const TARGET_VOLUME = 0.38;

  /* ── helpers ──────────────────────────────────────────────────────────────── */

  const clearTimers = useCallback(() => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    fadeTimerRef.current = null;
    retryTimerRef.current = null;
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement, targetVol = TARGET_VOLUME) => {
    clearTimers();
    audio.volume = Math.max(0, Math.min(audio.volume, targetVol));
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current || audioRef.current !== audio) {
        clearInterval(fadeTimerRef.current!);
        return;
      }
      if (audio.volume < targetVol - 0.018) {
        audio.volume = Math.min(targetVol, audio.volume + 0.018);
      } else if (audio.volume > targetVol + 0.018) {
        audio.volume = Math.max(targetVol, audio.volume - 0.018);
      } else {
        audio.volume = targetVol;
        clearInterval(fadeTimerRef.current!);
      }
    }, 80);
  }, [clearTimers]);

  const fadeOut = useCallback((audio: HTMLAudioElement, onDone: () => void) => {
    clearTimers();
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current || audioRef.current !== audio) {
        clearInterval(fadeTimerRef.current!);
        return;
      }
      if (audio.volume > 0.025) {
        audio.volume = Math.max(0, audio.volume - 0.025);
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeTimerRef.current!);
        onDone();
      }
    }, 50);
  }, [clearTimers]);

  const activateSynth = useCallback(() => {
    if (synthRef.current) return;
    console.warn("Wedding Music: Initializing and activating Web Audio API ambient synth fallback...");
    synthRef.current = buildAmbientSynth();
    synthRef.current?.start();
    setIsPlaying(true);
  }, []);

  /* ── mount / track change ─────────────────────────────────────────────────── */
  useEffect(() => {
    clearTimers();

    // Prevent duplicate audio objects by checking global window context
    if (typeof window !== "undefined") {
      const existing = (window as any).__activeAudio;
      if (existing) {
        console.log("Wedding Music: Found existing active audio instance in window, pausing and resetting to prevent duplicates.");
        try {
          existing.pause();
          existing.src = "";
        } catch (e) {
          console.error("Wedding Music: Error pausing existing audio:", e);
        }
        (window as any).__activeAudio = null;
      }
    }

    const prev = audioRef.current;
    if (prev) { prev.pause(); prev.src = ""; }

    const track = PLAYLIST[trackIndex];
    const audio = new Audio();
    if (typeof window !== "undefined") {
      (window as any).__activeAudio = audio;
    }
    audio.preload = "auto";
    audio.loop = true;           // loop forever — no track-cycling needed
    audio.volume = 0;
    audio.src = track.src;
    audioRef.current = audio;
    retryCountRef.current = 0;

    /* Attempt to play — called both immediately and from gesture/canplaythrough. */
    const tryPlay = () => {
      if (!audioRef.current || audioRef.current !== audio) return;
      if (!wantPlayRef.current) {
        console.log("Wedding Music: Playback deferred until user clicks Enter.");
        return;
      }
      if (!audio.paused) return; // already playing
      console.log("Wedding Music: Attempting to play track...");
      audio.play()
        .then(() => {
          fadeIn(audio);
          setIsPlaying(true);
          console.log("Wedding Music: Playback started successfully.");
        })
        .catch((err) => {
          console.warn("Wedding Music: Playback failed or was blocked by browser. Awaiting user interaction (Enter click) or next gesture.", err);
        });
    };

    /* Global gesture listener as a fallback trigger once play has been initiated. */
    const onGesture = () => {
      if (wantPlayRef.current) {
        console.log("Wedding Music: User gesture detected, trying to play...");
        tryPlay();
      }
    };
    document.addEventListener("click", onGesture);
    document.addEventListener("touchstart", onGesture, { passive: true });
    document.addEventListener("keydown", onGesture);

    const onCanPlayThrough = () => {
      console.log("Wedding Music: Audio is loaded and can play through.");
      if (wantPlayRef.current && audio.paused) tryPlay();
    };

    const onError = () => {
      console.error("Wedding Music: Error loading or playing audio track:", audio.error || "Unknown error");
      if (!wantPlayRef.current) return;

      retryCountRef.current += 1;
      if (retryCountRef.current <= MAX_RETRIES) {
        const delay = retryCountRef.current * 2500;
        console.log(`Wedding Music: Retrying playback (attempt ${retryCountRef.current}/${MAX_RETRIES}) in ${delay}ms...`);
        retryTimerRef.current = setTimeout(() => {
          if (!wantPlayRef.current || !audioRef.current) return;
          audio.load();
          audio.play()
            .then(() => {
              fadeIn(audio);
              setIsPlaying(true);
              console.log("Wedding Music: Playback started successfully after retry.");
            })
            .catch((err) => {
              console.warn("Wedding Music: Retry play failed:", err);
            });
        }, delay);
      } else {
        console.error("Wedding Music: All retries failed. Activating Web Audio API fallback.");
        activateSynth();
      }
    };

    audio.addEventListener("canplaythrough", onCanPlayThrough);
    audio.addEventListener("error", onError);

    // Attempt autoplay if permission is already granted, else wait for Enter click.
    tryPlay();

    return () => {
      document.removeEventListener("click", onGesture);
      document.removeEventListener("touchstart", onGesture);
      document.removeEventListener("keydown", onGesture);
      audio.removeEventListener("canplaythrough", onCanPlayThrough);
      audio.removeEventListener("error", onError);
      clearTimers();
      audio.pause();
      audio.src = "";
      if (typeof window !== "undefined" && (window as any).__activeAudio === audio) {
        (window as any).__activeAudio = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  /* ── public API ───────────────────────────────────────────────────────────── */

  /** Called by Hero.tsx handleEnter — guaranteed user-gesture context. */
  const playAudio = useCallback((customVolume?: number) => {
    console.log("Wedding Music: playAudio() called.");
    wantPlayRef.current = true;
    const audio = audioRef.current;
    const targetVol = customVolume !== undefined ? customVolume : TARGET_VOLUME;

    if (!audio) {
      console.warn("Wedding Music: No audio element available in playAudio().");
      return;
    }

    // Synth already active — nothing more to do
    if (synthRef.current) {
      console.log("Wedding Music: Ambient synth fallback is active.");
      setIsPlaying(true);
      return;
    }

    if (!audio.paused) {
      console.log("Wedding Music: Audio already playing, fading to target volume:", targetVol);
      fadeIn(audio, targetVol);
      setIsPlaying(true);
      return;
    }

    console.log("Wedding Music: Starting audio playback at volume:", targetVol);
    audio.play()
      .then(() => {
        fadeIn(audio, targetVol);
        setIsPlaying(true);
        console.log("Wedding Music: Playback started successfully.");
      })
      .catch((err) => {
        console.error("Wedding Music: Playback failed on playAudio():", err);
      });
  }, [fadeIn]);

  const pauseAudio = useCallback(() => {
    wantPlayRef.current = false;

    if (synthRef.current) {
      synthRef.current.stop();
      synthRef.current = null;
      setIsPlaying(false);
      return;
    }

    const audio = audioRef.current;
    if (!audio || audio.paused) { setIsPlaying(false); return; }
    fadeOut(audio, () => setIsPlaying(false));
  }, [fadeOut]);

  const togglePlay = useCallback(() => {
    if (isPlaying) pauseAudio();
    else {
      wantPlayRef.current = true;
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  const nextTrack = useCallback(() => {
    if (PLAYLIST.length < 2) return;
    retryCountRef.current = 0;
    setTrackIndex((i) => (i + 1) % PLAYLIST.length);
  }, []);

  const prevTrack = useCallback(() => {
    if (PLAYLIST.length < 2) return;
    retryCountRef.current = 0;
    setTrackIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack: PLAYLIST[trackIndex],
        trackIndex,
        togglePlay,
        playAudio,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
