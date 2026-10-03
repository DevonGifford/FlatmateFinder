import { useContext } from "react";

import { GlobalStateContext } from "@/contexts/GlobalProvider";

/** Returns the current global application state. */
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
}
