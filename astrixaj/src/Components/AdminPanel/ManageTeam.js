import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiFillEye, AiFillCheckCircle } from "react-icons/ai";
import { changeStatus, getTeams } from "../../Helpers/teams";
import SubHeader from "../SubHeader";
import { ColorRing } from "react-loader-spinner";

const ManageTeam = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  let getData = async () => {
    let result = await getTeams();
    // console.log(result, "result");
    if (result) {
      setLoading(false);
      setTeams(result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(teams, "teams");

  const handleStatusChange = async (id, status) => {
    let result = await changeStatus(id, status);
    if (result) {
      getData();
    }
  };

  return (
    <div>
      <SubHeader heading={"Manage Team"} />
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
        <div className="my-6 w-full rounded-md border border-gray-200">
          <table className="table-auto  w-full  bg-[#f7f8f9] rounded-lg">
            <thead>
              <tr className="text-sm font-thin">
                <th className="font-normal py-3">Team Name</th>
                <th className="font-normal py-3">No. of members</th>
                <th className="font-normal py-3">Department</th>
                <th className="font-normal py-3">Status</th>
                <th className="font-normal py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {teams.map((team) => {
                return (
                  <>
                    <tr className="text-center ">
                      <td className="text-sm py-3 text-gray-500">{team.name}</td>
                      <td className="text-sm  py-3 text-gray-500">{team.members.length}</td>
                      <td className="text-sm  py-3 text-gray-500">{team.department}</td>
                      <td className="text-sm  py-3 text-gray-500   ">
                        <span
                          className={`border px-3 py-1 rounded-full font-bold ${
                            team.is_active ? "bg-green-500 text-black" : "bg-red-600 text-white"
                          }`}
                        >
                          {team.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center space-x-1 justify-center">
                          {team.is_active ? (
                            <AiFillCloseCircle
                              className="text-2xl text-red-500 hover:text-red-600 cursor-pointer"
                              onClick={() => {
                                handleStatusChange(team._id, false);
                              }}
                            />
                          ) : (
                            <AiFillCheckCircle
                              className="text-2xl text-green-500 hover:text-green-600 cursor-pointer"
                              onClick={() => {
                                handleStatusChange(team._id, true);
                              }}
                            />
                          )}
                          <AiFillEye className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                    ;
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTeam;
