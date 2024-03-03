import { useContext } from "react";
import { GlobalDispatchContext } from "../../contexts/GlobalProvider";

export const useGlobalDispatch = () => {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error("useGlobalDispatch must be used within a GlobalProvider");
  }
  return context;
};
