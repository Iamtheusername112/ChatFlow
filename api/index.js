const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db");
const User = require("./models/User");
const Message = require("./models/Message");

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

const PORT = 6500;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
