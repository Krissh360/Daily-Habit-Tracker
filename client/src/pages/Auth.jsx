import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      setError("");

      let data;

      if (isLogin) {
        data = await loginUser({ email, password });

        localStorage.setItem("token", data.token);

        const username = email.split("@")[0];

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: username.charAt(0).toUpperCase() + username.slice(1),
            email: email,
          })
        );

        navigate("/dashboard");
      } else {
        await registerUser({ email, password });

        alert("Registered successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center items-center p-4">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-zinc-100 block">
            Habit Tracker
          </span>
          <span className="text-xs font-medium text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
            Calm Organic Productivity
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm rounded-2xl p-8 w-full max-w-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-200">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 text-center mb-1">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>

        <p className="text-sm text-slate-500 dark:text-zinc-400 text-center mb-6">
          {isLogin
            ? "Enter your details to access your daily habit workspace."
            : "Start building consistent daily routines today."}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAuth();
                }}
              />
            </div>
          </div>

          <button
            onClick={handleAuth}
            className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{isLogin ? "Sign In" : "Get Started"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-center text-slate-500 dark:text-zinc-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}