import React, { useState } from "react";
import { createTeam } from "../../Helpers/teams";
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
      name: "Strategy",
      value: "strategy",
    },
    {
      name: "Marketing",
      value: "marketing",
    },
    {
      name: "Finance",
      value: "finance",
    },
    {
      name: "Human Resources",
      value: "hr",
    },
    {
      name: "Operations",
      value: "operations",
    },
    {
      name: "Engineering",
      value: "engineering",
    },
  ];

  async function handleSubmit() {
    console.log(team);
    let result = await createTeam(team.name, team.description, team.department);
    console.log(result, "result");
    if (result) {
      setTeam({
        name: "",
        department: "",
        description: "",
      });
    }
  }

  return (
    <>
      <SubHeader heading={"Add Team"} />
      <div className="mt-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 mb-40">
        <div className="flex flex-col w-3/5 space-y-4">
          <Input
            label={"Name of Team"}
            type="text"
            handleChange={handleValueChange}
            defaultValue={team.name}
            name="name"
            value={team.name}
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
