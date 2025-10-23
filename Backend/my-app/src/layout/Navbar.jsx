import React from "react";
import "./Navbar.css";
import SearchBar from "../components/SearchBar";
import logo from "../assets/RICE-N-ROLL.png";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="RICE N ROLL" className="header-logo" />
      </Link>
      <ul className="nav-ul">
        <li>
          <Link to="/">Hemsidan</Link>
        </li>
        <li>
          <Link to="/recipe">Recept</Link>
        </li>
        <li>
          <Link to="/category">Kategorier</Link>
        </li>{" "}
        {/* TODO skapa undermeny! */}
      </ul>
    </div>
  );
};

export default Navbar;
