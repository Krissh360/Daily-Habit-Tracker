import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await getAnalytics();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  const chartData = {
  labels: ["Habits", "Completions", "Avg Streak"],
  datasets: [
    {
      label: "Your Stats",
      data: [
        data.totalHabits,
        data.totalCompletions,
        data.averageStreak
      ],
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

  return (
    <div className="space-y-6">
      
      <h1 className="text-2xl font-bold text-gray-800">
        Analytics 
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Habits</h2>
          <p className="text-3xl font-bold">{data.totalHabits}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Completions</h2>
          <p className="text-3xl font-bold">{data.totalCompletions}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Average Streak</h2>
          <p className="text-3xl font-bold">{data.averageStreak}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Most Consistent Habit</h2>
          <p className="text-xl font-bold">
            {data.mostConsistentHabit}
          </p>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-lg font-semibold mb-4">
    Performance Overview
  </h2>

  <div className="h-64">
  <Bar data={chartData} options={options} />
</div>
</div>

    </div>
  );
}