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
import UserProfile from "./pages/UserProfile";
import CreatePost, {
  action as createPostAction,
} from "./components/CreatePost";

const App = () => {
  const user = localStorage.getItem("user") || false;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        action={loginOrRegisterAction}
        loader={loginOrRegisterLoader}
        element={user ? <Layout /> : <LoginOrRegister />}
        // loader={async () => requireAuth()}
      >
        <Route
          //this is homepage, might change the name later
          index
          element={<MasonryLayoutPage />}
          loader={masonryLayoutPageLoader}
        />
        <Route
          path="/pins/:id"
          element={<PinDetails />}
          loader={pinDetailsLoader}
        />
        <Route
          path="/explore"
          element={<Explore />}
          loader={async () => requireAuth()}
        />
        <Route
          path="/create"
          action={createPostAction}
          element={<CreatePost />}
        />
        <Route
          path="/profile/:userName"
          element={<UserProfile />}
          loader={async () => requireAuth()}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
