import React, { useEffect, useState } from "react";
import API from "../services/api";

import {
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

import AdminSidebar from "./components/AdminSidebar";

export default function Analytics() {

  const [stats, setStats] = useState({});
  const [department, setDepartment] = useState([]);
  const [monthly, setMonthly] = useState([]);

  const [serviceStats, setServiceStats] = useState({});
  const [serviceDept, setServiceDept] = useState([]);
  const [serviceMonthly, setServiceMonthly] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

   
      const s = await API.get("/analytics/stats");
      const d = await API.get("/analytics/department");
      const m = await API.get("/analytics/monthly");

      setStats(s.data);

      setDepartment(
        Object.entries(d.data).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );

      setMonthly(
        Object.entries(m.data).map(([k, v]) => ({
          month: k,
          value: v
        }))
      );

    
      const ss = await API.get("/analytics/service-stats");
      const sd = await API.get("/analytics/service-department");
      const sm = await API.get("/analytics/service-monthly");

      setServiceStats(ss.data);

      setServiceDept(
        Object.entries(sd.data).map(([k, v]) => ({
          name: k,
          value: v
        }))
      );

      setServiceMonthly(
        Object.entries(sm.data).map(([k, v]) => ({
          month: k,
          value: v
        }))
      );

    } catch (err) {
      console.error("Analytics Error:", err);
    }
  };

  const COLORS = ["#ef4444", "#22c55e", "#f59e0b", "#3b82f6"];

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-6">

        <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            Total Complaints: {stats.total}
          </div>
          <div className="bg-white p-4 shadow rounded">
            Resolved: {stats.resolved}
          </div>
          <div className="bg-white p-4 shadow rounded">
            Rate: {stats.rate ? stats.rate.toFixed(1) : 0}%
          </div>
        </div>

      
        <div className="bg-white p-4 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

       
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded">
            Total Services: {serviceStats.total}
          </div>
          <div className="bg-white p-4 shadow rounded">
            Resolved: {serviceStats.resolved}
          </div>
          <div className="bg-white p-4 shadow rounded">
            Rate: {serviceStats.rate ? serviceStats.rate.toFixed(1) : 0}%
          </div>
        </div>

        <div className="bg-white p-4 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={serviceDept} dataKey="value" nameKey="name" outerRadius={100}>
                {serviceDept.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
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