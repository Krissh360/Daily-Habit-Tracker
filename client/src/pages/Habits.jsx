import { useEffect, useState } from "react";
import { getHabits, addHabit, completeHabit, deleteHabit } from "../services/api";
import {
  Check,
  Plus,
  Trash2,
  Flame,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-400">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading habits...</span>
        </div>
      </div>
    );
  }

  const completedCount = habits.filter((h) => h.completedDates?.includes(today)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            My Habits
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Organize, track, and maintain your regular routines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {completedCount} / {habits.length} Done Today
          </span>
        </div>
      </div>

      {/* Add Habit Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
        <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100 mb-4">
          Add New Habit
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="What habit do you want to build?"
            className="flex-1 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddHabit();
            }}
          />

          <button
            onClick={handleAddHabit}
            className="bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Habits List Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
            All Active Habits
          </h2>
          <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
            {habits.length} habits
          </span>
        </div>

        {habits.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
            <ClipboardList className="w-8 h-8 mx-auto text-slate-300 dark:text-zinc-600 mb-2" />
            <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
              No habits created yet.
            </p>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
              Start building your daily ritual by adding a new habit above.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-zinc-800/60">
            {habits.map((habit) => {
              const isDone = habit.completedDates?.includes(today);

              return (
                <li
                  key={habit._id}
                  className="py-3.5 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-4">
                    {/* Circular Check Button */}
                    <button
                      type="button"
                      onClick={() => handleComplete(habit._id)}
                      disabled={isDone}
                      aria-label={isDone ? "Completed" : "Mark as complete"}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                        isDone
                          ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                          : "border-2 border-slate-300 dark:border-zinc-700 hover:border-emerald-500 text-transparent hover:text-emerald-500/50"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`text-sm font-medium block truncate capitalize transition-colors ${
                          isDone
                            ? "line-through text-slate-400 dark:text-zinc-500"
                            : "text-slate-900 dark:text-zinc-100"
                        }`}
                      >
                        {habit.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Streak Badge */}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{habit.currentStreak || 0}</span>
                    </span>

                    {/* Subtle hover-only delete button */}
                    <button
                      onClick={() => handleDelete(habit._id)}
                      aria-label="Delete habit"
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-150"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}