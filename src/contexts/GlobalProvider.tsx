import React, { createContext, useEffect, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import {
  ActionType,
  GlobalStateInterface,
} from "@/types/globalStateInterfaces";

const AUTH_STORAGE_KEY = "flatmate-finder-auth";

const legacyDemoAccessModes = {
  "guest-applicant": "demo-applicant",
  "guest-tenant": "demo-tenant",
} as const;

type PersistedAuth = Pick<
  GlobalStateInterface,
  "isAuthenticatedApplicant" | "isAuthenticatedTenant" | "accessMode" | "loggedTenant"
>;

function readPersistedAuth(): PersistedAuth | null {
  try {
    const storedAuth = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return null;

    const parsedAuth: unknown = JSON.parse(storedAuth);
    if (typeof parsedAuth !== "object" || parsedAuth === null) {
      return null;
    }

    const authRecord = parsedAuth as Record<string, unknown>;
    if (
      typeof authRecord.isAuthenticatedApplicant !== "boolean" ||
      typeof authRecord.isAuthenticatedTenant !== "boolean" ||
      typeof authRecord.loggedTenant !== "string"
    ) {
      return null;
    }

    const persistedMode = authRecord.accessMode;
    const normalizedMode =
      typeof persistedMode === "string"
        ? legacyDemoAccessModes[persistedMode as keyof typeof legacyDemoAccessModes] ??
          persistedMode
        : undefined;
    const accessMode =
      typeof normalizedMode === "string" &&
      [
        "none",
        "applicant",
        "tenant",
        "demo-applicant",
        "demo-tenant",
      ].includes(normalizedMode)
        ? (normalizedMode as PersistedAuth["accessMode"])
        : persistedMode === undefined
          ? authRecord.isAuthenticatedTenant
            ? "tenant"
            : authRecord.isAuthenticatedApplicant
              ? "applicant"
              : "none"
          : "none";

    return {
      isAuthenticatedApplicant: authRecord.isAuthenticatedApplicant,
      isAuthenticatedTenant: authRecord.isAuthenticatedTenant,
      accessMode,
      loggedTenant: authRecord.loggedTenant,
    };
  } catch {
    return null;
  }
}

// Define separate contexts for state and dispatch
export const GlobalStateContext = createContext<GlobalStateInterface | undefined>(undefined);
export const GlobalDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);

interface Props { 
  children: React.ReactNode; 
  initialState: GlobalStateInterface
}

export const GlobalProvider: React.FC<Props> = ({ children, initialState }) => {
  const persistedAuth = readPersistedAuth();
  const [globalState, dispatch] = useReducer(GlobalReducer, {
    ...initialState,
    ...(persistedAuth ?? {}),
  });

  useEffect(() => {
    const auth: PersistedAuth = {
      isAuthenticatedApplicant: globalState.isAuthenticatedApplicant,
      isAuthenticatedTenant: globalState.isAuthenticatedTenant,
      accessMode: globalState.accessMode,
      loggedTenant: globalState.loggedTenant,
    };

    try {
      if (auth.isAuthenticatedApplicant || auth.isAuthenticatedTenant) {
        window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
      } else {
        window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // Session persistence is a convenience and must not block the app.
    }
  }, [
    globalState.isAuthenticatedApplicant,
    globalState.isAuthenticatedTenant,
    globalState.accessMode,
    globalState.loggedTenant,
  ]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};
