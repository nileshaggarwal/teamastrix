import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import App from "./App";
import AdminPanel from "./Pages/AdminPanel";
import Login from "./Pages/Auth/login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Dashboard from "./Pages/User/dashboard";
import ManageMiles from "./Components/User/ManageMiles";
import ViewTeam from "./Pages/ViewTeam";

const RoutesFiles = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/admin" exact element={<AdminPanel />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        <Route path="/userdash" exact element={<Dashboard />} />
        <Route path="/milestone/:id" exact element={<ManageMiles />} />
        <Route path="/team/:teamId" exact element={<ViewTeam />} />
      </Routes>
    </Router>
  );
};

export default RoutesFiles;
