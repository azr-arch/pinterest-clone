import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaveButton from "./buttons/SaveButton";
import { savePost, checkIfSaved } from "../services/firebase";

const Pin = ({ pin }) => {
  const navigate = useNavigate();
  const [postHovered, setpostHovered] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  //loading state for save button
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkIfSavedHelper() {
      const res = await checkIfSaved(pin.postId);
      setIsSaved(res);
    }
    checkIfSavedHelper();
  }, []);

  const handleSaveClick = async (postUrl, postId) => {
    setLoading(true);
    const res = await savePost(postUrl, postId);
    setIsSaved(res);
    setLoading(false);
  };

  return (
    <div
      className="w-auto mb-2 max-w-auto cursor-pointer relative"
      onMouseEnter={() => setpostHovered(true)}
      onMouseLeave={() => setpostHovered(false)}
      onClick={() => navigate(`/pins/${pin.postId}`)}
    >
      <img
        src={pin.imageURL}
        alt={pin.title}
        className="max-w-full rounded-xl"
      />
      {postHovered && (
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-40"
          style={{ height: "100%" }}
        >
          <SaveButton
            postId={pin.postId}
            postUrl={pin.imageURL}
            isSaved={isSaved}
            handleSaveClick={handleSaveClick}
            loading={loading}
          />

          <p className="rounded-2xl bg-white py-1 px-4 text-black self-start mb-2 ml-2 font-medium shadow-lg">
            {pin.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Pin;
