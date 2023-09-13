import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

interface PlayerButtonProps {
  isPlaying: boolean;
  handlePause: () => void;
  handlePlay: () => void;
}

export const PlayerButton = ({ isPlaying, handlePause, handlePlay }: PlayerButtonProps) => {
  const callback = isPlaying ? handlePause : handlePlay;
  const Icon =  isPlaying ? AiFillPauseCircle : AiFillPlayCircle;

  return (
    <button type="button" onClick={callback}>
      <Icon size={42} />
    </button>
  )
}