import React from "react";
import Pin from "../components/Pin";
import { fetchAllPosts, filteredPosts } from "../services/firebase";
import { Await, defer, useLoaderData } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export async function loader({ request }) {
    // These next 3 lines
    const url = new URL(request.url);
    const searchParam = url.searchParams.get("search");

    console.log(searchParam);

    if (searchParam) {
        // If Params exists return the filteredResult
        return defer({
            posts: filteredPosts(searchParam),
        });
    }

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
                        if (post.length <= 0) {
                            return (
                                <p className="text-black absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    Sorry nothing found with that keyword!
                                </p>
                            );
                        }
                        return post.map((pin, idx) => (
                            <Pin pin={pin} key={idx} />
                        ));
                    }}
                </Await>
            </React.Suspense>
        </div>
    );
};

export default MasonryLayoutPage;
