import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import App from "./App";
import AdminPanel from "./Pages/AdminPanel";
import ViewTeam from "./Pages/ViewTeam";

const RoutesFiles = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/admin" exact element={<AdminPanel />} />
        <Route path="/team/:teamId" exact element={<ViewTeam />} />
      </Routes>
    </Router>
  );
};

export default RoutesFiles;
