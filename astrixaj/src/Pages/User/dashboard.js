import React, { useState } from "react";
import Layout from "../../Components/User/layout";
import ManageMiles from "../../Components/User/ManageMiles";

import ViewOKRS from "../../Components/User/ViewOKRS";

const Dashboard = () => {
  const [chosenMenu, setChosenMenu] = useState("StoreForm");

  return (
    <div>
      <Layout chosenMenu={chosenMenu} setChosenMenu={setChosenMenu}>
        {chosenMenu === "ViewOkr" && <ViewOKRS />}
      </Layout>
    </div>
  );
};

export default Dashboard;
