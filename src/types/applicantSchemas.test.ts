import { Timestamp } from "firebase/firestore";
import { describe, expect, it } from "vitest";

import { parseApplicantProfile } from "./applicantSchemas";

const validApplicant = {
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

describe("parseApplicantProfile", () => {
  it("parses a valid Firestore applicant document", () => {
    expect(parseApplicantProfile("doc-1", validApplicant)).toMatchObject({
      id: "doc-1",
      uuid: "applicant-1",
    });
  });

  it("rejects malformed documents at the read boundary", () => {
    expect(
      parseApplicantProfile("doc-1", {
        ...validApplicant,
        secondForm: { ...validApplicant.secondForm, length_stay: "long" },
      }),
    ).toBeNull();
  });

  it("rejects ratings outside the supported range", () => {
    expect(
      parseApplicantProfile("doc-1", {
        ...validApplicant,
        rankings: { dev_star: 6 },
      }),
    ).toBeNull();
  });

  it("rejects stay lengths outside the stored slider range", () => {
    expect(
      parseApplicantProfile("doc-1", {
        ...validApplicant,
        secondForm: { ...validApplicant.secondForm, length_stay: 101 },
      }),
    ).toBeNull();
  });
});
