import { Timestamp } from "firebase/firestore";
import { describe, expect, it } from "vitest";

import type { GlobalStateInterface } from "@/types/globalState";

import GlobalReducer from "./GlobalReducer";

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
  session: { role: "tenant", mode: "real", tenantId: "dev" },
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

  it("resets authentication and clears tenant-only applicant data", () => {
    const updatedState = GlobalReducer(state, { type: "RESET_AUTH" });

    expect(updatedState).toMatchObject({
      session: { role: "none", mode: "none" },
      locale: "ES",
      applicantPool: null,
      isLoading: false,
      error: "",
    });
  });

  it("identifies demo sessions separately from real sessions", () => {
    const demoApplicant = GlobalReducer(state, {
      type: "SET_DEMO_APPLICANT",
    });
    const demoTenant = GlobalReducer(state, {
      type: "SET_DEMO_TENANT",
      payload: "dev",
    });

    expect(demoApplicant).toMatchObject({
      session: { role: "applicant", mode: "demo" },
    });
    expect(demoTenant).toMatchObject({
      session: { role: "tenant", mode: "demo", tenantId: "dev" },
    });
  });

  it("purges all state back to the initial state", () => {
    const updatedState = GlobalReducer(state, { type: "PURGE_STATE" });

    expect(updatedState).toEqual({
      session: { role: "none", mode: "none" },
      locale: "EN",
      applicantPool: null,
      isLoading: false,
      error: "",
    });
  });
});
