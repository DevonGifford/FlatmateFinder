import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { GlobalProvider } from "@/contexts/GlobalProvider";
import { defaultApplication } from "@/types/applicationInterfaces";
import { initialState } from "@/types/globalStateInterfaces";

import { SecondForm } from "./second-form";

describe("SecondForm", () => {
  it("starts new applications at six months", async () => {
    const setApplication = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <GlobalProvider initialState={initialState}>
          <SecondForm
            application={defaultApplication}
            setApplication={setApplication}
          />
        </GlobalProvider>
      </MemoryRouter>,
    );

    const slider = container.querySelector('input[type="range"]');
    const track = container.querySelector('[data-slot="slider-track"]');
    await waitFor(() => {
      expect(slider?.getAttribute("aria-valuenow")).toBe("6");
      expect(track?.className).toContain("bg-muted-foreground/20");
    });
  });

  it("preserves an existing length-of-stay value", async () => {
    const setApplication = vi.fn();
    const persistedApplication = {
      ...defaultApplication,
      secondForm: {
        ...defaultApplication.secondForm,
        length_stay: 42,
      },
    };

    const { container } = render(
      <MemoryRouter>
        <GlobalProvider initialState={initialState}>
          <SecondForm
            application={persistedApplication}
            setApplication={setApplication}
          />
        </GlobalProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        container
          .querySelector('input[type="range"]')
          ?.getAttribute("aria-valuenow"),
      ).toBe("42");
    });
  });
});
