import React from "react";
import { Link } from "react-router-dom";

export default function CategoryItem({
  label,
  path,
  count,
  loading,
  onSelect,
  isActive,
}) {
  return (
    <li className={`dropdown-item ${isActive ? "active" : ""}`} role="none">
      <Link
        role="menuitem"
        to={`/category/${path}`}
        onClick={() => onSelect && onSelect()}
      >
        {label}
        <span className="cat-count">
          {loading && count === undefined ? "…" : ` (${count ?? 0})`}
        </span>
      </Link>
    </li>
  );
}
