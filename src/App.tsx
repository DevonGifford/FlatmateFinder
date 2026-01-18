import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Spinner } from "@/components/custom/Spinner";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useDemoSessionLifecycle } from "@/hooks/useDemoSessionLifecycle";
import { useGlobalState } from "@/hooks/useGlobalState";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useTenantApplicants } from "@/hooks/useTenantApplicants";
import {
  isApplicantRoute,
  isPublicRoute,
  isTenantRoute,
  ROUTES,
} from "@/lib/routes";
import homeData_EN from "@/locales/home/home_en.json";
import homeData_ES from "@/locales/home/home_es.json";
import FAQPage from "@/pages/FAQ.page";
import HomePage from "@/pages/Home.page";
import {
  isApplicantSession,
  isDemoSession,
  isTenantSession,
} from "@/types/globalState";

const ApplicantFormPage = lazy(() => import("@/pages/ApplicantForm.page"));
const ApplicantThankYouPage = lazy(
  () => import("@/pages/ApplicantThankYou.page"),
);
const TenantLeaderboardPage = lazy(
  () => import("@/pages/TenantLeaderboard.page"),
);
const TenantTinderPage = lazy(() => import("@/pages/TenantTinder.page"));
const TenantWelcomePage = lazy(() => import("@/pages/TenantWelcome.page"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size="screen" />
    </div>
  );
}

function App() {
  const { session, applicantPool, locale } = useGlobalState();
  const { pathname } = useLocation();

  const localeData = locale === "EN" ? homeData_EN : homeData_ES;

  const isPublicPath = isPublicRoute(pathname);
  const isTenantPath = isTenantRoute(pathname);

  const isDemoApplicant =
    isApplicantSession(session) && session.mode === "demo";
  const isDemoTenant = isTenantSession(session) && session.mode === "demo";

  const isDemoApplicantArea = isDemoApplicant && isApplicantRoute(pathname);
  const isDemoTenantArea = isDemoTenant && isTenantPath;
  const isDemoArea = isDemoApplicantArea || isDemoTenantArea;
  const hasDemoSession = isDemoSession(session);

  usePageMetadata(pathname, locale);
  useDemoSessionLifecycle({ session, isDemoArea, isPublicRoute: isPublicPath });
  useTenantApplicants({ session, applicantPool, isTenantRoute: isTenantPath });

  const showTenantShell =
    isTenantSession(session) && (!hasDemoSession || isDemoTenantArea);

  return (
    <>
      {showTenantShell ? <Sidebar /> : <Navbar />}

      <main className="flex h-auto flex-col gap-3 lg:gap-5">
        {isDemoArea && (
          <p className="mx-auto rounded-full bg-muted px-4 py-1 text-center text-sm text-muted-foreground">
            {localeData.demoBanner}
          </p>
        )}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.faq} element={<FAQPage />} />
            {isApplicantSession(session) && (
              <>
                <Route
                  path={ROUTES.applicant.form}
                  element={<ApplicantFormPage />}
                />
                <Route
                  path={ROUTES.applicant.thankYou}
                  element={<ApplicantThankYouPage />}
                />
              </>
            )}
            {isTenantSession(session) && (
              <>
                <Route
                  path={ROUTES.tenant.welcome}
                  element={<TenantWelcomePage />}
                />
                <Route
                  path={ROUTES.tenant.tinder}
                  element={<TenantTinderPage />}
                />
                <Route
                  path={ROUTES.tenant.leaderboard}
                  element={<TenantLeaderboardPage />}
                />
              </>
            )}
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster />
    </>
  );
}

export default App;
