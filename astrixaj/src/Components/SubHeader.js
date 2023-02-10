import React from "react";

const SubHeader = ({ heading, classname }) => {
  return (
    <div className={`flex items-center justify-between w-full bg-white px-6 py-6 rounded-md `}>
      <p className={`text-lg font-semibold ${classname} `}>{heading}</p>
    </div>
  );
};

export default SubHeader;
