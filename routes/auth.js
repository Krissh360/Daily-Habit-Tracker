const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "Registered successfully" });
});

// Login
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.json({ message: "Wrong password" });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.json({ token });
});

module.exports = router;
