export default function Dashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500">
          Track your habits and stay consistent.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Habits</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Completed Today</h2>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Current Streak</h2>
          <p className="text-2xl font-bold">0 days</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Completion Rate</h2>
          <p className="text-2xl font-bold">0%</p>
        </div>

      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Habits List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Today’s Habits
          </h2>

          <p className="text-gray-500">
            No habits added yet.
          </p>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Weekly Progress
          </h2>

          <p className="text-gray-500">
            Chart will appear here.
          </p>
        </div>

      </div>

    </div>
  );
}