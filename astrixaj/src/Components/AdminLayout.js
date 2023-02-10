import React, { useEffect } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { BsDashLg, BsFillPersonPlusFill } from "react-icons/bs";
import { GoDashboard } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";
import { MdOutlineAddCircleOutline } from "react-icons/md";

import Header from "./Header";

const Option = ({ chosenMenu, value, option, setChosenMenu, icon }) => {
  async function changeLocation(value) {
    await localStorage.setItem("gotovalue", value);
    window.location.assign("/userdash");
  }
  return (
    <div className="py-3 px-3 space-x-3 ">
      <button
        onClick={() => (setChosenMenu ? setChosenMenu(value) : changeLocation(value))}
        className={
          "flex text-left items-center justify-between space-x-1 hover:text-blue-500 " +
          (chosenMenu && value === chosenMenu ? "text-blue-600" : "text-gray-600")
        }
      >
        {icon}
        <p className="ml-4">{option}</p>
      </button>
    </div>
  );
};

const AdminLayout = ({ children, chosenMenu, setChosenMenu }) => {
  useEffect(() => {
    let gotovalue = localStorage.getItem("gotovalue");
    if (gotovalue) {
      setChosenMenu(gotovalue);
      localStorage.removeItem("gotovalue");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-full h-full grow bg-gray-100 flex divide-x-2 divide-gray-300 overflow-y-hidden">
        <div className="w-2/12 h-full bg-white flex flex-col overflow-y-auto">
          <Option
            chosenMenu={chosenMenu}
            icon={<GoDashboard className="text-2xl" />}
            setChosenMenu={setChosenMenu}
            value="dashboard"
            option={"Dashboard"}
          />
          <Option
            chosenMenu={chosenMenu}
            icon={<MdOutlineAddCircleOutline className="text-2xl" />}
            setChosenMenu={setChosenMenu}
            value="createTeam"
            option={"Create Team"}
          />
          <Option
            chosenMenu={chosenMenu}
            icon={<BsFillPersonPlusFill className="text-2xl" />}
            setChosenMenu={setChosenMenu}
            value="addEmployee"
            option={"Add Employee"}
          />
          <label className="ml-3 mt-3 mb-3 font-bold font-mono">Teams</label>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={
                    "py-2 px-3 w-full text-left flex justify-between items-center " +
                    (open && "bg-purple-100")
                  }
                >
                  <div className="flex items-center">
                    <AiOutlineTeam className="mr-1 text-2xl" />
                    <span>Teams</span>
                  </div>
                  {open ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel static className="text-gray-500">
                    <Option
                      chosenMenu={chosenMenu}
                      icon={<BsDashLg className="text-xs ml-4" />}
                      setChosenMenu={setChosenMenu}
                      value="manageTeam"
                      option={"Manage Teams"}
                    />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
        <div className="w-10/12 px-8 py-10 overflow-y-scroll flex flex-col  relative ">
          {children}
          <div className="w-full flex items-center justify-center text-gray-500 bg-white py-2">
            © 2022 | RIGHTS BY Team Astrix
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
