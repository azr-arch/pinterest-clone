import React from "react";
import { exploreData } from "../data";

const Explore = () => {
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const date = new Date(Date.now());

  const currDay = date.getDate();
  const currMonth = date.getMonth();
  const currYear = date.getUTCFullYear();

  const exploreCards = exploreData.map((item, index) => (
    <div
      className={`rounded-[25px] overflow-hidden relative md:h-auto h-[400px]`}
      key={index}
    >
      <img src={item.imageURL} alt="" className="object-cover" />
      <div className="pb-6 flex flex-col justify-end w-full h-full absolute bottom-0  left-2/4 -translate-x-2/4 transform- text-white text-center bg-blackLightOverlay ">
        <p className="text-sm md:text-md">{item.subHeading}</p>
        <p className="text-lg md:text-2xl font-medium">{item.title}</p>
      </div>
    </div>
  ));

  return (
    <div className="w-full min-h-screen text-white flex flex-col items-center ">
      <h3 className="text-black font-normal text-[.8rem] sm:text-[1.2rem]">
        {months[currMonth]} {currDay}, {currYear}
      </h3>
      <h2 className="text-black font-medium text-[1.5rem] sm:text-[2rem]">
        Stay inspired
      </h2>
      <div className="grid  sm:grid-cols-2 md:grid-cols-3 w-[85vw] sm:grid-rows-2 h-full md:h-[600px] gap-x-6  gap-y-6 mt-8 mb-8">
        {exploreCards}
      </div>
    </div>
  );
};

export default Explore;
