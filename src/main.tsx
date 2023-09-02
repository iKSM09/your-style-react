import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";

import { router } from "./router";
import { stripePromise } from "./utils/stripe/stripe.utils";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </QueryClientProvider>
  </React.StrictMode>
);
