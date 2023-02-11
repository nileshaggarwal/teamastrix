import React from "react";
const data = [
  {
    id: 1,
    name: "OKR 1",
  },
  {
    id: 1,
    name: "OKR 1",
  },
  {
    id: 1,
    name: "OKR 1",
  },
  {
    id: 1,
    name: "OKR 1",
  },
  {
    id: 1,
    name: "OKR 1",
  },
  {
    id: 1,
    name: "OKR 1",
  },
  {
    id: 1,
    name: "OKR 1",
  },
];

const color = (value) => {
  if (value < 40 && value > 0) {
    return "bg-red-500";
  } else if (value < 70 && value > 40) {
    return "bg-yellow-500";
  } else {
    return "bg-green-500";
  }
};

const MainPage = () => {
  let random = Math.floor(Math.random() * 100) + 1;
  return (
    <div>
      <div>
        {/* <Header /> */}
        <p className="text-xl p-5 text-blue-500">OKR HeatMap</p>
        <div className="flex flex-wrap gap-5 p-5 w-full m-auto">
          {data.map((item) => (
            <div
              key={item.id}
              className={`w-[200px] h-[200px] ${color(
                random
              )} flex items-center justify-center text-lg`}
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
