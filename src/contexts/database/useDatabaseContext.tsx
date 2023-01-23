import { useContext } from "react";
import { DatabaseContext } from "./DatabaseProvider";

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined)
    throw new Error("useDatabase must be used within its provider");
  return context;
};
