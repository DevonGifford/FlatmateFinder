import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GlobalProvider } from "@/contexts/GlobalProvider";
import { GlobalStateInterface } from "@/types/globalStateInterfaces";

import App from "@/App";
import TenantLeaderboardPage from "@/pages/TenantLeaderboard.page";

export function customRenderApp(
  partialState: Partial<GlobalStateInterface>
) {
  const defaultState: GlobalStateInterface = {
    isAuthenticatedApplicant: false,
    isAuthenticatedTenant: false,
    accessMode: "none",
    loggedTenant: "",
    locale: "EN",
    isLoading: false,
    error: "",
    applicantPool: [],
  };

  const mergedState = { ...defaultState, ...partialState };

  return render(
    <GlobalProvider initialState={mergedState}>
      <App />
    </GlobalProvider>
  );
}

export function customRenderLeaderBoard(
  partialState: Partial<GlobalStateInterface>
) {
  const defaultState: GlobalStateInterface = {
    isAuthenticatedApplicant: false,
    isAuthenticatedTenant: true,
    accessMode: "tenant",
    loggedTenant: "Devon",
    locale: "EN",
    isLoading: false,
    error: "",
    applicantPool: [],
  };

  const mergedState = { ...defaultState, ...partialState };

  return render(
    <MemoryRouter>
      <GlobalProvider initialState={mergedState}>
        <TenantLeaderboardPage />
      </GlobalProvider>
    </MemoryRouter>
  );
}
