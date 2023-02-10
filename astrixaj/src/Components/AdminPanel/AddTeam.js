import React, { useEffect, useState } from "react";
import { createTeam } from "../../Helpers/teams";
import SubHeader from "../SubHeader";
import { departments } from "./departments";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { AiOutlineUser, AiFillStar } from "react-icons/ai";
import { getEmployees } from "../../Helpers/employee";

const AddTeam = () => {
  const [team, setTeam] = useState({
    name: "",
    department: "",
    description: "",
    teamMembers: [],
  });
  const [teamLeader, setteamLeader] = useState("");
  const [employees, setEmployees] = useState([]);

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

  const getAllMembers = async () => {
    let members = await getEmployees();
    console.log(members, "members");
    setEmployees(members);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  console.log(employees, "employees");

  async function handleMemberClick(member) {
    if (team.teamMembers.findIndex((x) => x === member._id) !== -1) {
      setTeam({
        ...team,
        teamMembers: team.teamMembers.filter((item) => item !== member._id),
      });
      if (teamLeader === member._id) {
        setteamLeader({});
      }
    } else {
      setTeam({ ...team, teamMembers: [...team.teamMembers, member._id] });
    }
  }

  async function handleSubmit() {
    console.log(team);
    let result = await createTeam(team.name, team.description, team.teamMembers, teamLeader);
    console.log(result, "result");
    if (result) {
      setTeam({
        name: "",
        teamMembers: [],
        description: "",
      });
      setteamLeader("");
      getAllMembers();
    }
  }

  const handleClick = (event, member) => {
    switch (event.detail) {
      case 1: {
        handleMemberClick(member);
        break;
      }
      case 2: {
        setteamLeader(member._id);
        break;
      }

      default: {
        break;
      }
    }
  };

  console.log(team, "team");
  console.log(teamLeader, "teamLeader");

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
          {/* <Dropdown
            list={departments}
            label={"Choose Department"}
            handleChange={handleValueChange}
            name="department"
          /> */}
          <div>
            <label className="ml-3 mt-3 mb-3 text-xl font-semibold font-mono">
              Choose team members
            </label>
            <span className="text-sm ml-3 font-semibold text-green-700">
              (Double tap on profile to choose team leader)
            </span>
            <div className="flex items-center flex-wrap w-full ">
              {employees.length === 0 && (
                <p className="text-center text-pink-500 w-full my-8 font-semibold">
                  No employees found. Please add employees first.
                </p>
              )}
              {employees.map((member, index) => {
                return (
                  <div
                    onClick={(e) => handleClick(e, member)}
                    className={
                      "border relative cursor-pointer basis-1/6 m-2 border-dashed flex flex-col items-center space-y-2 rounded-md px-4 py-3 " +
                      (team.teamMembers.findIndex((x) => x === member._id) !== -1
                        ? teamLeader === member._id
                          ? "bg-green-100 border-green-600 text-blue-700"
                          : "bg-blue-100 border-green-600 text-blue-500"
                        : "bg-white border-gray-600")
                    }
                    key={index}
                  >
                    {teamLeader === member._id && (
                      <AiFillStar className="text-2xl text-yellow-500 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                    )}
                    <AiOutlineUser className="text-3xl " />
                    <div className="flex items-center flex-col justify-center">
                      <p className="break-words text-sm font-medium">{member.name}</p>
                      <p className="break-words text-xs font-medium text-center text-blue-500">
                        {member.designation}
                      </p>
                    </div>{" "}
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
