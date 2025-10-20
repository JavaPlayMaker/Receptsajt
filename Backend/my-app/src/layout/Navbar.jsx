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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="Category"></Link>Category
        </li>{" "}
        {/* TODO skapa undermeny! */}
      </ul>

      <div className="searchbar">
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
