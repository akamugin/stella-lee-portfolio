"use client";

import { useEffect, useState } from "react";
import { getSharedPlaybackState, stopSharedPlayback, subscribeSharedPlayback } from "@/components/spotify-pill";

export function MusicStopButton() {
  const [isPlaying, setIsPlaying] = useState(getSharedPlaybackState());

  useEffect(() => {
    return subscribeSharedPlayback(setIsPlaying);
  }, []);

  if (!isPlaying) {
    return null;
  }

  return (
    <li>
      <button
        type="button"
        onClick={stopSharedPlayback}
        className="rounded-full border border-pink-400 bg-pink-400 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-dreamy transition hover:-translate-y-0.5 hover:bg-pink-500"
        aria-label="Stop music"
      >
        Stop Music
      </button>
    </li>
  );
}
