import React, { useEffect, useState } from "react";
import API from "../services/api";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";

import AdminSidebar from "./components/AdminSidebar";

export default function Analytics() {
  const [stats, setStats] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [serviceStats, setServiceStats] = useState({});
  const [serviceDept, setServiceDept] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/analytics/dashboard");

      setStats({
        total: res.data.totalComplaints,
        closed: res.data.closedComplaints,
        rate: res.data.complaintRate,
      });

      setMonthly(
        Object.entries(res.data.monthlyComplaints || {}).map(([k, v]) => ({
          month: k,
          value: v,
        }))
      );

      setServiceStats({
        total: res.data.totalServices,
        approved: res.data.approvedServices,
        rate: res.data.serviceRate,
      });

      setServiceDept(
        Object.entries(res.data.serviceDepartment || {}).map(([k, v]) => ({
          name: k,
          value: v,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const COLORS = [
    "#4F46E5",
    "#22C55E",
    "#F59E0B",
    "#06B6D4",
    "#A855F7",
    "#EF4444",
  ];

  const resolvedComplaints = Number(stats.closed || 0);
  const resolvedServices = Number(serviceStats.approved || 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl">
        <AdminSidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 ml-64 p-8 space-y-8">

        {/* TOP HEADER HERO */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-l-8 border-indigo-600">
          <h1 className="text-3xl font-bold text-gray-800">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Real-time municipal performance insights
          </p>
        </div>

        {/* KPI STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <KPI title="Total Complaints" value={stats.total || 0} color="#4F46E5" />
          <KPI title="Resolved Complaints" value={resolvedComplaints} color="#22C55E" />
          <KPI title="Complaint Rate" value={(stats.rate || 0).toFixed(1) + "%"} color="#3B82F6" />
          <KPI title="Total Services" value={serviceStats.total || 0} color="#F59E0B" />

        </div>

        {/* LINE CHART SECTION */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Complaint Trend Analysis
            </h2>

            <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
              Monthly Insights
            </span>
          </div>

          <ResponsiveContainer width="100%" height={400}>
  <AreaChart data={monthly}>
    
    <defs>
      <linearGradient id="complaintColor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
      </linearGradient>
    </defs>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
  dataKey="month"
  tick={{ fontSize: 12 }}
  angle={-30}
  textAnchor="end"
/>

    <YAxis />

    <Tooltip />

   <Area
  type="monotone"
  dataKey="value"
  stroke="#ef4444"
  strokeWidth={4}
  fill="url(#complaintColor)"
  dot={{ r: 5, fill: "#ef4444" }}
  activeDot={{ r: 8 }}
/>

  </AreaChart>
</ResponsiveContainer>

        </div>

        {/* SERVICE KPI STRIP */}
        <div className="grid grid-cols-3 gap-6">

          <Mini title="Total Services" value={serviceStats.total || 0} />
          <Mini title="Resolved Services" value={resolvedServices} />
          <Mini title="Approval Rate" value={(serviceStats.rate || 0).toFixed(1) + "%"} />

        </div>

        {/* PIE CHART SECTION */}
        <div className="bg-white rounded-3xl shadow-xl p-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Service Department Distribution
            </h2>

            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
              Department Analytics
            </span>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
             <Pie
  data={serviceDept}
  dataKey="value"
  nameKey="name"
  innerRadius={80}
  outerRadius={140}
  paddingAngle={5}
  label
>
  {serviceDept.map((_, i) => (
    <Cell
      key={i}
      fill={COLORS[i % COLORS.length]}
    />
  ))}
</Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

/* ================= KPI CARD ================= */
function KPI({ title, value, color }) {
 
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition border-l-4"
      style={{ borderColor: color }}
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2" style={{ color }}>
        {value}
      </h2>
    </div>
  );
}

/* ================= MINI CARD ================= */
function Mini({ title, value }) {
  return (
    <div className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
  );
}