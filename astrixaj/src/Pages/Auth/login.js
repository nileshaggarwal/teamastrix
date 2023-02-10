import React, { useState } from "react";

import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaMobile } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
            <h1 className="text-center">You are logged in!</h1>
            <br />
          </section>
        ) : (
          <div className="text-sm text-center mt-4">
            Login with your email & password
          </div>
        )}
        <form className="mt-6">
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
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="w-full block  text-sm px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
              />
              <div
                className="absolute top-3 right-1"
                onClick={handleClickShowPassword}
              >
                {values.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="">
              <a
                href="#"
                className="text-right justify-end  text-xs text-black hover:underline"
              >
                Forget Password?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <button className="text-sm w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-slate-700 focus:outline-none focus:bg-slate-700">
              Login
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center  mt-6 border border-t">
          <div className="absolute px-5 bg-white">Or</div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
