import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

import {
  Search,
  Calendar,
  Sun,
  AlertTriangle,
  Wrench,
  Lightbulb,
  Trash,
  CheckCircle,
  Clock,
  Bell,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  const activities = [
    { title:"Street Light Repair",status:"In Progress",date:"Oct 21",ref:"#SR9842",icon:<Lightbulb size={18}/>},
    { title:"Plumber Visit",status:"Completed",date:"Oct 19",ref:"#SR9711",icon:<Wrench size={18}/>},
    { title:"Waste Collection",status:"Pending",date:"Oct 23",ref:"#SR9920",icon:<Trash size={18}/>},
    { title:"Road Repair",status:"Completed",date:"Oct 11",ref:"#SR9991",icon:<Wrench size={18}/>},
    { title:"Drain Cleaning",status:"In Progress",date:"Oct 12",ref:"#SR9888",icon:<Wrench size={18}/>},
    { title:"Electric Issue",status:"Pending",date:"Oct 15",ref:"#SR9777",icon:<AlertTriangle size={18}/>},
  ];

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const currentItems = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const chartData = [
    { name:"Completed", value:12 },
    { name:"In Progress", value:6 },
    { name:"Pending", value:4 },
  ];

  const COLORS = ["#22c55e","#3b82f6","#f59e0b"];

  const statusColor = status => {
    if(status==="Completed") return "text-green-600 bg-green-100";
    if(status==="In Progress") return "text-blue-600 bg-blue-100";
    return "text-yellow-700 bg-yellow-100";
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-8">

        {/* Header */}
        <div className="flex justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Citizen Dashboard 👋
          </h1>

          <div className="flex gap-4">

            <div className="flex bg-white px-4 py-2 rounded-lg border">
              <Search size={16} className="mr-2"/>
              <input
                placeholder="Search complaints..."
                value={search}
                onChange={(e)=>{
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="outline-none"
              />
            </div>

            <div className="bg-white px-4 py-2 rounded-lg border flex gap-2">
              <Calendar size={16}/>
              {new Date().toDateString()}
            </div>

            <div className="bg-yellow-50 px-4 py-2 rounded-lg border flex gap-2">
              <Sun size={16}/>
              22°C
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <StatCard icon={<CheckCircle/>} title="Resolved" value="124" color="green"/>
          <StatCard icon={<Clock/>} title="In Progress" value="32" color="blue"/>
          <StatCard icon={<AlertTriangle/>} title="Pending" value="18" color="yellow"/>
          <StatCard icon={<Bell/>} title="Alerts" value="5" color="red"/>

        </div>

        {/* Chart + Alerts */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="col-span-2 bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              Complaint Status Overview
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={90}>
                  {chartData.map((entry,index)=>(
                    <Cell key={index} fill={COLORS[index]}/>
                  ))}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex gap-6 justify-center mt-4 text-sm">
              <Legend color="green" label="Completed"/>
              <Legend color="blue" label="In Progress"/>
              <Legend color="yellow" label="Pending"/>
            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4 text-red-600">
              City Alerts
            </h3>

            <Alert text="Water supply interruption today 3PM"/>
            <Alert text="Heavy rain warning tomorrow"/>
            <Alert text="Road maintenance near bus stand"/>

          </div>

        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="font-semibold mb-4">
            Recent Activities
          </h3>

          <table className="w-full text-sm">

            <thead className="text-gray-500 bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Request</th>
                <th className="text-center">Status</th>
                <th className="text-center">Date</th>
                <th className="text-center">Reference</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {currentItems.map((item,i)=>(
                <tr key={i} className="hover:bg-gray-50">

                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      {item.icon}
                    </div>
                    {item.title}
                  </td>

                  <td className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="text-center">{item.date}</td>
                  <td className="text-center">{item.ref}</td>

                </tr>
              ))}

            </tbody>

          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-6">

            <button
              onClick={()=>setPage(page-1)}
              disabled={page===1}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Previous
            </button>

            <span>Page {page} / {totalPages}</span>

            <button
              onClick={()=>setPage(page+1)}
              disabled={page===totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

function StatCard({icon,title,value,color}) {

  const colors={
    green:"bg-green-100 text-green-600",
    blue:"bg-blue-100 text-blue-600",
    yellow:"bg-yellow-100 text-yellow-600",
    red:"bg-red-100 text-red-600",
  };

  return(
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

function Alert({text}) {
  return(
    <div className="border-l-4 border-red-500 bg-red-50 p-3 rounded mb-3 text-sm">
      {text}
    </div>
  );
}

function Legend({color,label}) {
  const map={
    green:"bg-green-500",
    blue:"bg-blue-500",
    yellow:"bg-yellow-500"
  };
  return(
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${map[color]}`}></div>
      {label}
    </div>
  );
}