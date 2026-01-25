import { useEffect, useRef } from "react";

import { useGlobalDispatch } from "@/hooks/useGlobalDispatch";
import type { AppSession } from "@/types/globalState";
import { isDemoSession } from "@/types/globalState";

interface UseDemoSessionLifecycleOptions {
  session: AppSession;
  isDemoArea: boolean;
  isPublicRoute: boolean;
}

/**
 * Clears stale demo sessions when returning to a public route.
 *
 * @param options - Current session and route-area state.
 *
 * @example
 * useDemoSessionLifecycle({ session, isDemoArea, isPublicRoute });
 */
export function useDemoSessionLifecycle({
  session,
  isDemoArea,
  isPublicRoute,
}: UseDemoSessionLifecycleOptions) {
  const dispatch = useGlobalDispatch();
  const hasDemoSession = isDemoSession(session);
  const demoSessionOnMount = useRef(hasDemoSession);
  const wasInDemoArea = useRef(isDemoArea);

  useEffect(() => {
    if (hasDemoSession && isPublicRoute && (demoSessionOnMount.current || wasInDemoArea.current)) {
      dispatch({ type: "RESET_AUTH" });
    }

    wasInDemoArea.current = isDemoArea;
  }, [dispatch, hasDemoSession, isDemoArea, isPublicRoute]);
}
