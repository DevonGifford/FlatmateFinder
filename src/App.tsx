import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAdminContext } from "@/contexts/admin/useAdminContext";
import { ApplicantProvider } from "@/contexts/applicant/ApplicantProvider";
import { DatabaseProvider } from "@/contexts/database/DatabaseProvider";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import HomePage from "@/pages/Home.page";
import FaqPage from "@/pages/Faq.page";
import ApplicationPage from "@/pages/Application.page";
import ThankyouPage from "@/pages/Thankyou.page";
import TenantWelcomePage from "@/pages/TenantWelcome.page";
import TenantTinderPage from "@/pages/TenantTinder.page";
import TenantLeaderboardPage from "@/pages/TenantLeaderboard.page";

import "./App.css";

function App() {
  const { adminProfile } = useAdminContext();

  return (
    <>
      <Router basename={import.meta.env.VITE_REACT_APP_BASENAME || "/"}>
        {!adminProfile && <Navbar />}
        <main className="flex flex-col h-auto gap-3 lg:gap-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/FAQ" element={<FaqPage />} />
          </Routes>
          <ApplicantProvider>
            <Routes>
              <Route path="/form" element={<ApplicationPage />} />
              <Route path="/thankyou" element={<ThankyouPage />} />
            </Routes>
          </ApplicantProvider>
          <DatabaseProvider>
            {adminProfile && <Sidebar />}
            <Routes>
              <Route path="/admin-welcome" element={<TenantWelcomePage />} />
              <Route path="/admin-tinder" element={<TenantTinderPage />} />
              <Route
                path="/admin-leaderboard"
                element={<TenantLeaderboardPage />}
              />
            </Routes>
          </DatabaseProvider>
        </main>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
