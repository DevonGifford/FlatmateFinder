import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { test, expect, describe } from "vitest";
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
    expect(mainHeading).toBeInTheDocument();
    const subHeading = screen.getByText("Welcome to");
    expect(subHeading).toBeInTheDocument();
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
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
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
      screen.debug();
      const errorToast = screen.getByText(
        "That's not correct - Eso no está bien"
      );
      expect(errorToast).toBeInTheDocument();
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
    expect(subHeadingEN).toBeInTheDocument();

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
    expect(welcomeHeading).toBeInTheDocument();
    expect(passwordHeading).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
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
    expect(mainHeading).toBeInTheDocument();
    expect(welcomeHeadingES).toBeInTheDocument();
    expect(passwordHeadingES).toBeInTheDocument();

    // Act
    const localeEnglishButton = screen.getByRole("radio", {
      name: "locale-en",
    });

    await userEvent.click(localeEnglishButton);

    // Assert locale has been updated to EN
    const subHeadingEN = screen.getByText("Welcome to");
    expect(subHeadingEN).toBeInTheDocument();
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
    await userEvent.type(input, "Devon4B");
    await userEvent.click(startButton);

    //- Assert that the toast notification appears
    await waitFor(() => {
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeInTheDocument();
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
    await userEvent.type(input, "Mango");
    await userEvent.click(startButton);

    //- Assert that the toast notification appears
    await waitFor(() => {
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeInTheDocument();
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
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("FETCH_FAILURE - should render loading spinner while waiting for data", () => {
    // Assemble
    const partialState: Partial<GlobalStateInterface> = {
      isLoading: true,
    };
    customRenderLeaderBoard(partialState);

    // Assert that the Loader is present
    const loadingAnimation = screen.getByTestId("spinner-svg");
    expect(loadingAnimation).toBeInTheDocument();

    // Assert accessibility attributes
    expect(loadingAnimation).toHaveAttribute("role", "progressbar");
    expect(loadingAnimation).toHaveAttribute("aria-valuetext", "Loading");
    expect(loadingAnimation).toHaveAttribute("aria-busy", "true");
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
    expect(screen.getByText("Ronald Weasley")).toBeInTheDocument();
  });
});


// TODO
// [ ] UPDATE_APPLICANT_POOL
// [ ] RESET_AUTH 
// [ ] PURGE_STATE

// WIP - PROTOTYPE TESTING :
describe.skip("things I am trying out would be great to get some feedback on where I am going wrong", () => {
  /*
  ❌ Failed Attempt to mock useNavigate:
  
  const mockedUseNavigate = vi.fn();
  .mock("react-router-dom", async () => {
    nst mod = await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
      );
      r turn {
        ...mod,
        useNavigate: () => mockedUseNavigate,
      };
    });
  */

  test("❌ Attempt: simple test, from root, expected route change - faq button results in faq page", async () => {
    // - Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    const faqButton = screen.getByLabelText("faq-button");
    expect(faqButton).toBeInTheDocument();

    // - Act
    await userEvent.click(faqButton);

    // - Assert: verify if the FAQ page content renders as expected after route change
    await waitFor(() => {
      // console.log("Location Pathname:", window.location.pathname);
      expect(screen.getByText(/Frequently/i)).toBeInTheDocument();  //❌BREAKS HERE  still rendering the old page
    });
  });

  test("❌ Attempt: simple test, from component, expected route change - faq button results in faq page", async () => {
    // - Assemble
    render(
      <MemoryRouter>
        <GlobalProvider initialState={initialState}>
          <Navbar />
        </GlobalProvider>
      </MemoryRouter>
    );
    const faqButton = screen.getByLabelText("faq-button");
    expect(faqButton).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");

    // - Act:  Click on the FAQ button
    console.log("Before click:", window.location.pathname);
    await userEvent.click(faqButton);
    console.log("After click:", window.location.pathname);

    // - Assert: Assert that URL updated
    await waitFor(() => {
      console.log("Location Pathname:", window.location.pathname);
      expect(window.location.pathname).toBe("/FAQ");  //❌BREAKS HERE
    });
  });

  test("❌ Attempt: password entry should update page, thus testing global context reducer + password function", async () => {
    // - Assemble
    render(
      <GlobalProvider initialState={initialState}>
        <App />
      </GlobalProvider>
    );
    const input = screen.getByLabelText("Enter password");
    const startButton = screen.getByRole("button", { name: "Start" });

    // - Act: enter password and click start button
    await userEvent.type(input, "Mango");
    await userEvent.click(startButton);

    // - Assert: toast notification appears
    await waitFor(() => {
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeInTheDocument();
      screen.debug();
    });

    // - Assert:  wait for the component to re-render with the application form page
    // assert the state has been updated - the state action was thus dispatched and route is now 'unlocked' by applicantGaurd
    await waitFor(() => {
      const applicationPage = screen.getByText("Whatsapp");
      expect(applicationPage).toBeInTheDocument();   //❌BREAKS HERE - not rendering new page
      screen.debug();
    });
    //results in the successful toast notif but does not 'update the route and render that page'
  });
});
