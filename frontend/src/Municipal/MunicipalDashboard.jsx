import React, { useEffect, useState } from "react";
import MunicipalSidebar from "./components/MunicipalSidebar";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MunicipalDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [services, setServices] = useState([]);

  const staffEmail = localStorage.getItem("email");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const c = await API.get(`/complaints/staff/${staffEmail}`);
      const s = await API.get(`/services/staff/${staffEmail}`);

      setComplaints(c.data);
      setServices(s.data);
    } catch (err) {
      console.log("Error loading dashboard:", err);
    }
  };

  const pieData = [
    { name: "Complaints", value: complaints.length },
    { name: "Services", value: services.length },
  ];

  const COLORS = ["#ef4444", "#3b82f6"];

  const getBadge = (status) => {
    const base = "px-2 py-1 text-xs rounded-full font-medium";

    switch (status) {
      case "Resolved":
        return base + " bg-green-100 text-green-600";
      case "APPROVED":
        return base + " bg-green-100 text-green-600";
      case "Rejected":
        return base + " bg-red-100 text-red-600";
      case "Pending":
        return base + " bg-yellow-100 text-yellow-700";
      case "In Progress":
        return base + " bg-blue-100 text-blue-600";
      case "Assigned":
        return base + " bg-purple-100 text-purple-600";
      default:
        return base + " bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <div className="w-64 fixed h-full">
        <MunicipalSidebar />
      </div>

      <div className="ml-64 p-6 w-full space-y-6">

        <div>
          <h1 className="text-2xl font-bold">
            Municipal Staff Dashboard
          </h1>

          <p className="text-gray-500">
            Assigned work overview for {staffEmail}
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-4 gap-4">

          <StatCard title="Complaints" value={complaints.length} />
          <StatCard title="Services" value={services.length} />
{/* Pending */}
<StatCard
  title="Pending"
  value={
    complaints.filter(
  c => c.status?.toLowerCase() !== "closed" && c.status !== "APPROVED"
).length +
services.filter(
  s => s.status?.toLowerCase() !== "closed" && s.status !== "APPROVED"
).length
  }
/>

{/* Resolved */}
<StatCard
  title="Resolved"
  value={
   complaints.filter(
  c => c.status?.toLowerCase() === "closed" || c.status === "APPROVED"
).length +
services.filter(
  s => s.status?.toLowerCase() === "closed" || s.status === "APPROVED"
).length
  }
/>

        </div>

        {/* ================= PIE CHART ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-semibold text-lg mb-4">
            Work Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                innerRadius={65}
                paddingAngle={6}
              >
                {pieData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-8 mt-4">

            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">

                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i] }}
                />

                <span className="text-sm font-medium">
                  {d.name}
                </span>

                <span className="text-xs text-gray-500">
                  ({d.value})
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* ================= TABLES ================= */}
        <div className="grid grid-cols-2 gap-6">

          {/* Complaints */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <h2 className="font-semibold mb-4 text-lg">
              Assigned Complaints
            </h2>

            <table className="w-full text-sm">

              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left py-2">Title</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">

                    <td className="py-3 font-medium">
                      {c.title}
                    </td>

                    <td className="text-center">
                      <span className={getBadge(c.status)}>
                        {c.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          {/* Services */}
          <div className="bg-white p-5 rounded-2xl shadow">

            <h2 className="font-semibold mb-4 text-lg">
              Assigned Services
            </h2>

            <table className="w-full text-sm">

              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left py-2">Service</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">

                    <td className="py-3 font-medium">
                      {s.service}
                    </td>

                    <td className="text-center">
                      <span className={getBadge(s.status)}>
                        {s.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}