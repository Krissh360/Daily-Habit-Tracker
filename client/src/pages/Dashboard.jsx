import { useEffect, useState } from "react";
import { getHabits, addHabit } from "../services/api";
import { completeHabit } from "../services/api";
import { deleteHabit } from "../services/api";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const today = new Date().toDateString();
  const [loading, setLoading] = useState(true);
  const [newHabit, setNewHabit] = useState(""); 
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

  const handleAddHabit = async () => {
  console.log("Button clicked"); // debug

  if (!newHabit.trim()) return;

  try {
    const created = await addHabit(newHabit);

    setHabits([...habits, created]);
    setNewHabit("");
  } catch (err) {
    console.error(err);
  }
};

const handleComplete = async (id) => {
  try {
    await completeHabit(id);

    // refresh habits
    const updated = await getHabits();
    setHabits(updated);
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteHabit(id);

    const updated = await getHabits();
    setHabits(updated);
  } catch (err) {
    console.error(err);
  }
};

  const totalHabits = habits.length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500">
          Track your habits and stay consistent.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Habits</h2>
          <p className="text-2xl font-bold">
            {loading ? "..." : totalHabits}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Completed Today</h2>
          <p className="text-2xl font-bold">
            {loading ? "..." : habits.filter(h => h.completedDates.includes(today)).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Current Streak</h2>
          <p className="text-2xl font-bold">
            {loading ? "..." : Math.max(...habits.map(h => h.currentStreak), 0)} days
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Completion Rate</h2>
          <p className="text-2xl font-bold">
            {loading ? "..." : totalHabits > 0 ? Math.round((habits.filter(h => h.completedDates.includes(today)).length / totalHabits) * 100) : 0}%
          </p>
        </div>

      </div>

      {/* Add Habit */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Add Habit
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
  className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
>
  Add
</button>
        </div>
      </div>

      {/* Habits List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Today’s Habits
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : habits.length === 0 ? (
          <p className="text-gray-500">No habits added yet.</p>
        ) : (
          <ul className="space-y-2">
  {habits.map((habit) => (
    <li
  key={habit._id}
  className={`p-3 border rounded-md flex justify-between items-center ${
    habit.completedDates?.includes(today)
      ? "bg-green-100"
      : ""
  }`}
>
  {/* LEFT SIDE */}
  <span>
    {habit.title}
    <span className="text-sm text-gray-500 ml-2">
      🔥 {habit.currentStreak}
    </span>
  </span>

  {/* RIGHT SIDE BUTTONS */}
  <div className="flex gap-2">
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

    <button
      onClick={() => handleDelete(habit._id)}
      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</li>
  ))}
</ul>
        )}
      </div>

    </div>
  );
}