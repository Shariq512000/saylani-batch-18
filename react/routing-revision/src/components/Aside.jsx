import React from "react";
import "./layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const Aside = () => {
  return (
    <aside>
      <Link className="link" to={"/"}>
        Home
      </Link>
      <br />
      <Link className="link" to={"/about"}>
        About
      </Link>
      <br />
      <Link className="link" to={"/contact"}>
        Contact
      </Link>
      <br />
      <Link className="link" to={"/abc"}>
        Abc
      </Link>
      <br />
    </aside>
  );
};

export default Aside;
