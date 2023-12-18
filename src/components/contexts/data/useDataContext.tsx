import { useContext } from "react";
import { DataContext } from "./DataProvider";

// Create a custom hook to access the context
export const useDataContext = () => useContext(DataContext);
