'use client';

import { FaTags, FaImages, FaListAlt, FaClipboardList } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const analytics = [
  {
    name: "Categories",
    count: 6,
    icon: <FaTags className="w-8 h-8 text-indigo-500" />,
    color: "bg-indigo-100 dark:bg-indigo-900",
  },
  {
    name: "Banners",
    count: 4,
    icon: <FaImages className="w-8 h-8 text-pink-500" />,
    color: "bg-pink-100 dark:bg-pink-900",
  },
  {
    name: "Posts",
    count: 8,
    icon: <FaListAlt className="w-8 h-8 text-green-500" />,
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    name: "Plans",
    count: 12,
    icon: <FaClipboardList className="w-8 h-8 text-yellow-500" />,
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
];

export default function AdminDashboard() {
  // Prepare data for charts
  const chartData = analytics.map((item) => ({ name: item.name, value: item.count }));
  const pieColors = ["#6366f1", "#ec4899", "#22c55e", "#f59e42"];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {analytics.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-4 p-6 rounded-xl shadow bg-white dark:bg-gray-900 ${item.color}`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.count}</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">{item.name}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Overview (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} style={{ fontFamily: 'inherit' }}>
              <XAxis dataKey="name" stroke="#8884d8" className="dark:text-gray-100" />
              <YAxis stroke="#8884d8" className="dark:text-gray-100" />
              <Tooltip contentStyle={{ background: '#18181b', color: '#fff', border: 'none' }} wrapperStyle={{ zIndex: 10 }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366f1">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Distribution (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#18181b', color: '#fff', border: 'none' }} wrapperStyle={{ zIndex: 10 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 