import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useDataContext } from "@/components/contexts/data/useDataContext";
import { Button } from "@/components/ui/button";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import { RefreshCwIcon } from "lucide-react";

export default function TenantLeaderboardPage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();
  const { data, handleRefresh } = useDataContext();

  console.log("here is the data in the data context: ", data);

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6 border-b-2">
          LEADERBOARD PAGE
        </div>
        <Button
          className="transition ease-in-out duration-150 hover:scale-110"
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            console.log("Navbar refresh button triggered 💢 ");
            handleRefresh();
          }}
        >
          <RefreshCwIcon />
        </Button>
        {/* // 👇 LEADERBOARD */}
        <div className="text-2xl italic py-4 pb-6 border-b-2">
          Current Leaderboard
        </div>
        {/* //🎯🔮 TO DO LIST */}
        <p>admin profile:</p>
        <p>name: {adminProfile?.name}</p>

        {/* // 👇 PENDING */}
        <div className="text-2xl italic py-4 pb-6 border-b-2">
          Still Pending Votes{" "}
        </div>
        {/* //🎯🔮 TO DO LIST */}
        <p>admin profile:</p>
        <p>name: {adminProfile?.name}</p>
      </div>
    </>
  );
}
