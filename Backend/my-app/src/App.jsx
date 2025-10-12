import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import RootLayout from "./layout/RootLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />} >
        <Route path="/" element={<Home />} /> {/* TODO Sätta en annan path? */}
        <Route path="/recipe/:id" element={<Recipe />} />
      </Route>
    </Routes>
  );
}

export default App;
