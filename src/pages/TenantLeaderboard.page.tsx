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
    <section className="mx-auto w-full max-w-5xl px-2 pb-6 sm:px-4">
      <h1 className="border-b-2 py-4 pb-6 text-2xl italic">
        Current Leaderboard
      </h1>
      {isLoading && <Spinner />}
      {error && <ErrorMessage />}
      {sortedApplicants.length > 0 ? (
        sortedApplicants.map(
          (applicant: ApplicantProfile, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-2 p-3 text-lg font-semibold sm:flex sm:justify-between sm:gap-3 sm:p-4"
            >
              {/* // 👇 PHOTO & NAME */}
              <div className="flex flex-row gap-3 items-center shrink-0 sm:w-[180px] md:w-[220px]">
                <ProfilePic
                  src={applicant.photo}
                  fallbackSrc="/profile-fallback.svg"
                  alt={`Profile picture for ${applicant.firstForm.name}`}
                  width={50}
                  height={50}
                  className="flex justify-center items-center rounded-full h-10 w-10"
                />
                <p className="hidden sm:block whitespace-nowrap truncate">
                  {applicant.firstForm.name}
                </p>
              </div>
              {/* // 👇 INDIV RANKINGS */}
              <div className="flex w-full flex-row justify-evenly gap-1">
                {tenants.map((tenant) => (
                  <RatingBadge
                    key={tenant.id}
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
                ))}
              </div>
              {/* // 👇 TOTAL */}
              <p className="text-xl shrink-0">
                {computeTotalRating(applicant)}
              </p>
            </div>
          )
        )
      ) : (
        <p>No data available</p>
      )}
    </section>
  );
}
