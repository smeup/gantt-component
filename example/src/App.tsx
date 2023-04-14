import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Planner1 from "./examples/Planner1";
import Planner2 from "./examples/Planner2";
import Icon from "./examples/Icon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Planner1 />} />
        <Route path="/planner1" index element={<Planner1 />} />
        <Route path="/planner2" index element={<Planner2 />} />
        <Route path="/icon" index element={<Icon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
