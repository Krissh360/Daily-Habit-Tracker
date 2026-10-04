import { useEffect, useState } from "react";
import {
  getHabits,
  addHabit,
  completeHabit,
} from "../services/api";
import {
  Check,
  Plus,
  Flame,
  Calendar,
  TrendingUp,
  Target,
  MoreHorizontal,
} from "lucide-react";

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

  const [userName, setUserName] = useState("");

  const formatFirstName = (rawName) => {
    if (!rawName) return "";
    // Remove numbers and special characters from the end or entire string, or split camel/word boundaries
    const cleaned = rawName.split(" ")[0].replace(/[0-9_.-]+$/g, "");
    if (!cleaned) return rawName.split(" ")[0];
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.username || parsed.name) setUserName(formatFirstName(parsed.username || parsed.name));
      }
    } catch (e) {
      // fallback
    }

    const handleUserUpdated = () => {
      const updated = JSON.parse(localStorage.getItem("user") || "{}");
      setUserName(formatFirstName(updated.username || updated.name));
    };
    window.addEventListener("userUpdated", handleUserUpdated);
    return () => window.removeEventListener("userUpdated", handleUserUpdated);
  }, []);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // 0 for Mon ... 6 for Sun

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-400">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading your habits...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* [B] HEADER & TOP BAR GREETING */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Welcome back{userName ? `, ${userName}` : ""} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Stay consistent. You're building something great.
          </p>
        </div>
      </div>

      {/* [LAYOUT] ASYMMETRIC 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* [C] MAIN WORKSPACE (LEFT COLUMN - lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. "Today's Progress" Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
                Today's Progress
              </h2>
              <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                <span className="font-semibold text-slate-900 dark:text-zinc-100">{completedToday}</span> of {totalHabits} completed
              </span>
            </div>

            {/* Progress Bar Track & Fill */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden mt-4">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          {/* 2. "Today's Habits" Card with Embedded Quick Add */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
                Today's Habits
              </h2>
              <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
                {habits.length} total
              </span>
            </div>

            {/* Embedded Quick Add Input */}
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="Add a new habit (e.g. 20 min read, Meditate, Exercise)..."
                className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl pl-4 pr-24 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddHabit();
                }}
              />
              <button
                onClick={handleAddHabit}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium px-3.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 transition-opacity"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Habits List */}
            {habits.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl">
                <Target className="w-8 h-8 mx-auto text-slate-300 dark:text-zinc-600 mb-2" />
                <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                  No habits added yet
                </p>
                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">
                  Type your first habit above to begin your streak!
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
                        {/* Interactive Circular Check Trigger */}
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

                        {/* Subtle hover-only 3-dot menu trigger */}
                        <button
                          type="button"
                          aria-label="Habit options"
                          className="p-1 text-slate-300 dark:text-zinc-600 hover:text-slate-600 dark:hover:text-zinc-300 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-150"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* [D] UTILITY / CONTEXT RAIL (RIGHT COLUMN - lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Active Streak Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
                Streak
              </h2>
              <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                Active Streak
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
                  {bestHabit.currentStreak || 0} Days
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 truncate max-w-[170px] capitalize">
                  {bestHabit.title ? `Best: ${bestHabit.title}` : "Build your first streak"}
                </div>
              </div>
            </div>
          </div>

          {/* 2. 7-Day Activity Heatmap Matrix */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
                7-Day Activity
              </h2>
              <Calendar className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
              {daysOfWeek.map((day, idx) => {
                const isPastOrToday = idx <= currentDayIndex;
                const isCompletedDay = idx < currentDayIndex || (idx === currentDayIndex && completionPercent === 100 && totalHabits > 0);
                const isPartial = idx === currentDayIndex && completionPercent > 0 && completionPercent < 100;

                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                      {day}
                    </span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        isCompletedDay
                          ? "bg-emerald-500 ring-4 ring-emerald-500/20"
                          : isPartial
                          ? "bg-emerald-400"
                          : isPastOrToday
                          ? "bg-slate-200 dark:bg-zinc-700"
                          : "bg-slate-100 dark:bg-zinc-800"
                      }`}
                      title={`${day}: ${idx === currentDayIndex ? `${completionPercent}% completed` : "Day indicator"}`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500">
              <span>Weekly rhythm</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {completedToday > 0 ? "Momentum steady" : "Awaiting first habit"}
              </span>
            </div>
          </div>

          {/* 3. Quick Insight Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-900/50 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
                Daily Insight
              </h2>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 mb-1">
              {bestHabit.title ? "Strongest Habit" : "Focus on Small Wins"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              {bestHabit.title
                ? `"${bestHabit.title}" is currently your leading habit with a ${bestHabit.currentStreak || 0}-day streak. Keep your momentum uninterrupted today!`
                : "Consistency is better than perfection. Mark off at least one habit today to trigger the psychological momentum effect."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}