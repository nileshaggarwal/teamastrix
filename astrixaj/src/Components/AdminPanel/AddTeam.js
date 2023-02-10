import React, { useState } from "react";
import SubHeader from "../SubHeader";
import Dropdown from "./Dropdown";
import Input from "./Input";

const AddTeam = () => {
  const [team, setTeam] = useState({
    name: "",
    department: "",
    description: "",
  });

  async function handleValueChange(value, name) {
    setTeam({ ...team, [name]: value });
  }

  const departments = [
    {
      name: "CSE",
      value: "cse",
    },
    {
      name: "ECE",
      value: "ece",
    },
    {
      name: "EEE",
      value: "eee",
    },
    {
      name: "MECH",
      value: "mech",
    },
  ];

  async function handleSubmit() {
    console.log(team);
  }

  return (
    <>
      <SubHeader heading={"Add Team"} />
      <div className="my-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="flex flex-col w-3/5 space-y-4">
          <Input
            label={"Name of Team"}
            type="text"
            handleChange={handleValueChange}
            value={team.name}
            name="name"
          />
          <Input
            label={"Descripiton of Team"}
            type="text"
            handleChange={handleValueChange}
            value={team.description}
            name="description"
          />
          <Dropdown
            list={departments}
            label={"Choose Department"}
            handleChange={handleValueChange}
            name="department"
          />
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

export default AddTeam;
