import { useAtom } from "jotai";
import { MouseEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import { postModalAtom } from "../../store/atoms";
import { UserPostTypes } from "../../store/posts.store";
import { Link } from "@tanstack/router";
import { productsStore } from "../../store/products.store";
import { MdMoreHoriz, MdOutlineShare } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { productRoute } from "../../pages/product/Product.route";
import Dialog from "../dialog/Dialog.component";
import UserPlaceholderImage from "../../assets/user-placeholder-image.jpg";

export const PostHeadSection = styled.section`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  img {
    width: 24px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const PostInteraction = styled.section`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const PostCaption = styled.p`
  margin-block: 0.5rem;
  text-align: start;
`;

export const ProductSectionHeader = styled.p`
  margin-bottom: 8px;
  text-align: start;
  font-weight: bold;
`;

export const ProductSection = styled.section`
  padding: 0.5rem;
  display: flex;
  gap: 8px;
  background-color: var(--primary-container);
  color: var(--on-primary-container);
  border-radius: 4px;

  img {
    width: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 2px;
  }

  div.details {
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  p.name {
    margin-bottom: 4px;
    font-weight: bold;
  }

  p.price {
    text-align: end;
    bottom: 0;
  }
`;

type UserPostProps = {
  post: UserPostTypes;
  closeOnOutsideClick: any;
};

const UserPost = ({ post, closeOnOutsideClick }: UserPostProps) => {
  const [modalState, setModalState] = useAtom(postModalAtom);
  const [selectedProduct, filterSelectedProduct] = productsStore((state) => [
    state.selectedProduct,
    state.filterSelectedProduct,
  ]);
  const [like, toggleLike] = useState(false);

  useEffect(() => {
    filterSelectedProduct(post.productLink.split("/").pop()!);
  }, [post.id]);

  return (
    <Dialog
      modalState={modalState}
      closeModal={() => setModalState(false)}
      closeOnOutsideClick={closeOnOutsideClick}
    >
      <PostHeadSection>
        <div>
          <img src={UserPlaceholderImage} alt="user profile image" />
          <p>{post.postedBy}</p>
        </div>
        <MdMoreHoriz size={24} />
      </PostHeadSection>
      <img
        width="100%"
        src={post.image}
        alt={`image posted by ${post.postedBy}`}
      />
      <PostInteraction>
        <div>
          <div onClick={() => toggleLike((bool) => !bool)}>
            {like ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
          </div>
          <p>0 likes...</p>
        </div>
        <MdOutlineShare size={24} />
      </PostInteraction>
      <PostCaption>{post.caption}</PostCaption>
      <ProductSectionHeader>Tagged Products :-</ProductSectionHeader>
      <ProductSection>
        <img
          src={selectedProduct?.colors[0].images[0]}
          alt={`${selectedProduct?.name} preview image`}
        />
        <div className="details">
          <div>
            <Link
              from={productRoute.id}
              to="/store/$for/$productId"
              params={{
                for: selectedProduct?.category?.split("/")[0],
                productId: selectedProduct.id,
              }}
              activeOptions={{ exact: true }}
            >
              <p className="name">{selectedProduct?.name}</p>
            </Link>
            <small>By {selectedProduct.postedBy}</small>
          </div>
          <p className="price">₹{selectedProduct.price}</p>
        </div>
      </ProductSection>
    </Dialog>
  );
};

export default UserPost;
