import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Home.page";
import ApplicationPage from "./pages/Application.page";

import "./App.css";

function App() {
  return (
    <>
      <Router basename={import.meta.env.REACT_APP_BASENAME || "/"}>
        <Navbar />
        <main className="flex flex-col gap-3 lg:gap-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<ApplicationPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
