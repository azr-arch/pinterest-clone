import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen h-fitWFooter flex justify-center flex-col items-center">
      <h1 className="text-black font-bold">Page not found!</h1>
      <Link className="text-black underline" to={"/"}>
        back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
