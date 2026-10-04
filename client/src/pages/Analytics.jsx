import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";
import {
  BarChart3,
  CheckCircle,
  Flame,
  Award,
  Sparkles,
} from "lucide-react";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await getAnalytics();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 dark:text-zinc-400">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading analytics...</span>
        </div>
      </div>
    );
  }

  const chartStats = [
    { label: "Habits", value: Number(data?.totalHabits) || 0, color: "bg-emerald-500" },
    { label: "Completions", value: Number(data?.totalCompletions) || 0, color: "bg-sky-500" },
    { label: "Avg Streak", value: Number(data?.averageStreak) || 0, color: "bg-amber-500" },
  ];
  const chartMax = Math.max(...chartStats.map((stat) => stat.value), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Analytics & Performance
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Detailed metrics, consistency scores, and completion trends.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Habits */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-5 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Total Habits
            </h2>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-zinc-100 mt-2">
            {data?.totalHabits || 0}
          </p>
          <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 block">
            Routines in rotation
          </span>
        </div>

        {/* Total Completions */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-5 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Completions
            </h2>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-zinc-100 mt-2">
            {data?.totalCompletions || 0}
          </p>
          <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 block">
            All-time check-ins
          </span>
        </div>

        {/* Average Streak */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-5 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Avg Streak
            </h2>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-zinc-100 mt-2">
            {data?.averageStreak || 0} <span className="text-base font-medium text-slate-400">days</span>
          </p>
          <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 block">
            Per active habit
          </span>
        </div>

        {/* Most Consistent Habit */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-5 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Top Habit
            </h2>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-bold text-slate-900 dark:text-zinc-100 mt-2 truncate capitalize" title={data?.mostConsistentHabit}>
            {data?.mostConsistentHabit || "None"}
          </p>
          <span className="text-xs text-slate-400 dark:text-zinc-500 mt-1 block">
            Most consistent habit
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-zinc-100">
            Performance Overview
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Live sync
          </span>
        </div>

        <div
          className="h-64 sm:h-72 rounded-xl bg-slate-50/80 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-800/80 px-5 pt-5 pb-4 flex items-end gap-6 sm:gap-10"
          role="img"
          aria-label="Bar chart showing habits, completions, and average streak"
        >
          {chartStats.map((stat) => (
            <div key={stat.label} className="flex-1 h-full flex flex-col items-center justify-end gap-3 min-w-0">
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
                {stat.value}
              </span>
              <div className="w-full max-w-20 h-full flex items-end">
                <div
                  className={`w-full ${stat.color} rounded-t-xl transition-[height] duration-500 ease-out`}
                  style={{ height: `${Math.max((stat.value / chartMax) * 100, stat.value > 0 ? 8 : 2)}%` }}
                  title={`${stat.label}: ${stat.value}`}
                />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-zinc-400 text-center truncate w-full">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}