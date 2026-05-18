import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

function Alerts() {

  const [filter, setFilter] = useState("all");

  const alertsData = [
    {
      id: 1,
      type: "emergency",
      title: "Main St. Water Main Break",
      desc: "Repairs are currently underway for a major water main break.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
    },
    {
      id: 2,
      type: "maintenance",
      title: "North Ave Resurfacing",
      desc: "Scheduled road work will result in single-lane traffic.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
    },
    {
      id: 3,
      type: "event",
      title: "Community Farmers Market",
      desc: "Visit over 40 local vendors and enjoy live music.",
      image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
    }
  ];

  const filteredAlerts =
    filter === "all"
      ? alertsData
      : alertsData.filter((alert) => alert.type === filter);

  const showDetails = (title) => {
    alert("Showing details for: " + title);
  };

  const viewMap = () => {
    alert("Opening Map...");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <div className="bg-white shadow flex justify-between items-center px-8 py-4">

          <h2 className="text-xl font-semibold">City Alerts & News</h2>

          <input
            type="text"
            placeholder="Search alerts..."
            className="border rounded-lg px-3 py-1 w-64"
          />

          <div className="flex items-center gap-3">
            <span>Arjun Varma</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full"
            />
          </div>

        </div>

        <div className="flex gap-6 p-6">

          <div className="w-2/3 space-y-6">

           
            <div className="flex gap-3">

              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-1 rounded-full ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                All Alerts
              </button>

              <button
                onClick={() => setFilter("emergency")}
                className={`px-4 py-1 rounded-full ${
                  filter === "emergency"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Emergency
              </button>

              <button
                onClick={() => setFilter("maintenance")}
                className={`px-4 py-1 rounded-full ${
                  filter === "maintenance"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Maintenance
              </button>

              <button
                onClick={() => setFilter("event")}
                className={`px-4 py-1 rounded-full ${
                  filter === "event"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Event
              </button>

            </div>

    
            {filteredAlerts.map((alert) => (

              <div
                key={alert.id}
                className="bg-white rounded-xl shadow flex overflow-hidden"
              >

                <img
                  src={alert.image}
                  alt=""
                  className="w-60 object-cover"
                />

                <div className="p-5">

                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${
                      alert.type === "emergency"
                        ? "bg-red-500"
                        : alert.type === "maintenance"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {alert.type.toUpperCase()}
                  </span>

                  <h3 className="text-xl font-bold mt-2">
                    {alert.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm">
                    {alert.desc}
                  </p>

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() => showDetails(alert.title)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Details
                    </button>

                    <button
                      onClick={viewMap}
                      className="bg-gray-200 px-4 py-2 rounded"
                    >
                      View Map
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
          <div className="w-1/3 space-y-6">

            <div className="bg-white rounded-xl shadow p-4">

              <h3 className="font-semibold mb-3">
                Nearby Incidents
              </h3>

              <div className="bg-gray-200 h-40 rounded-lg"></div>

              <div className="border-t mt-4 pt-3">
                <p className="font-semibold text-sm">Traffic Delay</p>
                <p className="text-gray-500 text-xs">
                  Heavy congestion due to stalled vehicle.
                </p>
              </div>

              <div className="border-t mt-3 pt-3">
                <p className="font-semibold text-sm">Waste Collection</p>
                <p className="text-gray-500 text-xs">
                  Pickup rescheduled to tomorrow morning.
                </p>
              </div>

            </div>

            <div className="bg-white rounded-xl shadow p-4">

              <h3 className="font-semibold mb-3">
                Upcoming Closures
              </h3>

              <div className="flex justify-between border-b py-2">
                <p>Harbor Bridge</p>
                <span className="text-gray-400 text-sm">Mar 12</span>
              </div>

              <div className="flex justify-between py-2">
                <p>Library West</p>
                <span className="text-gray-400 text-sm">Mar 15</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Alerts;