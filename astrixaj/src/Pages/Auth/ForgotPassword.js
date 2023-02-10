import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaMobile } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import Input from "../../Components/AdminPanel/Input";
import { resetPassword } from "../../Helpers/auth";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);

  let router = useNavigate();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  console.log(values, "values");

  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await resetPassword(id, token, values.password);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        router("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl max-w-xl">
        <img
          className="mx-auto w-40"
          src="https://i.ytimg.com/vi/5E0FzGFnj1g/maxresdefault.jpg"
          alt="img"
        />
        <label for="email" className=" block text-xl font-semibold text-gray-800 my-2 text-center">
          Enter your new Password
        </label>
        <input
          label={"Enter your new Password"}
          type="password"
          onChange={(e) => {
            handleChange(e.target.value, e.target.name);
          }}
          name="password"
          // value={values.password}
          className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />

        <button
          className=" my-5 text-sm w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-slate-700 focus:outline-none focus:bg-slate-700"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
