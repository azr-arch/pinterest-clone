import React from "react";

// Put on hold for design
const MasonrySkeleton = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((item, idx) => {
          return (
            <div
              key={idx}
              data-value="skeleton"
              className="w-[300px] h-[500px] rounded-xl mb-4 animate-loading  shadow-lg"
            ></div>
          );
        })}
    </>
  );
};

export default MasonrySkeleton;
