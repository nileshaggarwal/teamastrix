import React from "react";
import Header from "./Components/Header";
import MainPage from "./Components/MainPage";

const App = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100
    "
    >
      <h1 className="text-3xl">Welcome to GOALS OKR</h1>
      <br />
      <h1 className="text-blue-500 text-2xl">BY TEAM ASTRIX</h1>
      <a href="/login" className="text-red-500">
        Head to login here{" "}
      </a>
    </div>
  );
};

export default App;
