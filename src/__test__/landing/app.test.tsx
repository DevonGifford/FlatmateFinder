import "@testing-library/jest-dom";
import "intersection-observer";
import { test, expect, describe } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import HomePage from "@/pages/Home.page";
import {
  Language,
  LanguageContext,
} from "@/contexts/language/LanguageProvider";

describe.skip("Renders Expected Elements", () => {
  test("renders main headings and subheadings", async () => {
    render(<App />);

    const mainHeading = screen.getByText("Calle de Muller");
    const subHeading = screen.getByText("Welcome to");

    expect(mainHeading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
  });

  test("renders splash image", async () => {
    render(<App />);

    const splashImage = screen.getByAltText("splash-image");

    expect(splashImage).toBeInTheDocument();
  });

  test("renders buttons", async () => {
    render(<App />);

    const faqButton = screen.getByRole("button", { name: "faq-button" });
    const startButton = screen.getByRole("button", { name: "Start" });
    const localeEnglishButton = screen.getByRole("radio", {
      name: "locale-en",
    });
    const localeSpanishButton = screen.getByRole("radio", {
      name: "locale-es",
    });

    expect(faqButton).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(localeEnglishButton).toBeInTheDocument();
    expect(localeSpanishButton).toBeInTheDocument();
  });
});

describe.skip("Renders Localized Content", () => {
  test("renders with correct default language", async () => {
    render(<App />);

    const localizedEnglish = screen.getByText("Welcome to");

    expect(localizedEnglish).toBeInTheDocument();
  });

  test("renders with correct content based on locale (ES)", async () => {
    const localeContextMock = {
      language: "spanish" as Language,
      setLanguage: () => {},
    };

    render(
      <LanguageContext.Provider value={localeContextMock}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </LanguageContext.Provider>
    );

    const mainHeading = screen.getByText("Calle de Muller");
    const welcomeHeading = screen.getByText(/^Bienvenido a/i);
    const passwordHeading = screen.getByText(/^Ingresar contraseña/i);
    const passwordText = screen.getByText(
      /^Una contraseña secreta compartida contigo/i
    );
    const startButton = screen.getByText(/^Comenzar/i);

    expect(mainHeading).toBeInTheDocument();
    expect(welcomeHeading).toBeInTheDocument();
    expect(passwordHeading).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });

  test("renders with correct content based on locale (EN)", async () => {
    const localeContextMock = {
      language: "english" as Language,
      setLanguage: () => {},
    };

    render(
      <LanguageContext.Provider value={localeContextMock}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </LanguageContext.Provider>
    );

    const mainHeading = screen.getByText("Calle de Muller");
    const welcomeHeading = screen.getByText(/^Welcome to/i);
    const passwordHeading = screen.getByText(/^Enter password/i);
    const passwordText = screen.getByText(
      /^A secret password shared with you/i
    );
    const startButton = screen.getByText(/^Start/i);

    expect(mainHeading).toBeInTheDocument();
    expect(welcomeHeading).toBeInTheDocument();
    expect(passwordHeading).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });
});

describe.skip("Password Form Submission", () => {
  test("renders input field and is initially empty", async () => {
    render(<App />);

    const input = screen.getByLabelText("Enter password");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("form submission with incorrect password, shows toast error message", async () => {
    render(<App />);

    const input = screen.getByLabelText("Enter password");
    const startButton = screen.getByRole("button", { name: "Start" });

    await userEvent.type(input, "Mango`");
    await userEvent.click(startButton);

    await waitFor(() => {
      screen.debug();
      const errorToast = screen.getByText(
        "That's not correct - Eso no está bien"
      );
      expect(errorToast).toBeInTheDocument();
    });
  });

  test("form submission with correct passwords for applicant, shows toast success message", async () => {
    render(<App />);

    const input = screen.getByLabelText("Enter password");
    const startButton = screen.getByRole("button", { name: "Start" });

    await userEvent.type(input, "Mango");
    await userEvent.click(startButton);

    await waitFor(() => {
      screen.debug();
      const successToast = screen.getByText("Very good - Muy bien");
      expect(successToast).toBeInTheDocument();
    });
  });
});





// TEST🧪 - outstanding/pending tests
describe.skip("Password Form Validation", () => {
  test("form validation on too short a password", async () => {});

  test("form validation error message dismiss on retry", async () => {});
});

describe.skip("Integration Navigation Tests", () => {
  test("clicking FAQ button navigates user to FAQ page", () => {});

  test("applicant form submission navigates user to applicant page", () => {});

  test("admin form submission navigates user to admin page", () => {});
});
