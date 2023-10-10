const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const app = express();

require("dotenv").config();

// Connect to the database
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

//Routes
app.get("/api/user", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//Running the server

const PORT = process.env.PORT || 6500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
