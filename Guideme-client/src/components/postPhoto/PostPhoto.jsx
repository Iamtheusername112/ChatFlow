import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";

const PostPhoto = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className="relative block w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={`/postDetails/${post._id}`}
    >
      <img src={avatar} alt="Post" className="w-full h-auto" />
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
          {post?.likes?.length} likes
        </div>
      )}
    </Link>
  );
};

PostPhoto.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    // Other prop validations for the 'post' object
  }).isRequired,
};

export default PostPhoto;
