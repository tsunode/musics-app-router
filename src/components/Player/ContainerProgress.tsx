import { usePlayer } from '@/contexts/playerContext';
import { Progress } from './Progress';

import styles from './styles.module.scss'
import { useEffect, useState } from 'react';

const secondsToMinutes = (sec: number | undefined) => {
  if (!sec) return "00:00";
  
  sec = Math.trunc(+sec);
  const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
  const seconds = String(sec % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const ContainerProgress = () => {
  const { currentTrack } = usePlayer();
  const [currentTime, setCurrentTime] = useState(currentTrack?.currentTime);

  useEffect(() => {
    if(!currentTrack) {
      return;
    }

    const eventTimeUpdate = () => {
      setCurrentTime(Math.trunc(currentTrack.currentTime));
    }

    currentTrack.addEventListener("timeupdate", eventTimeUpdate);
    
    return () => {
      currentTrack.removeEventListener("timeupdate", eventTimeUpdate);
    }
  }, [currentTrack]);

  return(
    <div className={styles['container-progress']}>
      <span>{secondsToMinutes(currentTime)}</span>
      <Progress />
      <span>{secondsToMinutes(currentTrack?.duration)}</span>
    </div>
  )
}