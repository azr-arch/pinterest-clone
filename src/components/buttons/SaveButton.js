import { MoonLoader } from "react-spinners";

const SaveButton = ({ postId, postUrl, handleSaveClick, isSaved, loading }) => {
  return (
    <button
      className={`rounded-3xl hover:opacity-100 h-10 w-20 ${
        isSaved ? "bg-black text-white" : "text-black bg-gray-300"
      } font-bold    py-2 self-end flex justify-center items-center hover:shadow-md`}
      onClick={(e) => {
        e.stopPropagation();
        handleSaveClick(postUrl, postId);
      }}
    >
      {loading ? (
        <MoonLoader color={`${isSaved ? "white" : "black"}`} size={18} />
      ) : isSaved ? (
        "Unsave"
      ) : (
        "Save"
      )}
    </button>
  );
};

export default SaveButton;
