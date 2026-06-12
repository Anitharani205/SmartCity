import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [complaintStats, setComplaintStats] = useState({});
  const [serviceStats, setServiceStats] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/analytics/dashboard");
      const data = res.data;

      setComplaintStats({
        total: data.totalComplaints,
        closed: data.closedComplaints,
      });

      setServiceStats({
        total: data.totalServices,
        approved: data.approvedServices,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 🌈 PREMIUM COLOR PALETTE (UNCHANGED)
  const COLORS = {
    primary: "#4F46E5",
    cyan: "#06B6D4",
    green: "#22C55E",
    amber: "#F59E0B",
    red: "#EF4444",
    purple: "#A855F7",
  };

  const pieColors = [
    "#4F46E5",
    "#22C55E",
    "#F59E0B",
    "#06B6D4",
    "#A855F7",
  ];

  // =========================
  // ✅ UPDATED PIE DATA (Total / Closed / Pending)
  // =========================

  const complaintPie = [
    { name: "Total", value: complaintStats.total || 0 },
    { name: "Closed", value: complaintStats.closed || 0 },
    {
      name: "Pending",
      value:
        (complaintStats.total || 0) -
        (complaintStats.closed || 0),
    },
  ];

  const servicePie = [
    { name: "Total", value: serviceStats.total || 0 },
    { name: "Approved", value: serviceStats.approved || 0 },
    {
      name: "Pending",
      value:
        (serviceStats.total || 0) -
        (serviceStats.approved || 0),
    },
  ];

  // BAR DATA (UNCHANGED)
  const complaintBar = [
    { name: "Total", value: complaintStats.total || 0 },
    { name: "Closed", value: complaintStats.closed || 0 },
    {
      name: "Pending",
      value:
        (complaintStats.total || 0) -
        (complaintStats.closed || 0),
    },
  ];

  const serviceBar = [
    { name: "Total", value: serviceStats.total || 0 },
    { name: "Approved", value: serviceStats.approved || 0 },
    {
      name: "Pending",
      value:
        (serviceStats.total || 0) -
        (serviceStats.approved || 0),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* SIDEBAR */}
      <div className="fixed top-0 left-0 h-screen w-64 z-50">
        <AdminSidebar />
      </div>

      <div className="ml-64 h-screen overflow-y-auto p-6 space-y-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard 🚀
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <Card title="Complaints" value={complaintStats.total} color={COLORS.primary} />
          <Card title="Resolved Complaints" value={complaintStats.closed} color={COLORS.green} />
          <Card title="Services" value={serviceStats.total} color={COLORS.cyan} />
          <Card title="Resolved Services" value={serviceStats.approved} color={COLORS.green} />

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PIE - Complaints */}
          <ChartBox title="Complaint Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={complaintPie} dataKey="value" outerRadius={110}>
                  {complaintPie.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* BAR - Complaints (REDUCED WIDTH ONLY) */}
          <ChartBox title="Complaint Analysis">
            <ResponsiveContainer width="75%" height={300}>
              <BarChart data={complaintBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {complaintBar.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        i === 0
                          ? COLORS.primary
                          : i === 1
                          ? COLORS.green
                          : COLORS.amber
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* PIE - Services */}
          <ChartBox title="Service Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={servicePie} dataKey="value" outerRadius={110}>
                  {servicePie.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* BAR - Services (REDUCED WIDTH ONLY) */}
          <ChartBox title="Service Analysis">
            <ResponsiveContainer width="75%" height={300}>
              <BarChart data={serviceBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {serviceBar.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        i === 0
                          ? COLORS.cyan
                          : i === 1
                          ? COLORS.green
                          : COLORS.amber
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="relative bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-md border border-white">
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ backgroundColor: color }} />
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-1" style={{ color }}>
        {value || 0}
      </h2>
    </div>
  );
}


function ChartBox({ title, children }) {
  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white">
      <h3 className="font-semibold mb-3 text-gray-700">{title}</h3>
      {children}
    </div>
  );
}