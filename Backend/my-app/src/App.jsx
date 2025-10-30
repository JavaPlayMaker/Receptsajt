import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import RootLayout from "./layout/RootLayout";
import Category from "./pages/Category";
import ThreatChecklist from "./components/ThreatChecklist";




export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/threat-checklist" element={<ThreatChecklist />} />
      </Route>
    </Routes>
  );
}

export default App;