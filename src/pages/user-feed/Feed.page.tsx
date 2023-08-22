import { styled } from "styled-components";
import { deviceWidth } from "../../styles/devices.breakpoints";
import { UserPostTypes, postsStore } from "../../store/posts.store";
import { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useAuthStateChange";
import AuthState from "../../components/auth/AuthState.component";
import UserPlaceholderImage from "../../assets/user-placeholder-image.jpg";
import { useAtom } from "jotai";
import { postModalAtom } from "../../store/atoms";
import UserPost from "../../components/user-post/UserPost.component";
import { userSignOut } from "../../utils/firebase/auth.firebase";
import { Button } from "../../components/_ui/button/Button.styles";

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
  aspect-ratio: 2 / 3;
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
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`;

export const ProfileDetails = styled.div`
  padding: 1rem 1rem 0;
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: start;

    h4 {
      margin-block: 8px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const Feed = () => {
  const user = useCurrentUser();
  const [modalState, setModalState] = useAtom(postModalAtom);
  const [allPosts, setPosts] = postsStore((state) => [
    state.allPosts,
    state.setPosts,
  ]);
  const [selectedPost, setSelectedPost] = useState<UserPostTypes | null>(null!);

  useEffect(() => {
    setPosts();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const handleShowPost = (userPost: UserPostTypes) => {
    setModalState((bool) => !bool);
    setSelectedPost(userPost);
  };

  return (
    <>
      {modalState && <UserPost post={selectedPost!} closeOnOutsideClick />}
      {user ? (
        <div>
          <ProfileContainer>
            <ProfilePicture>
              <img src={UserPlaceholderImage} alt="user profile image" />
            </ProfilePicture>
            <ProfileDetails>
              <div>
                <small>{user.email}</small>
                <h4>{user.displayName}</h4>
                <p>User bio...</p>
              </div>
              {user && (
                <Button $outlined onClick={userSignOut}>
                  Logout
                </Button>
              )}
            </ProfileDetails>
          </ProfileContainer>

          <ImageGallery>
            {allPosts
              .filter((post) => post.postedBy === user?.email)
              .map((post) => (
                <ImageContainer key={post.id}>
                  <img
                    src={post.image}
                    alt={`a photo by ${post.postedBy}`}
                    onClick={() => handleShowPost(post)}
                  />
                </ImageContainer>
              ))}
          </ImageGallery>
        </div>
      ) : (
        <AuthState />
      )}
    </>
  );
};

export default Feed;
