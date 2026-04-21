const express = require("express");
const Habit = require("../models/Habit");
const jwt = require("jsonwebtoken");

const router = express.Router();

function verifyToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.json({ message: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
}

function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  const sortedDates = dates
    .map(d => new Date(d))
    .sort((a, b) => b - a);

  let streak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diff =
      (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function calculateLongestStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  const sortedDates = dates
    .map(d => new Date(d))
    .sort((a, b) => a - b);

  let longest = 1;
  let current = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diff =
      (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

router.post("/", verifyToken, async (req, res) => {
  try {
    const title = req.body.title.trim();

    const existing = await Habit.findOne({
      userId: req.userId,
      title: { $regex: `^${title}$`, $options: "i" } // case-insensitive
    });

    if (existing) {
      return res.json({ message: "Habit already exists" });
    }

    const habit = new Habit({
      userId: req.userId,
      title
    });

    await habit.save();
    res.json(habit);

  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/", verifyToken, async (req, res) => {

  const habits = await Habit.find({ userId: req.userId });

  const updatedHabits = habits.map(habit => {
    const currentStreak = calculateStreak(habit.completedDates);
    const longestStreak = calculateLongestStreak(habit.completedDates);

    return {
      ...habit._doc,
      currentStreak,
      longestStreak,
      totalCompleted: habit.completedDates.length
    };
  });

  res.json(updatedHabits);
});

router.delete("/:id", verifyToken, async (req, res) => {

    await Habit.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Deleted" });
});

// MARK HABIT COMPLETE
router.put("/complete/:id", verifyToken, async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit) return res.json({ message: "Habit not found" });

  const today = new Date().toDateString();

  if (!habit.completedDates.includes(today)) {
    habit.completedDates.push(today);
    await habit.save();
  }

  res.json({ message: "Habit marked as completed", habit });
});

router.get("/analytics", verifyToken, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });

    const totalHabits = habits.length;

    let totalCompletions = 0;
    let totalStreak = 0;
    let maxHabit = null;
    let maxCompleted = 0;

    habits.forEach(habit => {
      const completed = habit.completedDates.length;

      totalCompletions += completed;

      const streak = calculateStreak(habit.completedDates);
      totalStreak += streak;

      if (completed > maxCompleted) {
        maxCompleted = completed;
        maxHabit = habit.title;
      }
    });

    const avgStreak =
      totalHabits > 0 ? (totalStreak / totalHabits).toFixed(2) : 0;

    res.json({
      totalHabits,
      totalCompletions,
      averageStreak: avgStreak,
      mostConsistentHabit: maxHabit || "None"
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
