import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { GlobalProvider } from "./contexts/GlobalProvider";

import "./index.css";
import { initialState } from "./lib/interfaces/globalStateInterfaces";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider initialState={initialState}>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
