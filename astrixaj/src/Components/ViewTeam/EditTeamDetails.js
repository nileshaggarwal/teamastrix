import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Input from "../AdminPanel/Input";
import Dropdown from "../AdminPanel/Dropdown";
import { departments } from "../AdminPanel/departments";
import { Tab } from "@headlessui/react";
import { IoMdRemoveCircle } from "react-icons/io";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditTeamDetails = ({ closeModal, isOpen, team, handleChange }) => {
  let [categories] = useState(["Team Details", "Team Members"]);
  const [selectedOption, setSelectedOption] = useState(categories[0]);
  console.log(selectedOption);
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
                  Edit Team
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
                  {selectedOption === "Team Details" && (
                    <div className="w-full relative">
                      <Input
                        label={"Name of Team"}
                        type="text"
                        value={team.name}
                        name="name"
                        handleChange={handleChange}
                      />
                      <Input
                        label={"Descripiton of Team"}
                        type="text"
                        value={team.description}
                        name="description"
                        handleChange={handleChange}
                      />
                      <Dropdown
                        list={departments}
                        label={"Choose Department"}
                        name="department"
                        handleChange={handleChange}
                      />
                      <button className="w-full border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900 my-2">
                        Update
                      </button>
                    </div>
                  )}
                  {selectedOption === "Team Members" && (
                    <div className="flex flex-col w-full">
                      <Input label={"Add team members"} type="text" />
                      <div className="flex flex-col items-center space-y-1 my-2">
                        {team.teamMembers.map((member) => {
                          return (
                            <div className="flex items-center justify-between  rounded-md w-full py-1 border px-2">
                              <div className="flex flex-col">
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm">{member.role}</p>
                              </div>
                              <IoMdRemoveCircle className="text-xl text-red-200 hover:text-red-500 cursor-pointer" />
                            </div>
                          );
                        })}
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

export default EditTeamDetails;
