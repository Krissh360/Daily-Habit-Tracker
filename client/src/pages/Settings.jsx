import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
        <h1 className="text-2xl font-bold text-gray-800">
          Settings 
        </h1>
        <p className="text-gray-500">
          Manage your account
        </p>
      </div>

      {/* Account Card */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between min-h-[200px]">

        {/* Top Content */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Account Information
          </h2>

          <div className="space-y-2 text-gray-600">
            <p><strong>Name:</strong> {user?.name || "Loading..."}</p>
            <p><strong>Email:</strong> {user?.email || "Loading..."}</p>
            <p><strong>Account Type:</strong> Free</p>
          </div>
        </div>

        {/* Bottom Right Logout */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}