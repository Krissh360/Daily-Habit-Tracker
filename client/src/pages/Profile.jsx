import { useEffect, useState } from "react";
import { getHabits } from "../services/api";

export default function Profile() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHabits();
        setHabits(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  // 🔹 Derived Info
  const totalHabits = habits.length;

  const bestHabit = habits.reduce((max, h) =>
    (h.currentStreak || 0) > (max.currentStreak || 0) ? h : max,
    {}
  );

  const mostCompleted = habits.reduce((max, h) =>
    (h.totalCompleted || 0) > (max.totalCompleted || 0) ? h : max,
    {}
  );

  return (
    <div className="space-y-6">

      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Profile 👤
        </h1>
        <p className="text-gray-500">
          Your personal habit journey
        </p>
      </div>

      {/* 🔹 User Card */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">
          User Overview
        </h2>
        <p className="text-gray-600">
          Consistency builder 🚀
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Tracking habits and improving daily
        </p>
      </div>

      {/* 🔹 Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Habits Created</h2>
          <p className="text-3xl font-bold">{totalHabits}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Strongest Habit</h2>
          <p className="text-xl font-bold">
            {bestHabit.title || "None"}
          </p>
          <p className="text-gray-500 text-sm">
            🔥 {bestHabit.currentStreak || 0} day streak
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Most Practiced Habit</h2>
          <p className="text-xl font-bold">
            {mostCompleted.title || "None"}
          </p>
          <p className="text-gray-500 text-sm">
            ✅ {mostCompleted.totalCompleted || 0} completions
          </p>
        </div>

      </div>

      {/* 🔹 Motivation */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">
          Keep Going 💪
        </h2>
        <p className="text-gray-600">
          Small habits build big results. Stay consistent and trust the process.
        </p>
      </div>

    </div>
  );
}