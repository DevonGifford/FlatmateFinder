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
        thirdForm: { job_title: "", describe: "", hobbies: "", photo: "" },
        applicationDate: new Date(),
      });
    }
  }, [applicantProfile]);

  // ✅ HANDLES UPDATING CONTEXT:
  const updateApplicantContext = async (newData: Partial<ApplicantProfile>) => {
    console.log(
      "🎯event_log:  🎭ApplicantContext/updateapplicantProfile: 💢 Triggered"
    );
    try {
      if (!applicantProfile) {
        console.error(
          `🎯event_log:  🎭ApplicantContext/updateapplicantProfile:  ❌ Error:  cannot access user context.`
        );
        return;
      }

      console.log(
        "🦺event_log:  🎭ApplicantContext/updateapplicantProfile:  Current applicantProfile",
        applicantProfile
      );
      console.log(
        "🦺event_log:  🎭ApplicantContext/updateapplicantProfile:  New data to be updated",
        newData
      );

      //👇 Merge the existing profile with the new data
      const updatedProfile = { ...applicantProfile, ...newData };
      console.log(
        "🦺event_log:  🎭ApplicantContext/updateapplicantProfile:  Updated profile after merge",
        updatedProfile
      );

      //👇 Update the applicantProfile state with the merged profile
      setApplicantProfile(updatedProfile);
      console.log(
        "🎯event_log:  🎭ApplicantContext/updateapplicantProfile:  ✔  Success:  Successfully updated applicantProfile - new data:",
        updatedProfile
      );
    } catch (error) {
      console.error(
        "🎯event_log:  🎭ApplicantContext/updateapplicantProfile:  ❌ Error:  Error updating applicantProfile",
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
