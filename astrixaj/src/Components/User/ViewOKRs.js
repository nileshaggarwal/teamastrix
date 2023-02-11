import React, { useEffect, useState } from "react";
import { getOkrsByUserId, updateOkrProgress } from "../../Helpers/goals";
import SubHeader from "../SubHeader";

const ViewOKRs = () => {
  const [okrs, setOkrs] = useState([]);
  const [copyOkrs, setCopyOkrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOkrs = async () => {
    let res = await getOkrsByUserId();
    setOkrs(res);
    setCopyOkrs(res);
  };

  useEffect(() => {
    getOkrs();
    setLoading(false);
  }, []);

  async function handleChange(e, index) {
    let newArr = [...copyOkrs];
    newArr[index]["value"] = e.target.value;
    setCopyOkrs(newArr);
  }

  const updateProgress = async (id, index) => {
    await updateOkrProgress(id, okrs[index].value);
  };

  console.log(okrs, "okrs", copyOkrs, "copyOkrs");

  return (
    <>
      <SubHeader heading={"View OKR's"} />
      <div className="my-6 w-full rounded-md border border-gray-200">
        <table className="table-auto  w-full  bg-[#f7f8f9] rounded-lg">
          <thead>
            <tr className="text-sm font-thin">
              <th className="font-normal py-3">Progress</th>
              <th className="font-normal py-3">Key Results</th>
              <th className="font-normal py-3">Achieved Value</th>
              <th className="font-normal py-3">Target Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {loading ? (
              <p>Loading ...</p>
            ) : (
              okrs.map((item, index) => {
                return (
                  <tr className="text-sm font-thin my-3">
                    <td className="font-normal py-3 text-center justify-center">
                      <div className="px-1 py-2">
                        <div
                          className="radial-progress text-green-500 text-sm"
                          style={{
                            "--value": (item.value / item.target_value) * 100,
                            "--size": "3.5rem",
                            "--thickness": "2px",
                          }}
                        >
                          {((item.value / item.target_value) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </td>
                    <td className="font-normal py-3 text-center justify-center">
                      {item.milestone}
                    </td>
                    <td className="font-normal py-3 text-center justify-center flex items-center space-x-1">
                      <input
                        className="border-b border-gray-400 focus:border-blue-500 "
                        value={copyOkrs[index].value}
                        type="number"
                        onChange={(e) => handleChange(e, index)}
                      />
                      <button
                        onClick={() => updateProgress(item._id, index)}
                        className="px-2 py-1 text-center justify-center bg-green-600 text-white rounded-md"
                      >
                        Update
                      </button>
                    </td>
                    <td className="font-normal py-3 text-center">
                      {item.type === "percentage" && (
                        <p className="text-center">{item.target_value}%</p>
                      )}
                      {item.type === "number" && <p className="text-center">{item.target_value}</p>}
                      {item.type === "currency" && (
                        <p className="text-center text-black font-bold"> Rs {item.target_value}</p>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewOKRs;
