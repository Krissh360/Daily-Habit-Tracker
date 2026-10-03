import { useEffect, useState } from "react";
import { getHabits } from "../services/api";
import {
  User,
  Flame,
  Award,
  CalendarCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Profile() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      // fallback
    }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-400">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

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

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="space-y-6">
      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Your personal habit journey, streaks, and milestones.
        </p>
      </div>

      {/* 🔹 User Overview Hero Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-md shadow-emerald-500/20 flex-shrink-0">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100 truncate">
              {user?.name || "Habit Builder"}
            </h2>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              Active Member
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            {user?.email || "Personal Habit Journey"}
          </p>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 font-medium">
            Building positive daily momentum through consistent small wins.
          </p>
        </div>
      </div>

      {/* 🔹 Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Total Habits
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-zinc-100">
            {totalHabits}
          </p>
          <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 block">
            Routines created
          </span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Strongest Habit
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-zinc-100 truncate" title={bestHabit.title}>
            {bestHabit.title || "None"}
          </p>
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            {bestHabit.currentStreak || 0} day streak
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Most Practiced
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-zinc-100 truncate" title={mostCompleted.title}>
            {mostCompleted.title || "None"}
          </p>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
            {mostCompleted.totalCompleted || 0} completions recorded
          </p>
        </div>
      </div>

      {/* 🔹 Motivation Banner */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 shadow-sm rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-zinc-100 uppercase tracking-wide">
            Philosophy of Calm Consistency
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
          Small habits build monumental results. Focus on executing today's tasks without worrying about tomorrow, and let compounding momentum do the rest.
        </p>
      </div>
    </div>
  );
}