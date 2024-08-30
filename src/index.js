// src/index.js
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import SideBar from "./components/SideBar";
import Play from "./pages/Play";
import Configure from "./pages/Configure";
import { CrossWordProvider } from "./context/Context";
import './index.css';


export default function App() {
  return (
    <CrossWordProvider>
      <BrowserRouter>
        <SideBar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/play" element={<Play />} />
            <Route path="/configure" element={<Configure />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CrossWordProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
