import { useEffect, useState } from "react";
import { getHabits, addHabit, completeHabit, deleteHabit } from "../services/api";

export default function Habits() {
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

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      fetchHabits();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading habits...</p>;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">
        My Habits 📋
      </h1>

      {/* Add Habit */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Add New Habit
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
          All Habits
        </h2>

        {habits.length === 0 ? (
          <p className="text-gray-500">No habits yet.</p>
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
                <span>
                  {habit.title}
                  <span className="text-sm text-gray-500 ml-2">
                    🔥 {habit.currentStreak}
                  </span>
                </span>

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