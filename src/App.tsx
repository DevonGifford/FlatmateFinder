import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { Toaster } from "@/components/ui/toaster";
import homeData_EN from "@/locales/home-page/home_en.json";
import homeData_ES from "@/locales/home-page/home_es.json";
import { HomePageData } from "@/types/localeInterfaces";
import { useEffect, useRef } from "react";

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
  return (
    <Router basename={import.meta.env.VITE_REACT_APP_BASENAME || "/"}>
      <AppContent />
      <Toaster />
    </Router>
  );
}

function AppContent() {
  const { isAuthenticatedTenant, isAuthenticatedApplicant, accessMode } =
    useGlobalState();
  const { locale } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const location = useLocation();
  const localeData: HomePageData = locale === "EN" ? homeData_EN : homeData_ES;
  const isPublicRoute = location.pathname === "/" || location.pathname === "/FAQ";
  const isDemoApplicantArea =
    accessMode === "demo-applicant" &&
    ["/form", "/thankyou"].includes(location.pathname);
  const isDemoTenantArea =
    accessMode === "demo-tenant" &&
    ["/admin-welcome", "/admin-tinder", "/admin-leaderboard"].includes(
      location.pathname
    );
  const isDemoArea = isDemoApplicantArea || isDemoTenantArea;
  const isDemoSession =
    accessMode === "demo-applicant" || accessMode === "demo-tenant";
  const demoSessionOnMount = useRef(isDemoSession);
  const wasInDemoArea = useRef(isDemoArea);

  useEffect(() => {
    if (
      isDemoSession &&
      isPublicRoute &&
      (demoSessionOnMount.current || wasInDemoArea.current)
    ) {
      dispatch({ type: "RESET_AUTH" });
    }
    wasInDemoArea.current = isDemoArea;
  }, [dispatch, isDemoArea, isDemoSession, isPublicRoute]);

  const showTenantShell =
    isAuthenticatedTenant && (!isDemoSession || isDemoTenantArea);

  return (
    <>
      {!showTenantShell && <Navbar />}
      {showTenantShell && <Sidebar />}
      <main className="flex flex-col h-auto gap-3 lg:gap-5">
        {isDemoArea && (
          <p className="mx-auto rounded-full bg-muted px-4 py-1 text-center text-sm text-muted-foreground">
            {localeData.demoBanner}
          </p>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FAQ" element={<FaqPage />} />
          {(isAuthenticatedApplicant || accessMode === "demo-applicant") && (
            <>
              <Route path="/form" element={<ApplicationPage />} />
              <Route path="/thankyou" element={<ThankyouPage />} />
            </>
          )}
          {(isAuthenticatedTenant || accessMode === "demo-tenant") && (
            <>
              <Route path="/admin-welcome" element={<TenantWelcomePage />} />
              <Route path="/admin-tinder" element={<TenantTinderPage />} />
              <Route
                path="/admin-leaderboard"
                element={<TenantLeaderboardPage />}
              />
            </>
          )}
        </Routes>
      </main>

    </>
  );
}

export default App;
