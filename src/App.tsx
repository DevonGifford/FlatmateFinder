import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

import "./App.css";
import Formpage from "./pages/Formpage";

function App() {
  return (
    <>
      <Router basename={import.meta.env.REACT_APP_BASENAME || "/"}>
        <Navbar />
        <main className="flex flex-col gap-3 lg:gap-5">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/form" element={<Formpage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
