'use client';

import { Track, usePlayer } from "@/contexts/playerContext"
import { AudioCard } from "../AudioCard"

import styles from './styles.module.scss'
import { useEffect } from "react"

interface ListTracksProps {
  tracks: Track[]
}

export const ListTracks = ({ tracks }: ListTracksProps) => {
  const { setPlayList } = usePlayer()

  useEffect(() => {
    setPlayList(tracks);
  }, [setPlayList, tracks])

  return(
    <ul className={styles.list}>
      {
        tracks.map(track => (
          <AudioCard key={track.id} track={track} />
        ))
      }
    </ul>
  )
}