import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  CheckCircle,
  Clock,
  Wrench,
  Bell,
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

     
      const alertRes = await API.get(`/notifications/citizen/${email}`);

     
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

 
  const chartData = [
    {
      name: "Resolved",
      value: complaintStats.resolved || 0
    },
    {
      name: "Pending",
      value: (complaintStats.total - complaintStats.resolved) || 0
    }
  ];

  const COLORS = ["#22c55e", "#f59e0b"];

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-8">

    
        <h1 className="text-3xl font-bold mb-8">
          Citizen Dashboard 👋
        </h1>

        <div className="grid grid-cols-4 gap-6 mb-8">

          <StatCard
            icon={<CheckCircle />}
            title="Complaints Resolved"
            value={complaintStats.resolved || 0}
            color="green"
          />

          <StatCard
            icon={<Clock />}
            title="Complaints Pending"
            value={(complaintStats.total - complaintStats.resolved) || 0}
            color="blue"
          />

          <StatCard
            icon={<Wrench />}
            title="Service Requests"
            value={serviceStats.total || 0}
            color="yellow"
          />

          <StatCard
            icon={<Bell />}
            title="Alerts"
            value={alerts.length}
            color="red"
          />

        </div>

     
        <div className="grid grid-cols-3 gap-6 mb-8">

        
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              Complaint Status Overview
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={90}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>

        
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

        
        <div className="grid grid-cols-2 gap-6">

         
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              Recent Complaints
            </h3>

            {complaints.length === 0 ? (
              <p className="text-gray-400">No complaints found</p>
            ) : (
              complaints.slice(0, 5).map((c, i) => (
                <div key={i} className="border-b py-2 text-sm">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-gray-500">{c.status}</p>
                </div>
              ))
            )}

          </div>

          
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              Recent Services
            </h3>

            {services.length === 0 ? (
              <p className="text-gray-400">No services found</p>
            ) : (
              services.slice(0, 5).map((s, i) => (
                <div key={i} className="border-b py-2 text-sm">
                  <p className="font-medium">{s.service}</p>
                  <p className="text-gray-500">{s.status}</p>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
}


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