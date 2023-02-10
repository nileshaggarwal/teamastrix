import React, { useState } from "react";
import SubHeader from "../SubHeader";
import Dropdown from "./Dropdown";
import Input from "./Input";

const AddPersonelOKR = () => {
  const [team, setTeam] = useState({
    name: "",
    date: "",
    targetType: "",
    targetValue: "",
  });

  async function handleValueChange(value, name) {
    setTeam({ ...team, [name]: value });
  }

  const departments = [
    {
      name: "percentage",
      value: "cse",
    },
    {
      name: "number",
      value: "ece",
    },
    {
      name: "currency",
      value: "eee",
    },
  ];

  async function handleSubmit() {
    console.log(team);
  }

  const [numberoffields, setNumberoffields] = useState(1);

  const [milestones, setMilestones] = useState([
    {
      milestone: "",
      type: "",
      currentValue: "",
      targetValue: "",
      due_date: "",
    },
  ]);

  function removeCustomBody(id) {
    var newArr = [...milestones];
    newArr = newArr.filter((obs, index) => index !== id);
    setMilestones(newArr);
    var hello = numberoffields;
    hello = hello - 1;
    setNumberoffields(hello);
  }

  const handleMilestonerData = (value, index, thing) => {
    console.log(value, "value");
    if (milestones[index]) {
      let newArr = [...milestones];

      newArr[index][thing] = value;

      setMilestones(newArr);
    }
  };

  function incereasenumber() {
    var hey = numberoffields;
    hey = hey + 1;
    setNumberoffields(hey);
    setMilestones((arr) => [
      ...arr,
      {
        milestone: "",
        type: "",
        currentValue: "",
        targetValue: "",
        due_date: "",
      },
    ]);
  }
  console.log(milestones);

  var rows = [];
  for (let index = 0; index < numberoffields; index++) {
    rows.push(
      <div className="py-3 shadow-lg">
        <div className="ml-3 mt-3 mb-3 font-semibold font-mono flex items-center justify-between">
          <div> MileStone{index + 1} </div>
          {index > 0 && (
            <button onClick={() => removeCustomBody(index)} type="button">
              Remove
            </button>
          )}
        </div>
        <input
          type="text"
          onChange={(e) =>
            handleMilestonerData(e.target.value, index, "milestone")
          }
          value={milestones[index] ? milestones[index].milestone : ""}
          className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />

        <Dropdown
          list={departments}
          label={"Choose Target Type"}
          handleChange={handleMilestonerData}
          index={index}
          name="targetType"
          type="array"
        />

        <div className="ml-3 mt-3 mb-3 font-semibold font-mono">
          CurrentValue
        </div>
        <input
          type="text"
          onChange={(e) =>
            handleMilestonerData(e.target.value, index, "currentValue")
          }
          value={milestones[index] ? milestones[index].currentValue : ""}
          className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="ml-3 mt-3 mb-3 font-semibold font-mono">
          targetValue
        </div>
        <input
          type="text"
          onChange={(e) =>
            handleMilestonerData(e.target.value, index, "targetValue")
          }
          value={milestones[index] ? milestones[index].targetValue : ""}
          className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <div className="ml-3 mt-3 mb-3 font-semibold font-mono">Due Date</div>
        <input
          type="date"
          onChange={(e) =>
            handleMilestonerData(e.target.value, index, "due_date")
          }
          value={milestones[index] ? milestones[index].due_date : ""}
          className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
    );
  }

  return (
    <>
      <SubHeader heading={"Add Personel OKR"} />
      <div className="my-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="flex flex-col w-3/5 space-y-4">
          <Input
            label={"Key Objective"}
            type="text"
            handleChange={handleValueChange}
            value={team.name}
            name="name"
          />
          <Input
            label={"Due Date"}
            type="date"
            handleChange={handleValueChange}
            value={team.date}
            name="date"
          />
          <Dropdown
            list={departments}
            label={"Choose Target Type"}
            handleChange={handleValueChange}
            name="targetType"
          />
          <Input
            label={"Taget"}
            type="percentage"
            handleChange={handleValueChange}
            value={team.targetValue}
            name="targetValue"
          />
          <button
            onClick={incereasenumber}
            className="w-[30%] border rounded-md py-2 bg-amber-300 hover:bg-amber-500 hover:text-white text-amber-900"
          >
            Add Milestone +
          </button>
          <div className="py-3">{rows}</div>
          <button
            onClick={handleSubmit}
            className="w-full border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPersonelOKR;
