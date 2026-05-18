import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MunicipalSidebar from "./components/MunicipalSidebar";

import {
  Search,
  Settings,
  HelpCircle,
  Bell,
  MapPin,
  Plus,
  Filter
} from "lucide-react";

function Topbar({ setSearch }) {
  return (
    <div className="flex justify-between items-center mb-8">

      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-96">
        <Search className="text-gray-500" size={18} />

        <input
          placeholder="Search complaints, IDs or locations..."
          className="ml-2 bg-transparent outline-none w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="flex items-center gap-6 text-gray-600">
        <HelpCircle size={20} />
        <Settings size={20} />
        <Bell size={20} />
      </div>

    </div>
  );
}

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-3 mb-6">

      <button
        onClick={() => setActiveTab("ALL")}
        className={`px-4 py-2 rounded-full text-sm ${
          activeTab === "ALL" ? "bg-blue-600 text-white" : "border"
        }`}
      >
        All Complaints
      </button>

      <button
        onClick={() => setActiveTab("Open")}
        className={`px-4 py-2 rounded-full text-sm ${
          activeTab === "Open" ? "bg-blue-600 text-white" : "border"
        }`}
      >
        Open
      </button>

      <button
        onClick={() => setActiveTab("In Progress")}
        className={`px-4 py-2 rounded-full text-sm ${
          activeTab === "In Progress" ? "bg-blue-600 text-white" : "border"
        }`}
      >
        In Progress
      </button>

      <button
        onClick={() => setActiveTab("Resolved")}
        className={`px-4 py-2 rounded-full text-sm ${
          activeTab === "Resolved" ? "bg-blue-600 text-white" : "border"
        }`}
      >
        Resolved
      </button>

    </div>
  );
}

function PriorityBadge({ level }) {

  const styles = {
    HIGH: "bg-red-100 text-red-600",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${styles[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }) {

  const colors = {
    Open: "bg-blue-500",
    "In Progress": "bg-yellow-500",
    Resolved: "bg-green-500",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${colors[status]}`}></span>
      {status}
    </div>
  );
}

function ComplaintsTable({ data, handleAction }) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-gray-500">

          <tr>
            <th className="p-4 text-left">PRIORITY</th>
            <th className="p-4 text-left">COMPLAINT ID & TITLE</th>
            <th className="p-4 text-left">LOCATION</th>
            <th className="p-4 text-left">ELAPSED</th>
            <th className="p-4 text-left">STATUS</th>
            <th className="p-4 text-left">ACTIONS</th>
          </tr>

        </thead>

        <tbody>

          {data.map((item, index) => (

            <tr key={index} className="border-t">

              <td className="p-4">
                <PriorityBadge level={item.priority} />
              </td>

              <td className="p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </td>

              <td className="p-4 flex items-center gap-2 text-gray-600">
                <MapPin size={16} /> {item.location}
              </td>

              <td className="p-4 text-gray-600">{item.elapsed}</td>

              <td className="p-4">
                <StatusBadge status={item.status} />
              </td>

              <td
                onClick={() => handleAction(item)}
                className="p-4 text-blue-600 font-medium cursor-pointer"
              >
                {item.action}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-between items-center p-4 text-sm text-gray-500">

        Showing {data.length} results

        <div className="flex items-center gap-2">
          <button className="border px-3 py-1 rounded">‹</button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded">1</button>
          <button className="border px-3 py-1 rounded">2</button>
          <button className="border px-3 py-1 rounded">3</button>
          <button className="border px-3 py-1 rounded">›</button>
        </div>

      </div>

    </div>
  );
}

function Header({ handleNewReport }) {

  return (
    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-2xl font-semibold">Assigned Complaints</h1>
        <p className="text-gray-500 text-sm">
          Manage and resolve reports assigned to your sector.
        </p>
      </div>

      <div className="flex gap-3">

        <button
          className="border px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Filter size={16} /> Filter
        </button>

        <button
          onClick={handleNewReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> New Report
        </button>

      </div>

    </div>
  );
}

function Task() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const complaints = [
    {
      priority: "HIGH",
      title: "Broken Streetlight #452",
      category: "Infrastructure & Safety",
      location: "Oak Avenue, Sector 4",
      elapsed: "5h ago",
      status: "Open",
      action: "View Details",
    },
    {
      priority: "MEDIUM",
      title: "Pothole Repair #411",
      category: "Road Maintenance",
      location: "Maple St, Sector 2",
      elapsed: "1d ago",
      status: "In Progress",
      action: "Manage",
    },
    {
      priority: "LOW",
      title: "Graffiti Removal #398",
      category: "Public Spaces",
      location: "Pine Rd, Sector 1",
      elapsed: "3d ago",
      status: "Resolved",
      action: "View Details",
    },
    {
      priority: "HIGH",
      title: "Water Leak #460",
      category: "Utilities",
      location: "Cedar Blvd, Sector 5",
      elapsed: "2h ago",
      status: "Open",
      action: "Manage",
    },
  ];

  const filteredData = complaints.filter((c) => {

    return (
      (activeTab === "ALL" || c.status === activeTab) &&
      (c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase()))
    );

  });

  const handleAction = (item) => {

    if (item.action === "Manage") {
      navigate("/manage");
    } else {
      navigate("/complaintdetail");
    }

  };

  const handleNewReport = () => {
    navigate("/report");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <MunicipalSidebar />

      <div className="flex-1 p-8">

        <Topbar setSearch={setSearch} />

        <Header handleNewReport={handleNewReport} />

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <ComplaintsTable
          data={filteredData}
          handleAction={handleAction}
        />

      </div>

    </div>
  );
}

export default Task;
