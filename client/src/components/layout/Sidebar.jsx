import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  User,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial dark mode from DOM or localStorage
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("themeUpdated"));
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Habits", path: "/habits", icon: CheckSquare },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md p-5 flex flex-col justify-between select-none">
      <div>
        {/* Top Branding */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shadow-sm shadow-emerald-500/20 overflow-hidden">
            <img src="/grind-set-logo.svg" alt="Grind Set" className="w-8 h-8" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-zinc-100 block">
              Grind Set
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 tracking-wide uppercase">
              Daily Momentum
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-150 ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? "text-emerald-400 dark:text-emerald-600"
                      : "text-slate-400 dark:text-zinc-500"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Theme Toggle Switch */}
      <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 px-2 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
        <span className="text-xs font-medium">Theme</span>
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle dark/light mode"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700/80 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700/80 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors"
        >
          {isDark ? (
            <>
              <Moon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

