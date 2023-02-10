import React, { useEffect } from "react";

import { CgOrganisation } from "react-icons/cg";
import { Disclosure, Transition } from "@headlessui/react";
import { BsDashLg } from "react-icons/bs";

import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

const Option = ({ chosenMenu, value, option, setChosenMenu, icon }) => {
  console.log(chosenMenu, "chosenmeny", value);
  async function changeLocation(value) {
    await localStorage.setItem("gotovalue", value);
    window.location.assign("/userdash");
  }

  return (
    <div className="py-3 px-3 ">
      <button
        onClick={() =>
          setChosenMenu ? setChosenMenu(value) : changeLocation(value)
        }
        className={
          "flex items-center justify-start space-x-1 text-gray-600 hover:text-blue-500 " +
          (value === chosenMenu && "text-blue-600")
        }
      >
        {icon}
        <p>{option}</p>
      </button>
    </div>
  );
};

const Layout = ({
  children,
  chosenMenu,
  setChosenMenu,
  createStore,
  isOpen,
  isOpen2,
}) => {
  useEffect(() => {
    let gotovalue = localStorage.getItem("gotovalue");
    if (gotovalue) {
      setChosenMenu(gotovalue);
      localStorage.removeItem("gotovalue");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <div className="w-full h-full grow bg-gray-100 flex divide-x-2 divide-gray-300 overflow-y-hidden">
        <div
          style={{ zIndex: 15000 }}
          className={
            isOpen || isOpen2
              ? "w-2/12 bg-black bg-opacity-20  flex flex-col"
              : "w-2/12 bg-white flex flex-col"
          }
        >
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={
                    "py-2 px-3 w-full text-left flex justify-between items-center "
                  }
                >
                  <div className="flex items-center">
                    <CgOrganisation className="mr-1 text-2xl" />
                    <span>User Dashboard</span>
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
                      value="ViewOkr"
                      option={"Manage Okrs"}
                    />
                    <Option
                      chosenMenu={chosenMenu}
                      icon={<BsDashLg className="text-xs ml-4" />}
                      setChosenMenu={setChosenMenu}
                      value="Notifications"
                      option={"Notifications"}
                    />
                    <Option
                      chosenMenu={chosenMenu}
                      icon={<BsDashLg className="text-xs ml-4" />}
                      setChosenMenu={setChosenMenu}
                      value="createOKR"
                      option={"Create OKR"}
                    />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
        <div className="w-10/12 px-8 py-10 overflow-y-scroll flex flex-col space-y-4 relative ">
          {children}
          <div className="w-full flex items-center justify-center text-gray-500 bg-white py-2 ">
            © 2022 | WETARANG | RIGHTS BY MACHAPOINT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
