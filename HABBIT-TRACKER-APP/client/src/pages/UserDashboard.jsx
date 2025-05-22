import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleHabits = [
  { id: "1", date: "2025-05-10", reading: true, praying: true, drinkingWater: false },
  { id: "2", date: "2025-05-11", reading: false, praying: true, drinkingWater: true },
  { id: "3", date: "2025-05-12", reading: true, praying: false, drinkingWater: true },
];

const HabitDashboard = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with API fetch if you want
    setHabits(sampleHabits);
  }, []);

  // Calculate habit completion percentage per day for chart
  const chartData = habits.map((entry) => {
    const totalHabits = 3; // reading, praying, drinkingWater
    const completed = [entry.reading, entry.praying, entry.drinkingWater].filter(Boolean).length;
    const completionPercent = Math.round((completed / totalHabits) * 100);
    return { date: entry.date, completionPercent };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 font-sans text-blue-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Habit Tracker Dashboard</h1>

      {habits.length === 0 ? (
        <p className="text-center text-blue-700">No habit data found.</p>
      ) : (
        <>
          <table className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-md border border-blue-200 overflow-hidden">
            <thead className="bg-blue-200 text-blue-700 font-semibold text-left">
              <tr>
                <th className="px-8 py-3">Date</th>
                <th className="px-8 py-3 text-center">Reading</th>
                <th className="px-8 py-3 text-center">Praying</th>
                <th className="px-8 py-3 text-center">Drinking Water</th>
                <th className="px-8 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map(({ id, date, reading, praying, drinkingWater }) => (
                <tr key={id} className="border-b border-blue-100 hover:bg-blue-50">
                  <td className="px-8 py-3">{new Date(date).toLocaleDateString()}</td>
                  <td className="px-8 py-3 text-center">{reading ? "✔️" : "❌"}</td>
                  <td className="px-8 py-3 text-center">{praying ? "✔️" : "❌"}</td>
                  <td className="px-8 py-3 text-center">{drinkingWater ? "✔️" : "❌"}</td>
                  <td className="px-8 py-3 text-center">
                    <button
                      onClick={() => navigate(`/edit-habit/${id}`)}
                      className="px-4 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-3xl shadow-lg border border-blue-200">
            <h3 className="text-blue-700 font-semibold text-xl mb-5 border-b border-blue-300 pb-2">
              Daily Habit Completion (%)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData} margin={{ top: 0, right: 15, bottom: 0, left: 0 }}>
                <CartesianGrid stroke="#d0e7f9" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(d) => new Date(d).toLocaleDateString()}
                  tick={{ fontSize: 12, fill: "#3b82f6" }}
                />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#3b82f6" }} />
                <Tooltip contentStyle={{ backgroundColor: "#e0f2fe" }} />
                <Line
                  type="monotone"
                  dataKey="completionPercent"
                  stroke="#2563eb"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </>
      )}
    </div>
  );
};

export default HabitDashboard;
