import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import {
  Bell,
  Settings
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function AdminDashboard() {

  const chartData = [
    { day: "Mon", value: 20 },
    { day: "Tue", value: 15 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 60 },
    { day: "Fri", value: 25 },
    { day: "Sat", value: 80 },
    { day: "Sun", value: 55 }
  ];

  const pieData = [
    { name: "Waste Mgmt", value: 40 },
    { name: "Public Safety", value: 25 },
    { name: "Health", value: 15 },
    { name: "Utilities", value: 20 }
  ];

  const COLORS = ["#2563eb", "#f97316", "#8b5cf6", "#10b981"];

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="bg-white border-b p-4 flex justify-between items-center">

          <input
            className="bg-gray-100 px-4 py-2 rounded w-96 outline-none"
            placeholder="Search for reports, citizens, or tickets..."
          />

          <div className="flex gap-4 items-center">
            <Bell />
            <Settings />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              + Create New Alert
            </button>
          </div>

        </div>

        <div className="p-6 space-y-6">

         
          <div>
            <h2 className="text-2xl font-bold">
              Admin Dashboard Overview
            </h2>

            <p className="text-gray-500">
              Monday, 23 March 2026
            </p>
          </div>

         
          <div className="grid grid-cols-4 gap-4">

            <Card
              title="Total Complaints"
              value="1,284"
              change="+12%"
            />

            <Card
              title="Active Requests"
              value="456"
              change="-5%"
            />

            <Card
              title="City Alerts"
              value="12"
              change="+2%"
            />

            <Card
              title="Avg. Resolution Time"
              value="2.4 Days"
              change="-10%"
            />

          </div>

        
          <div className="grid grid-cols-3 gap-6">

            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">

              <h3 className="font-semibold mb-4">
                Complaint Trends
              </h3>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="day" />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

          
            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="font-semibold mb-4">
                Service Distribution
              </h3>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>

                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>

             
              <div className="mt-4 space-y-3">

                {pieData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: COLORS[index]
                        }}
                      ></div>

                      <span className="text-sm text-gray-700">
                        {item.name}
                      </span>

                    </div>

                    <span className="text-sm font-medium text-gray-500">
                      {item.value}%
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

         
          <div className="bg-white rounded-xl shadow-sm p-6">

            <h3 className="font-semibold mb-4">
              Recent Activities & Urgent Tasks
            </h3>

            <table className="w-full text-left">

              <thead className="text-gray-500 text-sm">

                <tr>
                  <th className="py-2">Citizen</th>
                  <th>Issue Description</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr className="border-t">

                  <td className="py-3">
                    Sarah Miller
                  </td>

                  <td>
                    Main water pipe burst in Sector 4B
                  </td>

                  <td>
                    Utilities
                  </td>

                  <td className="text-red-500 font-semibold">
                    Critical
                  </td>

                  <td className="text-orange-500 font-semibold">
                    Pending
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, change }) {

  const positive = change.includes("+");

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">

      <p className="text-gray-500">
        {title}
      </p>

      <div className="flex justify-between items-center mt-2">

        <h2 className="text-2xl font-bold">
          {value}
        </h2>

        <span
          className={
            positive
              ? "text-green-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {change}
        </span>

      </div>

    </div>
  );
}