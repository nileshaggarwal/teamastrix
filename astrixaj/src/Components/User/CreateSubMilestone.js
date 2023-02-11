import React, { useEffect, useState, Fragment } from "react";
import { isAuthenticated } from "../../Helpers/auth";
import { getTeamByLeaderId } from "../../Helpers/teams";
import Dropdown from "../AdminPanel/Dropdown";
import Input from "../AdminPanel/Input";
import SubHeader from "../SubHeader";
import { AiOutlineCheck } from "react-icons/ai";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";
import { createSubmileStone, getOkrsByTeamId } from "../../Helpers/goals";

const CreateSubMilestone = () => {
  const [milestone, setMilestone] = useState({
    milestone: "",
    due_date_key: "",
    assigned_to: "",
    type: "",
    target_value: "",
    created_by_key: "teamLead",
    created_by_id_key: "",
    created_for_key: "member",
  });

  const [team, setTeam] = useState([]);
  const [milestonees, setMilestonees] = useState([]);
  const [selected, setSelected] = useState(milestonees && milestonees.length > 0 && milestonees[0]);

  async function handleValueChange(value, name) {
    setMilestone({ ...milestone, [name]: value });
  }

  async function getTeam() {
    const team = await getTeamByLeaderId(isAuthenticated().id);
    setTeam(team);
    getMilestonesNow(team._id);
  }

  async function getMilestonesNow(teamId) {
    const milestones = await getOkrsByTeamId(teamId);
    console.log(milestones);
    setMilestonees(milestones);
  }

  useEffect(() => {
    getTeam();
  }, []);

  console.log(team, milestonees);

  const departments = [
    {
      name: "percentage",
      value: "percentage",
    },
    {
      name: "number",
      value: "number",
    },
    {
      name: "currency",
      value: "currency",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(milestone);
    let res = await createSubmileStone(
      {
        milestone: milestone.milestone,
        assigned_to: milestone.assigned_to._id,
        due_date_key: milestone.due_date_key,
        type: milestone.type.value,
        assigned_to_teams: null,
        value: 0,
        target_value: milestone.target_value,
      },
      selected._id
    );
    console.log(res);
  };

  return (
    <>
      <SubHeader heading={"Create SubMilestone"} />
      <div className="mt-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 mb-40">
        <div className="flex flex-col w-3/5 space-y-4">
          <Input
            label={"Milestone"}
            type="text"
            handleChange={handleValueChange}
            name="milestone"
            value={milestone.milestone}
          />
          <Input
            label={"Due Date"}
            type="date"
            handleChange={handleValueChange}
            value={milestone.due_date_key}
            name="due_date_key"
          />
          {team?.members && (
            <Dropdown
              list={team?.members}
              label={"Assign to"}
              handleChange={handleValueChange}
              name="assigned_to"
              value={milestone.assigned_to}
            />
          )}
          {departments && departments.length > 0 && (
            <Dropdown
              list={departments}
              label={"Choose Target Type"}
              handleChange={handleValueChange}
              name="type"
              value={milestone.type}
            />
          )}
          {milestonees && (
            <div className="flex flex-col items-start justify-center">
              <label className="ml-3 mt-3 mb-3 font-semibold font-mono">
                {"Choose parent milestone"}
              </label>
              <div className="w-full">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate"> {selected.milestone}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        style={{ zIndex: 20000 }}
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {milestonees?.map((item, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                              }`
                            }
                            value={item}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {item.milestone}
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
            </div>
          )}
          <Input
            label={"Target Value"}
            type="percentage"
            handleChange={handleValueChange}
            value={milestone.target_value}
            name="target_value"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-[400px] m-auto my-4 border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateSubMilestone;
