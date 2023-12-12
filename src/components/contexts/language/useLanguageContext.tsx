import { useContext } from "react";

import { LanguageContext } from "./LanguageProvider"

// Create a custom hook to access the context
export const useLanguageContext = () => useContext(LanguageContext);