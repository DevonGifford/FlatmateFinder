import { useContext } from "react";
import { GlobalStateContext } from "../../contexts/GlobalProvider";

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
