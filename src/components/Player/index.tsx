import { 
  AiFillPauseCircle, 
  AiFillPlayCircle, 
  AiFillStepBackward, 
  AiFillStepForward 
} from "react-icons/ai";

import styles from './styles.module.scss'
import { ContainerProgress } from "./ContainerProgress";
import { usePlayer } from "@/contexts/playerContext";
import { PlayerButton } from "../AudioCard/PlayerButton";

export const Player = () => {
  const { 
    skipNext, 
    skipPrev, 
    handlePause, 
    handlePlay, 
    isPlaying 
  } = usePlayer();

  return(
    <div className={styles.container}>
      <div>
        <button type="button" onClick={skipPrev}>
          <AiFillStepBackward size={32} />
        </button>
        <PlayerButton
          handlePause={handlePause}
          handlePlay={handlePlay}
          isPlaying={isPlaying}
        />
        <button onClick={skipNext}>
          <AiFillStepForward size={32} />
        </button>
      </div>
      <ContainerProgress />
    </div>
  )
}