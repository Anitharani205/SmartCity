import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminSidebar from "./components/AdminSidebar";

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
  const [complaintStats, setComplaintStats] = useState({});
  const [complaintPie, setComplaintPie] = useState([]);
  const [complaintLine, setComplaintLine] = useState([]);

  const [serviceStats, setServiceStats] = useState({});
  const [servicePie, setServicePie] = useState([]);
  const [serviceLine, setServiceLine] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const s = await API.get("/analytics/stats");
      const d = await API.get("/analytics/department");
      const m = await API.get("/analytics/monthly");

      const ss = await API.get("/analytics/service-stats");
      const sd = await API.get("/analytics/service-department");
      const sm = await API.get("/analytics/service-monthly");

      setComplaintStats(s.data);
      setServiceStats(ss.data);

      setComplaintPie(
        Object.entries(d.data).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );

      setComplaintLine(
        Object.entries(m.data).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );

      setServicePie(
        Object.entries(sd.data).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );

      setServiceLine(
        Object.entries(sm.data).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIX: safe numeric fallback (NO UI CHANGE)
  const resolvedComplaints =
    Number(complaintStats.closed || 0);

  const resolvedServices =
    Number(serviceStats.approved|| 0);

  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#14B8A6",
    "#F97316",
    "#EC4899"
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 space-y-6 overflow-auto">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-4">

          <Card title="Complaints" value={complaintStats.total} />

          <Card
            title="Resolved Complaints"
            value={resolvedComplaints}
          />

          <Card title="Services" value={serviceStats.total} />

          <Card
            title="Resolved Services"
            value={resolvedServices}
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <ChartBox title="Complaint Distribution">
            <PieChart width={350} height={280}>
              <Pie
                data={complaintPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={5}
                stroke="none"
              >
                {complaintPie.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <LegendList data={complaintPie} colors={COLORS} />
          </ChartBox>

          <ChartBox title="Service Distribution">
            <PieChart width={350} height={280}>
              <Pie
                data={servicePie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={5}
                stroke="none"
              >
                {servicePie.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <LegendList data={servicePie} colors={COLORS} />
          </ChartBox>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <ChartBox title="Complaint Trends">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={complaintLine}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line dataKey="value" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Service Trends">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={serviceLine}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line dataKey="value" stroke="#22C55E" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

        </div>

      </div>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value || 0}</h2>
    </div>
  );
}

/* ================= CHART BOX ================= */
function ChartBox({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-3">{title}</h3>
      {children}
    </div>
  );
}

/* ================= LEGEND ================= */
function LegendList({ data, colors }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">

      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-gray-700">{item.name}</span>
          </div>

          <span className="font-semibold text-gray-500">
            {item.value}
          </span>

        </div>
      ))}

    </div>
  );
}