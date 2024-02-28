import {
  ActionType,
  GlobalStateInterface,
  initialState,
} from "@/lib/types/global-types";

const globalReducer = (
  state: GlobalStateInterface,
  action: ActionType
): GlobalStateInterface => {
  switch (action.type) {
    //- auth actions
    case "SET_APPLICANT":
      return {
        ...state,
        isAuthenticatedApplicant: true,
      };
    case "SET_TENANT":
      return {
        ...state,
        isAuthenticatedTenant: true,
      };
    case "SET_TENANT_PROFILE":
      return {
        ...state,
        loggedTenant: action.payload,
      };
    case "RESET_AUTH":
      return {
        ...state,
        isAuthenticatedApplicant: false,
        isAuthenticatedTenant: false,
        loggedTenant: "",
      };
    //- locale actions
    case "SET_LOCALE":
      return {
        ...state,
        locale: action.payload,
      };
    //- applicant pool actions
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: "",
        applicantPool: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "UPDATE_APPLICANT_POOL":
      if (!state.applicantPool) {
        return state;
      }
      return {
        ...state,
        applicantPool: state.applicantPool.map((applicantDoc) => {
          const updatedApplicantDoc = action.payload.find(
            (updatedDoc) => updatedDoc?.id === applicantDoc.id
          );
          return updatedApplicantDoc
            ? { ...applicantDoc, ...updatedApplicantDoc }
            : applicantDoc;
        }),
      };
    //- ALL
    case "PURGE_STATE":
      return initialState;
    default:
      return state;
  }
};

export default globalReducer;
