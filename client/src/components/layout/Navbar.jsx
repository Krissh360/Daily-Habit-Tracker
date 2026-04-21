export default function Navbar() {
  return (
    <div className="px-6 py-4 h-16 flex items-center justify-between">
      
      {/* Page Title */}
      <h1 className="text-3xl font-semibold tracking-wide ml-2 items-center">
        Daily Habit Tracker
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        

        {/* Profile */}
        <div className="w-8 h-8 bg-#D4AF37-600 text-white flex items-center justify-center rounded-full">
          Krissh
        </div>
      </div>
    </div>
  );
}