import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import Comment from "../comment/Comment";
import { bookmarkPost } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post, onDelete }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    user?.bookmarkedPosts?.some(
      (bookmarkedPost) => bookmarkedPost._id === post._id
    )
  );
  const [showComment, setShowComment] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comment/${post._id}`, {
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
    fetchComments();
  }, [post._id, token]);

  const deletePost = async () => {
    try {
      await fetch(`http://localhost:3000/post/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

      // Instead of reloading the page, call the callback to notify the parent component
      onDelete(post._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikePost = async () => {
    try {
      await fetch(`http://localhost:3000/post/toggleLike/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmark = async () => {
    try {
      await fetch(`http://localhost:3000/user/bookmark/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });
      dispatch(bookmarkPost(post));
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostComment = async () => {
    if (commentText === "") {
      setIsCommentEmpty(true);
      setTimeout(() => {
        setIsCommentEmpty(false);
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
    <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg m-8">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Link to={`/profileDetail/${post?.user?._id}`}>
            <div className="flex items-center space-x-2">
              <img
                src={avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {post.user.username}
                </p>
                <p className="text-xs text-white dark:text-white">
                  {format(post.createdAt)}
                </p>
              </div>
            </div>
          </Link>
          {user._id === post.user._id && (
            <HiOutlineDotsVertical
              size={25}
              onClick={() => setShowDeleteModal((prev) => !prev)}
              className="cursor-pointer text-white"
            />
          )}
        </div>
        {showDeleteModal && (
          <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md mb-2">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white">
              Delete Post
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={deletePost}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal((prev) => !prev)}
                className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 text-gray-800 dark:text-white font-semibold py-1 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        )}
        <p className="text-sm text-gray-800 dark:text-white">{post.desc}</p>
        {post?.location && (
          <p className="text-xs text-white dark:text-white mb-3">
            Location: {post.location}
          </p>
        )}
        <div className="relative w-full h-48">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
            src={
              post?.photo
                ? `http://localhost:3000/images/${post?.photo}`
                : avatar
            }
            alt="Post"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-1 cursor-pointer ${
              isLiked ? "text-red-500" : "text-white"
            }`}
            onClick={handleLikePost}
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            <p className="text-xs font-semibold">
              {isLiked ? "Liked" : "Like"}
            </p>
          </div>
          <div
            className="flex items-center  space-x-1 cursor-pointer text-white"
            onClick={() => setShowComment((prev) => !prev)}
          >
            <BiMessageRounded />
            <p className="text-xs font-semibold">
              {showComment ? "Hide Comments" : "Show Comments"}
            </p>
          </div>
          <div
            className={`flex items-center space-x-1 cursor-pointer ${
              isBookmarked ? "text-purple-500" : "text-gray-500"
            }`}
            onClick={handleBookmark}
          >
            {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
            <p className="text-xs font-semibold">
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </p>
          </div>
        </div>
        {showComment && (
          <>
            <div className="mt-4">
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <Comment c={comment} key={comment._id} />
                ))
              ) : (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  No comments
                </p>
              )}
            </div>
            <div className="flex items-center mt-4">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                type="text"
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 py-1 px-2"
                placeholder="Type comment"
              />
              <button
                onClick={handlePostComment}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md ml-2"
              >
                Post
              </button>
            </div>
            {isCommentEmpty && (
              <p className="text-xs text-red-500 mt-2">
                You cannot post an empty comment!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    desc: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string,
    photo: PropTypes.string,
    // Add other post properties here if needed...
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Prop validation for the onDelete callback
};

export default Post;
