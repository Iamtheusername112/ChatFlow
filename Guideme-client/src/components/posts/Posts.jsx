import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../post/Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/post/timeline/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Check if the response contains an error message
        if (data.msg) {
          console.error(data.msg); // Display the error message in the console
          // Handle the error here (e.g., redirect to login page or display an error message)
          return;
        }

        setPosts(data);
      } catch (error) {
        console.error(error);
        // Handle the error here (e.g., redirect to error page or display an error message)
      }
    };

    // Check if the token is available before making the API call
    if (token) {
      fetchPosts();
    } else {
      // Handle the case when the user is not authenticated (e.g., redirect to login page)
      console.error("User not authenticated");
    }
  }, [token]);

  // Function to handle post deletion and update the state
  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
        Latest Posts
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts?.map((post) => (
          <div key={post._id} className="flex w-full h-auto">
            <Post post={post} onDelete={handlePostDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
