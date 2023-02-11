import { Fragment, useState, useEffect } from "react";
import { AiFillCloseCircle, AiFillEye } from "react-icons/ai";
import SubHeader from "../SubHeader";
import Layout from "./layout";
import { Dialog, Transition } from "@headlessui/react";
import { getOkrsByUserId } from "../../Helpers/goals";

const ManageMiles = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState("update");

  const [okrs, setOkrs] = useState([]);
  const [selectedOkr, setSelectedOkr] = useState();

  async function getOkrs() {
    let okrs = await getOkrsByUserId();
    if (!okrs) {
      console.log("error so no okrs");
    }
    setOkrs(okrs);
  }

  useEffect(() => {
    getOkrs();
  }, []);

  console.log(okrs, "okrs");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  console.log(selectedOkr, "selectedOkr");
  const transitionComponent = () => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all">
                  <div className="h-[30rem]">
                    <div className="px-3 bg-gray-100 pb-6 h-[40%]">
                      <div className=" flex items-center border-b-[1px] ">
                        <div className="text-sm font-[600]">Milestone:</div>
                        <div className="text-sm font-[500] pl-3">
                          {selectedOkr?.milestone}
                        </div>
                      </div>
                      <div className=" flex items-center border-b-[1px]">
                        <div className="text-sm font-[600]">Team Assigned:</div>
                        <div className="text-sm font-[500] pl-3">
                          {selectedOkr?.assigned_to_teams?.name}
                        </div>
                      </div>
                      <div className=" flex items-center border-b-[1px]">
                        <div className="text-sm font-[600]">User Assigned:</div>
                        <div className="text-sm font-[500] pl-3">YourSelf </div>
                      </div>
                      <div className=" flex items-center border-b-[3px]">
                        <div className="text-sm font-[600]">Due Date:</div>
                        <div className="text-sm font-[500] pl-3">
                          {selectedOkr?.due_date_key.substring(0, 10)}
                        </div>
                      </div>
                    </div>
                    <div className=" flex items-center border-b-[1px]  ">
                      <div
                        onClick={() => setMenu("update")}
                        className={`text-lg font-[600] w-1/2 text-center  ${
                          menu === "update" && "underline underline-offset-1"
                        }`}
                      >
                        Update Level
                      </div>
                      <div
                        onClick={() => setMenu("comment")}
                        className={`text-lg font-[600] w-1/2 text-center  ${
                          menu !== "update" && "underline underline-offset-1"
                        }`}
                      >
                        Comments
                      </div>
                    </div>
                    {menu === "update" ? (
                      <div className="pt-20 mx-3 ">
                        <div className="text-lg font-[600] ">
                          Update Completion Level
                        </div>
                        <div className=" py-3">
                          <input className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                        </div>
                        <div>
                          <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
                            Edit Level
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-3 mx-3 h-[65%] overflow-y-scroll ">
                        <div className="shadow-lg my-3 bg-gray-100 rounded-md px-3">
                          <div className="flex items-center justify-center">
                            <div className="w-1/2 ">By : Harsh Gawas</div>
                            <div className="w-1/2 ">21/08/23223</div>
                          </div>
                          <div className="pt-1 font-sans italic">
                            Hey its a really tough milestone...
                          </div>
                        </div>
                        <div className="shadow-lg my-3 bg-gray-100 rounded-md px-3">
                          <div className="flex items-center justify-center">
                            <div className="w-1/2 ">By : Harsh Gawas</div>
                            <div className="w-1/2 ">21/08/23223</div>
                          </div>
                          <div className="pt-1 font-sans italic">
                            Hey its a really tough milestone...
                          </div>
                        </div>
                        <div className="shadow-lg my-3 bg-gray-100 rounded-md px-3">
                          <div className="flex items-center justify-center">
                            <div className="w-1/2 ">By : Harsh Gawas</div>
                            <div className="w-1/2 ">21/08/23223</div>
                          </div>
                          <div className="pt-1 font-sans italic">
                            Hey its a really tough milestone...
                          </div>
                        </div>
                        <div className="shadow-lg my-3 bg-gray-100 rounded-md px-3">
                          <div className="flex items-center justify-center">
                            <div className="w-1/2 ">By : Harsh Gawas</div>
                            <div className="w-1/2 ">21/08/23223</div>
                          </div>
                          <div className="pt-1 font-sans italic">
                            Hey its a really tough milestone...
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="">
                            <input className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
                          </div>
                          <div className="py-3">
                            <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
                              Add Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div>
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
            {okrs &&
              okrs.map((okr) => {
                return (
                  <tr className="text-center">
                    <td className="flex items-center justify-center py-4">
                      {okr?.milestone}
                    </td>
                    <td className="text-sm text-gray-500">
                      {okr?.assigned_to_teams?.name}
                    </td>
                    <td className="text-sm text-gray-500">
                      {okr?.value / okr?.target_value}
                    </td>
                    <td className="text-sm text-gray-500">
                      {okr?.due_date_key.substring(0, 10)}
                    </td>

                    <td>
                      <div className="flex items-center space-x-1 justify-center">
                        <AiFillEye
                          className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
                          onClick={() => {
                            setSelectedOkr(okr);
                            openModal();
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {transitionComponent()}
      </div>
    </div>
  );
};

export default ManageMiles;
