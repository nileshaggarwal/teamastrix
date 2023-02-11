import React from "react";
import SubHeader from "../SubHeader";

const ViewOKRs = () => {
  return (
    <>
      <SubHeader heading={"View OKR's"} />
      <div className="my-6 w-full rounded-md border border-gray-200">
        <table className="table-auto  w-full  bg-[#f7f8f9] rounded-lg">
          <thead>
            <tr className="text-sm font-thin">
              <th className="font-normal py-3">Key Objective</th>
              <th className="font-normal py-3">Achieved Value</th>
              <th className="font-normal py-3">Target Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            <tr className="text-sm font-thin">
              <td className="font-normal py-3 text-center justify-center">
                To develop ass
              </td>
              <td className="font-normal py-3 text-center justify-center flex items-center space-x-1">
                <input
                  className="border-b border-gray-400 focus:border-blue-500 "
                  value={"20"}
                />
                <button className="px-2 py-1 text-center justify-center bg-green-600 text-white rounded-md">
                  Update
                </button>
              </td>
              <td className="font-normal py-3 text-center">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewOKRs;
