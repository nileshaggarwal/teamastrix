import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addEmployee } from "../../Helpers/employee";
import SubHeader from "../SubHeader";
import Dropdown from "./Dropdown";
import Input from "./Input";

const departments = [
  {
    name: "Strategy",
    value: "strategy",
  },
  {
    name: "Marketing",
    value: "marketing",
  },
  {
    name: "Finance",
    value: "finance",
  },
  {
    name: "Human Resources",
    value: "hr",
  },
  {
    name: "Operations",
    value: "operations",
  },
  {
    name: "Engineering",
    value: "engineering",
  },
];

function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

const AddEmployee = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
  });
  async function handleValueChange(value, name) {
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit() {
    console.log(user);
    if (
      user.name === "" ||
      user.email === "" ||
      user.department === "" ||
      user.designation === ""
    ) {
      toast.error("Please fill all the fields", {
        icon: "👎",
        position: "bottom-right",
      });
      return;
    }

    if (!ValidateEmail(user.email)) {
      return;
    }

    let result = await addEmployee(
      user.name,
      user.email,
      user.department,
      user.designation
    );
    if (result) {
      setUser({
        name: "",
        email: "",
        department: "",
        designation: "",
      });

      toast("Email sent to the employee ", {
        icon: "👍",
        position: "bottom-right",
      });
    }
  }

  return (
    <>
      <SubHeader heading={"Add an Employee"} />
      <div className="mt-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 mb-40">
        <div className="flex flex-col w-3/5 space-y-4">
          <Input
            label={"Name of Employee"}
            type="text"
            handleChange={handleValueChange}
            defaultValue={user.name}
            name="name"
            value={user.name}
          />
          <Input
            label={"Email of Employee"}
            type="email"
            handleChange={handleValueChange}
            value={user.email}
            name="email"
            required={true}
          />
          <Input
            label={"Designation"}
            type="text"
            handleChange={handleValueChange}
            value={user.designation}
            name="designation"
          />
          <Dropdown
            type={"addemployee"}
            list={departments}
            label={"Choose Department"}
            handleChange={handleValueChange}
            name="department"
          />
          <button
            onClick={handleSubmit}
            className="w-full border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
