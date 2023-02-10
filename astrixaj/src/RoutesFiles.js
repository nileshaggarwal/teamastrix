import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import App from "./App";

const RoutesFiles = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
      </Routes>
    </Router>
  );
};

export default RoutesFiles;
