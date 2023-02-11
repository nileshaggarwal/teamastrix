import React, { useState, useEffect } from "react";
import SubHeader from "../SubHeader";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { isAuthenticated } from "../../Helpers/auth";
import { createObjective, createKeyResults } from "../../Helpers/goals";
import { getAllTeams } from "../../Helpers/teams";

const AddManagerOKR = () => {
  const [okr, setOkr] = useState({
    name: "",
    date: "",
    targetType: "",
    targetValue: "",
    teamSelected: "",
  });
  const [teams, setTeams] = useState([]);

  async function handleTeams() {
    let teams = await getAllTeams();
    if (!teams) {
      console.log("error");
    }
    setTeams(teams);
    let newArr = [...milestones];
    if (teams[0].members.length > 0) {
      newArr[0].userSelected = teams[0].members;
      console.log(newArr, "newArr");
      setMilestones(newArr);
    }
  }
  console.log(teams, "teams main");
  useEffect(() => {
    handleTeams();
  }, []);

  async function handleValueChange(value, name) {
    setOkr({ ...okr, [name]: value });
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
    console.log(okr);
  }

  const [numberoffields, setNumberoffields] = useState(1);

  const [milestones, setMilestones] = useState([
    {
      milestone: "",
      type: "",
      currentValue: "",
      targetValue: "",
      due_date: "",
      userSelected: "",
    },
  ]);

  console.log(milestones, "milestones sex");
  async function onSubmit() {
    let body = {
      name: okr.name,
      equal_percentage: false,
      created_by: "manager",
      created_by_id: isAuthenticated().id,
      created_for: "team",
      assigned_team: okr.teamSelected._id,
      target_value: okr.targetValue,
      target_type: okr.targetType.name,
      due_date: okr.date,
    };
    console.log(body, "body");
    createObjective(body).then((data, err) => {
      console.log(data, "data 2");

      if (err) {
        console.log(err);
      } else {
        console.log(data, milestones, "chut");
        let goal_id = data.data._id;

        for (let i = 0; i < milestones.length; i++) {
          console.log(milestones[i], "milestones[i]");
          let body2 = {
            target_value: milestones[i].currentValue,
            due_date_key: milestones[i].due_date,
            milestone: milestones[i].milestone,
            assigned_to_teams: [okr.teamSelected._id],

            created_by_key: "manager",
            created_by_id_key: isAuthenticated().id,
            created_for_key: "member",
            assigned_to: milestones[i].userSelected,
          };
          console.log(body2, "body main onSUbmit");
          createKeyResults(body2, goal_id).then((data2, err) => {
            console.log(data2, "data2");
            if (err) {
              console.log(err);
            } else {
              console.log(data2);
            }
          });
        }
      }
    });
  }

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
  console.log(okr.teamSelected.members, "teamSelected");

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
        {okr?.teamSelected?.members?.length > 0 && (
          <div className="py-3">
            <Dropdown
              list={teams && okr.teamSelected.members}
              label={"Choose a EMployee"}
              handleChange={handleMilestonerData}
              index={index}
              type="arraydiff"
              name="userSelected"
            />
          </div>
        )}

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
  console.log(teams, "teams");

  return (
    <>
      <SubHeader
        heading={"Add Manager OKR"}
        classname="text-blue-600 font-bold text-xl"
      />
      <div className="my-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="flex flex-col w-3/5 space-y-4">
          <Input
            label={"Key Objective"}
            type="text"
            handleChange={handleValueChange}
            value={okr.name}
            name="name"
          />
          {teams && teams.length > 0 && (
            <Dropdown
              list={teams && teams}
              label={"Choose a Team"}
              handleChange={handleValueChange}
              name="teamSelected"
              value={okr.teamSelected}
            />
          )}

          <Input
            label={"Due Date"}
            type="date"
            handleChange={handleValueChange}
            value={okr.date}
            name="date"
          />
          <Dropdown
            list={departments}
            label={"Choose Target Type"}
            handleChange={handleValueChange}
            name="targetType"
            value={okr.targetType}
          />
          <Input
            label={"Target Value"}
            type="percentage"
            handleChange={handleValueChange}
            value={okr.targetValue}
            name="targetValue"
          />

          <div className="py-3">{rows}</div>
          <button
            onClick={onSubmit}
            className="w-full border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900"
          >
            Submit
          </button>
          <button
            onClick={incereasenumber}
            className="w-[30%] border rounded-md py-2 bg-amber-300 hover:bg-amber-500 hover:text-white text-amber-900"
          >
            Add Milestone +
          </button>
        </div>
      </div>
    </>
  );
};

export default AddManagerOKR;
