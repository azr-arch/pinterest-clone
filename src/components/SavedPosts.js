import React from "react";
import {
  defer,
  useLoaderData,
  useOutletContext,
  Await,
  Link,
} from "react-router-dom";
// import { requireAuth } from "../utils";
import { fetchSavedPosts } from "../services/firebase";
import Pin from "./Pin";

export async function loader({ params }) {
  //   console.log(params);
  return defer({ savedPosts: fetchSavedPosts(params.userName) });
}

const Saved = ({ post }) => {
  return (
    <Link
      to={`/pins/${post.id}`}
      className="w-72 h-96 overflow-hidden rounded-lg"
    >
      <img src={post.url} alt="user-saved post" className="object-cover" />
    </Link>
  );
};

const SavedPosts = () => {
  const userId = useOutletContext();

  const loaderDataPromise = useLoaderData();

  return (
    <div className="flex flex-wrap items-center justify-center mx-4 my-6 gap-2">
      <React.Suspense fallback={<p>loading...</p>}>
        <Await resolve={loaderDataPromise.savedPosts}>
          {(savedPosts) => {
            const savePostEl =
              savedPosts.length > 0
                ? savedPosts.map((post) => <Saved post={post} key={post.id} />)
                : "No Saved Pins yet.";
            return savePostEl;
          }}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default SavedPosts;
