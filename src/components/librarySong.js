import React from "react";

const LibrarySong = ({ songs,isPlaying,song,setCurrentSong,audioRef }) => {
  const songSelectHandler= ()=>{
    setCurrentSong(song);
    if(isPlaying){
      const playPromise = audioRef.current.play();
      if(playPromise!==undefined){
        playPromise.then((audio)=>{
          audioRef.current.play();
        });
      }
    }
    songs.forEach((element) => {
      if(element.id===song.id){
        element.active=true;
      }
      else{
        element.active=false;
      }
    });
  }
  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active?"selected":""}`}>
      <img alt={song.name} src={song.cover} ></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
