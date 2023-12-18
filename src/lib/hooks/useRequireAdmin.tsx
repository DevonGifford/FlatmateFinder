import { useAdminContext } from "@/components/contexts/admin/useAdminContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireAdmin = () => {
  const { isAdmin } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      console.log("🦺 useRequireAdmin Triggered 💢");
      const admin = await isAdmin();
      if (!admin) {
        console.log("🦺 user is not Admin - sending back to homepage");
        navigate("/"); // Redirect to home if not admin
      }
    };

    checkAdmin();
  }, [isAdmin, navigate]);

  return null; // This hook doesn't render anything, it just handles redirects
};
