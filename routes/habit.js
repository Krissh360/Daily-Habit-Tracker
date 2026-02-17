const express = require("express");
const Habit = require("../models/habit");
const jwt = require("jsonwebtoken");

const router = express.Router();

function verifyToken(req, res, next) {

    const token = req.headers["authorization"];
    if (!token) return res.json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
}

router.post("/", verifyToken, async (req, res) => {

    const habit = new Habit({
        userId: req.userId,
        title: req.body.title
    });

    await habit.save();
    res.json({ message: "Habit added" });
});

router.get("/", verifyToken, async (req, res) => {

    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
});

router.delete("/:id", verifyToken, async (req, res) => {

    await Habit.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted" });
});

module.exports = router;
