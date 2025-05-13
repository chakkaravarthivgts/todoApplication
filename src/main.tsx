import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import FormComponents from "./components/formcomponent.js";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root not found ");
}

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <FormComponents />
    </StrictMode>
  </QueryClientProvider>
);
