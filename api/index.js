const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db");
const User = require("./models/User");
const Message = require("./models/Message");
const jwt = require("jsonwebtoken");
const jwtSECRET = process.env.JWT_SECRET;

const app = express();

require("dotenv").config();

// Connect to the database
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json("Your server is working");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const createdUser = await User.create({ username, email, password });

  jwt.sign({ userId: createdUser._id }, jwtSECRET, {}, (err, token) => {
    if (err) throw err;
    res.cookie("token", token).status(201).json("Ok");
  });
});

const PORT = 6500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
