import { useAdminContext } from "@/contexts/admin/useAdminContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireAdmin = () => {
  const navigate = useNavigate();
  const { adminProfile } = useAdminContext();
  const signInStatus = adminProfile?.isAdmin;

  useEffect(() => {
    const checkAdmin = async () => {
      if (!signInStatus) {
        navigate("/"); // Redirect to home if not admin
      }
    };

    checkAdmin();
  }, [signInStatus, navigate]);

  return null;
};
