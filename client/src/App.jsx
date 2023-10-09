import "./App.css";
import Register from "./components/Register";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:6500";
  axios.defaults.withCredentials = true;
  return (
    <>
      <div>
        <Register />
      </div>
    </>
  );
}

export default App;
