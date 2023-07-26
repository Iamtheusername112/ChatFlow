import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleFollow } from "../../redux/authSlice";
import avatar from "../../assets/images/avatar.jpg";
import { SlLike } from "react-icons/sl";
// import ThirdCard from "../card3/ThirdCard";
import Posts from "../posts/Posts";

function SuggestedUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/user/find/suggestedUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        setSuggestedUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestedUsers();
  }, [token]);

  const toggleFollow = async (id) => {
    try {
      await fetch(`http://localhost:3000/user/toggleFollow/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });
      setSuggestedUsers((prev) => {
        return prev.filter((user) => user._id !== id);
      });
      dispatch(handleFollow(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-8">
      <div className="flex justify-center space-x-4 py-8 px-4">
        {/* Suggested Users Card */}
        <div className="w-1/3">
          <div className="text-center mb-8">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">
              Suggested Users
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-black">
              Hi {user?.username ?? "Guest"}!! Here are some suggested users for
              you.
            </p>
          </div>
          <div className="grid gap-4 mb-6 md:grid-cols-1 justify-start">
            {suggestedUsers?.length > 0 ? (
              suggestedUsers?.map((suggestedUser) =>
                suggestedUser.username ? ( // Add the conditional check here
                  <div
                    className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
                    key={suggestedUser._id}
                  >
                    <Link to={`/profileDetail/${suggestedUser._id}`}>
                      <img
                        className="w-20 h-20 min-w-[5rem] min-h-[5rem] rounded-lg sm:rounded-none sm:rounded-l-lg object-cover"
                        src={
                          suggestedUser?.photo ? suggestedUser.photo : avatar
                        }
                        alt="Bonnie Avatar"
                      />
                    </Link>
                    <div className="p-3 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          <a href="#">{suggestedUser.username}</a>
                        </h3>
                      </div>
                      <p className="mt-2 font-light text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                        {suggestedUser?.bio
                          ? suggestedUser.bio
                          : "Life is full of adventures"}
                      </p>
                      <ul className="flex space-x-2">
                        <li>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          >
                            <SlLike size={16} color="white" />
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          ></a>
                        </li>
                        <li>
                          <button
                            onClick={() => toggleFollow(suggestedUser._id)}
                            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          >
                            Follow
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-black">
                You have no suggested users
              </h3>
            )}
          </div>
          <a
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-2"
          >
            See all notifications
          </a>
        </div>

        {/* Posts Card */}
        <Posts />

        {/* Third Card */}
        {/* <ThirdCard /> */}
      </div>
    </div>
  );
}

export default SuggestedUsers;
