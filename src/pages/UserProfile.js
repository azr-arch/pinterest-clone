import React from "react";
import { logoutUser } from "../services/firebase";
import { useNavigation } from "react-router-dom";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigation();
  console.log(user);

  return (
    <div className="h-fitWFooter flex flex-col items-center gap-2">
      {/* src={user.profilePic ? user.profilePic : "./assets/"} */}
      <img
        className="h-[150px] w-[150px] rounded-[50%] object-cover p-1 "
        src={user.profilePic ? user.profilePic : "/assets/noprofile.jpg"}
        alt="user-profile"
      />
      <p className="text-2xl text-black font-medium">{user.fullname}</p>
      <p className="text-md text-gray-500">@{user.username}</p>
      <button
        onClick={logoutUser}
        className="px-4 py-2 rounded-md text-white bg-black hover:bg-white hover:text-black hover:border-black hover:border-[1px] transition-colors duration-150 ease-in"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
