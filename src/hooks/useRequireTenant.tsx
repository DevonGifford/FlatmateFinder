import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTenantSession } from "@/types/globalStateInterfaces";

export const useRequireTenant = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { session } = useGlobalState();

  useEffect(() => {
    if (!isTenantSession(session)) {
      if (session.role !== "none") {
        dispatch({ type: "RESET_AUTH" });
      }
      navigate("/");
    }
  }, [dispatch, navigate, session]);
};
