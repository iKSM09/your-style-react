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

export const CloseIcon = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: transparent;
  color: inherit;
  border: unset;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #ffdcc0;
    color: #062122;
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

  :hover {
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
  return (
    <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} position="right">
      <CartHeader>
        <div>
          <MdOutlineShoppingCart size="2rem" />
          <h1>Cart</h1>
          <p>(3 items)</p>
        </div>
        <CloseIcon onClick={closeSidebar}>
          <MdClose size="2rem" />
        </CloseIcon>
      </CartHeader>

      <CartItems>
        <CartItem>
          <div className="flex m12">
            <h3>Product Name</h3>
            <Icon>
              <MdDeleteOutline size="20px" />
            </Icon>
          </div>
          <hr className="m12" />
          <div className="details">
            <ImageContainer>
              <Image src={blackJacket} alt="black Jacket" />
            </ImageContainer>
            <div>
              <div className="m12 grid-of-3">
                <p className="bold">Quantity</p>
                <small>x</small>
                <p className="bold">Price</p>
              </div>
              <div className="m12 grid-of-3">
                <div className="flex">
                  <Icon className="m0">
                    <MdArrowLeft size="24px" />
                  </Icon>
                  <p>02</p>
                  <Icon className="m0">
                    <MdArrowRight size="24px" />
                  </Icon>
                </div>
                <small>x</small>
                <p>₹299</p>
              </div>
              <hr className="m12" />
              <div className="flex">
                <p className="bold">Total Price: </p>
                <p>₹598</p>
              </div>
            </div>
          </div>
        </CartItem>
        <CartItem>
          <div className="flex m12">
            <h3>Product Name</h3>
            <Icon>
              <MdDeleteOutline size="20px" />
            </Icon>
          </div>
          <hr className="m12" />
          <div className="details">
            <ImageContainer>
              <Image src={blackJacket} alt="black Jacket" />
            </ImageContainer>
            <div>
              <div className="m12 grid-of-3">
                <p className="bold">Quantity</p>
                <small>x</small>
                <p className="bold">Price</p>
              </div>
              <div className="m12 grid-of-3">
                <div className="flex">
                  <Icon className="m0">
                    <MdArrowLeft size="24px" />
                  </Icon>
                  <p>02</p>
                  <Icon className="m0">
                    <MdArrowRight size="24px" />
                  </Icon>
                </div>
                <small>x</small>
                <p>₹299</p>
              </div>
              <hr className="m12" />
              <div className="flex">
                <p className="bold">Total Price: </p>
                <p>₹598</p>
              </div>
            </div>
          </div>
        </CartItem>
        <CartItem>
          <div className="flex m12">
            <h3>Product Name</h3>
            <Icon>
              <MdDeleteOutline size="20px" />
            </Icon>
          </div>
          <hr className="m12" />
          <div className="details">
            <ImageContainer>
              <Image src={blackJacket} alt="black Jacket" />
            </ImageContainer>
            <div>
              <div className="m12 grid-of-3">
                <p className="bold">Quantity</p>
                <small>x</small>
                <p className="bold">Price</p>
              </div>
              <div className="m12 grid-of-3">
                <div className="flex">
                  <Icon className="m0">
                    <MdArrowLeft size="24px" />
                  </Icon>
                  <p>02</p>
                  <Icon className="m0">
                    <MdArrowRight size="24px" />
                  </Icon>
                </div>
                <small>x</small>
                <p>₹299</p>
              </div>
              <hr className="m12" />
              <div className="flex">
                <p className="bold">Total Price: </p>
                <p>₹598</p>
              </div>
            </div>
          </div>
        </CartItem>
        <CartItem>
          <div className="flex m12">
            <h3>Product Name</h3>
            <Icon>
              <MdDeleteOutline size="20px" />
            </Icon>
          </div>
          <hr className="m12" />
          <div className="details">
            <ImageContainer>
              <Image src={blackJacket} alt="black Jacket" />
            </ImageContainer>
            <div>
              <div className="m12 grid-of-3">
                <p className="bold">Quantity</p>
                <small>x</small>
                <p className="bold">Price</p>
              </div>
              <div className="m12 grid-of-3">
                <div className="flex">
                  <Icon className="m0">
                    <MdArrowLeft size="24px" />
                  </Icon>
                  <p>02</p>
                  <Icon className="m0">
                    <MdArrowRight size="24px" />
                  </Icon>
                </div>
                <small>x</small>
                <p>₹299</p>
              </div>
              <hr className="m12" />
              <div className="flex">
                <p className="bold">Total Price: </p>
                <p>₹598</p>
              </div>
            </div>
          </div>
        </CartItem>
      </CartItems>

      <CartFooter>
        <small>
          <h2>₹1,196</h2>
        </small>
        <Button $color="secondary" $radius="curved">
          Proceed
        </Button>
      </CartFooter>
    </Sidebar>
  );
};

export default Cart;
