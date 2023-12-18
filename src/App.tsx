import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home.page";
import ApplicationPage from "./pages/Application.page";

import "./App.css";
import { ApplicantProvider } from "./components/contexts/applicant/ApplicantProvider";
import ThankyouPage from "./pages/Thankyou.page";
import FaqPage from "./pages/Faq.page";
import { useAdminContext } from "./components/contexts/admin/useAdminContext";
import TenantWelcomePage from "./pages/TenantWelcome.page";
import TenantTinderPage from "./pages/TenantTinder.page";
import TenantLeaderboardPage from "./pages/TenantLeaderboard.page";
import NavbarAdmin from "./components/NavbarAdmin";
import { DataProvider } from "./components/contexts/data/DataProvider";

function App() {
  const { adminProfile } = useAdminContext();
  console.log("adminProfile 🦺", adminProfile);
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
          <DataProvider>
            {adminProfile && <NavbarAdmin />}
            <Routes>
              <Route path="/admin-welcome" element={<TenantWelcomePage />} />
              <Route path="/admin-tinder" element={<TenantTinderPage />} />
              <Route
                path="/admin-leaderboard"
                element={<TenantLeaderboardPage />}
              />
            </Routes>
          </DataProvider>
        </main>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
