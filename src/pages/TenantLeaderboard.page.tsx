// import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import ImageWithFallback from "@/components/ProfilePic";
import RatingBadge from "@/components/RatingBadge";
import { useDataContext } from "@/components/contexts/data/useDataContext";
// import { Button } from "@/components/ui/button";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import { RawApplicantProfile } from "@/lib/types/rawapplicant-type";
// import { RefreshCwIcon } from "lucide-react";

type Rankings = {
  dev_star?: number;
  adr_star?: number;
  osc_star?: number;
};

export default function TenantLeaderboardPage() {
  useRequireAdmin();
  const { data } = useDataContext();

  // console.log("🦺 here is the data in the data context: ", data);

  // ✅ CALCULATE RANKING - function to compute the total rating for an applicant
  const computeTotalRating = (applicant: RawApplicantProfile): number => {
    const {
      dev_star = 0,
      adr_star = 0,
      osc_star = 0,
    }: Rankings = applicant.rankings || {};

    // Calculate the total rating by summing the ratings of three admins
    return dev_star + adr_star + osc_star;
  };

  // ✅ SORT FUNCTIONALITY - by total rating in descending order
  const sortedApplicants = data
    ? data.slice().sort((a, b) => {
        const totalRatingA = computeTotalRating(a);
        const totalRatingB = computeTotalRating(b);
        return totalRatingB - totalRatingA;
      })
    : [];

  return (
    <>
      {/* ... existing code */}
      <div className="text-2xl italic py-4 pb-6 border-b-2">
        Current Leaderboard
      </div>
      {sortedApplicants.length > 0 ? (
        sortedApplicants.map(
          (applicant: RawApplicantProfile, index: number) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-3 border-2 p-4 font-semibold text-lg"
            >
              {/* // 👇 PHOTO & NAME */}
              <div className="flex flex-row gap-3 items-center shrink-0 sm:w-[180px]">
                <ImageWithFallback
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
              {/* Add display for individual admin ratings if needed */}
            </div>
          )
        )
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}
