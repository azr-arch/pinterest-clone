import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Await, Link, defer, useLoaderData, useParams } from "react-router-dom";
import {
    checkIfSaved,
    getPinById,
    getUserById,
    savePost,
} from "../services/firebase";
import LoadingPage from "./LoadingPage";
import { requireAuth } from "../utils";
import SaveButton from "../components/buttons/SaveButton";
import LikeButton from "../components/buttons/LikeButton";
// import { AppContext } from "../context/context";
// import { savePost } from "../services/firebase";

export async function loader({ params, request }) {
    await requireAuth(request);
    const { id: pinId } = params;

    const pin = await getPinById(pinId);
    const user = await getUserById(pin.postedBy);

    return defer({ pin, user });
}

const PinDetails = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const loaderData = useLoaderData();
    const { id } = useParams();

    useEffect(() => {
        async function checkIfSavedHelper() {
            const res = await checkIfSaved(id);
            setIsSaved(res);
        }

        checkIfSavedHelper();
    }, [id]);

    const handleSaveClick = async (postUrl, postId) => {
        setLoading(true);
        const res = await savePost(postUrl, postId);
        setIsSaved(res);
        setLoading(false);
    };

    function renderDetail({ pin, user }) {
        return (
            <div className="w-full h-full flex flex-col lg:flex-row gap-3 lg:gap-4  rounded-2xl p-2 justify-around shadow-2xl">
                <div className="w-full h-[500px] lg:h-full lg:w-1/2 rounded-lg ">
                    <img
                        src={pin.imageURL}
                        alt={pin.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                {/* Made a container incase if wanna add more functionalities like download, report pin etc  */}
                <div className="flex flex-col items-start gap-4 px-8 py-4 lg:w-1/2 lg:py-3 lg:px-2">
                    <div className="flex items-center w-full justify-between">
                        <SaveButton
                            postId={pin.postId}
                            postUrl={pin.imageURL}
                            isSaved={isSaved}
                            handleSaveClick={handleSaveClick}
                            loading={loading}
                        />
                        <LikeButton postId={pin.postId} />
                    </div>

                    <h2 className="text-base font-medium text-black mt-2 lg:text-2xl">
                        {pin.title}
                    </h2>

                    <div className="flex items-center gap-2">
                        <img
                            src={user.profilePic || "/assets/noprofile.jpg"}
                            alt={user.username}
                            className="w-9 aspect-square rounded-full"
                        />
                        <p className="text-sm font-medium text-gray-900">
                            {user.username}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row lg:h-fitWFooter relative w-3/4 items-start mx-auto py-6 gap-4">
            <Link
                to="../../"
                relative="path"
                className="absolute top-2 -left-9 md:-left-12 lg:-left-20 lg:top-5 bg-gray-300 p-2 lg:p-4 shadow-2xl rounded-full"
            >
                <AiOutlineArrowLeft color="black" size={17} />
            </Link>

            <React.Suspense fallback={<LoadingPage />}>
                <Await resolve={loaderData}>
                    {(data) => {
                        return renderDetail(data);
                    }}
                </Await>
            </React.Suspense>
        </div>
    );
};

export default PinDetails;
