import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isApplicantSession } from "@/types/globalStateInterfaces";

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
