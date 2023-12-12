import { useContext } from "react";
import { ApplicantContext } from "./ApplicantProvider";

// Create a custom hook to access the context
export const useApplicantContext = () => useContext(ApplicantContext);