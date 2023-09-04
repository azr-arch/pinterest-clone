import React from "react";
import { Link } from "react-router-dom";

const LoginPageHeader = () => {
  return (
    <>
      <header className="bg-white h-20 flex items-center px-4 py-1 justify-between font-semibold shadow-md text-[.8rem] lg:text-[1rem]">
        <Link
          to={"/"}
          className="h-6 lg:h-8 aspect-square flex items-center gap-1 cursor-pointer"
        >
          <img src="./assets/logo.png" alt="" />
          <p className="text-black spacing text-[1rem] lg:text-xl">
            Pointerest
          </p>
        </Link>
        <nav className="flex items-center gap-3 lg:gap-6 text-black">
          <Link>About</Link>
          <Link>Business</Link>
          <Link>Blog</Link>
        </nav>
      </header>
    </>
  );
};

export default LoginPageHeader;
