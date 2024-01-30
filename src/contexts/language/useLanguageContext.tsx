import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined)
    throw new Error("useLanguageContext must be used within its provider");
  return context;
};
