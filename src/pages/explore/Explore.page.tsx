import { Link } from "@tanstack/router";
import { styled } from "styled-components";
import { ProductDataTypes, productsStore } from "../../context/products.store";
import { deviceWidth } from "../../styles/devices.breakpoints";
import { UserPostTypes, postsStore } from "../../context/posts.store";
import { useEffect, useState } from "react";
import { MdShoppingBag } from "react-icons/md";
import UserPost from "../../components/user-post/UserPost.component";
import { useAtom } from "jotai";
import { postModalAtom } from "../../context/atoms";
import { productRoute } from "../product/Product.route";
import SearchBar from "../../components/search-bar/SearchBar.component";

export const ImageGallery = styled.section`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-auto-flow: dense;
  grid-gap: 8px;

  @media screen and (${deviceWidth.gteTablet}) {
    grid-template-columns: repeat(4, minmax(150px, 1fr));
  }
`;

const SearchContainer = styled.section`
  margin-block: 12px 8px;
  padding: 8px;

  @media screen and (${deviceWidth.gteTablet}) {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  background-color: #d7d7d8;
  overflow: hidden;

  &:nth-child(7n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  }

  .icon {
    margin: 8px;
    position: absolute;
    bottom: 0;
    text-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }

  img.gallery {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  &:hover img.gallery {
    transform: scale(1.1);
  }
`;

const Explore = () => {
  const [modalState, setModalState] = useAtom(postModalAtom);
  const products = productsStore((state) => state.products);
  const [posts, setPosts] = postsStore((state) => [
    state.allPosts,
    state.setPosts,
  ]);
  const [selectedPost, setSelectedPost] = useState<UserPostTypes | null>(null!);
  const [explorationPost, setExplorationPost] = useState<
    (ProductDataTypes | UserPostTypes)[]
  >([]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    const shuffled: (ProductDataTypes | UserPostTypes)[] = [
      ...posts,
      ...products,
    ].sort(() => 0.5 - Math.random());
    // shuffled.slice(0, num)
    setExplorationPost(shuffled);
    setPosts();
  }, []);

  const handleShowPost = (userPost: UserPostTypes) => {
    setModalState((bool) => !bool);
    setSelectedPost(userPost);
  };

  return (
    <div>
      {modalState && <UserPost post={selectedPost!} closeOnOutsideClick />}

      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <ImageGallery>
        {explorationPost.map((post) => (
          <ImageContainer key={`product__${post?.id}`}>
            {"name" in post ? (
              <Link
                from={productRoute.id}
                to="/store/$for/$productId"
                params={{
                  for: post?.category?.split("/")[0],
                  productId: post.id,
                }}
                // search={productInfo}
                activeOptions={{ exact: true }}
              >
                <MdShoppingBag className="icon" />
                <img
                  className="gallery"
                  src={post?.colors[0].images[0]}
                  alt={`${post?.name} preview image`}
                />
              </Link>
            ) : (
              <img
                className="gallery"
                src={post?.image}
                alt={`a photo by ${post?.postedBy}`}
                onClick={() => handleShowPost(post)}
              />
            )}
          </ImageContainer>
        ))}
      </ImageGallery>
    </div>
  );
};

export default Explore;
