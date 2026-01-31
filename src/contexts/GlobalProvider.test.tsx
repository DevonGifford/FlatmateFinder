import { Timestamp } from "@firebase/firestore";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import App from "@/App";
import Navbar from "@/components/layout/Navbar";
import { GlobalProvider } from "@/contexts/GlobalProvider";
import { fetchApplicantPool } from "@/lib/firebase/firestore";
import FAQPage from "@/pages/FAQ.page";
import TenantLeaderboardPage from "@/pages/TenantLeaderboard.page";
import TenantTinderPage from "@/pages/TenantTinder.page";
import { customRenderApp, customRenderLeaderBoard } from "@/testUtils";
import { ApplicantProfile } from "@/types/applicantInterfaces";
import {
  GlobalStateInterface,
  initialState,
} from "@/types/globalStateInterfaces";

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

// DONE
describe("Testing the testing environment", () => {
  test("simple render test: successfully renders application", () => {
    //- Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );
    //- Assert
    const mainHeading = screen.getByText("Flatmate Finder");
    expect(mainHeading).toBeDefined();
    const subHeading = screen.getByText("Welcome to");
    expect(subHeading).toBeDefined();
  });

  test("simple render test: successfully render individual pages", async () => {
    //- Assemble
    render(
      <MemoryRouter>
        <GlobalProvider initialState={initialState}>
          <Navbar />
          <FAQPage />
        </GlobalProvider>
      </MemoryRouter>,
    );

    //- Assert
    expect(screen.getByText("Frequently Asked Questions")).toBeDefined();
  });

  test("simple demo test: form submission with incorrect password, shows toast error message", async () => {
    //- Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );

    //- Act
    const input = screen.getByLabelText("Enter password");
    const continueButton = screen.getByRole("button", { name: "Continue" });
    await userEvent.type(input, "WrongPassword");
    await userEvent.click(continueButton);

    //- Assert
    await waitFor(() => {
      const errorToast = screen.getByText(
        "That's not correct - Eso no está bien",
      );
      expect(errorToast).toBeDefined();
    });
  });

  test("does not fetch applicant data on public routes", async () => {
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );

    await waitFor(() => {
      expect(vi.mocked(fetchApplicantPool)).not.toHaveBeenCalled();
    });
  });

  test("fetches applicant data when a tenant enters a tenant route", async () => {
    window.history.pushState({}, "", "/admin-welcome");

    render(
      <GlobalProvider
        initialState={{
          ...initialState,
          session: { role: "tenant", mode: "real", tenantId: "dev" },
        }}
      >
        <App />
      </GlobalProvider>,
    );

    await waitFor(() => {
      expect(vi.mocked(fetchApplicantPool)).toHaveBeenCalledOnce();
    });
  });
});
// DONE
describe("Testing Global `locale`, switching between the two locales", () => {
  test("SET_LOCALE - should render with EN and switch to ES", async () => {
    // Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );
    // Assert initially loads with en locale set
    const subHeadingEN = screen.getByText("Welcome to");
    expect(subHeadingEN).toBeDefined();

    // Act
    const localeSpanishButton = screen.getByRole("radio", { name: "Spanish" });
    await userEvent.click(localeSpanishButton);

    // Assert locale has updated
    const welcomeHeading = screen.getByText(/^Bienvenido a/i);
    const passwordHeading = screen.getByText(/^Ingresar contraseña/i);
    const passwordText = screen.getByText(
      /^Usa la contraseña compartida contigo/i,
    );
    const continueButton = screen.getByText(/^Continuar/i);
    expect(welcomeHeading).toBeDefined();
    expect(passwordHeading).toBeDefined();
    expect(passwordText).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test("SET_LOCALE - should render with ES and switch to EN", async () => {
    // Assemble
    const partialState: Partial<GlobalStateInterface> = {
      locale: "ES",
    };
    customRenderApp(partialState);

    // Assert initial render with ES Locale set
    const mainHeading = screen.getByText("Flatmate Finder");
    const welcomeHeadingES = screen.getByText(/^Bienvenido a/i);
    const passwordHeadingES = screen.getByText(/^Ingresar contraseña/i);
    expect(mainHeading).toBeDefined();
    expect(welcomeHeadingES).toBeDefined();
    expect(passwordHeadingES).toBeDefined();

    // Act
    const localeEnglishButton = screen.getByRole("radio", { name: "Inglés" });

    await userEvent.click(localeEnglishButton);

    // Assert locale has been updated to EN
    const subHeadingEN = screen.getByText("Welcome to");
    expect(subHeadingEN).toBeDefined();
  });
});

describe("Testing demo access", () => {
  test("demo applicant can enter the applicant experience", async () => {
    customRenderApp({});

    await userEvent.click(screen.getByRole("button", { name: "Applicant" }));

    expect(screen.getByText("Demo mode — changes are not saved")).toBeDefined();
    expect(screen.getByLabelText("Name & Surname")).toBeDefined();
  });

  test("demo tenant can enter the tenant experience", async () => {
    customRenderApp({});

    await userEvent.click(screen.getByRole("button", { name: "Tenant" }));

    expect(screen.getByText("Demo mode — changes are not saved")).toBeDefined();
    expect(screen.getByText("Welcome, Demo-Tenant")).toBeDefined();
  });

  test("demo access copy follows the selected Spanish locale", async () => {
    customRenderApp({ locale: "ES" });

    await userEvent.click(screen.getByRole("button", { name: "Solicitante" }));

    expect(
      screen.getByText("Modo demo — los cambios no se guardan"),
    ).toBeDefined();
  });

  test("Spanish demo tenants see localized tenant navigation and pages", async () => {
    customRenderApp({ locale: "ES" });

    await userEvent.click(screen.getByRole("button", { name: "Inquilino" }));

    expect(screen.getByText("Bienvenido, Demo-Tenant")).toBeDefined();
    expect(screen.getByText(/Este es el panel de inquilinos/)).toBeDefined();

    await userEvent.click(
      screen.getByRole("button", { name: "Abrir menú de inquilino" }),
    );
    expect(screen.getByText("Panel principal")).toBeDefined();
    expect(screen.getByText("Clasificación")).toBeDefined();

    await userEvent.click(screen.getByText("Clasificación"));
    expect(screen.getByText("Clasificación actual")).toBeDefined();
  });

  test("clears a persisted demo session on a public page", async () => {
    window.history.pushState({}, "", "/FAQ");
    customRenderApp({
      session: { role: "tenant", mode: "demo", tenantId: "dev" },
    });

    expect(screen.queryByText("Demo mode — changes are not saved")).toBeNull();
    await waitFor(() => {
      expect(sessionStorage.getItem("flatmate-finder-auth")).toBeNull();
    });
  });
});

// DONE
describe("Testing session state and password submission", () => {
  test("SET_TENANT + PROFILE - correct password should result in success toast notif", async () => {
    //- Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );
    const input = screen.getByLabelText("Enter password");
    const continueButton = screen.getByRole("button", { name: "Continue" });

    //- Act
    await userEvent.type(input, "test-tenant-password");
    await userEvent.click(continueButton);

    //- Assert that the toast notification appears
    await waitFor(() => {
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeDefined();
    });
  });

  test("SET_APPLICANT - correct password should result in success toast notif", async () => {
    //- Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );
    const input = screen.getByLabelText("Enter password");
    const continueButton = screen.getByRole("button", { name: "Continue" });

    //- Act
    await userEvent.type(input, "test-applicant-password-three");
    await userEvent.click(continueButton);

    //- Assert that the toast notification appears
    await waitFor(() => {
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeDefined();
    });
  });

  test("hydrates a tenant session from session storage", async () => {
    sessionStorage.setItem(
      "flatmate-finder-auth",
      JSON.stringify({
        isAuthenticatedApplicant: false,
        isAuthenticatedTenant: true,
        loggedTenant: "Devon",
      }),
    );
    window.history.pushState({}, "", "/admin-welcome");

    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Welcome, Devon")).toBeDefined();
    });
  });

  test("hydrates a stable tenant id from the current session format", async () => {
    sessionStorage.setItem(
      "flatmate-finder-auth",
      JSON.stringify({ role: "tenant", mode: "real", tenantId: "osc" }),
    );
    window.history.pushState({}, "", "/admin-welcome");

    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Welcome, Oscar")).toBeDefined();
    });
  });

  test("migrates a legacy demo session without treating it as real access", async () => {
    sessionStorage.setItem(
      "flatmate-finder-auth",
      JSON.stringify({
        isAuthenticatedApplicant: false,
        isAuthenticatedTenant: true,
        accessMode: "guest-tenant",
        loggedTenant: "Devon",
      }),
    );
    window.history.pushState({}, "", "/admin-welcome");

    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>,
    );

    await waitFor(() => {
      const storedAuth = JSON.parse(
        sessionStorage.getItem("flatmate-finder-auth") ?? "{}",
      ) as { accessMode?: string };
      expect(storedAuth).toMatchObject({
        role: "tenant",
        mode: "demo",
        tenantId: "dev",
      });
    });
  });

  test("logout resets auth and clears the persisted session", async () => {
    render(
      <GlobalProvider
        initialState={{
          ...initialState,
          session: { role: "tenant", mode: "real", tenantId: "dev" },
        }}
      >
        <App />
      </GlobalProvider>,
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Open tenant menu" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(sessionStorage.getItem("flatmate-finder-auth")).toBeNull();
    expect(screen.getByLabelText("Enter password")).toBeDefined();
  });
});

// DONE
describe("Testing Global `applicantPool`, with `isLoading` and `error` states", () => {
  test("FETCH_INIT - default state should render leaderboard without data gracefully", () => {
    // Assemble
    render(
      <MemoryRouter>
        <GlobalProvider initialState={initialState}>
          <TenantLeaderboardPage />
        </GlobalProvider>
      </MemoryRouter>,
    );

    // Assert
    expect(screen.getByText("No data available")).toBeDefined();
  });

  test("FETCH_FAILURE - should render loading spinner while waiting for data", () => {
    // Assemble
    const partialState: Partial<GlobalStateInterface> = {
      isLoading: true,
    };
    customRenderLeaderBoard(partialState);

    // Assert that the Loader is present
    const loadingAnimation = screen.getByTestId("spinner-svg");
    expect(loadingAnimation).toBeDefined();

    // Assert accessibility attributes
    expect(loadingAnimation.getAttribute("role")).toBe("status");
    expect(loadingAnimation.getAttribute("aria-label")).toBe("Loading");
    expect(loadingAnimation.getAttribute("aria-live")).toBe("polite");
    expect(loadingAnimation.getAttribute("aria-busy")).toBe("true");
  });

  test("FETCH_SUCCESS - should render leader board with mock data", () => {
    //- Assemble
    // Define mockApplicantPool as an array of ApplicantProfile
    const mockApplicantPool: ApplicantProfile[] = [
      {
        id: "Adria-Alpha-39461",
        uuid: "Adria-Alpha-39461",
        firstForm: {
          name: "Ronald Weasley",
          phone: "680721466",
          sex: "male",
          languages: ["English"],
          age: "30",
        },
        secondForm: {
          move_date: Timestamp.fromDate(new Date(1702558880828)), // Construct Timestamp from milliseconds
          length_stay: 0,
          meet_type: "inperson",
          more_info: "Prefers quiet neighborhoods.",
        },
        thirdForm: {
          hobbies:
            "hobbies include playing wizard chess and attending Quidditch matches.",
          job_type: "wfh",
          describe:
            "Friendly and adventurous wizard, looking for a quiet place to stay. I enjoy Quidditch and playing wizard chess in my free time.   Not much for trees.",
          social_media: "twitter.com/ronweasley",
          job_title: "Auror at the Ministry",
        },
        applicationDate: Timestamp.fromDate(new Date(1702558880828)), // Construct Timestamp from milliseconds
        rankings: {
          dev_star: 2,
          osc_bool: true,
          osc_star: 5,
          adr_bool: false,
          dev_bool: true,
          adr_star: 1,
        },
        photo:
          "https://i.pinimg.com/1200x/7a/32/44/7a32443d0e64c43871c0a29e816b66e3.jpg",
      },
    ];
    const partialState: Partial<GlobalStateInterface> = {
      applicantPool: mockApplicantPool,
    };
    customRenderLeaderBoard(partialState);

    //- Assert
    expect(screen.getByText("Ronald Weasley")).toBeDefined();
  });

  test("React 19 smoke test - tenant tinder card renders", () => {
    const mockApplicant: ApplicantProfile = {
      id: "react-19-smoke-test",
      uuid: "react-19-smoke-test",
      firstForm: {
        name: "React 19 Applicant",
        phone: "680721466",
        sex: "male",
        languages: ["English"],
        age: "30",
      },
      secondForm: {
        move_date: Timestamp.fromDate(new Date(1702558880828)),
        length_stay: 0,
        meet_type: "inperson",
        more_info: "",
      },
      thirdForm: {
        hobbies: "Testing",
        job_type: "wfh",
        describe: "React compatibility smoke test.",
        social_media: "",
        job_title: "Engineer",
      },
      applicationDate: Timestamp.fromDate(new Date(1702558880828)),
    };

    render(
      <MemoryRouter>
        <GlobalProvider
          initialState={{
            ...initialState,
            session: { role: "tenant", mode: "real", tenantId: "dev" },
            applicantPool: [mockApplicant],
          }}
        >
          <TenantTinderPage />
        </GlobalProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("React 19 Applicant")).toBeDefined();
  });
});
