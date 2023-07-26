import { useState } from "react";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import avatar from "../../assets/images/avatar.jpg";

const Comment = ({ c }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState(c);
  const [isLiked, setIsLiked] = useState(comment?.likes?.includes(user._id));

  const handleLikeComment = async () => {
    try {
      await fetch(`http://localhost:3000/comment/toggleLike/${c?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });

      setComment((prev) => {
        return {
          ...prev,
          likes: isLiked
            ? [...prev.likes].filter((id) => id !== user._id)
            : [...prev.likes, user._id],
        };
      });
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-start space-x-4 py-2">
      <img src={avatar} alt="User" className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-white">
            {comment?.user?.username ? comment?.user?.username : ""}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {format(comment?.createdAt)}
          </span>
        </div>
        <div className="text-sm mb-2 text-white">{comment?.commentText}</div>
        <div className="flex items-center space-x-4">
          {isLiked ? (
            <AiFillHeart
              onClick={handleLikeComment}
              className="text-red-500 cursor-pointer"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikeComment}
              className="cursor-pointer text-white"
            />
          )}
          <span className="text-white">{comment?.likes?.length || 0}</span>
          <span className="text-xs text-white">likes</span>
        </div>
      </div>
    </div>
  );
};

// Add prop type validation for the 'c' prop
Comment.propTypes = {
  c: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    commentText: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    // Add other properties of 'c' if needed...
  }).isRequired,
};

export default Comment;
