import React from "react";
import Sidebar from "./components/Sidebar";

import {
  Search,
  Calendar,
  Sun,
  AlertTriangle,
  Wrench,
  Megaphone,
  Lightbulb,
  Trash,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">

      <Sidebar />

     
      <div className="flex-1 p-8 overflow-auto">

        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>

          <div className="flex items-center gap-4">

            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                className="outline-none text-sm"
                placeholder="Search services..."
              />
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
              <Calendar size={16} />
              <span className="text-sm">Monday, Oct 23</span>
            </div>

            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border">
              <Sun size={16} className="text-yellow-500" />
              <span className="text-sm">22°C</span>
            </div>

          </div>
        </div>

       
        <h2 className="font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-3 gap-6 mb-8">

          <ActionCard
            icon={<AlertTriangle size={28} />}
            title="Raise a Complaint"
            color="from-blue-500 to-blue-700"
          />

          <ActionCard
            icon={<Wrench size={28} />}
            title="Book Utility Service"
            color="from-blue-700 to-blue-900"
          />

          <ActionCard
            icon={<Megaphone size={28} />}
            title="View City Alerts"
            color="from-indigo-800 to-blue-900"
          />

        </div>

        <div className="grid grid-cols-3 gap-6">

         
          <div className="col-span-2 bg-white rounded-xl shadow-sm border p-6">

            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Recent Activity</h3>
              <button className="text-blue-600 text-sm">View All</button>
            </div>

            <table className="w-full text-sm">

              <thead className="text-gray-500">
                <tr>
                  <th className="text-left py-2">Request Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Reference</th>
                </tr>
              </thead>

              <tbody className="divide-y">

                <Row
                  icon={<Lightbulb size={18} />}
                  title="Street Light Repair"
                  status="In Progress"
                  date="Oct 21, 2023"
                  ref="#SR-9842"
                />

                <Row
                  icon={<Wrench size={18} />}
                  title="Plumber Visit"
                  status="Completed"
                  date="Oct 19, 2023"
                  ref="#SR-9711"
                />

                <Row
                  icon={<Trash size={18} />}
                  title="Waste Collection"
                  status="Pending"
                  date="Oct 23, 2023"
                  ref="#SR-9920"
                />

              </tbody>
            </table>

          </div>

        
          <div className="bg-white rounded-xl shadow-sm border p-6">

            <h3 className="font-semibold mb-4 text-red-600">
              Critical Alerts
            </h3>

            <AlertCard
              title="Water Outage"
              type="EMERGENCY"
              text="Emergency pipeline repairs on 5th Ave. Water supply interrupted until 6 PM."
              color="red"
            />

            <AlertCard
              title="Park Closure"
              type="NOTICE"
              text="Central Park North sector will be closed for landscaping on Oct 25."
              color="blue"
            />

            <AlertCard
              title="Traffic Update"
              type="UPDATE"
              text="Expect heavy traffic near Downtown due to community parade tomorrow morning."
              color="gray"
            />

            <button className="mt-4 w-full bg-gray-100 py-2 rounded-lg text-sm">
              Dismiss All
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

function ActionCard({ icon, title, color }) {
  return (
    <div
      className={`rounded-xl text-white p-6 flex items-center gap-4 bg-gradient-to-r ${color} shadow-md`}
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

function Row({ icon, title, status, date, ref }) {
  return (
    <tr className="text-center">
      <td className="py-3 flex items-center gap-3 text-left">
        <div className="bg-gray-100 p-2 rounded">{icon}</div>
        {title}
      </td>
      <td>{status}</td>
      <td>{date}</td>
      <td className="text-gray-500">{ref}</td>
    </tr>
  );
}

function AlertCard({ title, type, text, color }) {

  const colors = {
    red: "border-red-400 bg-red-50 text-red-700",
    blue: "border-blue-400 bg-blue-50 text-blue-700",
    gray: "border-gray-300 bg-gray-50 text-gray-700",
  };

  return (
    <div className={`border-l-4 p-4 rounded mb-3 ${colors[color]}`}>
      <div className="flex justify-between text-sm font-semibold">
        <span>{title}</span>
        <span className="text-xs">{type}</span>
      </div>
      <p className="text-xs mt-1">{text}</p>
    </div>
  );
}

export default Dashboard;
