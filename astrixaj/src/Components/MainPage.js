import React, { useEffect, useState } from "react";
import { generateHeatMap } from "../Helpers/teams";

const color = (value) => {
  console.log(value);
  if (value < 25) {
    return "bg-red-500";
  } else if (value < 50) {
    return "bg-yellow-500";
  } else if (value < 75) {
    return "bg-orange-500";
  } else {
    return "bg-green-500";
  }
};

const MainPage = () => {
  const [teams, setTeams] = useState([]);

  async function getHeatMap() {
    const response = await generateHeatMap();
    setTeams(response);
    if (!response) {
      console.log("error");
    }
  }

  useEffect(() => {
    getHeatMap();
  }, []);

  return (
    <div>
      <div>
        {/* <Header /> */}
        <p className="text-xl p-5 text-blue-500">Team HeatMap</p>
        <div className="flex flex-wrap gap-5 p-5 w-full m-auto">
          {teams?.map((item) => (
            <div
              key={item.id}
              className={`w-[200px] h-[200px] ${color(
                item.heat_map
              )} flex items-center justify-center text-lg rounded-md`}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
