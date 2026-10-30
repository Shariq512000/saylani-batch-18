import './App.css';
import { Routes, Route, Link } from "react-router";
import Home from './pages/Home';
import About from './pages/About';

function App() {

  return (
    <div className="App">
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <br />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
