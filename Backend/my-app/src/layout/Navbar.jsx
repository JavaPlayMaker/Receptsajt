import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getAllCategories, getRecipesByCategory } from "../services/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

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
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || categories.length === 0) return;

    const labels = categories.map((catObj, idx) =>
      typeof catObj === "string"
        ? catObj
        : (catObj && (catObj.name || catObj.title || catObj.label)) ||
          `kategori-${idx}`
    );

    const missing = labels.filter((lbl) => counts[lbl] === undefined);
    if (missing.length === 0) return;

    let mounted = true;
    setCountsLoading(true);

    Promise.all(
      missing.map(async (lbl) => {
        try {
          const data = await getRecipesByCategory(lbl.toLowerCase());
          return { lbl, count: Array.isArray(data) ? data.length : 0 };
        } catch (err) {
          return { lbl, count: 0 };
        }
      })
    )
      .then((results) => {
        if (!mounted) return;
        setCounts((prev) => {
          const next = { ...prev };
          results.forEach(({ lbl, count }) => {
            next[lbl] = count;
          });
          return next;
        });
      })
      .finally(() => {
        if (!mounted) return;
        setCountsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [isOpen, categories, counts]);

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

   {/* Added Threat Checklist link */}
        <li className="button-link">
          <NavLink to="/threat-checklist">Threat Checklist</NavLink>
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
                <li className="dropdown-item">
                  <div className="spinner" aria-hidden="true"></div>
                </li>
              ) : categories.length > 0 ? (
                categories.map((catObj, idx) => {
                  const label =
                    typeof catObj === "string"
                      ? catObj
                      : (catObj &&
                          (catObj.name || catObj.title || catObj.label)) ||
                        `kategori-${idx}`;
                  const path = encodeURIComponent(String(label).toLowerCase());
                  const displayCount = counts[label];
                  return (
                    <li
                      key={label + idx}
                      className={`dropdown-item ${
                        location.pathname === `/category/${path}`
                          ? "active"
                          : ""
                      }`}
                      role="none"
                    >
                      <Link
                        role="menuitem"
                        to={`/category/${path}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                        <span className="cat-count">
                          {countsLoading && displayCount === undefined
                            ? "…"
                            : ` (${displayCount ?? 0})`}
                        </span>
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
