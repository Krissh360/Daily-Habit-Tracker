export default function Navbar() {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-800">
        Daily Habit Tracker
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Dark Mode (dummy for now) */}
        <button className="px-3 py-1 bg-gray-200 rounded-md">
          🌙
        </button>

        {/* Profile */}
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full">
          K
        </div>
      </div>
    </div>
  );
}