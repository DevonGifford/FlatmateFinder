import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";

export default function TenantWelcomePage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();

  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6 border-b-2">TENANT PAGE</div>

        <div>
          <p className="text-lg font-bold">You are currently signed in</p>
          <p className="text-lg font-bold">with the following admin profile</p>
          <p className="py-4 text-4xl italic font-thin">{adminProfile?.name}</p>
        </div>
      </div>
    </>
  );
}
