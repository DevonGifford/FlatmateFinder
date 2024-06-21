import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import {
  fetchApplicantPool,
  waitForFirebaseAuth,
} from "@/lib/firebase/firestore";
import {
  isApplicantSession,
  isDemoSession,
  isTenantSession,
} from "@/types/globalStateInterfaces";
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

const publicRoutes = ["/", "/FAQ"] as const;
const applicantRoutes = ["/form", "/thankyou"] as const;
const tenantRoutes = [
  "/admin-welcome",
  "/admin-tinder",
  "/admin-leaderboard",
] as const;

function App() {
  return (
    <Router basename={import.meta.env.VITE_REACT_APP_BASENAME || "/"}>
      <AppContent />
      <Toaster />
    </Router>
  );
}

function AppContent() {
  const { session, applicantPool, locale } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const location = useLocation();
  const localeData: HomePageData = locale === "EN" ? homeData_EN : homeData_ES;
  const isPublicRoute = publicRoutes.includes(
    location.pathname as (typeof publicRoutes)[number]
  );
  const isTenantRoute = tenantRoutes.includes(
    location.pathname as (typeof tenantRoutes)[number]
  );
  const isDemoApplicantArea =
    isApplicantSession(session) &&
    session.mode === "demo" &&
    applicantRoutes.includes(
      location.pathname as (typeof applicantRoutes)[number]
    );
  const isDemoTenantArea =
    isTenantSession(session) && session.mode === "demo" && isTenantRoute;
  const isDemoArea = isDemoApplicantArea || isDemoTenantArea;
  const hasDemoSession = isDemoSession(session);
  const demoSessionOnMount = useRef(hasDemoSession);
  const wasInDemoArea = useRef(isDemoArea);

  useEffect(() => {
    if (
      hasDemoSession &&
      isPublicRoute &&
      (demoSessionOnMount.current || wasInDemoArea.current)
    ) {
      dispatch({ type: "RESET_AUTH" });
    }
    wasInDemoArea.current = isDemoArea;
  }, [dispatch, hasDemoSession, isDemoArea, isPublicRoute]);

  useEffect(() => {
    if (!isTenantSession(session) || !isTenantRoute || applicantPool !== null) {
      return;
    }

    let cancelled = false;
    dispatch({ type: "FETCH_INIT" });

    void waitForFirebaseAuth()
      .then(() => fetchApplicantPool())
      .then((fetchedApplicants) => {
        if (!cancelled) {
          dispatch({ type: "FETCH_SUCCESS", payload: fetchedApplicants });
        }
      })
      .catch(() => {
        if (!cancelled) {
          dispatch({
            type: "FETCH_FAILURE",
            payload: "Something went wrong",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [applicantPool, dispatch, isTenantRoute, session]);

  const showTenantShell =
    isTenantSession(session) && (!hasDemoSession || isDemoTenantArea);

  return (
    <>
      {!showTenantShell && <Navbar />}
      {showTenantShell && <Sidebar />}
      <main className="flex h-auto flex-col gap-3 lg:gap-5">
        {isDemoArea && (
          <p className="mx-auto rounded-full bg-muted px-4 py-1 text-center text-sm text-muted-foreground">
            {localeData.demoBanner}
          </p>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FAQ" element={<FaqPage />} />
          {isApplicantSession(session) && (
            <>
              <Route path="/form" element={<ApplicationPage />} />
              <Route path="/thankyou" element={<ThankyouPage />} />
            </>
          )}
          {isTenantSession(session) && (
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
