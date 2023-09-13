import { ReactNode, useEffect, useRef } from "react";

import styles from './styles.module.scss';
import { Track, usePlayer } from "@/contexts/playerContext";


interface ProgressProps {
  children: ReactNode;
  track: Track
}

export const Progress = ({ track,children }: ProgressProps) => {
  const {currentTrack} = usePlayer()
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(!currentTrack || currentTrack?.src !== track.music) {
      return
    }

    const eventTimeUpdate = () => {
      if(!divRef.current) {
        return;
      }

      const newCurrentTime = (currentTrack.currentTime / currentTrack.duration) * 100;
      const roundCurrentTime = String(Math.round(newCurrentTime));

      divRef.current.style
        .setProperty('--height-progress', roundCurrentTime + '%' );
    }

    currentTrack.addEventListener("timeupdate", eventTimeUpdate);

    return () => {
      currentTrack.removeEventListener("timeupdate", eventTimeUpdate);
    }
  }, [currentTrack]);

  return (
    <div 
      ref={divRef}
      className={styles['container-button']} 
    >
      {children}
    </div>
  )
}