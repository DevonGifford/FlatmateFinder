import { RawApplicantProfile } from "./rawapplicant-type";

export interface GlobalStateInterface {
  isAuthenticatedApplicant: boolean;
  isAuthenticatedTenant: boolean;
  loggedTenant: string;
  locale: "EN" | "ES";
  applicantPool: RawApplicantProfile[] | null;
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
  | { type: "FETCH_SUCCESS"; payload: RawApplicantProfile[] }
  | { type: "UPDATE_APPLICANT_POOL"; payload: Partial<RawApplicantProfile[]> }
  | { type: "PURGE_STATE" };

// default or initial state of global values
export const initialState: GlobalStateInterface = {
  isAuthenticatedApplicant: false,
  isAuthenticatedTenant: false,
  loggedTenant: "",
  locale: "EN",
  applicantPool: null,
  isLoading: false,
  error: "",
};
