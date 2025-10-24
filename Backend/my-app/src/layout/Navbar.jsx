import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png"
import { Link, NavLink } from "react-router-dom";
import { getAllCategories } from "../services/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getAllCategories()
      .then((data) => {
        if (!mounted) return;
        setCategories(Array.isArray(data) ? data.sort() : []);
      })
      .catch(() => setCategories([]))
      .finally(() => setIsLoading(false));
    return () => (mounted = false);
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="RICE N ROLL" className="header-logo" />
      </Link>

      <ul className="nav-ul">
        <li className="button-link">
          <NavLink to="/" end>
            Hem
          </NavLink>
        </li>
        <li className="button-link">
          <NavLink to="/about" end>
            Om oss
          </NavLink>
        </li>

        <li className="button-link dropdown" ref={dropdownRef}>
          <button
            className="dropdown-btn"
            aria-expanded={isOpen}
            aria-haspopup="menu"
            onClick={() => setIsOpen((s) => !s)}
          >
            Kategorier ▾
          </button>

          {isOpen && (
            <ul className="dropdown-menu" role="menu">
              {isLoading ? (
                <li className="dropdown-item"><div className="spinner" aria-hidden="true"></div></li>
              ) : categories.length > 0 ? (
                categories.map((catObj, idx) => {

                  const label = typeof catObj === 'string' ? catObj : (catObj && (catObj.name || catObj.title || catObj.label)) || `kategori-${idx}`;
                  const path = encodeURIComponent(String(label).toLowerCase());
                  return (
                    <li key={label + idx} className="dropdown-item" role="none">
                      <Link role="menuitem" to={`/category/${path}`} onClick={() => setIsOpen(false)}>
                        {label}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li className="dropdown-item">Inga kategorier</li>
              )}
            </ul>
          )}
        </li>
      
      </ul>
    </div>
  );
};

export default Navbar;
