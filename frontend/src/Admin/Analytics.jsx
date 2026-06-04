import React from "react";
import AdminSidebar from "./components/AdminSidebar";

import {
  Search,
  Download,
  BarChart3
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function Analytics() {

 
  const resolutionTrend = [
    { day: "Mon", tickets: 120 },
    { day: "Tue", tickets: 210 },
    { day: "Wed", tickets: 180 },
    { day: "Thu", tickets: 240 },
    { day: "Fri", tickets: 300 },
    { day: "Sat", tickets: 260 },
    { day: "Sun", tickets: 190 }
  ];

  const departmentData = [
    { name: "Sanitation", value: 342 },
    { name: "Public Works", value: 289 },
    { name: "Health", value: 194 },
    { name: "Admin", value: 112 }
  ];

  const monthlyComplaints = [
    { month: "Jan", complaints: 420 },
    { month: "Feb", complaints: 390 },
    { month: "Mar", complaints: 500 },
    { month: "Apr", complaints: 610 },
    { month: "May", complaints: 720 },
    { month: "Jun", complaints: 680 }
  ];


  const COLORS = [
    "#ef4444", 
    "#22c55e", 
    "#f59e0b", 
    "#8b5cf6", 
    "#06b6d4", 
    "#ec4899"  
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />
      <div className="flex-1 p-8 overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Analytics & Reports
          </h2>

          <div className="flex gap-4">

            <div className="flex items-center border px-3 py-2 rounded-md bg-white shadow-sm">
              <Search size={16} className="mr-2" />

              <input
                placeholder="Search analytics..."
                className="outline-none"
              />
            </div>

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow">
              <Download size={16} />
              Download Report
            </button>

          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Avg Resolution Time"
            value="2.4 Days"
          />

          <StatCard
            title="Resolution Rate"
            value="94%"
          />

          <StatCard
            title="7-Day Tickets"
            value="1,240"
          />

          <StatCard
            title="New Citizens"
            value="+1,102"
          />

        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4 flex gap-2 items-center">
              <BarChart3 size={18} />
              Complaint Resolution Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={resolutionTrend}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#2563eb"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

         
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              Department Workload
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={departmentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >

                  {departmentData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

       
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="font-semibold mb-4">
            Monthly Complaint Analytics
          </h3>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={monthlyComplaints}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="complaints"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

      <p className="text-gray-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

    </div>
  );
}
