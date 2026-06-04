import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import {
  Search,
  Calendar,
  Download
} from "lucide-react";

export default function AuditLogs() {

  const logsData = [
    {
      time:"Mar 24, 2026 14:32:11 PM",
      admin:"Alex Morgan",
      action:"User Blocked",
      target:"User: @jdoe92",
      details:"Violated Community Policy Section 4.2"
    },
    {
      time:"Mar 24, 2026 12:15:04 PM",
      admin:"Sarah Chen",
      action:"Ticket Assigned",
      target:"Ticket #TCK-482",
      details:"Assigned to Technician David Smith"
    },
    {
      time:"Mar 23, 2026 16:45:22 PM",
      admin:"Robert King",
      action:"Policy Update",
      target:"System Settings",
      details:"Updated GDPR compliance settings"
    },
    {
      time:"Mar 23, 2026 09:10:55 AM",
      admin:"Alex Morgan",
      action:"Admin Login",
      target:"System Access",
      details:"Successful login from NY Terminal"
    },
    {
      time:"Mar 22, 2026 11:02:18 AM",
      admin:"Alex Morgan",
      action:"Service Created",
      target:"Public Utility",
      details:"New Snow Removal service category"
    }
  ];

  
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All Types");
  const [page, setPage] = useState(1);

  const filteredLogs = logsData.filter((log) => {

    const fullText = (
      log.time +
      log.admin +
      log.action +
      log.target +
      log.details
    ).toLowerCase();

    if (!fullText.includes(search.toLowerCase())) return false;

    if (actionFilter !== "All Types" && log.action !== actionFilter)
      return false;

    return true;
  });

 
  const perPage = 5;
  const start = (page - 1) * perPage;
  const currentLogs = filteredLogs.slice(start, start + perPage);

  const handleExport = () => {
    const rows = logsData.map(l =>
      `${l.time},${l.admin},${l.action},${l.target},${l.details}`
    );

    const csv =
      "Time,Admin,Action,Target,Details\n" +
      rows.join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar/>

      <div className="flex-1 flex flex-col">

       
        <div className="bg-white border-b p-6 flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">Admin / Logs</p>
            <h2 className="text-2xl font-semibold">Audit Logs</h2>
          </div>

          <button
            onClick={handleExport}   
            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded"
          >
            <Download size={16}/>
            Export Report
          </button>

        </div>

     
        <div className="p-6 space-y-6">

       
          <div className="bg-white rounded-xl shadow-sm p-6 flex gap-4 items-center">

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded w-1/3">

              <Search size={16}/>

              <input
                className="bg-transparent ml-2 outline-none w-full"
                placeholder="Search logs by admin, target, or keywords..."
                value={search}                    
                onChange={(e)=>setSearch(e.target.value)}  
              />

            </div>

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded">
              <Calendar size={16}/>
              <span className="ml-2 text-sm">
                Mar 01,2026 - Mar 31,2026
              </span>
            </div>

            <select
              className="bg-gray-100 px-3 py-2 rounded text-sm"
              onChange={(e)=>setActionFilter(e.target.value)}  // ✅ added
            >
              <option>All Types</option>
              <option>User Blocked</option>
              <option>Ticket Assigned</option>
              <option>Policy Update</option>
              <option>Admin Login</option>
              <option>Service Created</option>
            </select>

            <button
              onClick={()=>alert("Filters Applied")}   
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>

          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th>Admin User</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>

                {currentLogs.map((log,index)=>(   

                  <tr key={index} className="border-t hover:bg-gray-50">

                    <td className="p-4 text-sm">{log.time}</td>
                    <td>{log.admin}</td>

                    <td>
                      <ActionBadge action={log.action}/>
                    </td>

                    <td>{log.target}</td>

                    <td className="text-gray-600 text-sm">
                      {log.details}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          
            <div className="flex justify-between items-center p-4 text-sm text-gray-500">

              <span>
                Showing {start+1} to {start + currentLogs.length} of {filteredLogs.length} entries
              </span>

              <div className="flex gap-2">

                <button
                  onClick={()=>setPage(p=>Math.max(p-1,1))}  // ✅ added
                  className="px-3 py-1 border rounded"
                >
                  ‹
                </button>

                <button className="px-3 py-1 bg-blue-600 text-white rounded">
                  {page}
                </button>

                <button
                  onClick={()=>setPage(p=>p+1)}   
                  className="px-3 py-1 border rounded"
                >
                  ›
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


function ActionBadge({action}){

  const colors = {
    "User Blocked":"bg-red-100 text-red-600",
    "Ticket Assigned":"bg-blue-100 text-blue-600",
    "Policy Update":"bg-purple-100 text-purple-600",
    "Admin Login":"bg-gray-200 text-gray-700",
    "Service Created":"bg-green-100 text-green-600"
  };

  return(
    <span className={`px-3 py-1 rounded-full text-sm ${colors[action]}`}>
      {action}
    </span>
  )
}
