import { useState, useEffect } from "react";
import { savePost, checkIfSaved } from "../../services/firebase";

const SaveButton = ({ postId, postUrl }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkIfSavedHelper();
  }, []);

  async function checkIfSavedHelper() {
    const res = await checkIfSaved(postId);
    setIsSaved(res);
  }

  async function handleSaveClick() {
    setIsSaving(true);

    // Call the savePost function and wait for it to complete
    await savePost(postId, postUrl);

    // After the savePost function is completed, update the UI
    setIsSaved(!isSaved);
    setIsSaving(false);
  }

  return (
    <button
      className={`rounded-3xl hover:opacity-100 ${
        isSaved ? "bg-black text-white" : "text-black bg-gray-300"
      } font-bold px-4 py-1 self-end hover:shadow-md`}
      onClick={(e) => {
        e.stopPropagation();
        handleSaveClick();
      }}
    >
      {/* //it hurts just by looking at it */}
      {isSaving
        ? isSaved
          ? "Unsaving..."
          : "Saving..."
        : isSaved
        ? "Unsave"
        : "Save"}
    </button>
  );
};

export default SaveButton;
