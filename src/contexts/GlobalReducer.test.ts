import { Timestamp } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import GlobalReducer from "./GlobalReducer";
import { GlobalStateInterface } from "@/types/globalStateInterfaces";

const applicant = {
  id: "applicant-1",
  uuid: "applicant-1",
  firstForm: {
    name: "Alex",
    age: "25",
    sex: "other",
    phone: "555-0100",
  },
  secondForm: {
    move_date: Timestamp.fromDate(new Date("2026-01-01")),
    length_stay: 90,
    meet_type: "video",
  },
  thirdForm: {
    job_title: "Designer",
    job_type: "office",
    describe: "Friendly",
    hobbies: "Cycling",
  },
  applicationDate: Timestamp.fromDate(new Date("2025-12-01")),
};

const state: GlobalStateInterface = {
  isAuthenticatedApplicant: true,
  isAuthenticatedTenant: true,
  loggedTenant: "Devon",
  locale: "ES",
  applicantPool: [applicant],
  isLoading: false,
  error: "",
};

describe("GlobalReducer", () => {
  it("merges an applicant update by document id", () => {
    const updatedState = GlobalReducer(state, {
      type: "UPDATE_APPLICANT_POOL",
      payload: [{ id: "applicant-1", rankings: { dev_star: 5 } }],
    });

    expect(updatedState.applicantPool?.[0]).toMatchObject({
      id: "applicant-1",
      uuid: "applicant-1",
      rankings: { dev_star: 5 },
    });
  });

  it("resets authentication without clearing unrelated state", () => {
    const updatedState = GlobalReducer(state, { type: "RESET_AUTH" });

    expect(updatedState).toMatchObject({
      isAuthenticatedApplicant: false,
      isAuthenticatedTenant: false,
      loggedTenant: "",
      locale: "ES",
      applicantPool: [applicant],
    });
  });

  it("purges all state back to the initial state", () => {
    const updatedState = GlobalReducer(state, { type: "PURGE_STATE" });

    expect(updatedState).toEqual({
      isAuthenticatedApplicant: false,
      isAuthenticatedTenant: false,
      loggedTenant: "",
      locale: "EN",
      applicantPool: null,
      isLoading: false,
      error: "",
    });
  });
});
