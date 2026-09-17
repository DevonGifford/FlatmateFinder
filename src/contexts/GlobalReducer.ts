import {
  type ActionType,
  type GlobalState,
  initialState,
} from "@/types/globalState";

const globalReducer = (
  state: GlobalState,
  action: ActionType,
): GlobalState => {
  switch (action.type) {
    case "SET_APPLICANT":
      return {
        ...state,
        session: { role: "applicant", mode: "real" },
      };
    case "SET_TENANT":
      return {
        ...state,
        session: { role: "tenant", mode: "real", tenantId: action.payload },
      };
    case "SET_DEMO_APPLICANT":
      return {
        ...state,
        session: { role: "applicant", mode: "demo" },
      };
    case "SET_DEMO_TENANT":
      return {
        ...state,
        session: { role: "tenant", mode: "demo", tenantId: action.payload },
      };
    case "RESET_AUTH":
      return {
        ...state,
        session: { role: "none", mode: "none" },
        applicantPool: null,
        isLoading: false,
        error: "",
      };
    case "SET_LOCALE":
      return {
        ...state,
        locale: action.payload,
      };
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
            (updatedDoc) => updatedDoc?.id === applicantDoc.id,
          );
          return updatedApplicantDoc
            ? { ...applicantDoc, ...updatedApplicantDoc }
            : applicantDoc;
        }),
      };
    case "PURGE_STATE":
      return initialState;
    default:
      return state;
  }
};

export default globalReducer;
