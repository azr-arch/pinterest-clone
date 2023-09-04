import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getPinById, getUserById } from "../services/firebase";
import LoadingPage from "./LoadingPage";

export async function loader({ params }) {
  const { id: pinId } = params;

  const pin = await getPinById(pinId);
  const user = await getUserById(pin.postedBy);

  return defer({ pin, user });
}

const PinDetails = () => {
  const loaderData = useLoaderData();
  function renderDetail({ pin, user }) {
    return (
      <div className="w-full h-full flex flex-col lg:flex-row gap-3 lg:gap-4  rounded-2xl p-2 justify-around shadow-2xl">
        <div className="w-full h-[500px] lg:h-full lg:w-1/2 rounded-lg ">
          <img
            src={pin.imageURL}
            alt={pin.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        {/* Made a container incase if wanna add more functionalities like download, report pin etc  */}
        <div className="flex flex-col items-start gap-4 px-8 py-4 lg:w-1/2 lg:py-3 lg:px-2">
          <button
            className=" rounded-3xl bg-black hover:opacity-100 text-white text-sm md:text-base font-bold px-4 py-1 hover:shadow-md"
            onClick={(e) => {
              console.log("saved got clicked");
            }}
          >
            Save
          </button>
          <h2 className="text-base font-medium text-black mt-2 lg:text-2xl">
            {pin.title}
          </h2>

          <div className="flex items-center gap-2">
            <img
              src={user.profilePic || "/assets/noprofile.jpg"}
              alt={user.username}
              className="w-9 aspect-square rounded-full"
            />
            <p className="text-sm font-medium text-gray-900">{user.username}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-fitWFooter relative w-3/4 items-start mx-auto py-6 gap-4">
      <Link to="../../" relative="path" className="absolute top-2 -left-12">
        <AiOutlineArrowLeft color="black" size={17} />
      </Link>

      <React.Suspense fallback={<LoadingPage />}>
        <Await resolve={loaderData}>
          {(data) => {
            return renderDetail(data);
          }}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default PinDetails;
