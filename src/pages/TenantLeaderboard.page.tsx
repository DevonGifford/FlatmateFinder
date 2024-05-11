import { useRequireTenant } from "@/hooks/useRequireTenant";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ProfilePic } from "@/components/ProfilePic";
import { RatingBadge } from "@/components/RatingBadge";
import { Spinner } from "@/components/Spinner";
import { ApplicantProfile } from "@/types/applicantInterfaces";
import {
  tenants,
  TenantBooleanKey,
  TenantStarKey,
} from "@/lib/constants/tenants";

export default function TenantLeaderboardPage() {
  useRequireTenant();
  const { applicantPool, isLoading, error } = useGlobalState();

  const computeTotalRating = (applicant: ApplicantProfile): number => {
    return tenants.reduce(
      (total, tenant) =>
        total + (applicant.rankings?.[`${tenant.id}_star` as TenantStarKey] || 0),
      0
    );
  };

  const sortedApplicants = applicantPool
    ? applicantPool.slice().sort((a, b) => {
        const totalRatingA = computeTotalRating(a);
        const totalRatingB = computeTotalRating(b);
        return totalRatingB - totalRatingA;
      })
    : [];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-2 pb-8 sm:px-4">
      <header className="border-b-2 py-4 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Tenant rankings
        </p>
        <h1 className="text-2xl font-bold italic sm:text-3xl">
          Current Leaderboard
        </h1>
      </header>
      {isLoading && <Spinner />}
      {error && <ErrorMessage />}
      {sortedApplicants.length > 0 ? (
        <div className="flex flex-col gap-3" role="list" aria-label="Applicant rankings">
          <div className="hidden items-center gap-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:flex">
            <span className="w-8">Rank</span>
            <span className="w-[220px]">Applicant</span>
            <span className="flex-1 text-center">Tenant ratings</span>
            <span className="w-14 text-center">Total</span>
          </div>
          {sortedApplicants.map((applicant: ApplicantProfile, index: number) => (
            <article
              key={applicant.id ?? applicant.uuid}
              className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-3 text-base shadow-sm sm:flex-nowrap sm:gap-4 sm:p-4"
              role="listitem"
            >
              <span className="w-8 text-center text-lg font-bold text-muted-foreground">
                {index + 1}
              </span>
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-[220px] sm:flex-none">
                <ProfilePic
                  src={applicant.photo}
                  fallbackSrc="/profile-fallback.svg"
                  alt={`Profile picture for ${applicant.firstForm.name}`}
                  width={50}
                  height={50}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                />
                <p className="truncate font-semibold">
                  {applicant.firstForm.name}
                </p>
              </div>
              <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:flex-1 sm:justify-evenly">
                {tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="flex flex-col items-center gap-1"
                  >
                    <span className="text-xs font-medium text-muted-foreground sm:hidden">
                      {tenant.name}
                    </span>
                    <RatingBadge
                      boolValue={
                        applicant.rankings?.[
                          `${tenant.id}_bool` as TenantBooleanKey
                        ]
                      }
                      starValue={
                        applicant.rankings?.[
                          `${tenant.id}_star` as TenantStarKey
                        ]
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-muted px-2 py-1">
                <span className="text-xs font-medium text-muted-foreground sm:hidden">
                  Total
                </span>
                <span className="text-xl font-bold">
                  {computeTotalRating(applicant)}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No data available
        </p>
      )}
    </section>
  );
}
