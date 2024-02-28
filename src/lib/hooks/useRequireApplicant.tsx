import { useGlobalDispatch } from "@/lib/hooks/useGlobalDispatch";
import { useGlobalState } from "@/lib/hooks/useGlobalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireApplicant = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { isAuthenticatedApplicant } = useGlobalState();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isAuthenticatedApplicant) {
        dispatch({ type: "RESET_AUTH" });
        navigate("/");
      }
    };

    checkAdmin();
  }, [dispatch, isAuthenticatedApplicant, navigate]);

  return null;
};
