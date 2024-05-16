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
      <header className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Tenant dashboard
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome, {loggedTenant}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Review the applicant pool, record your impressions, and use the
          leaderboard to compare the results.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          to="/admin-tinder"
          className="group flex min-h-56 flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
        >
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold">Review applicants</h2>
            <p className="mt-2 text-muted-foreground">
              Open the card deck to review profiles, rate candidates, and swipe
              left or right.
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
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold">View leaderboard</h2>
            <p className="mt-2 text-muted-foreground">
              Compare everyone&apos;s ratings and see which applicants are
              leading the shortlist.
            </p>
          </div>
          <span className="mt-6 flex items-center gap-2 font-semibold">
            Open leaderboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      <section className="grid gap-6 rounded-2xl border bg-muted/30 p-6 sm:p-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            <h2 className="text-xl font-bold">A simple review flow</h2>
          </div>
          <ol className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background font-bold text-foreground shadow-sm">
                1
              </span>
              <span>Open the applicant deck and read each profile.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background font-bold text-foreground shadow-sm">
                2
              </span>
              <span>Give a star rating, then swipe left or right.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background font-bold text-foreground shadow-sm">
                3
              </span>
              <span>Use the leaderboard to compare the shortlist.</span>
            </li>
          </ol>
        </div>

        <div className="border-t pt-6 text-sm text-muted-foreground md:border-t-0 md:border-l md:pl-6 md:pt-0">
          <p className="font-semibold text-foreground">Rating reminder</p>
          <p className="mt-2">
            Left means no, right means yes. Your ratings are saved as you move
            through the deck.
          </p>
        </div>
      </section>

      <footer>
        <p className="text-center font-semibold tracking-wider">
          Lets find our next flatmate
        </p>
        <p className="mt-1 text-center">😁</p>
      </footer>
    </div>
  );
}
