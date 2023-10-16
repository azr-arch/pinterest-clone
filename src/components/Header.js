import React, { useState, useEffect } from "react";
import { NavLink, Link, Form } from "react-router-dom/";

import { BiSolidNotification } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { getCurrentUser } from "../services/firebase";
import MobileNav from "./MobileNav";

const Header = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const helper = async () => {
            const userObj = await getCurrentUser();
            console.log(userObj);
            setUserProfile(userObj.profilePic);
            setUsername(userObj.username);
        };
        try {
            helper();
        } catch (error) {
            console.log(
                "Something went wrong, Maybe your internet died!. ",
                error.message
            );
        }
    }, []);

    const activeStyles = {
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
    };

    const [isNotification, setIsNotification] = useState(false);

    return (
        <header className=" sticky top-0 z-50 bg-white h-20 flex items-center px-4 py-[1px] gap-4 font-semibold shadow-md mb-4">
            <Link
                className="h-[38px] flex items-center gap-1 aspect-square p-1"
                to={"/"}
            >
                <img src="/assets/logo.png" alt="logo" />
                <p className="block text-xl md:hidden">Pointerest</p>
            </Link>

            <MobileNav username={username} />
            <nav className="hidden md:flex items-center justify-between gap-0 md:gap-1 lg:gap-2 w-full">
                <NavLink
                    to="/"
                    className="py-1 px-2 rounded-md"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Home
                </NavLink>
                <NavLink
                    to="explore"
                    className="py-1 px-2 rounded-md"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Explore
                </NavLink>
                <NavLink
                    to="create"
                    className="py-1 px-2 rounded-md"
                    style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                    Create
                </NavLink>

                {/* Search functionality  --> TODO move it to its separate page  */}
                <Form
                    name="search-form"
                    role="search"
                    className="grow bg-[#dcdcdc] bg-opacity-40 rounded-[25px] flex items-center py-1 shadow-sm"
                >
                    <input
                        type="search"
                        name="search"
                        aria-label="Search User or Posts"
                        placeholder="Search"
                        className=" grow outline-none border-none bg-transparent py-1 px-5 placeholder-black placeholder:opacity-70 focus:outline-black rounded-[25px]"
                        // defaultValue={searchParam}
                    />
                </Form>

                <NavLink
                    onClick={() => setIsNotification((prev) => !prev)}
                    className="relative py-1 px-2"
                >
                    <BiSolidNotification size={"1.5rem"} />
                    {isNotification && (
                        <div className="text-white absolute top-[55px] left-2/4 -translate-x-2/4  w-[250px] h-[250px] rounded-sm shadow-xl bg-gray-700 px-3 py-1">
                            <p>hello this is notification panel </p>
                        </div>
                    )}
                </NavLink>
                <NavLink className=" py-1 px-2">
                    <AiFillMessage size={"1.5rem"} />
                </NavLink>
                <NavLink to={`/profile/${username}`}>
                    <img
                        className="w-12 aspect-square rounded-[50%] p-2 object-cover hover:bg-gray-400"
                        src={
                            userProfile ? userProfile : "/assets/noprofile.jpg"
                        }
                        alt="user-profile"
                    />
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
