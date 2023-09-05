import React from "react";
import "./input.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import MasonryLayoutPage, {
  loader as masonryLayoutPageLoader,
} from "./pages/MasonryLayoutPage";

import Explore from "./pages/Explore";
import Layout from "./components/Layout";
import { requireAuth } from "./utils";
// import Error from "./pages/Error";
import PinDetails, { loader as pinDetailsLoader } from "./pages/PinDetails";

import LoginOrRegister, {
  action as loginOrRegisterAction,
  loader as loginOrRegisterLoader,
} from "./pages/LoginOrRegister";

import UserProfile, { loader as userProfileLoader } from "./pages/UserProfile";
import CreatePost, {
  action as createPostAction,
  loader as createPostLoader,
} from "./components/CreatePost";

import Error from "./pages/Error";

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIN") || false;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        action={loginOrRegisterAction}
        loader={loginOrRegisterLoader}
        element={isLoggedIn ? <Layout /> : <LoginOrRegister />}
      >
        <Route
          //this is homepage, might change the name later
          index
          loader={masonryLayoutPageLoader}
          element={<MasonryLayoutPage />}
          errorElement={<Error />}
        />
        <Route
          path="/pins/:id"
          loader={pinDetailsLoader}
          element={<PinDetails />}
          errorElement={<Error />}
        />
        <Route
          path="/explore"
          loader={async ({ request }) => await requireAuth(request)}
          element={<Explore />}
          errorElement={<Error />}
        />
        <Route
          path="/create"
          action={createPostAction}
          loader={createPostLoader}
          element={<CreatePost />}
          errorElement={<Error />}
        />
        <Route
          path="/profile/:userName"
          loader={userProfileLoader}
          element={<UserProfile />}
          errorElement={<Error />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
