import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { uploadPost } from "../services/firebase";
import { MoonLoader } from "react-spinners";
import {
    Await,
    Form,
    defer,
    redirect,
    useLoaderData,
    useNavigation,
} from "react-router-dom";
import { getCurrentUser } from "../services/firebase";
import LoadingPage from "../pages/LoadingPage";
import { requireAuth } from "../utils";

export async function loader({ request }) {
    await requireAuth(request);
    return defer({
        user: getCurrentUser(),
    });
}

export async function action({ request }) {
    const formData = await request.formData();
    const file = formData.get("image");
    const title = formData.get("title");
    const description = formData.get("description");
    const postedBy = formData.get("user-id");
    const tag = formData.get("tag");

    try {
        await uploadPost({ title, description, file, postedBy, tag });
        return redirect("/");
    } catch (e) {
        console.log("something went wrong please try again later!");
        return null;
    }
}

const CreatePost = () => {
    const userPromise = useLoaderData();

    const [previewImg, setPreviewImg] = useState(null);
    const { state } = useNavigation();

    // Helper function to preview selected file
    const uploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPreviewImg(reader.result);
            });
            reader.readAsDataURL(file);
        }
    };

    function renderDetails(user) {
        return (
            <>
                <Form
                    className="w-4/5 flex flex-col gap-6 lg:pl-5"
                    encType="multipart/form-data"
                    method="post"
                >
                    {/* Upload File Here */}
                    <div className="flex w-full lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3">
                        <div className="bg-gray-300 p-3 flex justify-center items-center flex-0.7 w-full h-[300px]">
                            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-full lg:h-420">
                                <label>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {!previewImg && (
                                            <>
                                                <div className="flex flex-col justify-center items-center">
                                                    <p className="font-bold text-2xl text-center">
                                                        <AiOutlineCloudUpload />
                                                    </p>
                                                    <p className="text-lg">
                                                        Click to upload
                                                    </p>
                                                </div>
                                                <p className="text-gray-500 text-md text-center">
                                                    Use high-quality JPG, PNG,
                                                    SVG, GIF less than 20MB
                                                </p>
                                            </>
                                        )}
                                        <input
                                            onChange={uploadImage}
                                            type="file"
                                            name="image"
                                            className="w-0 h-0"
                                            required
                                        />
                                    </div>
                                </label>
                                <div className="relative h-full">
                                    {previewImg && (
                                        <>
                                            <img
                                                src={previewImg}
                                                alt="upload-img"
                                                className="object-contain"
                                            />
                                            <button
                                                onClick={() => {
                                                    setPreviewImg(null);
                                                }}
                                                className="rounded-[50%] bg-white shadow-lg absolute bottom-8 right-8 hover:bg-gray-500 p-2 transition-colors duration-100 ease-in-out"
                                            >
                                                <MdDelete size={"2em"} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <img
                            src={
                                user.profilePic === null
                                    ? "./assets/noprofile.jpg"
                                    : user.profilePic
                            }
                            alt="user-profile"
                            className="w-[50px] aspect-square object-cover object-center rounded-[50%] p-1 "
                        />
                        <p className="font-bold text-black text-sm sm:text-lg">
                            {user.username}
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Add your title here"
                        className=" border-b-2 border-gray-400 outline-none p-2 text-sm sm:text-lg w-[70%] md:w-[50%]"
                        name="title"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Add your Description here"
                        className=" border-b-2 border-gray-400 outline-none p-2 text-sm sm:text-lg w-[80%] md:w-[50%]"
                        name="description"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Tag  (this help others to search your Post)"
                        className=" border-b-2 border-gray-400 outline-none p-2 text-sm sm:text-lg w-[80%] md:w-[50%]"
                        required
                        name="tag"
                    />
                    <input
                        readOnly
                        aria-label="user-Id"
                        hidden
                        name="user-id"
                        value={user.userId}
                    />
                    <button
                        disabled={state === "submitting"}
                        className={`flex items-center justify-center text-white text-sm md:text-base font-bold px-1 py-2 md:p-2 rounded-full w-28 outline-none hover:text-black hover:bg-gray-400 ${
                            state === "submitting" ? "bg-gray-500" : "bg-black"
                        } shadow-lg transition-colors duration-150 ease-in-out `}
                    >
                        {state === "submitting" ? (
                            <MoonLoader color="white" size={18} />
                        ) : (
                            "Post"
                        )}
                    </button>
                </Form>
            </>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <React.Suspense fallback={<LoadingPage />}>
                <Await resolve={userPromise.user}>
                    {(user) => renderDetails(user)}
                </Await>
            </React.Suspense>
        </div>
    );
};

export default CreatePost;
