import React from "react";
import { AiFillCloseCircle, AiFillEye } from "react-icons/ai";
import SubHeader from "../SubHeader";

const ManageTeam = () => {
  return (
    <div>
      <SubHeader heading={"Manage Team"} />
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
            <tr className="text-center">
              <td className="flex items-center justify-center py-4">
                <img
                  className="w-10 h-10 rounded-md"
                  alt=""
                  src="https://upload.wikimedia.org/wikipedia/commons/1/12/Eureka_Logo_Baseline_Vertical_Color_RGB_Medium.png"
                />
              </td>
              <td className="text-sm text-gray-500">DevOps Team</td>
              <td className="text-sm text-gray-500">100</td>
              <td className="text-sm text-gray-500">Devops</td>
              <td className="text-sm text-gray-500   ">
                <span className="border px-3 py-1 rounded-full bg-black text-white">
                  Active
                </span>
              </td>
              <td>
                <div className="flex items-center space-x-1 justify-center">
                  <AiFillCloseCircle className="text-xl text-red-500 hover:text-red-600 cursor-pointer" />
                  <AiFillEye className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                </div>
              </td>
            </tr>
            <tr className="text-center">
              <td className="flex items-center justify-center py-4">
                <img
                  className="w-10 h-10 rounded-md"
                  alt=""
                  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01104813/1268-768x591.png"
                />
              </td>
              <td className="text-sm text-gray-500">MERN Developers</td>
              <td className="text-sm text-gray-500">50</td>
              <td className="text-sm text-gray-500">Development</td>
              <td className="text-sm text-gray-500   ">
                <span className="border px-3 py-1 rounded-full bg-red-400 text-white">
                  Inactive
                </span>
              </td>
              <td>
                <div className="flex items-center space-x-1 justify-center">
                  <AiFillCloseCircle className="text-xl text-red-500 hover:text-red-600 cursor-pointer" />
                  <AiFillEye className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTeam;
