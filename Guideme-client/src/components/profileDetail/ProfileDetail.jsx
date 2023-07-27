import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";
import { handleFollow } from "../../redux/authSlice";
import PostPhoto from "../postPhoto/PostPhoto";

const ProfileDetail = () => {
  const [profile, setProfile] = useState("");
  const [profilePosts, setProfilePosts] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const [isFollowed, setIsFollowed] = useState(false);
  const [show, setShow] = useState("mypost");
  const dispatch = useDispatch();
  const { id } = useParams();

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/user/find/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data);

        if (user?._id !== data?._id) {
          setIsFollowed(user?.followings?.includes(data?._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [id, token, user]);

  // fetch profile posts
  useEffect(() => {
    const fetchProfilePosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/post/find/userposts/${id}`
        );
        const data = await res.json();
        setProfilePosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfilePosts();
  }, [id]);

  // handle follow function
  const handleFollowFunction = async () => {
    try {
      await fetch(`http://localhost:3000/user/toggleFollow/${profile?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });

      dispatch(handleFollow(id));

      setProfile((prev) => {
        return {
          ...prev,
          followers: isFollowed
            ? [...prev.followers].filter((id) => id !== user._id)
            : [...prev.followers, user._id],
        };
      });
      setIsFollowed((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 mb-4">
          <div className="flex items-center mb-4">
            <img
              src={
                profile?.profileImg
                  ? `http://localhost:3000/images/${profile?.profileImg}`
                  : avatar
              }
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div className="ml-4">
              <h4 className="text-xl font-bold">{profile?.username}</h4>
              <p className="text-sm">
                Bio:{" "}
                {profile?.desc ? profile.desc : "Life is full of adventures"}
              </p>
            </div>
          </div>
          {profile?._id !== user._id && (
            <button
              onClick={handleFollowFunction}
              className={`px-4 py-2 rounded ${
                isFollowed ? "bg-red-600 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="md:col-span-2">
          <div className="flex mb-4 space-x-4">
            <div
              className={`cursor-pointer px-4 py-2 rounded ${
                show === "mypost"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setShow("mypost")}
            >
              My posts
            </div>
            <div
              className={`cursor-pointer px-4 py-2 rounded ${
                show === "bookmarked"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
              onClick={() => setShow("bookmarked")}
            >
              Bookmarked
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {show === "mypost" && profilePosts?.length > 0 ? (
              profilePosts.map((post) => (
                <PostPhoto post={post} key={post._id} />
              ))
            ) : show === "mypost" ? (
              <h2 className="col-span-3 text-center">Profile has no posts</h2>
            ) : null}
            {show === "bookmarked" && user?.bookmarkedPosts?.length > 0 ? (
              user.bookmarkedPosts.map((post) => (
                <PostPhoto post={post} key={post._id} />
              ))
            ) : show === "bookmarked" ? (
              <h2 className="col-span-3 text-center">
                You have no bookmarked posts
              </h2>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
