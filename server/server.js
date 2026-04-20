require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/habits", require("./routes/habits"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });