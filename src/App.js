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

import UserPosts, { loader as userPostsLoader } from "./components/UserPosts";
import SavedPosts, {
  loader as savedPostsLoader,
} from "./components/SavedPosts";

import Error from "./pages/Error";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIN") || false;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        action={loginOrRegisterAction}
        loader={loginOrRegisterLoader}
        element={isLoggedIn ? <Layout /> : <LoginOrRegister />}
        errorElement={<Error />}
      >
        <Route
          //this is homepage, might change the name later
          index
          loader={masonryLayoutPageLoader}
          element={<MasonryLayoutPage />}
          errorElement={<Error />}
        />
        <Route
          path="pins/:id"
          loader={pinDetailsLoader}
          element={<PinDetails />}
          errorElement={<Error />}
        />
        <Route
          path="explore"
          loader={async ({ request }) => await requireAuth(request)}
          element={<Explore />}
          errorElement={<Error />}
        />
        <Route
          path="create"
          action={createPostAction}
          loader={createPostLoader}
          element={<CreatePost />}
          errorElement={<Error />}
        />
        <Route
          path="profile/:userName"
          loader={userProfileLoader}
          element={<UserProfile />}
          errorElement={<Error />}
        >
          <Route index element={<SavedPosts />} loader={savedPostsLoader} />

          <Route
            path="posts"
            element={<UserPosts />}
            loader={userPostsLoader}
          />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
