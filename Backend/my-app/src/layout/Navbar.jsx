import React from "react";
import "./Navbar.css";
import SearchBar from "../components/SearchBar";
import logo from "../assets/RICE-N-ROLL.png";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="RICE N ROLL" className="header-logo" />

      <ul className="nav-ul">
        <li>
          <Link to="/">Hemsidan</Link>
        </li>
        <li>Recept</li>
        <li>
          <Link to="Category"></Link>Kategorier 
        </li>{" "}
        {/* TODO skapa undermeny! */}
      </ul>
    </div>
  );
};

export default Navbar;
