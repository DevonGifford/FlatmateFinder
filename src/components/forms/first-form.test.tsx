import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { GlobalProvider } from "@/contexts/GlobalProvider";
import { defaultApplication } from "@/types/applicationInterfaces";
import { initialState } from "@/types/globalStateInterfaces";

import { FirstForm } from "./first-form";

describe("FirstForm", () => {
  it("blocks progression when required fields are blank", async () => {
    const user = userEvent.setup();
    const setApplication = vi.fn();

    render(
      <MemoryRouter initialEntries={["/form"]}>
        <GlobalProvider initialState={initialState}>
          <FirstForm
            application={defaultApplication}
            setApplication={setApplication}
          />
        </GlobalProvider>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getAllByText("Please complete this field.")).toHaveLength(4);
    expect(setApplication).not.toHaveBeenCalled();
  });
});
