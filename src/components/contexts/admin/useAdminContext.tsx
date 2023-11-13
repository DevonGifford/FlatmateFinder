import { useContext } from "react";
import { AdminContext } from "./AdminProvider";

// Create a custom hook to access the context
export const useAdminContext = () => useContext(AdminContext);
