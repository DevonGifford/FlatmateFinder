import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { LanguageProvider } from "@/contexts/language/LanguageProvider";
import { AdminProvider } from "@/contexts/admin/AdminProvider";

import "./index.css";
import { DatabaseProvider } from "./contexts/database/DatabaseProvider";
import { ApplicantProvider } from "./contexts/applicant/ApplicantProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AdminProvider>
        <DatabaseProvider>
          <ApplicantProvider>
            <App />
          </ApplicantProvider>
        </DatabaseProvider>
      </AdminProvider>
    </LanguageProvider>
  </React.StrictMode>
);
