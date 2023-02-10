import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import AddEmployee from "../Components/AdminPanel/AddEmployee";
import AddTeam from "../Components/AdminPanel/AddTeam";
import ManageOKR from "../Components/AdminPanel/ManageOKR";
import ManageTeam from "../Components/AdminPanel/ManageTeam";
import { isAuthenticated } from "../Helpers/auth";

const AdminPanel = () => {
  const [chosenMenu, setChosenMenu] = useState("createTeam");

  return (
    <AdminLayout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
      {chosenMenu === "manageTeam" && <ManageTeam />}
      {chosenMenu === "createTeam" && <AddTeam />}
      {chosenMenu === "addEmployee" && <AddEmployee />}
      {chosenMenu === "manageOKR" && <ManageOKR />}
    </AdminLayout>
  );
};

export default AdminPanel;
