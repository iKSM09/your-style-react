import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      console.log("fetching cart");
      const res = await fetch("/api/get-cart-id", { cache: "no-store" });
      const cart = await res.json();
      return cart;
    },
  });
};
