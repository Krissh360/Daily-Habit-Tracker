const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userId: String,
    title: String
});

module.exports = mongoose.model("Habit", habitSchema);
