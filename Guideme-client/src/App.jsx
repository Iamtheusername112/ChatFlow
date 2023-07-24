import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Upload from "./components/upload/Upload";
import ProfileDetail from "./components/profileDetail/ProfileDetail";
import PostDetails from "./components/postDetails/PostDetails";
// import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profileDetail/:id" element={<ProfileDetail />} />
        <Route path="/postDetials/:id" element={<PostDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
