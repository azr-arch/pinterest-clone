import React from "react";

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
              className="w-[300px] h-[500px] rounded-xl mb-4 "
            >
              {/* Gray part  */}
              <div className="absolute inset-0 bg-gray-400">
                <div className="absolute inset-0 transform-gpu translate-x-full bg-gradient-to-r from-transparent to-white to-transparent animate-shimmer"></div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MasonrySkeleton;
