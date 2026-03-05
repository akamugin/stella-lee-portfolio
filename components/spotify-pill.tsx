"use client";

import { useEffect, useState } from "react";

type AudioEngine = {
  context: AudioContext;
  gain: GainNode;
};

const notes = [196, 220, 246.94, 261.63, 293.66, 329.63, 392];
const PLAY_KEY = "stella_spotify_pill_playing";

let sharedEngine: AudioEngine | null = null;
let sharedTimer: number | null = null;
let sharedNoteIndex = 0;
let sharedPlaying = false;
const listeners = new Set<(playing: boolean) => void>();

function playNote(engine: AudioEngine, freq: number) {
  const osc = engine.context.createOscillator();
  const gain = engine.context.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;

  const now = engine.context.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.07, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.33);

  osc.connect(gain);
  gain.connect(engine.gain);

  osc.start(now);
  osc.stop(now + 0.35);
}

function notify() {
  listeners.forEach((listener) => listener(sharedPlaying));
}

export function getSharedPlaybackState() {
  return sharedPlaying;
}

export function subscribeSharedPlayback(listener: (playing: boolean) => void) {
  listeners.add(listener);
  listener(sharedPlaying);
  return () => {
    listeners.delete(listener);
  };
}

function persistPlayingState(playing: boolean) {
  try {
    window.localStorage.setItem(PLAY_KEY, playing ? "1" : "0");
  } catch {
    // Ignore storage issues (private mode, quota, etc.)
  }
}

async function startShared() {
  if (sharedPlaying) {
    return;
  }

  if (!sharedEngine) {
    const context = new window.AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0.22;
    gain.connect(context.destination);
    sharedEngine = { context, gain };
  }

  await sharedEngine.context.resume();

  sharedTimer = window.setInterval(() => {
    if (!sharedEngine) {
      return;
    }
    const note = notes[sharedNoteIndex % notes.length];
    sharedNoteIndex += 1;
    playNote(sharedEngine, note);
  }, 360);

  sharedPlaying = true;
  persistPlayingState(true);
  notify();
}

function stopShared() {
  if (sharedTimer) {
    window.clearInterval(sharedTimer);
    sharedTimer = null;
  }
  if (sharedEngine) {
    sharedEngine.context.close();
    sharedEngine = null;
  }
  sharedPlaying = false;
  persistPlayingState(false);
  notify();
}

export function stopSharedPlayback() {
  stopShared();
}

export function SpotifyPill() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeSharedPlayback((isPlaying: boolean) => setPlaying(isPlaying));

    if (!sharedPlaying) {
      try {
        setPlaying(window.localStorage.getItem(PLAY_KEY) === "1");
      } catch {
        // Ignore storage issues and fall back to runtime state.
      }
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const onToggle = async () => {
    if (!sharedPlaying) {
      await startShared();
      return;
    }
    stopShared();
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="group mx-auto flex w-full max-w-[260px] items-center gap-2 rounded-full border border-pink-300/80 bg-gradient-to-r from-pink-400 to-rose-300 px-3 py-1.5 text-white shadow-dreamy transition hover:-translate-y-0.5"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-bold text-pink-500">
        {playing ? "❚❚" : "▶"}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-white/80">Now Playing</span>
        <span className="marquee-wrap block text-xs font-semibold">
          <span className={`marquee-track ${playing ? "animate" : ""}`}>Pink Moon Detective - Stella Mix</span>
        </span>
      </span>
      <span className={`h-2.5 w-2.5 rounded-full ${playing ? "bg-white" : "bg-white/45"}`} />
    </button>
  );
}
