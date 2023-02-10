import React, { useState } from "react";
import { createTeam } from "../../Helpers/teams";
import SubHeader from "../SubHeader";
import { departments } from "./departments";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { AiOutlineUser, AiFillStar } from "react-icons/ai";

const AddTeam = () => {
  const [team, setTeam] = useState({
    name: "",
    department: "",
    description: "",
    teamMembers: [],
  });
  const [teamLeader, setteamLeader] = useState("");

  async function handleValueChange(value, name) {
    setTeam({ ...team, [name]: value });
  }

  const teamMembers = [
    {
      name: "Lando Norris",
      role: "Leader",
    },
    {
      name: "Max Verstappen",
      role: "Member",
    },
    {
      name: "Charles Leclerc",
      role: "Member",
    },
    { name: "Lewis Hamilton", role: "Member" },
    {
      name: "Valtteri Bottas",
      role: "Member",
    },
    {
      name: "Sergio Perez",
      role: "Member",
    },
    {
      name: "Carlos Sainz",
      role: "Member",
    },
  ];
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

  async function handleMemberClick(member) {
    if (team.teamMembers.findIndex((x) => x.name === member.name) !== -1) {
      setTeam({
        ...team,
        teamMembers: team.teamMembers.filter(
          (item) => item.name !== member.name
        ),
      });
      if (teamLeader.name === member.name) {
        setteamLeader({});
      }
    } else {
      setTeam({ ...team, teamMembers: [...team.teamMembers, member] });
    }
  }

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

  const handleClick = (event, member) => {
    switch (event.detail) {
      case 1: {
        handleMemberClick(member);
        break;
      }
      case 2: {
        setteamLeader(member);
        break;
      }

      default: {
        break;
      }
    }
  };

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
          <div>
            <label className="ml-3 mt-3 mb-3 font-semibold font-mono">
              Choose team members
            </label>
            <span className="text-xs">
              (Double tap on profile to choose team leader)
            </span>
            <div className="flex items-center flex-wrap w-full ">
              {teamMembers.map((member, index) => {
                return (
                  <div
                    onClick={(e) => handleClick(e, member)}
                    className={
                      "border relative cursor-pointer basis-1/6 m-2 border-dashed flex flex-col items-center space-y-2 rounded-md px-4 py-3 " +
                      (team.teamMembers.findIndex(
                        (x) => x.name === member.name
                      ) !== -1
                        ? teamLeader.name === member.name
                          ? "bg-green-100 border-green-600 text-blue-700"
                          : "bg-blue-100 border-green-600 text-blue-500"
                        : "bg-white border-gray-600")
                    }
                    key={index}
                  >
                    {teamLeader.name === member.name && (
                      <AiFillStar className="text-2xl text-yellow-500 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                    )}
                    <AiOutlineUser className="text-3xl " />
                    <p className="break-words text-sm font-medium">
                      {member.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
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
