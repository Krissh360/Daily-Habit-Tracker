const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000
})
.then(() => {
    console.log("Database connected");

    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/habits", require("./routes/habit"));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'register.html'));
    });

    app.use(express.static(path.join(__dirname, "public"), { 
        index: 'register.html',
        dotfiles: 'ignore'
    }));

    app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch(err => {
    console.error("Database connection error:", err);
    console.error("Make sure MONGO_URI is correct and MongoDB is reachable.");
    process.exit(1);
});