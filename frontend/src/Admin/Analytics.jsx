import React, { useEffect, useState } from "react";
import API from "../services/api";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
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
      const s = await API.get("/analytics/stats");
      const m = await API.get("/analytics/monthly");

      const ss = await API.get("/analytics/service-stats");
      const sd = await API.get("/analytics/service-department");

      setStats(s.data);

      setMonthly(
        Object.entries(m.data || {}).map(([k, v]) => ({
          month: k,
          value: v
        }))
      );

      setServiceStats(ss.data);

      setServiceDept(
        Object.entries(sd.data || {}).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const COLORS = [
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#3b82f6",
    "#8b5cf6",
    "#14b8a6"
  ];

  // ✅ CLOSED complaints only
  const totalResolvedComplaints =
    Number(stats.closed || 0);

  // ✅ APPROVED services only
  const totalResolvedServices =
    Number(serviceStats.approved || 0);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Analytics
        </h1>

        {/* ================= COMPLAINT ANALYTICS ================= */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-500">Total Complaints</p>
            <h2 className="text-2xl font-bold">
              {stats.total || 0}
            </h2>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-500">Resolved Complaints</p>
            <h2 className="text-2xl font-bold text-green-600">
              {totalResolvedComplaints}
            </h2>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-500">Resolution Rate</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {stats.rate ? stats.rate.toFixed(1) : 0}%
            </h2>
          </div>
        </div>

        {/* COMPLAINT TREND */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Complaint Trends
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ================= SERVICE ANALYTICS ================= */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-500">Total Services</p>
            <h2 className="text-2xl font-bold">
              {serviceStats.total || 0}
            </h2>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-500">Resolved Services</p>
            <h2 className="text-2xl font-bold text-green-600">
              {totalResolvedServices}
            </h2>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <p className="text-gray-500">Approval Rate</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {serviceStats.rate
                ? serviceStats.rate.toFixed(1)
                : 0}
              %
            </h2>
          </div>
        </div>

        {/* SERVICE DISTRIBUTION */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            Service Distribution by Department
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={serviceDept}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {serviceDept.map((_, index) => (
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
    </div>
  );
}