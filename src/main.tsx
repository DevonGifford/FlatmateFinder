import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App.tsx";

import { GlobalProvider } from "./contexts/GlobalProvider";
import { initialState } from "./types/globalStateInterfaces";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider initialState={initialState}>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
);
