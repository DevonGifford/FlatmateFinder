import { useGlobalDispatch } from "@/lib/hooks/useGlobalDispatch";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireTenant = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { isAuthenticatedTenant } = useGlobalState();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isAuthenticatedTenant) {
        dispatch({ type: "RESET_AUTH" });
        navigate("/");
      }
    };

    checkAdmin();
  }, [dispatch, isAuthenticatedTenant, navigate]);

  return null;
};
