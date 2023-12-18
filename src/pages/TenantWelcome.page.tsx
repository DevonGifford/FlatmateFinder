import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import { SaveAllIcon } from "lucide-react";

export default function TenantWelcomePage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6 border-b-2">TENANT PAGE</div>

        <div>
          <p className="text-lg font-bold">You are currently signed in as</p>
          <p className="py-4 text-4xl italic font-thin">{adminProfile?.name}</p>

          <div className="pt-4">
            <h1 className="text-lg font-bold">Instructions</h1>
            <p>One important thing to understand is...</p>
            <p>You'll notice this icon in the navbar:</p>

            <div className="flex justify-center items-center py-4">
              <div className="flex flex-col gap-2 justify-center items-center border-2 p-5 max-w-[300px] pb-6">
                <h3 className="font-semibold">Save Button </h3>
                <SaveAllIcon />
              </div>
            </div>

            <div>
              <p>After rating new candidates in Tinder:</p>
              <p className="font-bold">You must click Save.</p>
              <p>This updates the leaderboard and saves your ratings.</p>
              <p>
                It minimizes API requests, allowing for free hosting!{" "}
                <span role="img" aria-label="Smile with sweat">
                  😄
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
