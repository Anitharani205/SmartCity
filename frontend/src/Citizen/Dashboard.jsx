import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  CheckCircle,
  Clock,
  Wrench,
} from "lucide-react";
export default function CitizenDashboard() {
  const [complaintStats, setComplaintStats] = useState({});
  const [serviceStats, setServiceStats] = useState({});
  const [alerts, setAlerts] = useState([]);

  const [complaints, setComplaints] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const email = localStorage.getItem("email");

      const cStats = await API.get("/analytics/stats");
      const sStats = await API.get("/analytics/service-stats");

      // ✅ FIXED: ONLY CITY ALERTS (NOT notifications)
      const alertRes = await API.get("/api/alerts");

      const complaintRes = await API.get(`/complaints/citizen/${email}`);
      const serviceRes = await API.get(`/services/citizen/${email}`);

      setComplaintStats(cStats.data);
      setServiceStats(sStats.data);

      setAlerts(alertRes.data || []);
      setComplaints(complaintRes.data || []);
      setServices(serviceRes.data || []);
    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  // FIX: resolved + closed
 // COMPLAINT COUNTS

const resolvedComplaintCount = complaints.filter(
  (c) => String(c.status).toUpperCase() === "CLOSED"
).length;

const pendingComplaintCount = complaints.filter(
  (c) => String(c.status).toUpperCase() !== "CLOSED"
).length;

// SERVICE COUNTS

const resolvedServiceCount = services.filter(
  (s) => String(s.status).toUpperCase() === "APPROVED"
).length;

const pendingServiceCount = services.filter(
  (s) => String(s.status).toUpperCase() !== "APPROVED"
).length;

const chartData = [
  {
    name: "Resolved",
    value: resolvedComplaintCount,
  },
  {
    name: "Pending",
    value: pendingComplaintCount,
  },
];

const COLORS = ["#22c55e", "#f59e0b"];
const complaintBarData = [
  {
    name: "Closed",
    count: complaints.filter(
      (c) => String(c.status).toUpperCase() === "CLOSED"
    ).length,
  },
  {
    name: "Pending",
    count: complaints.filter(
      (c) => String(c.status).toUpperCase() === "PENDING"
    ).length,
  },
  {
    name: "Assigned",
    count: complaints.filter(
      (c) => String(c.status).toUpperCase() === "ASSIGNED"
    ).length,
  },
  {
    name: "In Progress",
    count: complaints.filter(
      (c) => String(c.status).toUpperCase() === "IN_PROGRESS"
    ).length,
  },
];

const serviceBarData = [
  {
    name: "Approved",
    count: services.filter(
      (s) => String(s.status).toUpperCase() === "APPROVED"
    ).length,
  },
  {
    name: "Pending",
    count: services.filter(
      (s) => String(s.status).toUpperCase() === "PENDING"
    ).length,
  },
  {
    name: "Assigned",
    count: services.filter(
      (s) => String(s.status).toUpperCase() === "ASSIGNED"
    ).length,
  },
  {
    name: "Rejected",
    count: services.filter(
      (s) => String(s.status).toUpperCase() === "REJECTED"
    ).length,
  },
];
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Citizen Dashboard 👋
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
         <StatCard
  icon={<CheckCircle />}
  title="Complaints Resolved"
  value={resolvedComplaintCount}
  color="green"
/>

<StatCard
  icon={<Clock />}
  title="Complaints Pending"
  value={pendingComplaintCount}
  color="blue"
/>

<StatCard
  icon={<CheckCircle />}
  title="Services Resolved"
  value={resolvedServiceCount}
  color="green"
/>

<StatCard
  icon={<Wrench />}
  title="Services Pending"
  value={pendingServiceCount}
  color="yellow"
/>
        </div>

        {/* CHART + ALERTS */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Complaint Status Overview
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={90}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ ONLY CITY ALERTS HERE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4 text-red-600">
              City Alerts
            </h3>

            {alerts.length === 0 ? (
              <p className="text-gray-400">No alerts available</p>
            ) : (
              alerts.map((a, i) => (
                <div
                  key={i}
                  className="border-l-4 border-red-500 bg-red-50 p-3 mb-3 text-sm"
                >
                  {a.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT */}
      {/* ANALYTICS BAR CHARTS */}
<div className="grid grid-cols-2 gap-6">

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="font-semibold mb-4 text-blue-600">
      Complaint Analysis
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={complaintBarData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="font-semibold mb-4 text-green-600">
      Service Analysis
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={serviceBarData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>
        </div>
      </div>
  
  );
}

/* STAT CARD */
function StatCard({ icon, title, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}