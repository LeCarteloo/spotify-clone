import styled, { ThemeProvider } from "styled-components";
import Main from "./components/Main";
import Playbar from "./components/nav/Playbar";
import Sidebar from "./components/nav/Sidebar";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";
import userPlaylists from "./data/userPlaylists.json";
import favoritePlaylists from "./data/favoritePlaylists.json";
import { useState } from "react";

import { CurrentSongInterface, SongListType } from "./types/types";

const StyledDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    "side-bar main"
    "play-bar play-bar";
`;

function App() {
  const [currSong, setCurrSong] = useState<CurrentSongInterface>({
    isPlaying: false,
    playlist: undefined,
    song: undefined,
    currDuration: 0,
  });

  console.log(currSong);

  const onPlay = (playlist?: any) => {
    console.log("work", playlist);

    setCurrSong({
      ...currSong,
      isPlaying: !currSong.isPlaying,
      playlist: playlist.name ? playlist : currSong.playlist,
      song: playlist.name ? playlist.songList[0] : currSong.song,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledDiv>
        <Sidebar playlists={userPlaylists} />
        <Main
          current={currSong}
          onPlay={onPlay}
          userPlaylists={userPlaylists}
          favoritePlaylists={favoritePlaylists}
        />
        <Playbar current={currSong} onPlay={onPlay} />
      </StyledDiv>
    </ThemeProvider>
  );
}

export default App;
