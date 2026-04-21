import { useEffect, useState } from "react";
import {
  getHabits,
  addHabit,
  completeHabit,
} from "../services/api";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);

  const today = new Date().toDateString();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddHabit = async () => {
    if (!newHabit.trim()) return;

    try {
      await addHabit(newHabit);
      setNewHabit("");
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeHabit(id);
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Derived Data
  const totalHabits = habits.length;

  const completedToday = habits.filter(h =>
    h.completedDates?.includes(today)
  ).length;

  const remaining = habits.filter(
    h => !h.completedDates?.includes(today)
  );

  const completionPercent =
    totalHabits > 0
      ? Math.round((completedToday / totalHabits) * 100)
      : 0;

  const bestHabit = habits.reduce((max, h) =>
    (h.currentStreak || 0) > (max.currentStreak || 0) ? h : max,
    {}
  );

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">

      {/* 🔹 Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500">
          Stay consistent. You're building something great.
        </p>
      </div>

      {/* 🔥 Progress Card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">
          Today’s Progress
        </h2>

        <p className="text-2xl font-bold">
          {completedToday} / {totalHabits} completed
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {completionPercent}% completed today
        </p>
      </div>

      {/* ➕ Quick Add */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Quick Add Habit
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
        placeholder="Enter habit..."
            className="flex-1 p-2 border rounded-md"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />

          <button
            onClick={handleAddHabit}
            className="bg-#D4AF37 text-white px-4 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* 🧩 Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ✅ Today’s Habits */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Today’s Habits
          </h2>

          <ul className="space-y-2">
            {habits.map((habit) => (
              <li
                key={habit._id}
                className={`p-3 border rounded-md flex justify-between items-center ${
                  habit.completedDates?.includes(today)
                    ? "bg-#D4AF37"
                    : ""
                }`}
              >
                <span>
                  {habit.title}
                  <span className="text-sm text-gray-500 ml-2">
                    🔥 {habit.currentStreak}
                  </span>
                </span>

                <button
                  onClick={() => handleComplete(habit._id)}
                  disabled={habit.completedDates?.includes(today)}
                  className={`px-3 py-1 rounded-md text-white ${
                    habit.completedDates?.includes(today)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {habit.completedDates?.includes(today) ? "Done" : "Complete"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ⚡ Remaining */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Remaining Today
          </h2>

          {remaining.length === 0 ? (
            <p className="text-green-600 font-semibold">
              🎉 All habits completed!
            </p>
          ) : (
            <ul className="space-y-2">
              {remaining.map((habit) => (
                <li
                  key={habit._id}
                  className="p-3 border rounded-md"
                >
                  {habit.title}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

      {/* 📊 Quick Insight */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">
          Quick Insight
        </h2>

        <p className="text-gray-700">
          🏆 Best habit:{" "}
          <span className="font-semibold">
            {bestHabit.title || "None"}
          </span>
        </p>
      </div>

    </div>
  );
}