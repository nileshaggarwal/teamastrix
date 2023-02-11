import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import Input from "../AdminPanel/Input";
import Dropdown from "../AdminPanel/Dropdown";
import { departments } from "../AdminPanel/departments";
import { Tab } from "@headlessui/react";
import { IoMdRemoveCircle } from "react-icons/io";
import { getTeams } from "../../Helpers/teams";
import { getEmployees } from "../../Helpers/employee";
import { AiOutlineCheck } from "react-icons/ai";
import { HiChevronUpDown } from "react-icons/hi2";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditTeamDetails = ({ closeModal, isOpen, team, handleChange }) => {
  console.log(team, "team");

  let [categories] = useState(["Team Details", "Team Members"]);

  const [selectedOption, setSelectedOption] = useState(categories[0]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
  const [teamMembersList, setTeamMembersList] = useState(team.members);
  console.log(selectedOption);

  const getAllMembers = async () => {
    let members = await getEmployees();
    console.log(members, "members");
    setTeamMembers(members);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  useEffect(() => {
    handleValueChange(selectedPeople);
  }, [selectedPeople]);

  const handleValueChange = (value) => {
    let member;
    if (selectedPeople.length > 0) {
      if (selectedPeople.length > tempSelectedUsers.length) {
        member = selectedPeople.find(
          (member) => teamMembersList.findIndex((x) => x._id === member) === -1
        );
      } else {
        let difference = tempSelectedUsers.filter((x) => !selectedPeople.includes(x));
        member = difference[0];
      }
      console.log(selectedPeople);
      console.log(value);
      console.log(member);
      if (selectedPeople.length > tempSelectedUsers.length) {
        member = teamMembers.find((x) => x._id === member);
        setTeamMembersList((oldPrevArray) => [...oldPrevArray, member]);
      } else {
        console.log(member, "memberid");
        setTeamMembersList((oldPrevArray) => oldPrevArray.filter((x) => x._id !== member));
      }
      setTempSelectedUsers(selectedPeople);
    }
  };
  console.log(teamMembersList, selectedPeople, "teamMembersList");
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-y-scroll noscrollbar">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
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
                      {/* <Dropdown
                        list={departments}
                        label={"Choose Department"}
                        name="department"
                        handleChange={handleChange}
                      /> */}
                    </div>
                  )}
                  {selectedOption === "Team Members" && (
                    <div className="flex flex-col w-full ">
                      <div className="w-full">
                        <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              {selectedPeople.map((person) => person.name).join(", ")}
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiChevronUpDown
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {teamMembers.map((item, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                      }`
                                    }
                                    value={item._id}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? "font-medium" : "font-normal"
                                          }`}
                                        >
                                          {item.name}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <AiOutlineCheck
                                              className="h-5 w-5 text-gren-500"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                      {console.log(team?.members, "members")}
                      <div className="flex flex-col items-center space-y-1 my-2">
                        {teamMembersList?.map((member) => {
                          return (
                            <div className="flex items-center justify-between  rounded-md w-full py-1 border px-2">
                              <div className="flex flex-col">
                                <p className="font-medium">{member?.name}</p>
                                <p className="text-sm">{member?.designation}</p>
                              </div>
                              <IoMdRemoveCircle className="text-xl text-red-200 hover:text-red-500 cursor-pointer" />
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

export default EditTeamDetails;
