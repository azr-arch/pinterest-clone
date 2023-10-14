import React, { useState } from "react";
import { getCurrentUser, logoutUser } from "../services/firebase";
import { Await, defer, useLoaderData, NavLink, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { requireAuth } from "../utils";
import { AiFillEdit } from "react-icons/ai";
import { updateUserProfile } from "../services/firebase";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({
    user: getCurrentUser(),
  });
}

const UserProfile = () => {
  const userPromise = useLoaderData();

  const [editProfileActive, setEditProfileActive] = useState(false);
  const [profilePreviewImg, setProfilePreviewImg] = useState(null);
  const [file, setFile] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setProfilePreviewImg(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    await updateUserProfile(file);

    setFile(null);
    window.location.reload();
  };

  const activeStyles = {
    fontWeight: "bold",
    color: "black",
    borderBottom: "2px solid black",
  };

  function renderDetails(user) {
    return (
      <>
        <div className="h-[150px] w-[150px] relative">
          <img
            className="w-full h-full rounded-full object-cover "
            style={editProfileActive ? { border: "1px solid black" } : {}}
            src={
              profilePreviewImg
                ? profilePreviewImg
                : user.profilePic
                ? user.profilePic
                : "/assets/noprofile.jpg"
            }
            alt="user-profile"
          />

          {editProfileActive ? (
            // <button className="absolute top-2 -right-2 z-10">
            //   {" "}
            //   <AiFillEdit size={26} />
            // </button>
            <label className="absolute top-2 -right-2 z-10 ">
              <AiFillEdit size={26} />
              <input
                type="file"
                name="user-profile"
                className="w-0 h-0"
                onChange={uploadImage}
              />
            </label>
          ) : (
            ""
          )}
        </div>

        <p className="text-2xl text-black font-medium">{user.fullname}</p>
        <p className="text-md text-gray-500">@{user.username}</p>
        <p className="text-sm font-medium text-gray-500 mb-2">
          {user?.following} Following
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={logoutUser}
            className="px-4 py-2 rounded-md text-white bg-black hover:bg-white hover:text-black hover:outline hover:outline-1 hover:outline-black transition-colors duration-150 ease-in"
          >
            Logout
          </button>

          <button
            onClick={() => setEditProfileActive((prev) => !prev)}
            className="px-4 py-2 rounded-md text-white bg-black hover:bg-white hover:text-black hover:outline hover:outline-1 hover:outline-black transition-colors duration-150 ease"
            style={
              editProfileActive
                ? {
                    backgroundColor: "white",
                    color: "black",
                    outline: "1px solid black",
                  }
                : {}
            }
          >
            Edit Profile
          </button>

          {profilePreviewImg ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-red-500 text-white active:translate-x-[2px] active:translate-y-[2px]"
            >
              Save Changes
            </button>
          ) : null}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 my-4">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="text-gray-700 font-normal px-4 py-2 "
              to="."
              end
            >
              Saved
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyles : null)}
              className="text-gray-700 font-normal px-4 py-2 "
              to="posts"
            >
              Created
            </NavLink>
          </div>

          <Outlet context={user.userId} />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-fitWFooter flex flex-col items-center gap-2 relative">
      <React.Suspense fallback={<LoadingPage />}>
        <Await resolve={userPromise.user}>
          {(user) => renderDetails(user)}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default UserProfile;
