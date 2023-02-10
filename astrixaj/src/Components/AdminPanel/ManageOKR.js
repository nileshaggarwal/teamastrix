import React from "react";
import SubHeader from "../SubHeader";
import { Disclosure } from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";

const ManageOKR = () => {
  return (
    <div>
      <SubHeader heading={"Manage OKR's"} />
      <div className="my-6 w-full rounded-md border border-gray-200">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <HiChevronUpDown
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-800 bg-white">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default ManageOKR;
