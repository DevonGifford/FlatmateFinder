// import "@testing-library/jest-dom";
// import "intersection-observer";
// import { test, expect, describe, vi } from "vitest";
// import { screen, render, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
// import {
//   Language,
//   LanguageContext,
// } from "@/contexts/language/LanguageProvider";
// import Navbar from "@/components/Navbar";


// // TEST 🧪  outstanding/pending tests

// describe.skip("Switiching Locale Tests", () => {
//   test("switching locales", async () => {
//     const localeContextMock = {
//       language: "english" as Language,
//       setLanguage: () => {},
//     };

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Navbar />
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     const localeSpanishButton = screen.getByRole("radio", {
//       name: "locale-es",
//     });

//     await userEvent.click(localeSpanishButton);

//     screen.debug();
//     // 🧪 in progress
//   });

//   test("Navbar renders correctly and buttons work", async () => {
//     const localeContextMock = {
//       language: "english" as Language,
//       setLanguage: () => {},
//     };

//     // Mock the setLanguage function
//     const changeLanguage = vi.fn();

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Navbar />
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     // Check if the default FAQ button is rendered
//     const faqButton = screen.getByLabelText("faq-button");
//     expect(faqButton).toBeInTheDocument();
//     expect(window.location.pathname).toBe("/");

//     // // Click on the FAQ button and check if it navigates to "/FAQ"
//     console.log("Before click:", window.location.pathname);

//     await userEvent.click(faqButton);

//     console.log("After click:", window.location.pathname);

//     await waitFor(() => {
//       console.log("Location Pathname:", window.location.pathname);
//       expect(window.location.pathname).toBe("/FAQ");
//     });

//     // Click on the "EN" language button
//     const enLanguageButton = screen.getByLabelText("locale-en");
//     await userEvent.click(enLanguageButton);
//     expect(changeLanguage).toHaveBeenCalledWith("english");

//     // Click on the "ES" language button
//     const esLanguageButton = screen.getByLabelText("locale-es");
//     await userEvent.click(esLanguageButton);
//     expect(changeLanguage).toHaveBeenCalledWith("spanish");
//   });
// });


// // TEST 🧪  outstanding/pending tests

// describe.skip("Navigation Handlers", () => {
//   test("renders quit button", () => {
//     // Render the component
//     // Assertions for the presence of the quit button
//   });

//   test("clicking quit button navigates to the home page", () => {
//     // Render the component
//     // Simulate clicking on the quit button
//     // Assertions for the navigation to the home page
//   });

//   test("renders home button", () => {
//     // Render the component
//     // Assertions for the presence of the home button
//   });

//   test("clicking home button navigates to the home page", () => {
//     // Render the component
//     // Simulate clicking on the home button
//     // Assertions for the navigation to the home page
//   });

//   test("renders FAQ button", () => {
//     // Render the component
//     // Assertions for the presence of the FAQ button
//   });

//   test("clicking FAQ button navigates to the FAQ page", () => {
//     // Render the component
//     // Simulate clicking on the FAQ button
//     // Assertions for the navigation to the FAQ page
//   });
// });

// describe.skip("Localization Handlers", () => {
//   test("renders EN language button", () => {
//     // Render the component
//     // Assertions for the presence of the EN language button
//   });

//   test("clicking EN language button changes the language to English", () => {
//     // Render the component
//     // Simulate clicking on the EN language button
//     // Assertions for the language change to English
//   });

//   test("renders ES language button", () => {
//     // Render the component
//     // Assertions for the presence of the ES language button
//   });

//   test("clicking ES language button changes the language to Spanish", () => {
//     // Render the component
//     // Simulate clicking on the ES language button
//     // Assertions for the language change to Spanish
//   });

//   test("applies correct styles to EN language button based on language", () => {
//     // Render the component with a specific language
//     // Assertions for the styles of the EN language button
//   });

//   test("applies correct styles to ES language button based on language", () => {
//     // Render the component with a specific language
//     // Assertions for the styles of the ES language button
//   });
// });


