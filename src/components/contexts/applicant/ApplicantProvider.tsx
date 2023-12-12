import React, { createContext, useState } from 'react';

import { ApplicantProfile } from '@/lib/types/applicant-type';


// Create the context
export type ApplicantContextType = {
  applicant: ApplicantProfile | null;
  setApplicant: React.Dispatch<React.SetStateAction<ApplicantProfile | null>>;
};

export const ApplicantContext = createContext<ApplicantContextType>({
  applicant: null,
  setApplicant: () => {},
});


// Create the context provider
export const ApplicantProvider = ({ children }: {children: React.ReactNode}) => {
  const [applicant, setApplicant] = useState<ApplicantProfile | null>(null);

  return (
    <ApplicantContext.Provider value={{ applicant, setApplicant }}>
      {children}
    </ApplicantContext.Provider>
  );
};
