import React from "react";
import LibrarySong from "./librarySong";
const Library = ({libraryStatus,audioRef, songs, setCurrentSong, isPlaying }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library":""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            audioRef={audioRef}
            setCurrentSong={setCurrentSong}
            song={song}
            songs={songs}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
