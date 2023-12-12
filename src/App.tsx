import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home.page";
import ApplicationPage from "./pages/Application.page";

import "./App.css";
import { ApplicantProvider } from "./components/contexts/applicant/ApplicantProvider";

function App() {
  return (
    <>
      <Router basename={import.meta.env.VITE_REACT_APP_BASENAME || "/"}>
        <Navbar />
        <main className="flex flex-col h-auto gap-3 lg:gap-5">
          <ApplicantProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </ApplicantProvider>
          <Routes>
            <Route path="/form" element={<ApplicationPage />} />
          </Routes>
        </main>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
