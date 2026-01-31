import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "@/App";
import { GlobalProvider } from "@/contexts/GlobalProvider";
import TenantLeaderboardPage from "@/pages/TenantLeaderboard.page";
import type { GlobalStateInterface } from "@/types/globalState";

export function customRenderApp(partialState: Partial<GlobalStateInterface>) {
  const defaultState: GlobalStateInterface = {
    session: { role: "none", mode: "none" },
    locale: "EN",
    isLoading: false,
    error: "",
    applicantPool: [],
  };

  const mergedState = { ...defaultState, ...partialState };

  return render(
    <GlobalProvider initialState={mergedState}>
      <App />
    </GlobalProvider>,
  );
}

export function customRenderLeaderBoard(
  partialState: Partial<GlobalStateInterface>,
) {
  const defaultState: GlobalStateInterface = {
    session: { role: "tenant", mode: "real", tenantId: "dev" },
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
    </MemoryRouter>,
  );
}
