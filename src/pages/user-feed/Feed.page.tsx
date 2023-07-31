import { Route } from "@tanstack/router";
import { userRoute } from "../user/user-route";
import { styled } from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";
import { postsStore } from "../../store/posts.store";
import { useEffect } from "react";
import useCurrentUser from "../../hooks/useAuthStateChange";

export const ImageGallery = styled.section`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 20px 20px 50px;
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-auto-flow: dense;
  gap: 8px;

  @media screen and (${deviceWidth.gteTablet}) {
    gap: minmax(1rem, 2rem);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: #d7d7d8;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const ProfileContainer = styled.section`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: dense;
  gap: 8px;

  @media screen and (${deviceWidth.gteTablet}) {
    gap: minmax(1rem, 2rem);
  }
`;

export const ProfilePicture = styled.div`
  aspect-ratio: 1 / 1;
  background-color: #d7d7d8;
  overflow: hidden;
  border-radius: 50%;
`;

export const ProfileDetails = styled.div`
  grid-column: span 2;
  background-color: #d7d7d8;
`;

export const feedRoute = new Route({
  getParentRoute: () => userRoute,
  path: "/feed",
});

export const feedIndexRoute = new Route({
  getParentRoute: () => feedRoute,
  path: "/",
  component: Feed,
});

function Feed() {
  const user = useCurrentUser();
  const [allPosts, setPosts] = postsStore((state) => [
    state.allPosts,
    state.setPosts,
  ]);

  useEffect(() => {
    setPosts();
  }, []);

  console.log({ user }, { allPosts });

  return (
    <div>
      <ProfileContainer>
        <ProfilePicture />
        <ProfileDetails></ProfileDetails>
      </ProfileContainer>
      <ImageGallery>
        {allPosts
          .filter((post) => post.postedBy === user?.email)
          .map((post) => (
            <ImageContainer key={post.id}>
              <img src={post.image} alt={`a photo by ${post.postedBy}`} />
            </ImageContainer>
          ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
          (num) => (
            <ImageContainer key={num}></ImageContainer>
          )
        )}
      </ImageGallery>
    </div>
  );
}

export default Feed;
