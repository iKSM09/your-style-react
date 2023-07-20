import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "./router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
