import React from "react";
import Pin from "../components/Pin";
import { fetchAllPosts } from "../services/firebase";
import { Await, defer, useLoaderData } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export async function loader() {
  return defer({
    posts: fetchAllPosts(),
  });
}

const MasonryLayoutPage = () => {
  const fetchAllPostsPromise = useLoaderData();

  return (
    <div className="relative columns-2 md:columns-3 lg:columns-4 xl:columns-5 px-4 md:px-5 lg:px-6 pb-4 min-h-fitWFooter">
      <React.Suspense fallback={<LoadingPage />}>
        <Await resolve={fetchAllPostsPromise.posts}>
          {(post) => {
            return post.map((pin, idx) => <Pin pin={pin} key={idx} />);
          }}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default MasonryLayoutPage;
