import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <h1>Header</h1>
      {/* Routes Dynamic Window hai, aur Uske Andar Route Condition hai jo k pathname match krke Dynamic window mai element show krwa raha hai */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
