import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import LikeButton from "../buttons/LikeButton";
import PlayButton from "../buttons/PlayButton";
import { HiOutlinePencil } from "react-icons/hi";
import { PlaylistInterface, SongListType } from "../../types/types";
import playlists from "../../data/playlists.json";
import Table from "../playlist/Table";
import MoreButton from "../buttons/MoreButton";
import useImageColor from "../../hooks/useImageColor";
import { useEffect, useMemo, useState } from "react";
import { formatPlaylistDuration } from "../../utility/formatDuration";
import Loading from "../Loading";
import { useAppContext } from "../../context/AppContext";

const StyledSection = styled.section<StyledProps>`
  .playlist-header {
    ${({ theme }) => theme.mixins.sectionPadding}
    padding-bottom: 1.8em;
    ${({ color }) =>
      color &&
      css`
        background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%),
          ${color};
      `}

    .header-wrapper {
      display: flex;
    }

    .playlist-cover {
      .cover-wrapper {
        position: relative;
        height: 232px;
        width: auto;

        img {
          height: inherit;
          width: inherit;
        }
      }

      &:hover,
      &:focus-within {
        button {
          display: flex;
        }
      }
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(12, 12, 12, 0.6);
        top: 0;
        left: 0;
        display: none;
      }
    }
    .playlist-info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      justify-content: flex-end;
      margin: 0 1.4em;
      div:first-child {
        font-size: 12px;
      }
      .playlist-title {
        font-size: clamp(36px, 5.5vw, 84px);
        /* line-height: 116px; */
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
      .playlist-desc {
        margin: 1.3em 0 1em 0;
        font-size: 15.5px;
        color: var(--text-subdued);
      }
      .playlist-author {
        font-size: 14.2px;
        a {
          color: var(--text-base);
          text-decoration: none;
          ${({ theme }) => theme.mixins.underlineHover}
        }
      }
    }

    @media (max-width: 768px) {
      .header-wrapper {
        flex-direction: column;
      }
      .playlist-cover {
        margin: 0 auto;
      }
      .playlist-info {
        margin: 1.5em 0 0 0;
      }
    }
  }

  .playlist-content {
    ${({ theme }) => theme.mixins.innerSectionPadding}
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      ${({ color }) =>
        color &&
        css`
          background: linear-gradient(
              rgba(0, 0, 0, 0.6) 0,
              var(--background-base) 100%
            ),
            ${color};
        `}
      position: absolute;
      width: 100%;
      height: 240px;
      left: 0;
    }

    background-color: var(--background-base);
    .playlist-controls {
      padding-top: 1.3em;
      display: flex;
      gap: 1.9em;
      position: relative;
    }
  }
`;

type StyledProps = {
  color: string;
};

const PlaylistPage = () => {
  const [liked, setLiked] = useState(false);
  const { currentSong, onPlay } = useAppContext();
  const [playlist, setPlaylists] = useState<PlaylistInterface>();
  const navigate = useNavigate();
  const params = useParams();
  const calculateDuration = (songList: SongListType[] | undefined) => {
    let duration = 0;

    if (!songList) {
      return;
    }

    songList.forEach((song) => {
      duration += song.duration;
    });

    return duration;
  };
  const playlistDuration = useMemo(() => {
    return calculateDuration(playlist?.songList);
  }, [playlist]);

  const onLike = () => {
    setLiked(!liked);
  };

  // Loading data from JSON (could be API call)
  useEffect(() => {
    // Getting playlist from JSON file by param id
    const playlist = playlists.find(
      (playlist) => playlist.id.toString() === params.id
    );

    // If playlist does not exist then redirect to notfound path
    if (!playlist) {
      navigate("/notfound");
    }

    setPlaylists(playlist);
  }, [params.id]);

  const isPlaying =
    currentSong.playlist?.id === playlist?.id && currentSong.isPlaying;
  const color = useImageColor(playlist?.playlistURL);

  return (
    <StyledSection color={color}>
      {playlist ? (
        <>
          <div className="playlist-header">
            <div className="header-wrapper">
              <div
                className="playlist-cover"
                tabIndex={0}
                aria-label="Choose playlist image"
              >
                <div className="cover-wrapper">
                  <img src={playlist.playlistURL} alt="Playlist cover" />
                  <button tabIndex={-1}>
                    <HiOutlinePencil size={"3em"} />
                    Choose image
                  </button>
                </div>
              </div>
              <div className="playlist-info">
                <div>PLAYLIST</div>
                <h1 className="playlist-title">{playlist.name}</h1>
                <p className="playlist-desc">{playlist.desc}</p>
                <div className="playlist-author">
                  <Link to={`/user/${playlist.author.id}`}>
                    <b>{playlist.author.username}</b>
                  </Link>
                  <span> • {playlist.likes} likes •</span>
                  <span>
                    {" " + playlist.songList.length} tracks,{" "}
                    {playlistDuration &&
                      formatPlaylistDuration(playlistDuration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="playlist-content">
            <div className="playlist-controls">
              <PlayButton
                isPlaying={isPlaying}
                onClick={() =>
                  onPlay({
                    isPlaying: !isPlaying,
                    playlist: playlist,
                    song:
                      currentSong.playlist?.id === playlist.id
                        ? currentSong.song
                        : playlist.songList[0],
                    currDuration:
                      currentSong.playlist?.id === playlist.id
                        ? currentSong.currDuration
                        : 0,
                  })
                }
                isGreen={true}
                size="3.5em"
              />
              <LikeButton isLiked={liked} onClick={onLike} size="2em" />
              <MoreButton />
            </div>
            <div>
              {/* <div className="test-header">
                  <div>#</div>
                  <div>TYTUŁ</div>
                  <div>ALBUM</div>
                  <div>DATA DODANIA</div>
                  <div>
                    <BiTime size="1.25em" />
                  </div>
                </div> */}
              <Table
                playlist={playlist}
                current={currentSong}
                onPlay={onPlay}
                isPlaying={isPlaying}
              />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </StyledSection>
  );
};

export default PlaylistPage;
