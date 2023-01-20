import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { LanguageProvider } from "@/components/contexts/language/LanguageProvider.tsx";
import { AdminProvider } from "@/components/contexts/admin/AdminProvider.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </LanguageProvider>
  </React.StrictMode>
);
