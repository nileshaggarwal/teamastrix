import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router-dom";

const HeaderPara = ({ text }) => {
  return <p className="bg-[#f7f8f9] px-2 py-3">{text}</p>;
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
  ];

  return (
    <div>
      <h3 className="font-bold pb-4 text-xl">View Team</h3>
      <div className="flex flex-col space-y-8 bg-white rounded-md px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold px-2">
            Viewing Team <span>{"MERN BLASTERS"}</span>
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
            <div className="flex flex-col">
              {teamMembers.map((member, index) => (
                <div
                  className={
                    "flex flex-col px-2 py-2 " +
                    (index % 2 === 0 ? "bg-white" : "bg-gray-200 ")
                  }
                >
                  <p>{member.name}</p>
                  <p>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="basis-1/2 rounded-md ">
            <HeaderPara text="Assigned Objectives" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
