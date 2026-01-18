import { useEffect } from "react";

import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import type { ApplicantProfile } from "@/types/applicant";
import type { AppSession } from "@/types/globalState";
import { isTenantSession } from "@/types/globalState";

interface UseTenantApplicantsOptions {
  session: AppSession;
  applicantPool: ApplicantProfile[] | null;
  isTenantRoute: boolean;
}

/**
 * Loads applicant data for tenant routes. Demo sessions use local fixtures,
 * while real sessions load from Firebase.
 *
 * @param options - Current session and tenant route state.
 *
 * @example
 * useTenantApplicants({ session, applicantPool, isTenantRoute });
 */
export function useTenantApplicants({
  session,
  applicantPool,
  isTenantRoute,
}: UseTenantApplicantsOptions) {
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    if (!isTenantSession(session) || !isTenantRoute || applicantPool !== null) {
      return;
    }

    let cancelled = false;
    dispatch({ type: "FETCH_INIT" });

    const applicantsPromise =
      session.mode === "demo"
        ? import("@/data/demoApplicants").then(
            ({ demoApplicants }) => demoApplicants,
          )
        : import("@/lib/firebase/firestore").then(
            ({ fetchApplicantPool, waitForFirebaseAuth }) =>
              waitForFirebaseAuth().then(() => fetchApplicantPool()),
          );

    void applicantsPromise
      .then((fetchedApplicants) => {
        if (!cancelled) {
          dispatch({ type: "FETCH_SUCCESS", payload: fetchedApplicants });
        }
      })
      .catch(() => {
        if (!cancelled) {
          dispatch({
            type: "FETCH_FAILURE",
            payload: "Something went wrong",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [applicantPool, dispatch, isTenantRoute, session]);
}
