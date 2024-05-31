import { Link } from "react-router-dom";
import { useRequireTenant } from "@/hooks/useRequireTenant";
import { useGlobalState } from "@/hooks/useGlobalState";
import tenantData_EN from "@/locales/tenant-pages/tenant_en.json";
import tenantData_ES from "@/locales/tenant-pages/tenant_es.json";
import { TenantPageData } from "@/types/localeInterfaces";
import {
  ArrowRight,
  ClipboardCheck,
  Heart,
  ListChecks,
  Sparkles,
} from "lucide-react";

export default function TenantWelcomePage() {
  useRequireTenant();
  const { loggedTenant, accessMode, locale } = useGlobalState();
  const localeData: TenantPageData = locale === "EN" ? tenantData_EN : tenantData_ES;
  // Keep the internal tenant identity available for demo ranking behavior.
  const tenantDisplayName = accessMode === "guest-tenant" ? "Demo-Tenant" : loggedTenant;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:gap-10 lg:py-12">
      <header className="flex flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          {localeData.dashboardEyebrow}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {localeData.welcome}, {tenantDisplayName}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {localeData.dashboardDescription}
        </p>
      </header>

      <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            <h2 className="text-xl font-bold">{localeData.howItWorks}</h2>
          </div>
        </div>
        <ol className="grid gap-5 text-sm text-muted-foreground sm:grid-cols-3 sm:gap-6">
          <li className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-foreground">
              1
            </span>
            <span>{localeData.stepOne}</span>
          </li>
          <li className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-foreground">
              2
            </span>
            <span>{localeData.stepTwo}</span>
          </li>
          <li className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-foreground">
              3
            </span>
            <span>{localeData.stepThree}</span>
          </li>
        </ol>
        <div className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">{localeData.ratingReminder}</p>
          <p className="mt-1">
            {localeData.ratingReminderDescription}
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          to="/admin-tinder"
          className="group flex min-h-56 flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
        >
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold">{localeData.tinderReviewTitle}</h2>
            <p className="mt-2 text-muted-foreground">
              {localeData.tinderReviewDescription}
            </p>
          </div>
          <span className="mt-6 flex items-center gap-2 font-semibold">
            {localeData.openApplicantDeck}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/admin-leaderboard"
          className="group flex min-h-56 flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
        >
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold">{localeData.viewLeaderboardTitle}</h2>
            <p className="mt-2 text-muted-foreground">
              {localeData.viewLeaderboardDescription}
            </p>
          </div>
          <span className="mt-6 flex items-center gap-2 font-semibold">
            {localeData.openLeaderboard}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      <footer>
        <p className="text-center font-semibold tracking-wider">
          {localeData.closingMessage}
        </p>
        <p className="mt-1 text-center">😁</p>
      </footer>
    </div>
  );
}
