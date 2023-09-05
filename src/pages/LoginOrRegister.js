import React, { useState } from "react";
import { Form, useLoaderData, useNavigation, redirect } from "react-router-dom";
import LoginPageHeader from "../components/LoginPageHeader";
import { handleLogin, handleRegistration } from "../services/firebase";
import { doesUserExists } from "../services/firebase";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const fullname = formData.get("fullname");
  const username = formData.get("username");

  const path = new URL(request.url).searchParams.get("redirectTo") || "/";

  //if user name is given then it means its registration form
  if (username) {
    const data = await handleRegistration({
      email,
      password,
      username,
      fullname,
    });

    if (data?.status === "ok") {
      redirectHelper(path);
    } else {
      redirectHelper(path, data.message);
    }
    //else its a login form
  } else {
    const data = await handleLogin({
      email,
      password,
    });
    if (data?.status === "ok") {
      redirectHelper(path);
    } else {
      redirectHelper(path, data.message);
    }
  }

  function redirectHelper(route, message = null) {
    if (message) {
      throw redirect(`${route}?message=${message}`);
    }
    // if()
    window.location.href = `${route}`;
  }
}

const LoginOrRegister = () => {
  const errorMessage = useLoaderData();
  const { state } = useNavigation();

  const [currPage, setCurrPage] = useState("register");
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setCurrPage((prev) => (prev === "register" ? "login" : "register"));
  };

  const handleUserNameChange = async (e) => {
    const username = e.target.value;
    try {
      await doesUserExists(username);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <LoginPageHeader />
      <div className="h-fitScreen min-h-[655px] flex items-center justify-start relative bg-loginBg bg-cover bg-no-repeat bg-center bg-overlay">
        <div className="backdrop-blur-sm h-full w-full  inset-0  bg-none flex flex-col lg:flex-row items-center justify-center  ">
          <div className="text-[.8rem] bg-white w-[380px]   flex flex-col items-center justify-center px-[4rem] py-4 gap-2 rounded-md shadow-2xl">
            <img
              src="./assets/logo.png"
              alt="logo"
              className="w-[40px] h-[40px] lg:block hidden"
            />
            <p className="lg:text-2xl text-[1.2rem] font-medium leading-3 mt-2 mb-1">
              Welcome to Pinterest
            </p>
            {currPage === "register" && (
              <p className="font-normal leading-3">Find new ideas to try</p>
            )}
            {errorMessage && (
              <p className="text-black text-sm">{errorMessage}</p>
            )}
            {error && <p className="text-red-500 text-xs">{error.message}</p>}
            {currPage === "register" ? (
              //Register form
              <Form
                method="post"
                replace
                className="w-full flex flex-col px-2 py-3 justify-start items-center gap-3"
              >
                <div className="w-full flex flex-col items-start">
                  <label htmlFor="fullname" className="text-[.7rem]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    className="w-full  px-4 py-2 rounded-lg outline-none border focus:border-2 border-solid border-gray-400 focus:border-black"
                    required
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <label htmlFor="username" className="text-[.7rem]">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="User Name"
                    onChange={handleUserNameChange}
                    className="w-full  px-4 py-2 rounded-lg outline-none border focus:border-2 border-solid border-gray-400 focus:border-black"
                    required
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <label htmlFor="email" className="text-[.7rem]">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="w-full  px-4 py-2 rounded-lg outline-none border focus:border-2 border-solid border-gray-400 focus:border-black"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <label htmlFor="email" className="text-[.7rem]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 rounded-md outline-none border focus:border-2 border-solid border-gray-400 focus:border-black"
                    placeholder="Create a password (more than 6 characters)"
                    required
                  />
                </div>
                <button
                  disabled={state === "submitting"}
                  className="mt-4 rounded-[25px] bg-black text-white font-medium py-2 px-auto w-full"
                >
                  {state === "submitting" ? "Signing up..." : "Continue"}
                </button>
              </Form>
            ) : (
              // Login FORM
              <Form
                method="post"
                replace
                className="w-full flex flex-col px-2 py-3 justify-start items-center gap-3"
              >
                <div className="w-full flex flex-col items-start mt-3 lg:mt-0">
                  <label htmlFor="email" className="text-[.7rem]">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="w-full  px-4 py-3 rounded-lg outline-none border focus:border-2 border-solid border-gray-400 focus:border-black"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="w-full flex flex-col items-start">
                  <label htmlFor="email" className="text-[.7rem]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 rounded-md outline-none border focus:border-2 border-solid border-gray-400 focus:border-black"
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  disabled={state === "submitting"}
                  className="mt-4 rounded-[25px] bg-black text-white font-medium py-2 px-auto w-full"
                >
                  {state === "submitting" ? "Logging in..." : "Log in"}
                </button>
              </Form>
            )}

            {/* <span className="text-center font-medium text-black">OR</span>
            <GoogleLogin
              onSuccess={createOrGetUser}
              onError={createOrGetUser}
              text="google Login"
              theme=""
            /> */}
            <p className="text-[.7em] text-gray-500 text-center">
              By continuing, you agree to Pointerest's <br />{" "}
              <span className="font-medium text-black">Terms of Service</span>{" "}
              and acknowledge you've read our <br />{" "}
              <span className="font-medium text-black">
                Privacy Policy. Notice at collection
              </span>
            </p>

            {currPage === "register" ? (
              <p className="text-gray-800  text-[.8em]">
                Already a member ?
                <span
                  onClick={handleToggle}
                  className="cursor-pointer ml-1 font-medium text-black hover:underline"
                >
                  Log in
                </span>
              </p>
            ) : (
              <p className="text-gray-800  text-[.8em] font-medium">
                Not on Pointerest yet ?
                <span
                  onClick={handleToggle}
                  className="cursor-pointer ml-1  hover:underline"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOrRegister;
