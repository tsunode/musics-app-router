import { useEffect, useState } from "react";

export const usePlayPauseAudio = (audio: HTMLAudioElement | null) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(!audio) {
      return;
    }

    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("play", () => setIsPlaying(true));

    return () => {
      audio.pause();
      audio.removeEventListener("pause", () => setIsPlaying(false));
      audio.removeEventListener("play", () => setIsPlaying(true));
    }
  }, [audio]);

  return { isPlaying, setIsPlaying };
}