
import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import { Bell, Search, Download } from "lucide-react";
import ComplaintSummary from "./ComplaintSummary"; 

export default function Complaints() {

  const [selectedComplaint, setSelectedComplaint] = useState(null); // ✅ ADD

  const complaints = [
    {
      id: "#CMP-8821",
      title: "Pothole Hazard",
      location: "Downtown District",
      category: "Public Works",
      priority: "High",
      status: "Escalated"
    },
    {
      id: "#CMP-8822",
      title: "Broken Streetlight",
      location: "Oak Avenue",
      category: "Utilities",
      priority: "Moderate",
      status: "New"
    },
    {
      id: "#CMP-8823",
      title: "Illegal Dumping",
      location: "Industrial Zone",
      category: "Sanitation",
      priority: "High",
      status: "Pending"
    },
    {
      id: "#CMP-8824",
      title: "Noise Complaint",
      location: "Residential East",
      category: "Public Safety",
      priority: "Low",
      status: "New"
    },
    {
      id: "#CMP-8825",
      title: "Water Leakage",
      location: "North Plaza",
      category: "Utilities",
      priority: "Moderate",
      status: "Escalated"
    }
  ];

  const [activeTab, setActiveTab] = useState("All Complaints");
  const [searchText, setSearchText] = useState("");

  const filteredComplaints = complaints.filter((c) => {
    const fullText = [
      c.id,
      c.title,
      c.location,
      c.category,
      c.priority,
      c.status
    ]
      .map(v => String(v).toLowerCase())
      .join(" ");

    if (!fullText.includes(searchText.toLowerCase())) return false;

    if (activeTab === "Escalated") return c.status === "Escalated";
    if (activeTab === "Pending Assignment") return c.status === "Pending";
    if (activeTab === "Flagged") return c.priority === "High";

    return true;
  });

  const exportCSV = () => {
    const rows = complaints.map(c =>
      `${c.id},${c.title},${c.location},${c.category},${c.priority},${c.status}`
    );

    const csv =
      "ID,Title,Location,Category,Priority,Status\n" +
      rows.join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "complaints.csv";
    a.click();
  };


  if (selectedComplaint) {
    return (
      <ComplaintSummary
        complaint={selectedComplaint}
        goBack={() => setSelectedComplaint(null)}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar/>

      <div className="flex-1 flex flex-col">

        <div className="bg-white border-b p-4 flex justify-between items-center">

          <h2 className="text-xl font-semibold">
            Complaint Management
          </h2>

          <div className="flex items-center gap-4">

            <div className="flex items-center bg-gray-100 px-3 py-2 rounded">

              <Search size={16}/>

              <input
                className="bg-transparent ml-2 outline-none"
                placeholder="Search complaints..."
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
              />

            </div>

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded"
            >
              <Download size={16}/>
              Export Data
            </button>

            <Bell/>

          </div>

        </div>

        <div className="p-6">

          <div className="flex gap-6 border-b pb-2 mb-6 text-gray-500">

            {[
              "All Complaints",
              "Pending Assignment",
              "Escalated",
              "Flagged"
            ].map(tab => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : ""
                }`}
              >
                {tab}
              </button>

            ))}

          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="p-4">Complaint ID</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredComplaints.map((c,index)=>(

                  <tr key={index} className="border-t hover:bg-gray-50">

                    <td className="p-4 text-blue-600 font-semibold">{c.id}</td>
                    <td>{c.title}</td>
                    <td>{c.location}</td>
                    <td><Badge text={c.category}/></td>
                    <td><PriorityBadge level={c.priority}/></td>
                    <td><StatusBadge status={c.status}/></td>

                    
                    <td
                      className="text-blue-600 cursor-pointer"
                      onClick={()=>setSelectedComplaint(c)}
                    >
                      View Details
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

function Badge({text}){
  return(
    <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
      {text}
    </span>
  )
}

function PriorityBadge({level}){
  const colors = {
    High:"bg-red-100 text-red-600",
    Moderate:"bg-blue-100 text-blue-600",
    Low:"bg-gray-200 text-gray-600"
  };
  return(
    <span className={`px-3 py-1 rounded-full text-sm ${colors[level]}`}>
      {level}
    </span>
  )
}

function StatusBadge({status}){
  const colors = {
    Escalated:"bg-yellow-100 text-yellow-700",
    Pending:"bg-gray-200 text-gray-700",
    New:"bg-green-100 text-green-600"
  };
  return(
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>
      {status}
    </span>
  )
}