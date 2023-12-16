// import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
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
  // const { adminProfile } = useAdminContext();
  const { data } = useDataContext();

  console.log("here is the data in the data context: ", data);

  // Function to compute the total rating for an applicant
  const computeTotalRating = (applicant: RawApplicantProfile): number => {
    const {
      dev_star = 0,
      adr_star = 0,
      osc_star = 0,
    }: Rankings = applicant.rankings || {};

    // Calculate the total rating by summing the ratings of three admins
    return dev_star + adr_star + osc_star;
  };

  // Sort applicants by total rating in descending order
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
        sortedApplicants.map((applicant: RawApplicantProfile, index: number) => (
          <div key={index} className="flex flex-row gap-3">
            <p>{applicant.firstForm.name}</p>
            <p></p>
            <p>Total Rating: {computeTotalRating(applicant)}</p>
            {/* Add display for individual admin ratings if needed */}
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
      {/* ... other sections */}
    </>
  );
}
