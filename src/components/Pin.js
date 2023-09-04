import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pin = ({ pin }) => {
  const navigate = useNavigate();
  const [postHovered, setpostHovered] = useState(false);

  return (
    <div
      className="w-auto mb-2 max-w-auto cursor-pointer relative"
      onMouseEnter={() => setpostHovered(true)}
      onMouseLeave={() => setpostHovered(false)}
      onClick={() => navigate(`/pins/${pin.postId}`)}
    >
      <img
        src={pin.imageURL}
        alt={pin.title}
        className="max-w-full rounded-xl"
      />
      {postHovered && (
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-40"
          style={{ height: "100%" }}
        >
          <button
            className="rounded-3xl bg-black hover:opacity-100 text-white font-bold px-4 py-1 self-end hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              console.log("saved got clicked");
            }}
          >
            Save
          </button>

          <p className="rounded-2xl bg-white py-1 px-4 text-black self-start mb-2 ml-2 font-medium shadow-lg">
            {pin.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Pin;