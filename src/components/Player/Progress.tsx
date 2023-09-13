import {  useEffect, useRef } from "react";

import { usePlayer } from "@/contexts/playerContext";

import styles from './styles.module.scss'

export const Progress = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { currentTrack } = usePlayer();

  useEffect(() => {
    const inputRange = inputRef.current;

    if(!inputRange || !currentTrack) {
      return;
    }

    const eventTimeUpdate = () => {
      const newCurrentTime = (currentTrack.currentTime / currentTrack.duration) * 100;

      inputRange.style.backgroundSize = `${newCurrentTime}% 100%`;
      inputRange.value = newCurrentTime + '';
    }

    const updatePositionTrack = (event: Event) => {
      const input = event.target as HTMLInputElement;
    
      const newCurrentTime = (currentTrack.duration * +input.value) / 100;
      currentTrack.currentTime = newCurrentTime;
    }

    currentTrack.addEventListener("timeupdate", eventTimeUpdate);
    inputRange.addEventListener("input",updatePositionTrack);
    
    return () => {
      currentTrack.removeEventListener("timeupdate", eventTimeUpdate);
      inputRange.removeEventListener("input", updatePositionTrack);
    }
  }, [currentTrack]);

  return(
    <input 
      className={styles['player-scroll']} 
      ref={inputRef} 
      type="range" 
    />
  )
}