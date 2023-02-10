import React, { useState } from "react";
import AddPersonelOKR from "../../Components/AdminPanel/AddPersonelOKR";
import Layout from "../../Components/User/layout";

import ViewOKRS from "../../Components/User/ViewOKRS";

const Dashboard = () => {
  const [chosenMenu, setChosenMenu] = useState("StoreForm");

  return (
    <div>
      <Layout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
        {chosenMenu === "ViewOkr" && <ViewOKRS />}
        {chosenMenu === "createOKR" && <AddPersonelOKR />}
      </Layout>
    </div>
  );
};

export default Dashboard;
