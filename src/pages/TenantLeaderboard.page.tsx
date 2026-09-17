import { ErrorMessage } from "@/components/custom/ErrorMessage";
import { ProfilePic } from "@/components/custom/ProfilePic";
import { RatingBadge } from "@/components/custom/RatingBadge";
import { Spinner } from "@/components/custom/Spinner";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useRequireTenant } from "@/hooks/useRequireTenant";
import {
  TenantBooleanKey,
  tenants,
  TenantStarKey,
} from "@/lib/constants/tenants";
import tenantData_EN from "@/locales/tenant/tenant_en.json";
import tenantData_ES from "@/locales/tenant/tenant_es.json";
import type { ApplicantProfile } from "@/types/applicant";
import type { TenantPageData } from "@/types/locale";

export default function TenantLeaderboardPage() {
  useRequireTenant();
  const { applicantPool, isLoading, error, locale } = useGlobalState();
  const localeData: TenantPageData =
    locale === "EN" ? tenantData_EN : tenantData_ES;

  const computeTotalRating = (applicant: ApplicantProfile): number => {
    return tenants.reduce(
      (total, tenant) =>
        total +
        (applicant.rankings?.[`${tenant.id}_star` as TenantStarKey] || 0),
      0,
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
          {localeData.rankingsEyebrow}
        </p>
        <h1 className="text-2xl font-bold italic sm:text-3xl">
          {localeData.currentLeaderboard}
        </h1>
      </header>
      {isLoading && <Spinner />}
      {error && <ErrorMessage />}
      {sortedApplicants.length > 0 ? (
        <div
          className="flex flex-col gap-3"
          role="list"
          aria-label={localeData.applicantRankings}
        >
          <div className="hidden items-center gap-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:flex">
            <span className="w-8">{localeData.rank}</span>
            <span className="w-[220px]">{localeData.applicant}</span>
            <span className="flex-1 text-center">
              {localeData.tenantRatings}
            </span>
            <span className="w-14 text-center">{localeData.total}</span>
          </div>
          {sortedApplicants.map(
            (applicant: ApplicantProfile, index: number) => (
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
                    alt={`${localeData.profilePictureAlt} ${applicant.firstForm.name}`}
                    openLabel={`${localeData.openProfilePicture} ${applicant.firstForm.name}`}
                    width={50}
                    height={50}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  />
                  <p className="truncate font-semibold">
                    {applicant.firstForm.name}
                  </p>
                </div>
                <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:flex-1 sm:justify-evenly">
                  {tenants.map((tenant) => {
                    const starValue =
                      applicant.rankings?.[
                        `${tenant.id}_star` as TenantStarKey
                      ];
                    const ratingLabel =
                      starValue === undefined
                        ? `${tenant.name}: ${localeData.notRated}`
                        : `${tenant.name}: ${starValue} ${
                            starValue === 1 ? localeData.star : localeData.stars
                          }`;

                    return (
                      <div
                        key={tenant.id}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-xs font-medium text-muted-foreground sm:hidden">
                          {tenant.name}
                        </span>
                        <RatingBadge
                          ariaLabel={ratingLabel}
                          boolValue={
                            applicant.rankings?.[
                              `${tenant.id}_bool` as TenantBooleanKey
                            ]
                          }
                          starValue={starValue}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-muted px-2 py-1">
                  <span className="text-xs font-medium text-muted-foreground sm:hidden">
                    {localeData.total}
                  </span>
                  <span className="text-xl font-bold">
                    {computeTotalRating(applicant)}
                  </span>
                </div>
              </article>
            ),
          )}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          {localeData.noData}
        </p>
      )}
    </section>
  );
}
