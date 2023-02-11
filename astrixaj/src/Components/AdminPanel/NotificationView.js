import React, { useEffect, useState } from "react";
import { GoSmiley } from "react-icons/go";
import { RiTeamFill } from "react-icons/ri";
import { GrInProgress } from "react-icons/gr";
import { getNotifications } from "../../Helpers/auth";
import { ColorRing } from "react-loader-spinner";
const data = [
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "team",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "personal",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "progress",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "team",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "personal",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "progress",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "team",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "personal",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "progress",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "team",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "personal",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
  {
    sender: "674f4733899309050359",
    receiver: "674f4733899309050359",
    type: "progress",
    title: "New Team Member",
    content: "You have been added to a new team",
    isRead: false,
    createdAt: "2021-09-01T12:00:00.000Z",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "team":
      return <RiTeamFill className="text-2xl" />;
      break;
    case "personal":
      return <GoSmiley className="text-2xl" />;
      break;
    case "progress":
      return <GrInProgress className="text-2xl" />;
      break;
    default:
      break;
  }
};

const NotificationView = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  let NotificationApi = async () => {
    let res = await getNotifications();
    setNotifications(res);
  };

  useEffect(() => {
    NotificationApi();
    setLoading(false);
  }, []);

  console.log(notifications, "notifications");

  return (
    <div className="my-6 w-[400px] h-[800px] border border-gray-800 rounded-md m-auto overflow-y-scroll noscrollbar bg-gray-200">
      {loading ? (
        <div className="flex items-center justify-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          {notifications.map((item) => (
            <div
              className={`flex justify-between items-center w-full h-16  border-b-2 border-gray-300 relative ${
                item.type === "team"
                  ? "bg-blue-100"
                  : item.type === "personal"
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  {getIcon(item.type)}
                </div>
                <div className="ml-4">
                  <p className="text-md font-semibold text-black">{item.title}</p>
                  <p className="text-gray-700 text-xs">{item.content}</p>
                </div>
              </div>
              <div className="flex items-center absolute bottom-0 right-0 text-xs p-2">
                <p className="text-blue-500">{item.sender.name}</p>
              </div>
            </div>
          ))}
          <p
            className="text-gray-400 text-center text-xs my-4
          "
          >
            No new notifications
          </p>
        </>
      )}
    </div>
  );
};

export default NotificationView;
