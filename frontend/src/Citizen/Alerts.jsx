import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function Alerts() {

  const [filter, setFilter] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alertsData = [
    {
      id: 1,
      type: "emergency",
      title: "Water Pipe Damage",
      desc: "Repair work is in progress near Main Street.",
      location: "Avanashi Road",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
    },
    {
      id: 2,
      type: "maintenance",
      title: "Road Maintenance",
      desc: "Road resurfacing work scheduled tomorrow.",
      location: "Tiruppur Junction",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
    },
    {
      id: 3,
      type: "event",
      title: "City Cleanliness Drive",
      desc: "Join the community cleaning initiative.",
      location: "Municipal Park",
      image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
    }
  ];

  const filteredAlerts =
    filter === "all"
      ? alertsData
      : alertsData.filter(a => a.type === filter);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">

    
        <h1 className="text-2xl font-bold mb-6">
          City Alerts
        </h1>

        
        <div className="flex gap-3 mb-6">

          {["all","emergency","maintenance","event"].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full capitalize
              ${filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200"}`}
            >
              {type}
            </button>
          ))}

        </div>

      
        <div className="space-y-5">

          {filteredAlerts.map(alert => (

            <div
              key={alert.id}
              className="bg-white rounded-xl shadow flex overflow-hidden"
            >

              <img
                src={alert.image}
                alt=""
                className="w-56 object-cover"
              />

              <div className="p-5 flex flex-col justify-between w-full">

                <div>
                  <span
                    className={`text-white text-xs px-2 py-1 rounded
                    ${alert.type==="emergency"
                      ?"bg-red-500"
                      :alert.type==="maintenance"
                      ?"bg-orange-500"
                      :"bg-blue-500"}`}
                  >
                    {alert.type.toUpperCase()}
                  </span>

                  <h3 className="text-lg font-bold mt-2">
                    {alert.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2">
                    {alert.desc}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-28"
                >
                  View
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

     

      {selectedAlert && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white w-[400px] rounded-xl p-6 shadow-lg">

            <h2 className="text-xl font-bold mb-3">
              {selectedAlert.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {selectedAlert.desc}
            </p>

            <p className="text-sm text-gray-500 mb-2">
              📍 Location: {selectedAlert.location}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Status: Active Alert
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedAlert(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}