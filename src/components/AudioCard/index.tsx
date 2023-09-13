'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

import { Progress } from "./Progress";
import { PlayerButton } from "./PlayerButton";

import { Track } from "@/app/page";

import styles from './styles.module.scss';
import { usePlayer } from "@/contexts/playerContext";
import Link from "next/link";

interface AudioCardProps {
  track: Track
}

export const AudioCard = ({ track }: AudioCardProps) => {
  const { 
    handleUpdateCurrentTrack, 
    handlePause,
    isPlaying,
    currentTrack
  } = usePlayer();

  const isCurrentTrackPlaying = isPlaying && currentTrack?.src === track.music
  
  const handlePlay = () => {
    handleUpdateCurrentTrack(track.music);
  }

  return (
    <li className={styles.container}>
      <Link href={`tracks/${track.id}`}>
        <div>
          <span>{track.name}</span>
          <Image 
            src={track.cover} 
            alt={track.name} 
            width={300} 
            height={300}
          />
        </div>
      </Link>
      <Progress track={track}>
        <PlayerButton 
          isPlaying={isCurrentTrackPlaying}
          handlePlay={handlePlay}
          handlePause={handlePause}
        />
      </Progress>
    </li>
  )
}