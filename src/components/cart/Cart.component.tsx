import {
  MdArrowLeft,
  MdArrowRight,
  MdClose,
  MdDeleteOutline,
  MdOutlineShoppingCart,
} from "react-icons/md";

import blackJacket from "/assets/black_01.jpeg";
import { Image, ImageContainer } from "../card/Card.styles";

import styled from "styled-components";
import { Button } from "../button/Button.styles";

import Sidebar from "../sidebar/Sidebar.component";
import useSidebar from "../../hooks/useSidebar";
import CloseIcon from "../button/CloseIcon.component";
import { CartItemType, cartStore } from "../../store/cart.store";
import { useEffect, useState } from "react";

export const CartContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  isolation: isolate;
  top: 0;
  left: 0;
  width: 425px;
  width: min(100vw, 425px);
  height: 100vh;
  background-color: #062122;
  color: #ffffff;
  z-index: 20;
  translate: ${({ $open }) => ($open ? "0%" : "-100%")};
  transition: all 0.4s;
`;

export const CartHeader = styled.div`
  position: sticky;
  height: 12%;
  height: max-content;
  background-color: #062122;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1e484b;

  div {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    h1 {
      margin: 0;
      padding: 0;
    }
  }
`;

export const CartFooter = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 8%;
  background-color: #062122;
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #1e484b;

  p {
    font-weight: bold;
  }
`;

export const CartItems = styled.div`
  margin: 1rem;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  & > * {
    margin-bottom: 1rem;
  }
`;

export const CartItem = styled.section`
  padding: 12px;
  border: 1.5px solid rgb(255, 255, 255, 0.3);
  border-radius: 12px;

  &:hover {
    background-color: #1e484b;
  }

  hr {
    border: 1px solid rgb(255, 255, 255, 0.1);
  }

  .m12 {
    margin-bottom: 12px;
  }

  p,
  button,
  .m0 {
    margin: 0;
  }

  p.bold {
    font-weight: bold;
  }

  div.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  div.details {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }

  div.grid-of-3 {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    gap: 1rem;
    text-align: center;
  }
`;

export const Icon = styled.span`
  cursor: pointer;

  :hover {
    color: #f93889;
  }
`;

type CartProps = {
  sidebar: boolean;
  closeSidebar: () => void;
};

const Cart = ({ sidebar, closeSidebar }: CartProps) => {
  const [total, setTotal] = useState(0);
  const [
    cartItems,
    cartTotalPrice,
    removeFromCart,
    resetCart,
    updateQuantity,
    reCalCartTotalPrice,
  ] = cartStore((state) => [
    state.cartItems,
    state.cartTotalPrice,
    state.removeFromCart,
    state.resetCart,
    state.updateQuantity,
    state.reCalCartTotalPrice,
  ]);

  useEffect(() => {
    reCalCartTotalPrice();
  }, [cartItems]);

  return (
    <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} position="right">
      <CartHeader>
        <div>
          <MdOutlineShoppingCart size="2rem" />
          <h1>Cart</h1>
          <p>({cartItems.length} items)</p>
        </div>
        <span onClick={closeSidebar}>
          <CloseIcon />
        </span>
      </CartHeader>

      <CartItems>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <div className="flex m12">
              <h3>
                {item.name}
                <small style={{ marginLeft: "8px" }}>
                  ({item.category.toUpperCase().split("/")[2]})
                </small>
              </h3>
              <Icon onClick={() => removeFromCart(item.id)}>
                <MdDeleteOutline size="20px" />
              </Icon>
            </div>
            <hr className="m12" />
            <div className="details">
              <ImageContainer>
                <Image
                  src={item.image}
                  alt={`${item.color} ${item.name} preview image`}
                />
              </ImageContainer>
              <div>
                <div className="m12 grid-of-3">
                  <p className="bold">Quantity</p>
                  <small>x</small>
                  <p className="bold">Price</p>
                </div>
                <div className="m12 grid-of-3">
                  <div className="flex">
                    <Icon
                      className="m0"
                      onClick={() => updateQuantity("-", item)}
                    >
                      <MdArrowLeft size="24px" />
                    </Icon>
                    <p>{item.quantity}</p>
                    <Icon
                      className="m0"
                      onClick={() => updateQuantity("+", item)}
                    >
                      <MdArrowRight size="24px" />
                    </Icon>
                  </div>
                  <small>x</small>
                  <p>₹{item.price}</p>
                </div>
                <hr className="m12" />
                <div className="flex">
                  <p className="bold">Total Price: </p>
                  <p>₹{item.totalPrice}</p>
                </div>
              </div>
            </div>
          </CartItem>
        ))}
      </CartItems>

      <CartFooter>
        <small>
          <h2>₹{cartTotalPrice}</h2>
        </small>
        <Button $color="secondary" $radius="curved">
          Proceed
        </Button>
      </CartFooter>
    </Sidebar>
  );
};

export default Cart;
