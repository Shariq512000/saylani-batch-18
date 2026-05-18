import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

const Main = () => {
  return (
    <main>
      {/* <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/about"}>About</Link>
      <br />
      <Link to={"/contact"}>Contact</Link>
      <br />
      <Link to={"/abc"}>Abc</Link>
      <br /> */}
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to={"/"} />} />

        {/* <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </main>
  );
};

export default Main;

// let pathname = "/test"

// if(pathname == "/"){
//   <Home />
// }
// if(pathname == "/about"){
//   <About />
// }
// if(pathname == "/contact"){
//   <Contact />
// }else{
//   pathname = "/"
// }
