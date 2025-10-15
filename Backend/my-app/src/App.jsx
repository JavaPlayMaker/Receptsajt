import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import RootLayout from "./layout/RootLayout";


export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
<Route index element={<Home />} />
        <Route path="/category" element={<Category />} /> 
        <Route path="/recipe/:id" element={<Recipe />} />
      </Route>
    </Routes>
  );
}

export default App;