import { useContext } from "react";
import { ApplicantContext } from "./ApplicantProvider";

export const useApplicantContext = () => {
  const context = useContext(ApplicantContext);
  if (context === undefined)
    throw new Error("useApplicantContext must be used within its provider");
  return context;
};
