import React, { createContext, useEffect, useReducer } from "react";

import {
  getTenantById,
  getTenantByName,
  type TenantId,
} from "@/lib/constants/tenants";
import {
  type ActionType,
  type AppSession,
  type GlobalStateInterface,
} from "@/types/globalStateInterfaces";

import GlobalReducer from "./GlobalReducer";

const AUTH_STORAGE_KEY = "flatmate-finder-auth";

const sessionModes = ["real", "demo"] as const;

type LegacyPersistedAuth = {
  isAuthenticatedApplicant: boolean;
  isAuthenticatedTenant: boolean;
  accessMode?: string;
  loggedTenant: string;
};

function isTenantId(value: unknown): value is TenantId {
  return (
    typeof value === "string" && getTenantById(value as TenantId) !== undefined
  );
}

function isAppSession(value: unknown): value is AppSession {
  if (typeof value !== "object" || value === null) return false;

  const session = value as Record<string, unknown>;
  if (session.role === "none") return session.mode === "none";
  if (!sessionModes.includes(session.mode as (typeof sessionModes)[number])) {
    return false;
  }
  if (session.role === "applicant") return true;
  return session.role === "tenant" && isTenantId(session.tenantId);
}

function migrateLegacyAuth(auth: LegacyPersistedAuth): AppSession | null {
  const normalizedMode =
    auth.accessMode === "guest-applicant"
      ? "demo-applicant"
      : auth.accessMode === "guest-tenant"
        ? "demo-tenant"
        : auth.accessMode;

  if (normalizedMode === "applicant") {
    return { role: "applicant", mode: "real" };
  }
  if (normalizedMode === "demo-applicant") {
    return { role: "applicant", mode: "demo" };
  }

  if (normalizedMode === "tenant" || normalizedMode === "demo-tenant") {
    const tenant = getTenantByName(auth.loggedTenant);
    if (!tenant) return null;

    return {
      role: "tenant",
      mode: normalizedMode === "demo-tenant" ? "demo" : "real",
      tenantId: tenant.id,
    };
  }

  if (auth.accessMode !== undefined) return null;
  if (auth.isAuthenticatedApplicant === auth.isAuthenticatedTenant) {
    return null;
  }
  if (auth.isAuthenticatedApplicant) {
    return { role: "applicant", mode: "real" };
  }

  const tenant = getTenantByName(auth.loggedTenant);
  return tenant ? { role: "tenant", mode: "real", tenantId: tenant.id } : null;
}

function readPersistedSession(): AppSession | null {
  try {
    const storedAuth = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedAuth) return null;

    const parsedAuth: unknown = JSON.parse(storedAuth);
    if (typeof parsedAuth !== "object" || parsedAuth === null) {
      return null;
    }

    if (isAppSession(parsedAuth)) return parsedAuth;

    const authRecord = parsedAuth as Record<string, unknown>;
    if (
      typeof authRecord.isAuthenticatedApplicant !== "boolean" ||
      typeof authRecord.isAuthenticatedTenant !== "boolean" ||
      typeof authRecord.loggedTenant !== "string"
    ) {
      return null;
    }

    return migrateLegacyAuth({
      isAuthenticatedApplicant: authRecord.isAuthenticatedApplicant,
      isAuthenticatedTenant: authRecord.isAuthenticatedTenant,
      accessMode:
        typeof authRecord.accessMode === "string"
          ? authRecord.accessMode
          : undefined,
      loggedTenant: authRecord.loggedTenant,
    });
  } catch {
    return null;
  }
}

// Define separate contexts for state and dispatch
export const GlobalStateContext = createContext<
  GlobalStateInterface | undefined
>(undefined);
export const GlobalDispatchContext = createContext<
  React.Dispatch<ActionType> | undefined
>(undefined);

interface Props {
  children: React.ReactNode;
  initialState: GlobalStateInterface;
}

export const GlobalProvider: React.FC<Props> = ({ children, initialState }) => {
  const persistedSession = readPersistedSession();
  const [globalState, dispatch] = useReducer(GlobalReducer, {
    ...initialState,
    ...(persistedSession ? { session: persistedSession } : {}),
  });

  useEffect(() => {
    try {
      if (globalState.session.role !== "none") {
        window.sessionStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify(globalState.session),
        );
      } else {
        window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // Session persistence is a convenience and must not block the app.
    }
  }, [globalState.session]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};
