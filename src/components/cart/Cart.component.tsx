import { Image, ImageContainer } from "../card/Card.styles";

import styled from "styled-components";

import Sidebar from "../sidebar/Sidebar.component";

import { cartStore } from "../../context/cart.store";
import { useEffect, useState } from "react";
import Icon from "../_ui/button/Icon.components";
import { Button } from "../_ui/button/Button.styles";
import PaymentForm from "../payment-form/PaymentForm.component";

export const CartContainer = styled.div<{ $open: boolean }>`
  position: fixed;
  isolation: isolate;
  top: 0;
  left: 0;
  width: 425px;
  width: min(100vw, 425px);
  height: 100vh;
  color: var(--on-surface);
  background-color: var(--surface);
  z-index: 20;
  translate: ${({ $open }) => ($open ? "0%" : "-100%")};
  transition: all 0.4s;
`;

export const CartHeader = styled.div`
  position: sticky;
  height: 56px;
  height: max-content;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container); // #062122
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--outline);

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
  height: 48px;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--outline);

  p {
    font-weight: bold;
  }
`;

export const CartItems = styled.div`
  padding: 1rem;
  height: calc(100% - (56px + 48px));
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  color: var(--on-surface-variant);
  background-color: var(--surface-variant);

  ::-webkit-scrollbar {
    display: none;
  }

  & > * {
    margin-bottom: 1rem;
  }
`;

export const CartItem = styled.section`
  padding: 12px;
  /* border: 1.5px solid rgb(255, 255, 255, 0.3); */
  border-radius: 12px;
  text-align: start;
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);

  /* &:hover,
  &:focus,
  &:active {
    color: var(--on-secondary);
    background-color: var(--secondary);
  } */

  hr {
    border: 1px solid var(--outline);
  }

  .m12 {
    margin-bottom: 8px;
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
    align-items: center;
    grid-template-columns: 2fr 1fr 2fr;
    gap: 1rem;
    text-align: center;
  }
`;

// export const Icon = styled.span`
//   cursor: pointer;

//   :hover {
//     color: #f93889;
//   }
// `;

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
          <Icon.Cart size="2rem" $secondary $ghosted $highlight />
          <h1>Cart</h1>
          <p>({cartItems.length} items)</p>
        </div>
        <Icon.Close $secondary $ghosted $pilled onClick={closeSidebar} />
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
              <Icon.Delete
                size={20}
                $ghosted
                $highlight
                onClick={() => removeFromCart(item.id)}
              />
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
                    <Icon.ArrowLeft
                      $ghosted
                      $highlight
                      className="m0"
                      onClick={() => updateQuantity("-", item)}
                    />
                    <p>{item.quantity}</p>
                    <Icon.ArrowRight
                      $ghosted
                      $highlight
                      className="m0"
                      onClick={() => updateQuantity("+", item)}
                    />
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
        <PaymentForm amount={cartTotalPrice} />
      </CartItems>

      <CartFooter>
        <small>
          <h2>₹{cartTotalPrice}</h2>
        </small>
        <Button $curved>Proceed</Button>
      </CartFooter>
    </Sidebar>
  );
};

export default Cart;
