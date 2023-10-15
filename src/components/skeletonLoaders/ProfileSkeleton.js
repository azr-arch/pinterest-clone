import React from "react";

const ProfileSkeleton = () => {
    return (
        <>
            {/* Profile Picture */}
            <div
                className="w-[150px] aspect-square rounded-full"
                data-value="skeleton"
            ></div>

            {/* Name */}
            <div
                data-value="skeleton"
                className="w-[125px] h-[32px] rounded-sm"
            ></div>

            {/* Handle */}
            <div
                data-value="skeleton"
                className="w-[47px] h-[24px] rounded-sm"
            ></div>

            {/* Following */}
            <div
                data-value="skeleton"
                className="w-[73px] h-[20px] rounded-sm"
            ></div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
                <div
                    data-value="skeleton"
                    className="w-[82px] h-[40px] rounded-md"
                ></div>
                <div
                    data-value="skeleton"
                    className="w-[82px] h-[40px] rounded-md"
                ></div>
            </div>
        </>
    );
};

export default ProfileSkeleton;
