import React, { Fragment, useState } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import Input from "./Input";
import moment from "moment";
import Dropdown from "./Dropdown";
import { departments } from "./departments";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditOkr = ({ closeModal, isOpen, item }) => {
  let [categories] = useState(["Objectives Details", "Milestones"]);
  const [selectedOption, setSelectedOption] = useState(categories[0]);
  const [objective, setObjective] = useState(item);

  async function handleValueChange(value, name) {
    setObjective({ ...objective, [name]: value });
  }

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
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit OKR
                </Dialog.Title>
                <div className="mt-2 height">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                      {categories.map((category) => (
                        <Tab
                          onClick={() => setSelectedOption(category)}
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                              selected
                                ? "bg-white shadow"
                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                  </Tab.Group>
                  {selectedOption === "Objectives Details" && (
                    <div className="w-full relative">
                      <Input
                        label={"Objective"}
                        type="text"
                        value={item.objective.name}
                        name="name"
                        // handleChange={handleChange}
                      />
                    </div>
                  )}
                  {selectedOption === "Milestones" && (
                    <div className="flex flex-col w-full space-y-2">
                      <Input label={"Add milestone"} type="text" />
                      <Dropdown
                        list={departments}
                        label={"Assign to"}
                        handleChange={handleValueChange}
                        name="assigned_to"
                      />
                      <input
                        type="date"
                        className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      <div className="flex flex-col items-center space-y-1 my-2">
                        {item.key_results.map((milestone, index) => {
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between  rounded-md w-full py-1 border px-2"
                            >
                              <div className="flex flex-col space-y-1 text-sm">
                                <span>{milestone.milestone}</span>
                                <span>{milestone.assigned_to.name}</span>
                              </div>
                              <div className="text-sm flex flex-col items-end space-y-1">
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
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <button className="w-full border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900 my-2">
                    Update
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditOkr;
