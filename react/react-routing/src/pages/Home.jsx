import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <Link to={"/about"}>Go To About Page</Link>
      <br />
      <Link to={"/contact"}>Go To Contact Page</Link>
      <br />
      <Link to={"/test"}>Go To Test Page</Link>
    </div>
  );
};

export default Home;
