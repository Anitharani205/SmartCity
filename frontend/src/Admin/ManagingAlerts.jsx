
import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";

const alertsData = [
  {
    title: "Severe Thunderstorm Warning - North Sector",
    category: "Weather",
    priority: "High",
    status: "Active",
    time: "2 hours ago",
    reach: "12,450",
    channel: "SMS, Mobile App"
  },
  {
    title: "Bridge Maintenance Notice: East River Crossing",
    category: "Traffic",
    priority: "Medium",
    status: "Active",
    time: "5 hours ago",
    reach: "45,201",
    channel: "Mobile App"
  },
  {
    title: "Community Garden Workshop Series",
    category: "General",
    priority: "Low",
    status: "Active",
    time: "1 day ago",
    reach: "8,122",
    channel: "Web, Mobile App"
  },
  {
    title: "Planned Water Outage - Downtown Area",
    category: "Utilities",
    priority: "Medium",
    status: "Active",
    time: "1 day ago",
    reach: "29,880",
    channel: "SMS, Web"
  }
];

export default function Alerts() {

  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [priority, setPriority] = useState("All Priorities");
  const [tab, setTab] = useState("Active");
  const [alerts, setAlerts] = useState(alertsData);

 
  const filteredAlerts = alerts.filter((a) => {

    const fullText = `
      ${a.title}
      ${a.category}
      ${a.priority}
      ${a.status}
      ${a.time}
      ${a.reach}
      ${a.channel}
    `.toLowerCase();

    if (!fullText.includes(search.toLowerCase())) return false;

    if (category !== "All Categories" && a.category !== category)
      return false;

    if (priority !== "All Priorities" && a.priority !== priority)
      return false;

    if (tab !== "All" && a.status !== tab)
      return false;

    return true;
  });


  const handleEdit = (alert) => {
    alert(`Edit Alert: ${alert.title}`);
  };


  const handleDeactivate = (index) => {
    const updated = [...alerts];
    updated[index].status = "Archived";
    setAlerts(updated);
  };


  const handleExport = () => {
    const rows = alerts.map(a =>
      `${a.title},${a.category},${a.priority},${a.status},${a.time},${a.reach},${a.channel}`
    );

    const csv =
      "Title,Category,Priority,Status,Time,Reach,Channel\n" +
      rows.join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "alerts.csv";
    link.click();
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1 p-6">

   
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              Manage Existing Alerts
            </h2>
            <p className="text-gray-500 text-sm">
              Control public safety notifications
            </p>
          </div>

          <button
            onClick={handleExport}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Export Data
          </button>
        </div>

       
        <div className="bg-white p-4 rounded-lg mb-6 flex gap-3">

          <input
            placeholder="Search alerts by title or category..."
            className="border px-3 py-2 rounded w-1/2"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Weather</option>
            <option>Traffic</option>
            <option>General</option>
            <option>Utilities</option>
          </select>

          <select
            className="border px-3 py-2 rounded"
            onChange={(e)=>setPriority(e.target.value)}
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

      
        <div className="flex gap-4 mb-4">

          {["Active","Archived","Drafts"].map(t => (
            <button
              key={t}
              onClick={()=>setTab(t)}
              className={`px-4 py-2 rounded ${
                tab === t ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}

        </div>

     
        <div className="space-y-4">

          {filteredAlerts.map((a, index) => (

            <div key={index} className="bg-white p-4 rounded shadow flex justify-between">

              <div>

                <span className={`text-xs px-2 py-1 rounded
                  ${a.priority==="High" && "bg-red-100 text-red-600"}
                  ${a.priority==="Medium" && "bg-yellow-100 text-yellow-600"}
                  ${a.priority==="Low" && "bg-green-100 text-green-600"}
                `}>
                  {a.priority} Priority
                </span>

                <span className="text-gray-400 text-xs ml-2">
                  {a.time}
                </span>

                <h3 className="font-semibold mt-2">{a.title}</h3>

                <p className="text-sm text-gray-500">
                  Category: {a.category} • Reach: {a.reach} reached • Channel: {a.channel}
                </p>

              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={()=>handleEdit(a)}
                  className="px-2 py-1 border rounded"
                >
                  ✏️
                </button>

                <button
                  onClick={()=>handleDeactivate(index)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Deactivate
                </button>

              </div>

            </div>

          ))}

        </div>

   
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={()=>alert("Prev")} className="px-3 py-1 border rounded">‹</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button onClick={()=>alert("Next")} className="px-3 py-1 border rounded">›</button>
        </div>

      </div>
    </div>
  );
}