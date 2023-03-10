import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import AddEmployee from "../Components/AdminPanel/AddEmployee";
import AddManagerOKR from "../Components/AdminPanel/AddManagerOKR";
import AddTeam from "../Components/AdminPanel/AddTeam";
import ManageOKR from "../Components/AdminPanel/ManageOKR";
import ManageTeam from "../Components/AdminPanel/ManageTeam";
import NotificationView from "../Components/AdminPanel/NotificationView";
import MainPage from "../Components/MainPage";
import { isAuthenticated } from "../Helpers/auth";

const AdminPanel = () => {
  const [chosenMenu, setChosenMenu] = useState("createTeam");

  console.log(isAuthenticated(), "isAuthenticated()");

  return (
    <AdminLayout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
      {chosenMenu === "manageTeam" && <ManageTeam />}
      {chosenMenu === "createTeam" && <AddTeam />}
      {chosenMenu === "addEmployee" && <AddEmployee />}
      {chosenMenu === "manageOKR" && <ManageOKR />}
      {chosenMenu === "createOKR" && <AddManagerOKR />}
      {chosenMenu === "notification" && <NotificationView />}
      {chosenMenu === "dashboard" && <MainPage />}
    </AdminLayout>
  );
};

export default AdminPanel;
