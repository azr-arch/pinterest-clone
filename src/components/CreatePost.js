import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { uploadPost } from "../services/firebase";
import { MoonLoader } from "react-spinners";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
export async function action({ request }) {
  const formData = await request.formData();
  const file = formData.get("image");
  const title = formData.get("title");
  const description = formData.get("description");
  const postedBy = user.userId;

  try {
    await uploadPost({ title, description, file, postedBy });
    return redirect("/");
  } catch (e) {
    console.log(e);
    return null;
  }
}

const CreatePost = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [image, setImage] = useState(null);
  // const [title, setTitle] = useState(null);
  // const [desc, setDesc] = useState(null);
  const { state } = useNavigation();
  console.log(state);

  //helper function to preview selected file
  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    console.log(image);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImg(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   //Naive validation
  //   if (!previewImg || !image || !title || !desc) return;
  //   try {
  //     // location.action("loading");
  //     await uploadPost({
  //       title,
  //       description: desc,
  //       file: image,
  //       postedBy: user.userId,
  //     });
  //   } catch (error) {
  //     // Handle error if the form submission fails
  //     console.log(error);
  //     // location.action("error");
  //   } finally {
  //     setPreviewImg(null);
  //     setImage(null);
  //     setTitle(null);
  //     setDesc(null);
  //     // location.action("idle");
  //   }
  // };
  return (
    <div className="flex flex-col justify-center items-center  h-fitWFooter gap-4">
      <Form
        className="w-4/5 flex flex-col gap-6 lg:pl-5"
        encType="multipart/form-data"
        method="post"
      >
        <div className="flex w-4/5 lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3">
          <div className="bg-gray-300 p-3 flex flex-0.7 w-full h-[300px]">
            <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  {!previewImg && (
                    <>
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-2xl text-center">
                          <AiOutlineCloudUpload />
                        </p>
                        <p className="text-lg">Click to upload</p>
                      </div>
                      <p className="text-gray-500 text-md text-center">
                        Use high-quality JPG, PNG, SVG, GIF less than 20MB
                      </p>
                    </>
                  )}
                  <input
                    // ref={fileInputRef}
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
                      className="object-cover"
                    />
                    <button
                      onClick={() => {
                        setPreviewImg(null);
                        setImage(null);
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
            className="w-[50px] aspect-square rounded-[50%] p-1 "
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

        <button
          disabled={state === "submitting"}
          className={`flex items-center justify-center text-white text-sm md:text-base font-bold p-1 md:p-2 rounded-full w-28 outline-none hover:text-black hover:bg-gray-400 ${
            state === "submitting" ? "bg-gray-500" : "bg-black"
          } shadow-lg transition-colors duration-150 ease-in-out`}
        >
          {state === "submitting" ? (
            <MoonLoader color="white" size={18} />
          ) : (
            "Post"
          )}
        </button>
      </Form>
    </div>
  );
};

export default CreatePost;
