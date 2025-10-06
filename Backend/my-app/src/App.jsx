import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipe from "./pages/Recipe";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
