import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import { useGlobalState } from "@/hooks/useGlobalState";
import { ROUTES } from "@/lib/routes";
import { isApplicantSession } from "@/types/globalState";

/**
 * Protects applicant-only pages.
 *
 * Redirects incompatible sessions to the home page and clears an existing
 * incompatible session before redirecting.
 */
export function useRequireApplicant() {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();
  const { session } = useGlobalState();

  useEffect(() => {
    if (isApplicantSession(session)) return;

    if (session.role !== "none") {
      dispatch({ type: "RESET_AUTH" });
    }
    navigate(ROUTES.home);
  }, [dispatch, navigate, session]);
}
