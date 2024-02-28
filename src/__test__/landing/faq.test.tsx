// import "@testing-library/jest-dom";
// import "intersection-observer";
// import { test, expect, describe } from "vitest";
// import { screen, render, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import FaqPage from "@/pages/Faq.page";
// import {
//   Language,
//   LanguageContext,
// } from "@/contexts/language/LanguageProvider";
// import Navbar from "@/components/Navbar";
// import HomePage from "@/pages/Home.page";

// describe.skip("Renders Localized Content", () => {
//   test("renders with correct content based on locale (ES)", async () => {
//     const localeContextMock = {
//       language: "spanish" as Language,
//       setLanguage: () => {},
//     };

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Navbar />
//           <FaqPage />
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     const heading = screen.getByText("Frequently Asked Questions");
//     const first_question = screen.getByText(/^Qué tipo de personas/i);
//     const last_question = screen.getByText(/^Cómo se maneja el depósito/i);

//     expect(heading).toBeInTheDocument();
//     expect(first_question).toBeInTheDocument();
//     expect(last_question).toBeInTheDocument();

//     await userEvent.click(first_question);

//     const first_answer = screen.getByText(/^Preferimos profesionales/i);

//     expect(first_answer).toBeInTheDocument();

//     await userEvent.click(last_question);

//     const last_answer = screen.getByText(/^El depósito equivale/i);

//     expect(last_answer).toBeInTheDocument();
//     expect(first_answer).not.toBeInTheDocument();
//   });

//   test("renders with correct content based on locale (EN)", async () => {
//     const localeContextMock = {
//       language: "english" as Language,
//       setLanguage: () => {},
//     };

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Navbar />
//           <FaqPage />
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     const heading = screen.getByText("Frequently Asked Questions");
//     const first_question = screen.getByText(/^What type of individuals/i);
//     const last_question = screen.getByText(/^How is the deposit handled/i);

//     expect(heading).toBeInTheDocument();
//     expect(first_question).toBeInTheDocument();
//     expect(last_question).toBeInTheDocument();

//     await userEvent.click(first_question);

//     const first_answer = screen.getByText(/^We prefer tidy/i);

//     expect(first_answer).toBeInTheDocument();

//     await userEvent.click(last_question);

//     const last_answer = screen.getByText(/^The deposit equals one/i);

//     expect(last_answer).toBeInTheDocument();
//     expect(first_answer).not.toBeInTheDocument();
//   });
// });

// describe.skip("Question Dropdown Interactions", () => {
//   test("expanding/collapsing accordion items in Spanish", async () => {
//     const localeContextMock = {
//       language: "spanish" as Language,
//       setLanguage: () => {},
//     };

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Navbar />
//           <FaqPage />
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     const first_question = screen.getByText(/^Qué tipo de personas/i);
//     const last_question = screen.getByText(/^Cómo se maneja el depósito/i);

//     expect(first_question).toBeInTheDocument();
//     expect(last_question).toBeInTheDocument();

//     await userEvent.click(first_question);

//     const first_answer = screen.getByText(/^Preferimos profesionales/i);

//     expect(first_answer).toBeInTheDocument();

//     await userEvent.click(last_question);

//     const last_answer = screen.getByText(/^El depósito equivale/i);

//     expect(last_answer).toBeInTheDocument();
//     expect(first_answer).not.toBeInTheDocument();
//   });

//   test("expanding/collapsing accordion items in English", async () => {
//     const localeContextMock = {
//       language: "english" as Language,
//       setLanguage: () => {},
//     };

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Navbar />
//           <FaqPage />
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     const heading = screen.getByText("Frequently Asked Questions");
//     const first_question = screen.getByText(/^What type of individuals/i);
//     const last_question = screen.getByText(/^How is the deposit handled/i);

//     expect(heading).toBeInTheDocument();
//     expect(first_question).toBeInTheDocument();
//     expect(last_question).toBeInTheDocument();

//     await userEvent.click(first_question);

//     const first_answer = screen.getByText(/^We prefer tidy/i);

//     expect(first_answer).toBeInTheDocument();

//     await userEvent.click(last_question);

//     const last_answer = screen.getByText(/^The deposit equals one/i);

//     expect(last_answer).toBeInTheDocument();
//     expect(first_answer).not.toBeInTheDocument();
//   });
// });




// // TEST🧪 - outstanding/pending tests

// describe.skip("NavBar link Back-Home Integration tests?", () => {
//   test("clicking return home button navigates to the home page", async () => {
//     const localeContextMock = {
//       language: "english" as Language,
//       setLanguage: () => {},
//     };

//     window.history.pushState({}, "", "/FAQ");

//     render(
//       <LanguageContext.Provider value={localeContextMock}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/FAQ" element={<FaqPage />} />
//           </Routes>
//         </BrowserRouter>
//       </LanguageContext.Provider>
//     );

//     const input = screen.getByLabelText("Enter password");
//     const startButton = screen.getByRole("button", { name: "Start" });

//     await userEvent.type(input, "Mango");
//     await userEvent.click(startButton);

//     await waitFor(() => {
//       screen.debug();

//       const heading = screen.getByText("Frequently Asked Questions");
//       const first_question = screen.getByText(/^What type of individuals/i);
//       const last_question = screen.getByText(/^How is the deposit handled/i);

//       expect(heading).toBeInTheDocument();
//       expect(first_question).toBeInTheDocument();
//       expect(last_question).toBeInTheDocument();
//     });

//     // await userEvent.click(first_question);

//     // const first_answer = screen.getByText(/^We prefer tidy/i);
//     // expect(first_answer).toBeInTheDocument();

//     // await userEvent.click(last_question);

//     // const last_answer = screen.getByText(/^The deposit equals one/i);
//     // expect(last_answer).toBeInTheDocument();

//     // expect(first_answer).not.toBeInTheDocument();
//   });
// });

// describe.skip("Navbar setLocale integration", () => {
//   test("clicking return home button navigates to the home page", () => {});
// });
