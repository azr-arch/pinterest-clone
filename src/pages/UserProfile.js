import React from "react";
import { getCurrentUser, logoutUser } from "../services/firebase";
import { Await, defer, useLoaderData, NavLink, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { requireAuth } from "../utils";
import SavedPosts from "../components/SavedPosts";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({
    user: getCurrentUser(),
  });
}

const UserProfile = () => {
  const userPromise = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    color: "black",
    borderBottom: "2px solid black",
  };

  function renderDetails(user) {
    return (
      <>
        <img
          className="h-[150px] w-[150px] rounded-[50%] object-cover p-1 "
          src={user.profilePic ? user.profilePic : "/assets/noprofile.jpg"}
          alt="user-profile"
        />
        <p className="text-2xl text-black font-medium">{user.fullname}</p>
        <p className="text-md text-gray-500">@{user.username}</p>
        <button
          onClick={logoutUser}
          className="px-4 py-2 rounded-md text-white bg-black hover:bg-white hover:text-black hover:border-black hover:border-[1px] transition-colors duration-150 ease-in"
        >
          Logout
        </button>

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
    <div className="min-h-fitWFooter flex flex-col items-center gap-2">
      <React.Suspense fallback={<LoadingPage />}>
        <Await resolve={userPromise.user}>
          {(user) => renderDetails(user)}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default UserProfile;
