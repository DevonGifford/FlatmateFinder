import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import { isApplicantSession } from "@/types/globalState";

export const useRequireApplicant = () => {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { session } = useGlobalState();

  useEffect(() => {
    if (!isApplicantSession(session)) {
      if (session.role !== "none") {
        dispatch({ type: "RESET_AUTH" });
      }
      navigate("/");
    }
  }, [dispatch, navigate, session]);
};
