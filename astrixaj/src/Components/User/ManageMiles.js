import React from "react";
import { AiFillCloseCircle, AiFillEye } from "react-icons/ai";
import SubHeader from "../SubHeader";
import Layout from "./layout";

const ManageMiles = () => {
  return (
    <div>
      <Layout>
        <SubHeader heading={"Manage MilesStones"} />
        <div className="my-6 w-full rounded-md border border-gray-200">
          <table className="table-auto  w-full  bg-[#f7f8f9] rounded-lg">
            <thead>
              <tr className="text-sm font-thin">
                <th className="font-normal py-3">Milestone</th>
                <th className="font-normal py-3">Team Assigned</th>
                <th className="font-normal py-3">Completion Level</th>
                <th className="font-normal py-3">Due Date</th>
                <th className="font-normal py-3">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              <tr className="text-center">
                <td className="flex items-center justify-center py-4">
                  sdhbshdbsbdh
                </td>
                <td className="text-sm text-gray-500">DevOps Team</td>
                <td className="text-sm text-gray-500">percentage</td>
                <td className="text-sm text-gray-500">12/3/232</td>

                <td>
                  <div className="flex items-center space-x-1 justify-center">
                    <AiFillEye className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default ManageMiles;
