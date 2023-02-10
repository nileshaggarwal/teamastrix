import React from "react";
import { CgProfile } from "react-icons/cg";
import { Popover } from "@headlessui/react";
import { isAuthenticated, logout } from "../Helpers/auth";

const Header = () => {
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  console.log(isAuthenticated(), "isAuthenticated");

  return (
    <div className="py-6 px-9 w-full border-b flex items-center justify-between shadow-xl">
      <div>
        <p> Astrix's OKR</p>
      </div>
      <div>
        <Popover className="relative">
          <Popover.Button className="flex items-center space-x-3">
            <CgProfile className="text-3xl" />
            <p>{isAuthenticated().name}</p>
          </Popover.Button>

          <Popover.Panel className="absolute  text-left right-0 mt-2 w-max origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 z-10">
            <button className="w-full block px-8 py-1 hover:underline hover:text-blue-500">
              Settings
            </button>
            <button
              className="w-full block px-8 py-1 hover:underline hover:text-blue-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Popover.Panel>
        </Popover>
        {/* <img src={userprofile} alt="" className="w-12 h-12 rounded-full" /> */}
      </div>
    </div>
  );
};

export default Header;
