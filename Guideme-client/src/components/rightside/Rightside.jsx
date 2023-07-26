import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";

const Rightside = () => {
  const [friends, setFriends] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(`http://localhost:3000/user/find/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        setFriends(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, [user.followings]);

  return (
    <div>
      {friends?.length > 0 ? (
        friends?.map((friend) => (
          <Link
            to={`/profileDetail/${friend._id}`}
            key={friend._id}
            className="bg-white dark:bg-gray-500 rounded-lg border shadow-2xl m-4 p-4 flex items-center space-x-4 transition-transform transform-gpu hover:scale-110"
            style={{ height: "150px", maxWidth: "300px" }}
          >
            <img src={avatar} alt="User" className="w-12 h-12 rounded-full" />
            <div>
              <span className="text-white dark:text-black text-base">
                {friend.username}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <span className="text-white dark:text-black">
          You currently have no friends. Follow someone!
        </span>
      )}
    </div>
  );
};

export default Rightside;
