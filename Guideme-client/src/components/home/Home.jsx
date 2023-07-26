// src/pages/HomePage.jsx
import ProfileCard from "./../profileCard/ProfileCard";
import SuggestedUsers from "./../suggestedUsers/SuggestedUsers";
import Posts from "./../posts/Posts";
import Rightside from "./../rightside/Rightside";

function Home() {
  return (
    <div>
      <div>
        <ProfileCard />
        <SuggestedUsers />
      </div>
      <Posts />

      <Rightside />
    </div>
  );
}

export default Home;
