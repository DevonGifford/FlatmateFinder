import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";

export default function TenantTinderPage() {
  useRequireAdmin();
  const { adminProfile } = useAdminContext();
  return (
    <>
      <div className="flex flex-col justify-center items-center sm:mx-20 md:max-w-10/12 sm:max-w-4/6 gap-5 md:gap-8">
        <div className="text-4xl italic py-4 pb-6 border-b-2">TINDER PAGE</div>
        <p>admin profile:</p>
        <p>name: {adminProfile?.name}</p>
        <p>uuid: {adminProfile?.uuid}</p>
      </div>
    </>
  );
}
