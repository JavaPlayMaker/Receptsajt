import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import About from "./pages/About";
import RootLayout from "./layout/RootLayout";
import CategoryDropDown from "./layout/CategoryDropDown";


export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/category/:category" element={<CategoryDropDown />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;