import { useEffect, useState } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState("User");

  const formatFirstName = (rawName) => {
    if (!rawName) return "User";
    const cleaned = rawName.split(" ")[0].replace(/[0-9_.-]+$/g, "");
    if (!cleaned) return rawName.split(" ")[0];
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setUserName(formatFirstName(parsed.name));
      }
    } catch (e) {
      // fallback
    }
  }, []);

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="h-16 px-8 border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          Workspace
        </span>
        <span className="text-slate-300 dark:text-zinc-700">/</span>
        <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
          Personal Habits
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-xs font-medium text-slate-400 dark:text-zinc-500 bg-slate-100/70 dark:bg-zinc-800/60 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-zinc-700/50">
          {todayFormatted}
        </div>

        {/* Profile Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold shadow-sm text-slate-700 dark:text-zinc-300">
          <div className="w-5 h-5 rounded-full bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center text-[10px] font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span>{userName}</span>
        </div>
      </div>
    </header>
  );
}
