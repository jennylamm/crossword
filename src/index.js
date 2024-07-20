// src/index.js
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import SideBar from "./components/SideBar";
import Play from "./pages/Play";

export default function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/play" element={<Play />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
