import React from "react";

const Input = ({ value, handleChange, type, label, name, index }) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <label className="ml-3 mt-3 mb-3 font-semibold font-mono">{label}</label>
      <input
        className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        value={value}
        type={type}
        onChange={(e) => handleChange(e.target.value, name)}
      />
    </div>
  );
};

export default Input;
