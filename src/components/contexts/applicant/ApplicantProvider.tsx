import React, { createContext, useEffect, useState } from "react";

import { ApplicantProfile } from "@/lib/types/applicant-type";

// Create the context
export type ApplicantContextType = {
  applicantProfile: ApplicantProfile | null;
  setApplicantProfile: React.Dispatch<
    React.SetStateAction<ApplicantProfile | null>
  >;
  updateApplicantContext: (
    applicantProfile: Partial<ApplicantProfile>
  ) => Promise<void>;
};

export const ApplicantContext = createContext<ApplicantContextType>({
  applicantProfile: null,
  setApplicantProfile: () => {},
  updateApplicantContext: async () => {},
});

// Create the context provider
export const ApplicantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [applicantProfile, setApplicantProfile] =
    useState<ApplicantProfile | null>(null);

  // Initialize the applicantProfile if it's null
  useEffect(() => {
    if (applicantProfile === null) {
      setApplicantProfile({
        uuid: "", // Set initial properties as needed
        firstForm: { name: "", age: "", sex: "", phone: "" },
        secondForm: { move_date: new Date(), length_stay: 0, meet_type: "" },
        thirdForm: { job_title: "", job_type: "", describe: "", hobbies: "" },
        applicationDate: new Date(),
      });
    }
  }, [applicantProfile]);

  // ✅ HANDLES UPDATING CONTEXT:
  const updateApplicantContext = async (newData: Partial<ApplicantProfile>) => {
    console.log("🎭 updateapplicantProfile: 💢 Triggered");
    try {
      if (!applicantProfile) {
        console.error(
          `🎭 updateapplicantProfile:  ❌ Error:  cannot access user context.`
        );
        return;
      }

      // console.log(
      //   "🦺🎭 updateapplicantProfile: ",
      //   "Pre-existing context data - applicantProfile: ",
      //   applicantProfile,
      //   "Newdata to updated context - newData: ",
      //   newData
      // );

      //👇 Merge the existing profile with the new data
      const updatedProfile = { ...applicantProfile, ...newData };
      // console.log(
      //   "🦺🎭 updateapplicantProfile:  Updated profile after merge",
      //   updatedProfile
      // );

      //👇 Update the applicantProfile state with the merged profile
      setApplicantProfile(updatedProfile);
      console.log(
        "🎭 updateapplicantProfile:  ✔  Success:  Successfully updated applicantProfile"
      );
      // console.log(
      //   "🎭 updateapplicantProfile:  ✔  Success:  Successfully updated applicantProfile - new data:",
      //   updatedProfile
      // );
    } catch (error) {
      console.error(
        "🎭 updateapplicantProfile:  ❌ Error:  Error updating applicantProfile",
        error
      );
    }
  };

  return (
    <ApplicantContext.Provider
      value={{ applicantProfile, setApplicantProfile, updateApplicantContext }}
    >
      {children}
    </ApplicantContext.Provider>
  );
};
