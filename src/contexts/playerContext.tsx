'use client'

import { Player } from "@/components/Player";
import { usePlayPauseAudio } from "@/hooks/usePlayPauseAudio";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export interface Track {
  id: number
  name: string
  cover: string
  music: string
}


interface PlayerProviderData {
  handleUpdateCurrentTrack: (track: string) => void;
  currentTrack: HTMLAudioElement | null;
  playList: Track[];
  handlePause: () => void;
  handlePlay: () => void;
  skipPrev: () => void,
  skipNext: () => void
  isPlaying: boolean;
  setPlayList: Dispatch<SetStateAction<Track[]>>
}


const PlayerContext = createContext<PlayerProviderData>({} as PlayerProviderData);

export const PlayerProvider = ({ children }: Props) => {
  const [playList, setPlayList] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement | null>(null);
  const {isPlaying, setIsPlaying} = usePlayPauseAudio(currentTrack)

  useEffect(() => {
    currentTrack?.play()
  }, [currentTrack])

  const handlePause = () => {
    currentTrack?.pause();
    setIsPlaying(false);
  }
  
  const handlePlay = () => {
    currentTrack?.play();
    setIsPlaying(true);
  }

  const handleUpdateCurrentTrack = (track: string) => {
    currentTrack?.pause();
    setIsPlaying(true);
    setCurrentTrack(new Audio(track))
  };

  const skipNext = () => {
    const foundIndex = playList.findIndex((playListTrack) => currentTrack?.src === playListTrack.music);

    if (foundIndex === playList.length - 1) {
      setCurrentTrack(new Audio(playList[0].music));
    } else {
      setCurrentTrack(new Audio(playList[foundIndex + 1].music));
    }
  };

  const skipPrev = () => {
    const foundIndex = playList.findIndex((playListTrack) => currentTrack?.src === playListTrack.music);

    if (foundIndex === 0) {
      setCurrentTrack(new Audio(playList[playList.length - 1].music));
    } else {
      setCurrentTrack(new Audio(playList[foundIndex - 1].music));
    }
  };

  return (
    <PlayerContext.Provider
      value={{ 
        handleUpdateCurrentTrack,
        playList,
        isPlaying, 
        handlePause,
        handlePlay,
        currentTrack,
        skipPrev,
        skipNext,
        setPlayList
       }}>
      {children}
      {
        typeof document !== "undefined" ?
          createPortal(<Player />, document.body)
          : <Player />
      }
    </PlayerContext.Provider>
  );
};

export const usePlayer = () =>  useContext(PlayerContext);
