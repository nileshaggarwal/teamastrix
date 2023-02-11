import React, { useState } from "react";
import AddPersonelOKR from "../../Components/AdminPanel/AddPersonelOKR";
import NotificationView from "../../Components/AdminPanel/NotificationView";
import Aiprompt from "../../Components/User/Aiprompt";
import CreateSubMilestone from "../../Components/User/CreateSubMilestone";
import Layout from "../../Components/User/layout";

import ViewOKRS from "../../Components/User/ViewOKRs";
import ViewTeamOKR from "../../Components/User/ViewTeamOKR";

const Dashboard = () => {
  const [chosenMenu, setChosenMenu] = useState("StoreForm");

  return (
    <div>
      <Layout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
        {chosenMenu === "createOKR" && <AddPersonelOKR />}
        {chosenMenu === "notifications" && <NotificationView />}
        {chosenMenu === "OKR" && <ViewOKRS />}
        {chosenMenu === "TeamOKR" && <ViewTeamOKR />}
        {chosenMenu === "createSubMilestone" && <CreateSubMilestone />}
        {chosenMenu === "ai" && <Aiprompt />}
      </Layout>
    </div>
  );
};

export default Dashboard;
