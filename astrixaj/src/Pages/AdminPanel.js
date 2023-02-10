import React, { useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import AddTeam from "../Components/AdminPanel/AddTeam";
import ManageTeam from "../Components/AdminPanel/ManageTeam";

const AdminPanel = () => {
  const [chosenMenu, setChosenMenu] = useState("createTeam");

  return (
    <AdminLayout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
      {chosenMenu === "manageTeam" && <ManageTeam />}
      {chosenMenu === "createTeam" && <AddTeam />}
    </AdminLayout>
  );
};

export default AdminPanel;
