import { useContext } from "react";
import { AdminContext } from "./AdminProvider";

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined)
    throw new Error("useDataContext must be used within its provider");
  return context;
};
