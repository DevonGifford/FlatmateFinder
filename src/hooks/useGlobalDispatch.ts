import { useContext } from "react";

import { GlobalDispatchContext } from "@/contexts/GlobalProvider";

/** Returns the dispatch function for updating global application state. */
export function useGlobalDispatch() {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error("useGlobalDispatch must be used within a GlobalProvider");
  }
  return context;
}
