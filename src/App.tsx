import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Spinner } from "@/components/custom/Spinner";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useDemoSessionLifecycle } from "@/hooks/useDemoSessionLifecycle";
import { useGlobalState } from "@/hooks/useGlobalState";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useTenantApplicants } from "@/hooks/useTenantApplicants";
import homeData_EN from "@/locales/home/home_en.json";
import homeData_ES from "@/locales/home/home_es.json";
import FAQPage from "@/pages/FAQ.page";
import HomePage from "@/pages/Home.page";
import {
  isApplicantSession,
  isDemoSession,
  isTenantSession,
} from "@/types/globalState";
import type { HomePageData } from "@/types/locale";

const ApplicantFormPage = lazy(() => import("@/pages/ApplicantForm.page"));
const ApplicantThankYouPage = lazy(
  () => import("@/pages/ApplicantThankYou.page"),
);
const TenantLeaderboardPage = lazy(
  () => import("@/pages/TenantLeaderboard.page"),
);
const TenantTinderPage = lazy(() => import("@/pages/TenantTinder.page"));
const TenantWelcomePage = lazy(() => import("@/pages/TenantWelcome.page"));

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
  const location = useLocation();
  const localeData: HomePageData = locale === "EN" ? homeData_EN : homeData_ES;
  const isPublicRoute = publicRoutes.includes(
    location.pathname as (typeof publicRoutes)[number],
  );
  const isTenantRoute = tenantRoutes.includes(
    location.pathname as (typeof tenantRoutes)[number],
  );
  const isDemoApplicantArea =
    isApplicantSession(session) &&
    session.mode === "demo" &&
    applicantRoutes.includes(
      location.pathname as (typeof applicantRoutes)[number],
    );
  const isDemoTenantArea =
    isTenantSession(session) && session.mode === "demo" && isTenantRoute;
  const isDemoArea = isDemoApplicantArea || isDemoTenantArea;
  const hasDemoSession = isDemoSession(session);

  usePageMetadata(location.pathname, locale);
  useDemoSessionLifecycle({ session, isDemoArea, isPublicRoute });
  useTenantApplicants({ session, applicantPool, isTenantRoute });

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
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Spinner size="screen" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            {isApplicantSession(session) && (
              <>
                <Route path="/form" element={<ApplicantFormPage />} />
                <Route path="/thankyou" element={<ApplicantThankYouPage />} />
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
        </Suspense>
      </main>
    </>
  );
}

export default App;
