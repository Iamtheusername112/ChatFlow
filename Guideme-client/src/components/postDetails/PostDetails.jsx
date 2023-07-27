import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.jpg";
import Comment from "../comment/Comment";

const PostDetails = () => {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [isCommentLong, setIsCommentLong] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/post/find/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };
    id && fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    post && fetchComments();
  }, [post._id]);

  const handlePostComment = async () => {
    if (commentText === "") {
      setIsCommentEmpty(true);
      setTimeout(() => {
        setIsCommentEmpty(false);
      }, 2000);
      return;
    }

    if (commentText.length > 50) {
      setIsCommentLong(true);
      setTimeout(() => {
        setIsCommentLong(false);
      }, 2000);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/comment`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ commentText, post: post._id }),
      });

      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4 md:mb-0">
          <img
            src={post?.photo && `http://localhost:3000/images/${post?.photo}`}
            alt="Post"
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <Link
              to={`/profileDetail/${post?.user?._id}`}
              className="flex items-center gap-2"
            >
              <img
                src={avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-bold">{post?.user?.username}</span>
                <span className="text-sm">
                  {post?.location
                    ? post?.location
                    : "Somewhere around the globe"}
                </span>
              </div>
            </Link>
          </div>
          {/* comments */}
          <div className="space-y-4">
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <Comment c={comment} key={comment._id} />
              ))
            ) : (
              <h3 className="text-center">No comments yet</h3>
            )}
          </div>
          {/* comment input field */}
          <div className="flex space-x-2 mt-4">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              type="text"
              placeholder="Type comment..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
            />
            <button
              onClick={handlePostComment}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Post
            </button>
          </div>
          {isCommentEmpty && (
            <span className="text-red-500">
              You can not post an empty comment!
            </span>
          )}
          {isCommentLong && (
            <span className="text-red-500">Comment is too long</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
