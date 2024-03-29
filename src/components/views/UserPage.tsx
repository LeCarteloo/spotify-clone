import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import styled, { css } from "styled-components";
import users from "../../data/users.json";
import playlists from "../../data/playlists.json";
import PlaylistSection from "../sections/PlaylistSection";
import { PlaylistInterface, UserInterface } from "../../types/types";
import UserSection from "../sections/UserSection";
import { useNavigate, useParams } from "react-router-dom";
import FollowButton from "../buttons/FollowButton";
import useImageColor from "../../hooks/useImageColor";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const StyledSection = styled.section<StyledProps>`
  width: 100%;
  .user-header {
    ${({ theme }) => theme.mixins.sectionPadding}
    padding-bottom: 1.8em;
    display: flex;
    gap: 1.4em;
    ${({ color }) =>
      color &&
      css`
        background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%),
          ${color};
      `}
    .user-avatar {
      border-radius: 50%;
      height: 232px;
      width: auto;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .profile {
        display: flex;
        align-items: center;
        span {
          margin-left: 0.5em;
        }
      }
      .user-name {
        font-size: clamp(36px, 5.5vw, 84px);
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
      .user-stats {
        margin-top: 2.5em;
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      .user-avatar {
        margin: 0 auto;
      }
    }
  }
  .user-content {
    position: relative;
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
      z-index: -1;
    }
    .user-buttons {
      display: flex;
      gap: 2em;
      padding: 1.25em 1.9em;
      width: calc(100% - 3.8em);
    }
  }
  .user-list {
    display: flex;
    gap: 1.6em;
    overflow: auto;
    padding-bottom: 0.5em;
    min-height: 100%;
    margin: 0 1.9em;
    @media (max-width: 480px) {
      margin: 0;
      padding: 0 1.9em;
    }
  }
`;

type StyledProps = {
  color: string;
};

const UserPage = () => {
  const [user, setUser] = useState<UserInterface>();
  const [userPlaylists, setUserPlaylists] = useState<PlaylistInterface[]>();
  const params = useParams();
  const navigate = useNavigate();
  const color = useImageColor(user?.img);

  // Loading data from JSON (could be API call)
  useEffect(() => {
    // Getting user from JSON file by param id
    const user = users.find((user) => user.id.toString() === params.id);

    // If user does not exist then redirect to notfound path
    if (!user) {
      navigate("/notfound", { replace: true });
    }

    // Getting playlist from JSON file by param id
    const userPlaylists = playlists.filter(
      (playlist) => playlist.author.id.toString() === params.id
    );

    setUserPlaylists(userPlaylists);
    setUser(user);
  }, [params.id]);

  return (
    <StyledSection color={color}>
      {user ? (
        <>
          <div className="user-header">
            <img className="user-avatar" src={user.img} alt="User avatar" />
            <div className="user-info">
              <div className="profile">
                {user.isVerified && (
                  <MdVerified size={"1.9em"} color={"#0c67d3"} />
                )}
                <span>PROFILE</span>
              </div>
              <h1 className="user-name">{user.name}</h1>
              <div className="user-stats">
                <span>{userPlaylists?.length} public playlists • </span>
                <span>{user.followers.length} followers • </span>
                <span>{user.following.length} following</span>
              </div>
            </div>
          </div>
          <div className="user-content">
            <div className="user-buttons">
              {user.id !== 1 && <FollowButton />}
              <button>
                <BsThreeDots size="1.55em" />
              </button>
            </div>
            {userPlaylists && userPlaylists.length > 0 && (
              <PlaylistSection
                title={"Public playlists"}
                playlists={userPlaylists}
              />
            )}
            {user.following.length > 0 && (
              <UserSection title={"Following"} users={user.following} />
            )}
            {user.followers.length > 0 && (
              <UserSection title={"Followers"} users={user.followers} />
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </StyledSection>
  );
};

export default UserPage;
