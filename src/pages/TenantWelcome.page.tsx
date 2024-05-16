import { Link } from "react-router-dom";
import { useRequireTenant } from "@/hooks/useRequireTenant";
import { useGlobalState } from "@/hooks/useGlobalState";
import {
  ArrowRight,
  ClipboardCheck,
  Heart,
  ListChecks,
  Sparkles,
} from "lucide-react";

export default function TenantWelcomePage() {
  useRequireTenant();
  const { loggedTenant } = useGlobalState();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:gap-10 lg:py-12">
      <header className="flex flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Tenant dashboard
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome, {loggedTenant}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          This is the tenant dashboard, where current tenants can review
          applicants and compare ratings.
        </p>
      </header>

      <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            <h2 className="text-xl font-bold">How it works</h2>
          </div>
          <p className="max-w-xl text-sm text-muted-foreground">
            A quick review process to help everyone compare applicants
            consistently.
          </p>
        </div>
        <ol className="grid gap-5 text-sm text-muted-foreground sm:grid-cols-3 sm:gap-6">
          <li className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-foreground">
              1
            </span>
            <span>Open the applicant deck and read each profile.</span>
          </li>
          <li className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-foreground">
              2
            </span>
            <span>Give a star rating, then swipe left or right.</span>
          </li>
          <li className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-background font-bold text-foreground">
              3
            </span>
            <span>Use the leaderboard to compare the shortlist.</span>
          </li>
        </ol>
        <div className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Rating reminder</p>
          <p className="mt-1">
            Left means no, right means yes. Your ratings are saved as you move
            through the deck.
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
            <h2 className="text-2xl font-bold">Tinder Review</h2>
            <p className="mt-2 text-muted-foreground">
              Review profiles, rate candidates, and swipe left or right through
              the applicant deck.
            </p>
          </div>
          <span className="mt-6 flex items-center gap-2 font-semibold">
            Open applicant deck
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
            <h2 className="text-2xl font-bold">View leaderboard</h2>
            <p className="mt-2 text-muted-foreground">
              Compare tenant ratings and quickly identify the strongest
              applicants.
            </p>
          </div>
          <span className="mt-6 flex items-center gap-2 font-semibold">
            Open leaderboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      <footer>
        <p className="text-center font-semibold tracking-wider">
          Lets find our next flatmate
        </p>
        <p className="mt-1 text-center">😁</p>
      </footer>
    </div>
  );
}
