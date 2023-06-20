import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
}) => {
  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const skipTrackHandler = (direction) => {
    const index = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      songs[index].active=false;
      setCurrentSong(songs[(index+1)%songs.length]);
      songs[(index+1)%songs.length].active=true;
      if(isPlaying){
        const playPromise = audioRef.current.play();
        if(playPromise!==undefined){
          playPromise.then((audio)=>{
            audioRef.current.play();
          });
        }
      }
    }
    if (direction === "skip-back" && index===0) {
      songs[index].active=false;
      setCurrentSong(songs[songs.length-1]);
      songs[songs.length-1].active=true;
      if(isPlaying){
        const playPromise = audioRef.current.play();
        if(playPromise!==undefined){
          playPromise.then((audio)=>{
            audioRef.current.play();
          });
        }
      }
    }
    if (direction === "skip-back" && index!==0) {
      songs[index].active=false;
      setCurrentSong(songs[(index-1)]);
      songs[index-1].active=true;
      if(isPlaying){
        const playPromise = audioRef.current.play();
        if(playPromise!==undefined){
          playPromise.then((audio)=>{
            audioRef.current.play();
          });
        }
      }
    }

  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
