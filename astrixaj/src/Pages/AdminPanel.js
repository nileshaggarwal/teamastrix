import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import AddTeam from "../Components/AdminPanel/AddTeam";
import ManageTeam from "../Components/AdminPanel/ManageTeam";
import { isAuthenticated } from "../Helpers/auth";

const AdminPanel = () => {
  const [chosenMenu, setChosenMenu] = useState("createTeam");

  const router = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      router("/login");
    }
  }, []);

  return (
    <AdminLayout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
      {chosenMenu === "manageTeam" && <ManageTeam />}
      {chosenMenu === "createTeam" && <AddTeam />}
    </AdminLayout>
  );
};

export default AdminPanel;
