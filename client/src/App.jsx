// App.jsx
import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
// import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <>
      <div>
        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Signup toggleForm={toggleForm} />
        )}
      </div>
    </>
  );
}

// Add prop validation for toggleForm
Login.propTypes = {
  toggleForm: PropTypes.func.isRequired, // You can specify the prop type here
};

export default App;
