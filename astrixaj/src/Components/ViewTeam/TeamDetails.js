import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router-dom";
import EditTeamDetails from "./EditTeamDetails";
import { getTeamById } from "../../Helpers/teams";
import { ColorRing } from "react-loader-spinner";

const HeaderPara = ({ text }) => {
  return <p className="bg-amber-100 text-amber-900 px-2 py-3 rounded-t-md">{text}</p>;
};

const TeamDetails = () => {
  const [canEdit, setCanEdit] = useState(false);

  const { teamId } = useParams();

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
    {
      name: "Lewis Hamilton",
      role: "Member",
    },
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

  const Objectives = [
    {
      name: "To develop a website for a client",
      target: "100",
      target_type: "percentage",
      acieved: 50,
      assigned: "05/12/2021",
      deadline: "12/12/2021",
    },
    {
      name: "To teach a class of 10 students",
      target: "60",
      target_type: "number",
      acieved: 20,
      assigned: "05/12/2021",
      deadline: "15/12/2021",
    },
    {
      name: "To earn 1000 dollars",
      target: "1000",
      target_type: "currency",
      acieved: 550,
      assigned: "05/12/2021",
      deadline: "20/12/2021",
    },
  ];

  const [team, setTeam] = useState({
    name: "MERN BLASTERS",
    department: {
      name: "CSE",
      value: "cse",
    },
    description: "A team of MERN stack developers",
    teamMembers: teamMembers,
    Objectives: Objectives,
  });

  const [teamMembersList, setTeamMembersList] = useState({});
  const [loading, setLoading] = useState(true);

  const getTeam = async () => {
    let res = await getTeamById(teamId);
    console.log(res, "res");
    setTeamMembersList(res);
  };

  useEffect(() => {
    getTeam();
    setLoading(false);
  }, []);

  const teamDetails = {
    name: "MERN BLASTERS",
    department: {
      name: "CSE",
      value: "cse",
    },
    description: "A team of MERN stack developers",
    teamMembers: teamMembers,
    Objectives: Objectives,
  };

  async function handleChange(value, name) {
    setTeam({ ...team, [name]: value });
  }

  console.log(canEdit);

  console.log(teamMembersList, "teamMembersList");

  return (
    <>
      <div>
        <h3 className="font-bold pb-4 text-xl">View Team</h3>
        <div className="flex flex-col space-y-8 bg-white rounded-md px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold px-2">
              Viewing Team :<span className="text-md text-blue-600">{teamMembersList.name}</span>
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={async () => {
                  await localStorage.setItem("gotovalue", "manageTeam");
                  window.location.assign("/");
                }}
                className="flex items-center space-x-2 border text-gray-600 hover:bg-blue-500 hover:border-white hover:text-white font-medium rounded-md px-2 py-1"
              >
                <BiArrowBack /> Back
              </button>

              <button
                onClick={() => setCanEdit(!canEdit)}
                className="flex items-center space-x-2 border text-gray-600 hover:bg-blue-500 hover:border-white hover:text-white font-medium rounded-md px-2 py-1"
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="basis-1/2 rounded-md border ">
              <HeaderPara text="Team Members" />
              <div className="flex flex-col divide-y h-96 divide-gray-400  overflow-y-scroll noscrollbar">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    />
                  </div>
                ) : (
                  <>
                    <div className={"flex flex-col px-2 py-2 relative"}>
                      <p className="font-medium">{teamMembersList?.leader?.name}</p>
                      <p className="text-sm">Leader</p>
                      <div className="absolute bottom-0 right-0 p-2">
                        <p className="text-xs text-blue-500 font-semibold">
                          {teamMembersList?.leader?.designation}
                        </p>
                      </div>
                    </div>
                    {teamMembersList?.members?.map((member, index) => {
                      if (member._id !== teamMembersList.leader._id) {
                        return (
                          <div className={"flex flex-col px-2 py-2 relative"}>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm">Member</p>
                            <div className="absolute bottom-0 right-0 p-2">
                              <p className="text-xs text-blue-500 font-semibold">
                                {member.designation}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            </div>
            <div className="basis-1/2 rounded-md border ">
              <HeaderPara text="Assigned Objectives" />
              <div className="flex flex-col divide-y h-96 divide-gray-400  overflow-y-scroll noscrollbar">
                {Objectives.map((objective, index) => (
                  <div className={"flex  "}>
                    <div className="px-1 py-2">
                      <div
                        className="radial-progress text-green-500 text-sm"
                        style={{
                          "--value": (objective.acieved / objective.target) * 100,
                          "--size": "3.5rem",
                          "--thickness": "2px",
                        }}
                      >
                        {((objective.acieved / objective.target) * 100).toFixed(2)}%
                      </div>
                    </div>
                    <div className={"flex flex-col px-2 py-2 grow justify-between basis-2/3 "}>
                      <p className="font-medium">{objective.name}</p>
                      <p className="text-sm">
                        Status:{objective.acieved}
                        {objective.target_type === "percentage"
                          ? "%"
                          : objective.target_type === "currency"
                          ? "$"
                          : ""}
                        /{objective.target}
                        {objective.target_type === "percentage"
                          ? "%"
                          : objective.target_type === "currency"
                          ? "$"
                          : ""}
                      </p>
                    </div>
                    <div
                      className={"flex flex-col px-2 py-2 grow justify-between basis-1/3 text-sm "}
                    >
                      <p className="text-green-600">Assigned:{objective.assigned}</p>
                      <p className="text-red-600">Due:{objective.deadline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {canEdit && teamMembersList && (
        <EditTeamDetails
          isOpen={canEdit}
          closeModal={() => setCanEdit(false)}
          team={teamMembersList}
          setTeam={setTeam}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

export default TeamDetails;
