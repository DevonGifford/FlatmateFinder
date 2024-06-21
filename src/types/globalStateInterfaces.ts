import type { ApplicantProfile } from "./applicantInterfaces";
import type { TenantId } from "@/lib/constants/tenants";

export interface GlobalStateInterface {
  session: AppSession;
  locale: "EN" | "ES";
  applicantPool: ApplicantProfile[] | null;
  isLoading: boolean;
  error: string;
}

export type AppSession =
  | { role: "none"; mode: "none" }
  | { role: "applicant"; mode: "real" | "demo" }
  | { role: "tenant"; mode: "real" | "demo"; tenantId: TenantId };

export const isApplicantSession = (
  session: AppSession
): session is Extract<AppSession, { role: "applicant" }> =>
  session.role === "applicant";

export const isTenantSession = (
  session: AppSession
): session is Extract<AppSession, { role: "tenant" }> =>
  session.role === "tenant";

export const isDemoSession = (session: AppSession) => session.mode === "demo";

export type DispatchAction = (action: ActionType) => void;

export type ActionType =
  | { type: "SET_APPLICANT" }
  | { type: "SET_TENANT"; payload: TenantId }
  | { type: "SET_DEMO_TENANT"; payload: TenantId }
  | { type: "SET_DEMO_APPLICANT" }
  | { type: "RESET_AUTH" }
  | { type: "SET_LOCALE"; payload: "EN" | "ES" }
  | { type: "FETCH_INIT" }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "FETCH_SUCCESS"; payload: ApplicantProfile[] }
  | { type: "UPDATE_APPLICANT_POOL"; payload: Partial<ApplicantProfile>[] }
  | { type: "PURGE_STATE" };

export const initialState: GlobalStateInterface = {
  session: { role: "none", mode: "none" },
  locale: "EN",
  applicantPool: null,
  isLoading: false,
  error: "",
};
