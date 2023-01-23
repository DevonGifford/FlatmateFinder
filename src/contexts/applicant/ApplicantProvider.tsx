import React, { createContext, useEffect, useState } from "react";
import { ApplicantProfile, defaultApplicant } from "@/lib/types/applicant-type";
import { toastError } from "@/lib/customToast";

export type ApplicantContextType = {
  applicantProfile: ApplicantProfile | null;
  setApplicantProfile: React.Dispatch<
    React.SetStateAction<ApplicantProfile | null>
  >;
  updateApplicantContext: (applicantProfile: Partial<ApplicantProfile>) => void;
};

export const ApplicantContext = createContext<ApplicantContextType>({
  applicantProfile: null,
  setApplicantProfile: () => {},
  updateApplicantContext: () => {},
});

export const ApplicantProvider = ({children}: { children: React.ReactNode }) => {
  const [applicantProfile, setApplicantProfile] = useState<ApplicantProfile | null>(null);

  useEffect(() => {
    if (applicantProfile === null) {
      setApplicantProfile(defaultApplicant);
    }
  }, [applicantProfile]);

  const updateApplicantContext = (newData: Partial<ApplicantProfile>) => {
    if (!applicantProfile) {
      return;
    }

    try {
      const updatedProfile = { ...applicantProfile, ...newData };
      setApplicantProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating applicantProfile", error);
      toastError()
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
