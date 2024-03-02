import React, { createContext, useEffect, useReducer } from "react";
import { fetchApplicantPool } from "@/lib/firebase/firestore";
import GlobalReducer from "./GlobalReducer";
import {
  ActionType,
  GlobalStateInterface,
} from "@/lib/interfaces/globalStateInterfaces";

// Define separate contexts for state and dispatch
export const GlobalStateContext = createContext<GlobalStateInterface | undefined>(undefined);
export const GlobalDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);

interface Props { 
  children: React.ReactNode; 
  initialState: GlobalStateInterface
}

export const GlobalProvider: React.FC<Props> = ({ children, initialState }) => {
  const [globalState, dispatch] = useReducer(GlobalReducer, initialState);

  useEffect(() => {
    fetchApplicantPool(dispatch);
  }, []);

  return (
    <GlobalStateContext.Provider value={globalState}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};
