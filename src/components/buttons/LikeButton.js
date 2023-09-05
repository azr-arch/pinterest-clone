import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { checkIfLiked, likePost } from "../../services/firebase";

const LikeButton = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    checkIfLikedHelper();
    // fetchLikeCount();
  }, []);

  async function checkIfLikedHelper() {
    const [isUserLiked, likeCount] = await checkIfLiked(postId);
    setIsLiked(isUserLiked);
    setLikeCount(likeCount);
  }

  //   async function fetchLikeCount() {
  //     // Fetch the current like count for the post
  //     const postRef = firestore.collection("posts").doc(postId);
  //     const postSnapshot = await postRef.get();

  //     if (postSnapshot.exists) {
  //       const postData = postSnapshot.data();
  //       setLikeCount(postData.likeCount || 0);
  //     }
  //   }

  async function handleLikeClick() {
    await likePost(postId);
    //setting new updated like count
    setIsLiked((prev) => !prev);
    const [isUserLiked, likeCount] = await checkIfLiked(postId);
    setLikeCount(likeCount);
    //   if (isLiked) {
    //     // If already liked, perform unlike action
    //     await unlikePost();
    //   } else {
    //     // If not liked, perform like action
    //     await likePost();
    //   }
    // await likePost(postId)
    // setLikeCount()
  }

  //   async function likePost() {
  //     // Implement your own logic to perform the like action
  //     // Here, we assume you have a "likes" collection in your Firestore database
  //     const likeRef = firestore.collection("likes").doc(postId);
  //     await likeRef.set({ postId, timestamp: Date.now() });

  //     setIsLiked(true);
  //     setLikeCount(likeCount + 1);
  //   }

  //   async function unlikePost() {
  //     // Implement your own logic to perform the unlike action
  //     // Here, we assume you have a "likes" collection in your Firestore database
  //     const likeRef = firestore.collection("likes").doc(postId);
  //     await likeRef.delete();

  //     setIsLiked(false);
  //     setLikeCount(likeCount - 1);
  //   }

  return (
    <div className="flex items-center gap-3">
      <button onClick={handleLikeClick}>
        {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
      </button>
      <span className="font-medium">{likeCount} Likes</span>
    </div>
  );
};

export default LikeButton;
