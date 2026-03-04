"use client";

import { useEffect, useRef, useState } from "react";

type AudioEngine = {
  context: AudioContext;
  gain: GainNode;
};

const notes = [196, 220, 246.94, 261.63, 293.66, 329.63, 392];

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

export function SpotifyPill() {
  const [playing, setPlaying] = useState(false);
  const engineRef = useRef<AudioEngine | null>(null);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (engineRef.current) {
        engineRef.current.context.close();
      }
    };
  }, []);

  const start = async () => {
    const context = new window.AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0.22;
    gain.connect(context.destination);

    engineRef.current = { context, gain };
    await context.resume();

    timerRef.current = window.setInterval(() => {
      if (!engineRef.current) {
        return;
      }
      const note = notes[noteIndexRef.current % notes.length];
      noteIndexRef.current += 1;
      playNote(engineRef.current, note);
    }, 360);
  };

  const stop = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (engineRef.current) {
      engineRef.current.context.close();
      engineRef.current = null;
    }
  };

  const onToggle = async () => {
    if (!playing) {
      await start();
      setPlaying(true);
      return;
    }
    stop();
    setPlaying(false);
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
