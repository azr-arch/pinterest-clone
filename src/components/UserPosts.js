import React from "react";

import { fetchPostsOfUser } from "../services/firebase";
import { defer, useLoaderData, Await, Link } from "react-router-dom";

export async function loader({ params }) {
  return defer({ posts: fetchPostsOfUser(params.userName) });
}

const Post = ({ post }) => {
  return (
    <Link
      to={`/pins/${post.id}`}
      className="w-72 h-96 overflow-hidden rounded-lg"
    >
      <img src={post.imageURL} alt={post.title} className="object-cover" />
    </Link>
  );
};

const UserPosts = () => {
  const loaderDataPromise = useLoaderData();

  // return <div>Nothing to show...yet! Pins you create will live here.</div>;
  return (
    <div className="flex flex-wrap items-center justify-center mx-4 my-6 gap-2">
      <React.Suspense fallback={<p>loading...</p>}>
        <Await resolve={loaderDataPromise.posts}>
          {(posts) => {
            const postEl =
              posts.length > 0
                ? posts.map((post, idx) => <Post post={post} key={idx} />)
                : "No created post yet!";

            return postEl;
          }}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default UserPosts;
