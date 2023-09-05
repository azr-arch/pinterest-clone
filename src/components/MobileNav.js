import React, { useState } from "react";
import { AiOutlineMenu, AiFillCloseSquare } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const MobileNav = ({ username }) => {
  const [navStatus, setNavStatus] = useState(false);

  const handleNavToggle = () => {
    setNavStatus((prev) => !prev);
  };

  return (
    <div className="md:hidden block ml-auto">
      <AiOutlineMenu size={"1.5rem"} onClick={handleNavToggle} />
      <nav
        className={`fixed w-1/2 h-screen top-0 right-0 shadow-2xl flex flex-col gap-5 text-[1.3rem] items-start justify-start bg-white text-black pl-[7vw] pt-[5rem] transition-all duration-200 ease-in-out ${
          navStatus ? "-translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <AiFillCloseSquare
          size={"2rem"}
          className={`absolute right-4 top-[25px]`}
          onClick={handleNavToggle}
        />
        <NavLink
          onClick={handleNavToggle}
          to="/"
          className="py-1 px-2 rounded-md relative w-full transition-all duration-150 ease-in-out hoverEffect"
        >
          Home
        </NavLink>
        <NavLink
          onClick={handleNavToggle}
          to="/explore"
          className="py-1 px-2 relative w-full rounded-md hoverEffect"
        >
          Explore
        </NavLink>
        <NavLink
          onClick={handleNavToggle}
          to="/create"
          className="py-1 px-2 relative w-full rounded-md hoverEffect"
        >
          Create
        </NavLink>
        <NavLink
          onClick={handleNavToggle}
          to={`/profile/${username}`}
          className="py-1 px-2 relative w-full rounded-md hoverEffect"
        >
          Account
        </NavLink>
      </nav>
    </div>
  );
};

export default MobileNav;
