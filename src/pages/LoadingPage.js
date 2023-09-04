import React from "react";
import { MoonLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="absolute top-0 left-0  w-full h-full flex items-center justify-center">
      <MoonLoader color="black" size={40} />
    </div>
  );
};

export default LoadingPage;
