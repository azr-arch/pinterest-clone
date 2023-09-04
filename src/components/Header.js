import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom/";

import { BiSolidNotification } from "react-icons/bi";
import { AiFillMessage, AiOutlineMenu } from "react-icons/ai";
import MobileNav from "./MobileNav";

const Header = () => {
  const activeStyles = {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  };

  const [isNotification, setIsNotification] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className=" sticky top-0 z-50 bg-white h-20 flex items-center px-4 py-[1px] gap-4 font-semibold shadow-md mb-4">
      <Link
        className="h-[38px] flex items-center gap-1 aspect-square p-1"
        to={"/"}
      >
        <img src="/assets/logo.png" alt="logo" />
        <p className="block text-xl md:hidden">Pointerest</p>
      </Link>

      <MobileNav user={user} />
      <nav className="hidden md:flex items-center justify-between gap-0 md:gap-1 lg:gap-2 w-full">
        <NavLink
          to="/"
          className="py-1 px-2 rounded-md"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="explore"
          className="py-1 px-2 rounded-md"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Explore
        </NavLink>
        <NavLink
          to="create"
          className="py-1 px-2 rounded-md"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Create
        </NavLink>
        <div className="grow bg-[#dcdcdc] rounded-[25px] flex items-center py-1">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className=" grow outline-none border-none bg-transparent py-1 px-5 focus:outline-black rounded-[25px]"
          />
        </div>

        <NavLink
          onClick={() => setIsNotification((prev) => !prev)}
          className="relative py-1 px-2"
        >
          <BiSolidNotification size={"1.5rem"} />
          {isNotification && (
            <div className="text-white absolute top-[55px] left-2/4 -translate-x-2/4  w-[250px] h-[250px] rounded-sm shadow-xl bg-gray-700 px-3 py-1">
              <p>hello this is notification panel </p>
            </div>
          )}
        </NavLink>
        <NavLink className=" py-1 px-2">
          <AiFillMessage size={"1.5rem"} />
        </NavLink>
        <NavLink to={`/profile/${user.username}`}>
          <img
            className="w-10 aspect-square rounded-[50%] p-2 object-cover hover:bg-gray-400"
            src={user.profilePic ? user.profilePic : "/assets/noprofile.jpg"}
            alt="user-profile"
          />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
