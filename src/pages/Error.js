import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-fitWFooter grid place-items-center">
      <div className="p-6 flex flex-col items-center gap-3 text-white shadow-lg rounded-md bg-black">
        <h1 className="font-bold">Something went wrong</h1>
        <p className="font-medium">
          the page or post you were looking for might be deleted or move to new
          url
        </p>
        <Link className="text-white underline" to={"/"}>
          back to home
        </Link>
      </div>
    </div>
  );
};

export default Error;
