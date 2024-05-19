import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
// import Sorry from './Sorry';

const ShowPosts = () => {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "userposts"));
        const PostsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(PostsData);
      } catch (error) {
        console.error("Error fetching Posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full lg:w-[60%] m-auto h-full min-h-screen">
      {Posts.length > 0 ? (
        <div className="container mx-auto px-4 py-8 text-white">
          <h2 className="text-3xl font-bold mb-8">Posts</h2>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {Posts.map((Posts) => (
              <Link to={`/Posts/${Posts.id}`} key={Posts.id}>
                <div className="bg-gray-600 rounded-lg overflow-hidden shadow-lg cursor-pointer h-[300px]">
                  <p dangerouslySetInnerHTML={{ __html: Posts.owner }} />
                  <img
                    src={Posts.PostsImage}
                    alt="Posts"
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-6 py-4 text-xl font-bold text-center">
                    <div
                      dangerouslySetInnerHTML={{ __html: Posts.PostsName }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        // <Sorry />
        <h1>"sorry there is not post found"</h1>
      )}
    </div>
  );
};

export default ShowPosts;
