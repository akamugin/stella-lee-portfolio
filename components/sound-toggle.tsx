"use client";

import { useEffect, useRef, useState } from "react";

type AudioState = {
  context: AudioContext;
  gain: GainNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
};

function createAmbientAudio(): AudioState {
  const context = new window.AudioContext();
  const gain = context.createGain();
  gain.gain.value = 0.025;
  gain.connect(context.destination);

  const osc = context.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 196;

  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.type = "triangle";
  lfo.frequency.value = 0.12;
  lfoGain.gain.value = 18;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  osc.connect(gain);
  osc.start();
  lfo.start();

  return { context, gain, lfo, lfoGain };
}

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<AudioState | null>(null);

  useEffect(() => {
    const handleClick = () => {
      if (!enabled || !audioRef.current) {
        return;
      }

      const ctx = audioRef.current.context;
      const tone = ctx.createOscillator();
      const hit = ctx.createGain();

      tone.type = "triangle";
      tone.frequency.value = 540 + Math.random() * 220;

      hit.gain.value = 0;
      tone.connect(hit);
      hit.connect(ctx.destination);

      const now = ctx.currentTime;
      hit.gain.setValueAtTime(0, now);
      hit.gain.linearRampToValueAtTime(0.05, now + 0.01);
      hit.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      tone.start(now);
      tone.stop(now + 0.24);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [enabled]);

  const onToggle = async () => {
    if (!enabled) {
      const state = createAmbientAudio();
      audioRef.current = state;
      await state.context.resume();
      setEnabled(true);
      return;
    }

    if (audioRef.current) {
      audioRef.current.context.close();
      audioRef.current = null;
    }
    setEnabled(false);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-full border border-rose/35 bg-white px-4 py-2 text-sm font-semibold text-grape shadow-dreamy transition hover:-translate-y-0.5"
    >
      {enabled ? "Disable Sound" : "Enable Sound"}
    </button>
  );
}
