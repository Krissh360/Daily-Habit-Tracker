import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";

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

      localStorage.setItem("user", JSON.stringify({
        name: username.charAt(0).toUpperCase() + username.slice(1),
        email: email
      }));

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
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Login 🔐
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-gray-500 mt-4">
  {isLogin ? "Don't have an account?" : "Already have an account?"}
  <button
    onClick={() => setIsLogin(!isLogin)}
    className="text-blue-600 ml-2"
  >
    {isLogin ? "Register" : "Login"}
  </button>
</p>

      </div>
    </div>
  );
}