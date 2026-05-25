import React, { useState, useMemo } from "react";
import AdminSidebar from "./components/AdminSidebar";
import {
  Search,
  Download,
  Bell,
  Edit2,
} from "lucide-react";

const initialAlerts = [
  {
    id: 1,
    title:
      "Severe Thunderstorm Warning - North Sector",
    category: "Weather",
    priority: "High",
    status: "Active",
    time: "2 hours ago",
    reach: "12,450",
    channel: "SMS, Mobile App",
  },

  {
    id: 2,
    title:
      "Bridge Maintenance Notice: East River Crossing",
    category: "Traffic",
    priority: "Medium",
    status: "Active",
    time: "5 hours ago",
    reach: "45,201",
    channel: "Mobile App",
  },

  {
    id: 3,
    title:
      "Community Garden Workshop Series",
    category: "General",
    priority: "Low",
    status: "Draft",
    time: "1 day ago",
    reach: "8,122",
    channel: "Web, Mobile App",
  },

  {
    id: 4,
    title:
      "Planned Water Outage - Downtown Area",
    category: "Utilities",
    priority: "Medium",
    status: "Archived",
    time: "1 day ago",
    reach: "29,880",
    channel: "SMS, Web",
  },

  {
    id: 5,
    title:
      "Emergency Road Closure - Central Avenue",
    category: "Traffic",
    priority: "High",
    status: "Active",
    time: "3 hours ago",
    reach: "18,200",
    channel: "SMS",
  },

  {
    id: 6,
    title:
      "Heavy Rainfall Alert",
    category: "Weather",
    priority: "Medium",
    status: "Draft",
    time: "6 hours ago",
    reach: "9,900",
    channel: "Mobile App",
  },
];

export default function Alerts() {

  const [alerts, setAlerts] =
    useState(initialAlerts);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [priority, setPriority] =
    useState("All Priorities");

  const [activeTab, setActiveTab] =
    useState("Active");

  const [notification, setNotification] =
    useState("");



  const [currentPage, setCurrentPage] =
    useState(1);

  const alertsPerPage = 3;



  const filteredAlerts = useMemo(() => {

    return alerts.filter((alert) => {

      const fullText = `
        ${alert.title}
        ${alert.category}
        ${alert.priority}
        ${alert.status}
        ${alert.channel}
      `.toLowerCase();

      const matchesSearch =
        fullText.includes(
          search.toLowerCase()
        );

      const matchesCategory =
        category === "All Categories" ||
        alert.category === category;

      const matchesPriority =
        priority === "All Priorities" ||
        alert.priority === priority;

      const matchesTab =
        activeTab === "All" ||
        alert.status === activeTab;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesTab
      );
    });

  }, [
    alerts,
    search,
    category,
    priority,
    activeTab,
  ]);


  const totalPages = Math.ceil(
    filteredAlerts.length / alertsPerPage
  );

  const startIndex =
    (currentPage - 1) * alertsPerPage;

  const paginatedAlerts =
    filteredAlerts.slice(
      startIndex,
      startIndex + alertsPerPage
    );


  const handleDeactivate = (id) => {

    const updatedAlerts = alerts.map(
      (alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Archived",
            }
          : alert
    );

    setAlerts(updatedAlerts);

    setNotification(
      "✅ Alert archived successfully"
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleEdit = (selectedAlert) => {

    setNotification(
      `✏️ Editing alert: ${selectedAlert.title}`
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const exportCSV = () => {

    const rows = alerts.map(
      (a) =>
        `${a.title},${a.category},${a.priority},${a.status},${a.time},${a.reach},${a.channel}`
    );

    const csv =
      "Title,Category,Priority,Status,Time,Reach,Channel\n" +
      rows.join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "alerts.csv";

    link.click();
  };

  return (

    <div className="flex h-screen bg-gray-100 overflow-hidden">

     

      <AdminSidebar />

   

      <div className="flex-1 flex flex-col overflow-auto">

       
        <div className="bg-white border-b p-5 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Manage Existing Alerts
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Control and monitor public
              notifications
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >

              <Download size={16} />

              Export Data

            </button>

            <Bell className="text-gray-600" />

          </div>

        </div>

        

        {notification && (

          <div className="mx-6 mt-6 bg-blue-100 text-blue-700 px-4 py-3 rounded-lg">

            {notification}

          </div>

        )}

        

        <div className="p-6">

          <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">

            <div className="flex flex-wrap gap-4">

           

              <div className="flex items-center border rounded-lg px-3 py-2 flex-1 min-w-[250px]">

                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search alerts..."
                  className="ml-2 outline-none w-full"
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );

                    setCurrentPage(1);
                  }}
                />

              </div>

            

              <select
                className="border px-4 py-2 rounded-lg"
                value={category}
                onChange={(e) => {
                  setCategory(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
              >

                <option>
                  All Categories
                </option>

                <option>
                  Weather
                </option>

                <option>
                  Traffic
                </option>

                <option>
                  General
                </option>

                <option>
                  Utilities
                </option>

              </select>

        

              <select
                className="border px-4 py-2 rounded-lg"
                value={priority}
                onChange={(e) => {
                  setPriority(
                    e.target.value
                  );

                  setCurrentPage(1);
                }}
              >

                <option>
                  All Priorities
                </option>

                <option>
                  High
                </option>

                <option>
                  Medium
                </option>

                <option>
                  Low
                </option>

              </select>

            </div>

          </div>

         

          <div className="flex gap-3 mb-6">

            {[
              "Active",
              "Archived",
              "Draft",
            ].map((tab) => (

              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {tab}
              </button>

            ))}

          </div>


          <div className="space-y-4">

            {paginatedAlerts.length > 0 ? (

              paginatedAlerts.map(
                (alert) => (

                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onEdit={handleEdit}
                    onDeactivate={
                      handleDeactivate
                    }
                  />

                )
              )

            ) : (

              <div className="bg-white p-6 rounded-xl text-center text-gray-500">

                No alerts found

              </div>

            )}

          </div>


          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-8">

         

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Prev
              </button>

         

              {[...Array(totalPages)].map(
                (_, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage ===
                      index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>

                )
              )}

              {/* NEXT */}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

/* ALERT CARD */

function AlertCard({
  alert,
  onEdit,
  onDeactivate,
}) {

  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium:
      "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-600",
  };

  return (

    <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-start">

      <div>

        <div className="flex items-center gap-3">

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              priorityColors[
                alert.priority
              ]
            }`}
          >
            {alert.priority} Priority
          </span>

          <span className="text-xs text-gray-400">
            {alert.time}
          </span>

        </div>

        <h3 className="font-semibold text-lg mt-3">
          {alert.title}
        </h3>

        <p className="text-gray-500 text-sm mt-2">
          Category: {alert.category}
        </p>

        <p className="text-gray-500 text-sm">
          Reach: {alert.reach} users
        </p>

        <p className="text-gray-500 text-sm">
          Channel: {alert.channel}
        </p>

        <div className="mt-3">

          <StatusBadge
            status={alert.status}
          />

        </div>

      </div>

      <div className="flex items-center gap-2">

        <button
          onClick={() => onEdit(alert)}
          className="border p-2 rounded-lg hover:bg-gray-100 transition"
        >

          <Edit2 size={16} />

        </button>

        {alert.status !==
          "Archived" && (

          <button
            onClick={() =>
              onDeactivate(alert.id)
            }
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
          >
            Deactivate
          </button>

        )}

      </div>

    </div>

  );
}



function StatusBadge({ status }) {

  const colors = {
    Active:
      "bg-green-100 text-green-700",

    Archived:
      "bg-gray-200 text-gray-700",

    Draft:
      "bg-yellow-100 text-yellow-700",
  };

  return (

    <span
      className={`text-xs px-3 py-1 rounded-full ${colors[status]}`}
    >
      {status}
    </span>

  );
}