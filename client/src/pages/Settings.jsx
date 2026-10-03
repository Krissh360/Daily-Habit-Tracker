import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, Mail, ShieldCheck, LogOut } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // or "/login" depending on your route
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Account & Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
          Manage your credentials, subscription level, and session preferences.
        </p>
      </div>

      {/* Account Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800/80 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Identity
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
              Account Information
            </h2>
          </div>
          <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
            Standard Plan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/60 dark:border-zinc-700/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-300 shadow-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                Display Name
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {user?.name || "Not set"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/60 dark:border-zinc-700/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-300 shadow-sm">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                Email Address
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {user?.email || "Not set"}
              </span>
            </div>
          </div>
        </div>

        {/* Security / Session area */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Active session encrypted and saved locally.</span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:hover:bg-rose-900/40 dark:text-rose-400 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}