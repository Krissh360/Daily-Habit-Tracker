const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch(err => console.log("Database connection error:", err.message));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/habits", require("./routes/habit"));

app.listen(5000, () => console.log("Server running on port 5000"));
