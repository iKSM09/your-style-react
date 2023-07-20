import { StateCreator, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

export type CartItemType = {
  id: string;
  category: string;
  name: string;
  postedBy: string;
  color: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

type State = {
  cartItems: CartItemType[];
  cartTotalPrice: number;
};

type Action = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
  // updateProduct: (updatedProduct: CartItemType) => void;
  updateQuantity: (state: "+" | "-", updatedProduct: CartItemType) => void;

  reCalCartTotalPrice: () => void;
};

type PersistTypes = (
  config: StateCreator<State & Action>,
  options: PersistOptions<State & Action>
) => StateCreator<State & Action>;

const initialState: State = {
  cartItems: [],
  cartTotalPrice: 0,
};

export const cartStore = create<State & Action>(
  (persist as PersistTypes)(
    (set, get) => ({
      ...initialState,

      addToCart: (product) =>
        set((state) => ({ cartItems: [...state.cartItems, product] })),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      resetCart: () => set(initialState),
      // updateProduct: (updatedProduct) =>
      //   set(({ cartItems }) => {
      //     let currentCartList = cartItems.map((item) =>
      //       item.id === updatedProduct.id ? { ...updatedProduct } : cartItems
      //     );
      //     return currentCartList;
      //   }),
      updateQuantity: (state, product) => {
        if (state === "+") product.quantity++;
        if (state === "-") product.quantity--;

        product.totalPrice = product.price * product.quantity;
        product.quantity === 0
          ? get().removeFromCart(product.id)
          : set(({ cartItems }) => {
              let currentCartList = cartItems.map((item) =>
                item.id === product.id ? { ...product } : item
              );
              return { cartItems: currentCartList };
            });

        get().reCalCartTotalPrice();
      },
      reCalCartTotalPrice: () =>
        set((state) => ({
          cartTotalPrice: state.cartItems.reduce(
            (acc, item) => acc + item.totalPrice,
            0
          ),
        })),
    }),
    {
      name: "cart-storage", // name of the item in the storage (must be unique)
    }
  )
);
