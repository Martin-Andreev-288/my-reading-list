import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("modal-root")!).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
