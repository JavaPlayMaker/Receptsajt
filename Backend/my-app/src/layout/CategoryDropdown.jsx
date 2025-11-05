import React from "react";
import CategoryItem from "./CategoryItem";
import { getCategoryLabel } from "../utils/categoryUtils";

export default function CategoryDropdown({
  isOpen,
  onToggle,
  categories = [],
  isLoading,
  counts = {},
  countsLoading,
  onSelect,
  activePath,
}) {
  return (
    <>
      <button
        className="dropdown-btn"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={onToggle}
      >
        Kategorier ▾
      </button>

      {isOpen && (
        <ul className="dropdown-menu" role="menu">
          {isLoading ? (
            <li className="dropdown-item">
              <div className="spinner" aria-hidden="true"></div>
            </li>
          ) : categories.length === 0 ? (
            <li className="dropdown-item">Inga kategorier</li>
          ) : (
            categories.map((catObj, idx) => {
              const label = getCategoryLabel(catObj, idx);
              const path = encodeURIComponent(String(label).toLowerCase());
              const isActive = activePath === `/category/${path}`;
              return (
                <CategoryItem
                  key={label + idx}
                  label={label}
                  path={path}
                  count={counts[label]}
                  loading={countsLoading}
                  onSelect={onSelect}
                  isActive={isActive}
                />
              );
            })
          )}
        </ul>
      )}
    </>
  );
}
