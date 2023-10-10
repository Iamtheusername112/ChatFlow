import "./App.css";
// import Register from "./components/Register";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <>
      <div>
        {/* <Register /> */}
        <Login />
        <Signup />
      </div>
    </>
  );
}

export default App;
