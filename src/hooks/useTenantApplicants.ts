import { useEffect } from "react";

import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import type { ApplicantProfile } from "@/types/applicant";
import type { AppSession } from "@/types/globalState";
import { isTenantSession } from "@/types/globalState";

interface Options {
  session: AppSession;
  applicantPool: ApplicantProfile[] | null;
  isTenantRoute: boolean;
}

export function useTenantApplicants({
  session,
  applicantPool,
  isTenantRoute,
}: Options) {
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
