import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getAllCategories, getRecipesByCategory } from "../services/api";
import CategoryDropdown from "./CategoryDropdown";

const getCategoryLabel = (catObj, idx) => {
  if (typeof catObj === "string") return catObj;
  return catObj?.name || catObj?.title || catObj?.label || `kategori-${idx}`;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // 🔹 Hämta kategorier
  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getAllCategories({ signal: controller.signal });
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => a.name.localeCompare(b.name))
          : [];
        setCategories(sorted);
      } catch (err) {
        if (err.name !== "AbortError") setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
    return () => controller.abort();
  }, []);

  // 🔹 Stäng dropdown när man klickar utanför
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // 🔹 Hämta counts för kategorier
  useEffect(() => {
    if (!isOpen || categories.length === 0) return;

    const labels = categories.map(getCategoryLabel);
    const missing = labels.filter((lbl) => counts[lbl] === undefined);
    if (missing.length === 0) return;

    let mounted = true;

    const fetchCounts = async () => {
      setCountsLoading(true);
      try {
        const results = await Promise.all(
          missing.map(async (lbl) => {
            try {
              const data = await getRecipesByCategory(lbl.toLowerCase());
              return { lbl, count: Array.isArray(data) ? data.length : 0 };
            } catch {
              return { lbl, count: 0 };
            }
          })
        );

        if (mounted) {
          setCounts((prev) =>
            results.reduce(
              (next, { lbl, count }) => {
                next[lbl] = count;
                return next;
              },
              { ...prev }
            )
          );
        }
      } finally {
        if (mounted) setCountsLoading(false);
      }
    };

    fetchCounts();
    return () => {
      mounted = false;
    };
  }, [isOpen, categories, counts]);

  // 🔹 Render-komponent
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

        <li className="button-link dropdown" ref={dropdownRef}>
          <CategoryDropdown
            isOpen={isOpen}
            onToggle={() => setIsOpen((s) => !s)}
            categories={categories}
            isLoading={isLoading}
            counts={counts}
            countsLoading={countsLoading}
            onSelect={() => setIsOpen(false)}
            activePath={location.pathname}
          />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
