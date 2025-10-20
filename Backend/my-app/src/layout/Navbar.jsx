import React from "react";
import "./Navbar.css";
import SearchBar from "../components/SearchBar";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="RICE N ROLL" className="header-logo" />

      <ul className="nav-ul">
        <li>
          <Link to="/">Hem</Link>
        </li>
        <li>
          <Link to="Category"></Link>Kategorier
        </li>{" "}
        {/* TODO skapa undermeny! */}
      </ul>
    </div>
  );
};

export default Navbar;
