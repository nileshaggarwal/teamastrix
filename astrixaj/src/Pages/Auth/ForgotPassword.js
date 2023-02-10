import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaMobile } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  return (
    <div>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl max-w-xl">
        <img
          className="mx-auto w-40"
          src="https://i.ytimg.com/vi/5E0FzGFnj1g/maxresdefault.jpg"
          alt="img"
        />

        {success ? (
          <section>
            <br />
          </section>
        ) : (
          <div className="text-sm text-center mt-4">
            Enter your email to reset your password
          </div>
        )}
        <form className="mt-6">
          {success ? (
            <section>
              <h1 className="text-center">Email is sent to your Email</h1>
              <br />
            </section>
          ) : (
            <div className="mb-2">
              <label
                for="email"
                className=" block text-sm font-semibold text-gray-800"
              >
                Email*
              </label>
              <input
                type="text"
                id="username"
                className="w-full block text-sm px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => setSuccess(true)}
              className="text-sm w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-slate-700 focus:outline-none focus:bg-slate-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
