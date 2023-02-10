import React, { useState } from "react";
import SubHeader from "../SubHeader";
import { Disclosure } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { Objectives } from "./objectives";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import moment from "moment";
import EditOkr from "./EditOkr";
const ManageOKR = () => {
  const [editFor, setEditFor] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState(false);

  async function closeModal() {
    await setEditFor("");
    await setEditIndex(null);
    await setEdit(false);
  }

  async function openModal(editFor, index) {
    await setEditFor(editFor);
    await setEditIndex(index);
    await setEdit(true);
  }

  return (
    <div>
      <SubHeader heading={"Manage OKR's"} />
      <div className="my-6 w-full rounded-md ">
        <div className="flex flex-col space-y-4 w-full">
          {Objectives.map((objective, index) => {
            return (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <div
                        className="border py-2 px-2 w-full flex items-center justify-between rounded-md divide-x divide-gray-200"
                        key={index}
                      >
                        <div className="flex items-center space-x-2 divide-x divide-gray-200">
                          <div className="px-1 py-2">
                            <div
                              className="radial-progress text-green-500 text-sm"
                              style={{
                                "--value":
                                  (objective.objective.value /
                                    objective.objective.target_value) *
                                  100,
                                "--size": "3.5rem",
                                "--thickness": "2px",
                              }}
                            >
                              {(
                                (objective.objective.value /
                                  objective.objective.target_value) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <p className="px-1">{objective.objective.name}</p>
                            <span>
                              {objective.objective.value}/
                              {objective.objective.target_value}
                              {objective.objective.target_type === "percentage"
                                ? "%"
                                : objective.objective.target_type === "currency"
                                ? "$"
                                : ""}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center divide-x divide-x-200">
                          <div className="px-1 flex items-center space-x-4">
                            <AiFillEdit
                              onClick={() => openModal("objective", index)}
                              className="text-xl hover:text-blue-500"
                            />
                            <AiFillDelete className="text-xl hover:text-red-500" />
                          </div>
                          <div className="flex flex-col items-center px-1">
                            <span>Assigned Team</span>
                            <span>
                              {objective.objective.assigned_team.name}
                            </span>
                          </div>
                          <div className="flex flex-col items-center space-y-2 px-1">
                            <p className="text-green-600">
                              Assigned:
                              {moment(objective.objective.assigned_date).format(
                                "MMM Do YY"
                              )}
                            </p>
                            <p className="text-red-600">
                              Due:
                              {moment(objective.objective.due_date).format(
                                "MMM Do YY"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                      <HiChevronUpDown
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    {edit && editFor === "objective" && (
                      <EditOkr
                        closeModal={closeModal}
                        isOpen={edit}
                        item={Objectives[index]}
                      />
                    )}
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-800 bg-white flex flex-col rounded-md">
                      <div className="flex flex-col space-y-2 w-full pr-40 pl-20">
                        {objective.key_results.map((milestone, inde) => {
                          return (
                            <div
                              className={
                                "border py-2 px-2 flex items-center justify-between rounded-md divide-x divide-gray-200 " +
                                ((milestone.value / milestone.target_value) *
                                  100 >
                                75
                                  ? "bg-green-300"
                                  : (milestone.value / milestone.target_value) *
                                      100 >
                                    50
                                  ? "bg-amber-300"
                                  : (milestone.value / milestone.target_value) *
                                      100 >
                                    20
                                  ? "bg-orange-300"
                                  : "bg-red-300")
                              }
                              key={inde}
                            >
                              <div className="flex items-center space-x-2 divide-x divide-gray-200">
                                <div className="px-1 py-1">
                                  <div
                                    className="radial-progress text-green-900 text-xs"
                                    style={{
                                      "--value":
                                        (milestone.value /
                                          milestone.target_value) *
                                        100,
                                      "--size": "2.5rem",
                                      "--thickness": "1px",
                                    }}
                                  >
                                    {(
                                      (milestone.value /
                                        milestone.target_value) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                  <p className="px-1">{milestone.milestone}</p>
                                  <span>
                                    {milestone.value}/{milestone.target_value}
                                    {milestone.type === "percentage"
                                      ? "%"
                                      : milestone.type === "currency"
                                      ? "$"
                                      : ""}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center divide-x divide-x-200">
                                <div className="flex flex-col items-center px-1">
                                  <span>Assigned To</span>
                                  <span>{milestone.assigned_to.name}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2 px-1">
                                  <p className="text-green-700">
                                    Assigned:
                                    {moment(milestone.assigned_date).format(
                                      "MMM Do YY"
                                    )}
                                  </p>
                                  <p className="text-red-700">
                                    Due:
                                    {moment(milestone.due_date).format(
                                      "MMM Do YY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageOKR;
