import React from "react";
import { getAi } from "../../Helpers/auth";

const Aiprompt = () => {
  const [milestone, setMilestone] = React.useState("");
  const [suggestions, setSuggestions] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    let res = await getAi(milestone);
    setSuggestions(res);
    setLoading(false);
  };

  return (
    <>
      <p className="text-lg text-blue-500 text-left font-bold">
        Enter the milestone you need help with and click on the button to get results
      </p>
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          label="Enter tour Query"
          className="px-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          name="milestone"
          onChange={(e) => {
            setMilestone(e.target.value);
          }}
        />

        <button
          className="w-fit my-2  border rounded-lg py-2 bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900"
          onClick={handleClick}
        >
          Fetch Suggestions
        </button>
        {loading && <p className="text-red-500 text-xs">Loading Results... Please wait</p>}
        <div>
          {suggestions && (
            <div>
              <p className="text-sm text-blue-500 text-left">We found the following suggestions</p>
              <p>{suggestions}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Aiprompt;
