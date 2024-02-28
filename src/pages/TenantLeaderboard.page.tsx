import { useRequireTenant } from "@/lib/hooks/useRequireTenant";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ProfilePic } from "@/components/ProfilePic";
import { RatingBadge } from "@/components/RatingBadge";
import { Spinner } from "@/components/Spinner";
import { Rankings, RawApplicantProfile } from "@/lib/types/rawapplicant-type";

export default function TenantLeaderboardPage() {
  useRequireTenant();
  const { applicantPool, isLoading, error } = useGlobalState();

  const computeTotalRating = (applicant: RawApplicantProfile): number => {
    const {
      dev_star = 0,
      adr_star = 0,
      osc_star = 0,
    }: Rankings = applicant.rankings || {};
    return dev_star + adr_star + osc_star;
  };

  const sortedApplicants = applicantPool
    ? applicantPool.slice().sort((a, b) => {
        const totalRatingA = computeTotalRating(a);
        const totalRatingB = computeTotalRating(b);
        return totalRatingB - totalRatingA;
      })
    : [];

  return (
    <>
      <h1 className="text-2xl italic py-4 pb-6 border-b-2">
        Current Leaderboard
      </h1>
      {isLoading && <Spinner />}
      {error && <ErrorMessage />}
      {sortedApplicants.length > 0 ? (
        sortedApplicants.map(
          (applicant: RawApplicantProfile, index: number) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-3 border-2 p-4 font-semibold text-lg"
            >
              {/* // 👇 PHOTO & NAME */}
              <div className="flex flex-row gap-3 items-center shrink-0 sm:w-[180px] md:w-[220px]">
                <ProfilePic
                  src={applicant.photo}
                  fallbackSrc="/profile-fallback.svg"
                  alt="profile-pic"
                  width={50}
                  height={50}
                  className="flex justify-center items-center rounded-full h-10 w-10"
                />
                <p className="hidden sm:block whitespace-nowrap truncate">
                  {applicant.firstForm.name}
                </p>
              </div>
              {/* // 👇 INDIV RANKINGS */}
              <div className="flex flex-row w-full justify-evenly">
                <RatingBadge
                  boolValue={applicant.rankings?.adr_bool}
                  starValue={applicant.rankings?.adr_star}
                />
                <RatingBadge
                  boolValue={applicant.rankings?.dev_bool}
                  starValue={applicant.rankings?.dev_star}
                />
                <RatingBadge
                  boolValue={applicant.rankings?.osc_bool}
                  starValue={applicant.rankings?.osc_star}
                />
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
    </>
  );
}
