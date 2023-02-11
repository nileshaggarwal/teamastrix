import React, { useState } from "react";
import AddPersonelOKR from "../../Components/AdminPanel/AddPersonelOKR";
import NotificationView from "../../Components/AdminPanel/NotificationView";
import Layout from "../../Components/User/layout";
import ManageMiles from "../../Components/User/ManageMiles";

import ViewOKRS from "../../Components/User/ViewOKRs";

const Dashboard = () => {
  const [chosenMenu, setChosenMenu] = useState("StoreForm");

  return (
    <div>
      <Layout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
        {chosenMenu === "ManageMiles" && <ManageMiles />}
        {chosenMenu === "createOKR" && <AddPersonelOKR />}
        {chosenMenu === "notifications" && <NotificationView />}
        {chosenMenu === "OKR" && <ViewOKRS />}
      </Layout>
    </div>
  );
};

export default Dashboard;
