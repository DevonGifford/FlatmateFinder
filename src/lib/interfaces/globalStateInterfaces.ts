import { ApplicantProfile } from "./applicantInterfaces";

export interface GlobalStateInterface {
  isAuthenticatedApplicant: boolean;
  isAuthenticatedTenant: boolean;
  loggedTenant: string;
  locale: "EN" | "ES";
  applicantPool: ApplicantProfile[] | null;
  isLoading: boolean;
  error: string;
}

export type DispatchAction = (action: ActionType) => void;

export type ActionType =
  | { type: "SET_TENANT" }
  | { type: "SET_APPLICANT" }
  | { type: "SET_TENANT_PROFILE"; payload: string }
  | { type: "RESET_AUTH" }
  | { type: "SET_LOCALE"; payload: "EN" | "ES" }
  | { type: "FETCH_INIT" }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "FETCH_SUCCESS"; payload: ApplicantProfile[] }
  | { type: "UPDATE_APPLICANT_POOL"; payload: Partial<ApplicantProfile[]> }
  | { type: "PURGE_STATE" };

export const initialState: GlobalStateInterface = {
  isAuthenticatedApplicant: false,
  isAuthenticatedTenant: false,
  loggedTenant: "",
  locale: "EN",
  applicantPool: null,
  isLoading: false,
  error: "",
};
