import userEvent from "@testing-library/user-event";
import { test, expect, describe, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GlobalProvider } from "@/contexts/GlobalProvider";
import { ApplicantProfile } from "@/lib/interfaces/applicantInterfaces";
import { Timestamp } from "@firebase/firestore";
import {
  GlobalStateInterface,
  initialState,
} from "@/lib/interfaces/globalStateInterfaces";
import {
  customRenderLeaderBoard,
  customRenderApp,
} from "./testUtils";

import App from "@/App";
import Navbar from "@/components/Navbar";
import FaqPage from "@/pages/Faq.page";
import TenantLeaderboardPage from "@/pages/TenantLeaderboard.page";

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
      </GlobalProvider>
    );
    //- Assert
    const mainHeading = screen.getByText("Calle de Muller");
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
          <FaqPage />
        </GlobalProvider>
      </MemoryRouter>
    );

    //- Assert
    expect(screen.getByText("Frequently Asked Questions")).toBeDefined();
  });

  test("simple demo test: form submission with incorrect password, shows toast error message", async () => {
    //- Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>
    );

    //- Act
    const input = screen.getByLabelText("Enter password");
    const startButton = screen.getByRole("button", { name: "Start" });
    await userEvent.type(input, "WrongPassword");
    await userEvent.click(startButton);

    //- Assert
    await waitFor(() => {
      const errorToast = screen.getByText(
        "That's not correct - Eso no está bien"
      );
      expect(errorToast).toBeDefined();
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
      </GlobalProvider>
    );
    // Assert initially loads with en locale set
    const subHeadingEN = screen.getByText("Welcome to");
    expect(subHeadingEN).toBeDefined();

    // Act
    const localeSpanishButton = screen.getByRole("radio", {
      name: "locale-es",
    });
    await userEvent.click(localeSpanishButton);

    // Assert locale has updated
    const welcomeHeading = screen.getByText(/^Bienvenido a/i);
    const passwordHeading = screen.getByText(/^Ingresar contraseña/i);
    const passwordText = screen.getByText(
      /^Una contraseña secreta compartida contigo/i
    );
    const startButton = screen.getByText(/^Comenzar/i);
    expect(welcomeHeading).toBeDefined();
    expect(passwordHeading).toBeDefined();
    expect(passwordText).toBeDefined();
    expect(startButton).toBeDefined();
  });

  test("SET_LOCALE - should render with ES and switch to EN", async () => {
    // Assemble
    const partialState: Partial<GlobalStateInterface> = {
      locale: "ES",
    };
    customRenderApp(partialState);

    // Assert initial render with ES Locale set
    const mainHeading = screen.getByText("Calle de Muller");
    const welcomeHeadingES = screen.getByText(/^Bienvenido a/i);
    const passwordHeadingES = screen.getByText(/^Ingresar contraseña/i);
    expect(mainHeading).toBeDefined();
    expect(welcomeHeadingES).toBeDefined();
    expect(passwordHeadingES).toBeDefined();

    // Act
    const localeEnglishButton = screen.getByRole("radio", {
      name: "locale-en",
    });

    await userEvent.click(localeEnglishButton);

    // Assert locale has been updated to EN
    const subHeadingEN = screen.getByText("Welcome to");
    expect(subHeadingEN).toBeDefined();
  });
});

// DONE
describe("Testing Global `isAuthenticated` and `loggedTenant`, with password submission form", () => {
  test("SET_TENANT + PROFILE - correct password should result in success toast notif", async () => {
    //- Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>
    );
    const input = screen.getByLabelText("Enter password");
    const startButton = screen.getByRole("button", { name: "Start" });

    //- Act
    await userEvent.type(input, "test-tenant-password");
    await userEvent.click(startButton);

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
      </GlobalProvider>
    );
    const input = screen.getByLabelText("Enter password");
    const startButton = screen.getByRole("button", { name: "Start" });

    //- Act
    await userEvent.type(input, "test-applicant-password-three");
    await userEvent.click(startButton);

    //- Assert that the toast notification appears
    await waitFor(() => {
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeDefined();
    });
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
      </MemoryRouter>
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
    expect(loadingAnimation.getAttribute("role")).toBe("progressbar");
    expect(loadingAnimation.getAttribute("aria-valuetext")).toBe("Loading");
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
});
