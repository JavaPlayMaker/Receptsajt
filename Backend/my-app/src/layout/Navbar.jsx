import React from "react";
import "./Navbar.css";
import SearchBar from "../components/SearchBar";
import logo from "../assets/logo.png";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
      <img src={logo} alt="RICE N ROLL" className="header-logo" Link to="/" />
      </Link>
      <ul className="nav-ul">
          <li className="button-link">
            <Link to="/">Hem</Link>
          </li>
          <li className="button-link">
            <Link to="Category">Kategorier</Link>
          </li>{" "}
        {/* TODO skapa undermeny! */}
      </ul>
    </div>
  );
};

export default Navbar;
