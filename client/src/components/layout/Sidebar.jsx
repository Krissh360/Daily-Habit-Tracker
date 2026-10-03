import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  User,
  Settings,
  Sparkles,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-zinc-100 block">
              Habit Tracker
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 tracking-wide uppercase">
              Daily Rhythm
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-zinc-500 px-3 mb-2">
          Navigation
        </div>
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

      {/* Footer / System Status */}
      <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 px-2 flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          All systems sync
        </span>
        <span className="text-[11px] font-mono opacity-80">v1.0</span>
      </div>
    </aside>
  );
}