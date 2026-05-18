import { useState } from "react";
import MunicipalSidebar from "./components/MunicipalSidebar";
import {
  Search,
  Bell,
  HelpCircle,
  Wrench,
  Zap,
  Scissors,
  TreePine,
  Grid3X3
} from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Service Requests</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-80">
          <Search size={18} />
          <input
            placeholder="Search requests, citizens, or addresses..."
            className="bg-transparent outline-none ml-2 w-full"
          />
        </div>

        <Bell size={20} />
        <HelpCircle size={20} />
      </div>
    </div>
  );
}

function Tabs({ activeTab, setActiveTab, counts }) {
  return (
    <div className="flex gap-8 border-b mb-6">

      <button
        onClick={() => setActiveTab("PENDING")}
        className={`pb-2 font-medium ${
          activeTab === "PENDING"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500"
        }`}
      >
        Pending ({counts.pending})
      </button>

      <button
        onClick={() => setActiveTab("SCHEDULED")}
        className={`pb-2 ${
          activeTab === "SCHEDULED"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500"
        }`}
      >
        Scheduled ({counts.scheduled})
      </button>

      <button
        onClick={() => setActiveTab("COMPLETED")}
        className={`pb-2 ${
          activeTab === "COMPLETED"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500"
        }`}
      >
        Completed ({counts.completed})
      </button>

    </div>
  );
}

function Filters({ filter, setFilter }) {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">

      <button
        onClick={() => setFilter("ALL")}
        className={`px-4 py-2 rounded-full text-sm ${
          filter === "ALL"
            ? "bg-blue-600 text-white"
            : "border"
        }`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("Plumbing")}
        className="border px-4 py-2 rounded-full text-sm flex items-center gap-2"
      >
        <Wrench size={16}/> Plumbing
      </button>

      <button
        onClick={() => setFilter("Electrical")}
        className="border px-4 py-2 rounded-full text-sm flex items-center gap-2"
      >
        <Zap size={16}/> Electrical
      </button>

      <button
        onClick={() => setFilter("Carpentry")}
        className="border px-4 py-2 rounded-full text-sm flex items-center gap-2"
      >
        <Scissors size={16}/> Carpentry
      </button>

      <button
        onClick={() => setFilter("Landscaping")}
        className="border px-4 py-2 rounded-full text-sm flex items-center gap-2"
      >
        <TreePine size={16}/> Landscaping
      </button>

      <button
        onClick={() => setFilter("Maintenance")}
        className="border px-4 py-2 rounded-full text-sm flex items-center gap-2"
      >
        <Grid3X3 size={16}/> General Maintenance
      </button>

    </div>
  );
}

function StatusBadge({ status }) {

  const styles = {
    URGENT: "bg-red-100 text-red-600",
    PENDING: "bg-blue-100 text-blue-600",
    REVIEWING: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function Table({ data, onSchedule, onDetails }) {

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="p-4 text-left">SERVICE TYPE</th>
            <th className="p-4 text-left">STATUS</th>
            <th className="p-4 text-left">CITIZEN</th>
            <th className="p-4 text-left">ADDRESS</th>
            <th className="p-4 text-left">DATE & TIME</th>
            <th className="p-4 text-left">ACTIONS</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item, i) => (

            <tr key={i} className="border-t">

              <td className="p-4 font-medium">{item.service}</td>

              <td className="p-4">
                <StatusBadge status={item.status} />
              </td>

              <td className="p-4">
                {item.citizen}
                <div className="text-xs text-gray-500">
                  ID: {item.id}
                </div>
              </td>

              <td className="p-4 text-gray-600">
                {item.address}
              </td>

              <td className="p-4">
                {item.date}
                <div className="text-xs text-gray-500">
                  {item.time}
                </div>
              </td>

              <td className="p-4 flex gap-2">

                <button
                  onClick={() => onSchedule(i)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Schedule
                </button>

                <button
                  onClick={() => onDetails(item)}
                  className="bg-gray-200 px-4 py-1 rounded-lg text-sm"
                >
                  Details
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

function Request() {

  const [activeTab, setActiveTab] = useState("PENDING");
  const [filter, setFilter] = useState("ALL");

  const [data, setData] = useState([
    {
      service: "Plumbing Repair",
      category: "Plumbing",
      status: "URGENT",
      tab: "PENDING",
      citizen: "Johnathan Doe",
      id: "#C-9021",
      address: "123 Maple Street, Sector 4",
      date: "Oct 24, 2023",
      time: "09:00 AM",
    },
    {
      service: "Electrical Wiring",
      category: "Electrical",
      status: "PENDING",
      tab: "PENDING",
      citizen: "Sarah Miller",
      id: "#C-4421",
      address: "456 Oak Avenue, West Hill",
      date: "Oct 25, 2023",
      time: "02:30 PM",
    },
    {
      service: "Landscaping",
      category: "Landscaping",
      status: "REVIEWING",
      tab: "PENDING",
      citizen: "Robert Brown",
      id: "#C-1102",
      address: "789 Pine Road, North End",
      date: "Oct 26, 2023",
      time: "11:15 AM",
    },
    {
      service: "Sidewalk Repair",
      category: "Maintenance",
      status: "URGENT",
      tab: "PENDING",
      citizen: "Emily Chen",
      id: "#C-7732",
      address: "321 Birch Blvd, Central",
      date: "Oct 26, 2023",
      time: "08:00 AM",
    },
  ]);

  const handleSchedule = (index) => {

    const updated = [...data];
    updated[index].tab = "SCHEDULED";

    setData(updated);
  };

  const handleDetails = (item) => {

    alert(
      `Citizen: ${item.citizen}
Service: ${item.service}
Address: ${item.address}
Date: ${item.date} ${item.time}`
    );
  };

  const filteredData = data.filter((item) => {
    return (
      item.tab === activeTab &&
      (filter === "ALL" || item.category === filter)
    );
  });

  const counts = {
    pending: data.filter((d) => d.tab === "PENDING").length,
    scheduled: data.filter((d) => d.tab === "SCHEDULED").length,
    completed: data.filter((d) => d.tab === "COMPLETED").length,
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <MunicipalSidebar />

      <div className="flex-1 p-8">

        <Navbar />

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
        />

        <Filters
          filter={filter}
          setFilter={setFilter}
        />

        <Table
          data={filteredData}
          onSchedule={handleSchedule}
          onDetails={handleDetails}
        />

      </div>

    </div>
  );
}

export default Request;
