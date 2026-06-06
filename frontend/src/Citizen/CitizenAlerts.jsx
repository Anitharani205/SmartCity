import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";

export default function CitizenAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const res = await API.get("/api/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      
      <Sidebar />

      <div className="flex-1 ml-64 p-6">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Live City Alerts
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {alerts.map((a) => (
            <div
              key={a.id || a._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >

             
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={
                    a.image ||
                    "https://images.unsplash.com/photo-1497486751825-1233686d5d80"
                  }
                  alt="alert"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

            
              <div className="p-4">

                <h3 className="font-bold text-lg text-gray-800">
                  {a.title || "No Title"}
                </h3>

                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {a.message || "No message"}
                </p>

                <div className="flex justify-between mt-4">

                  <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {a.category}
                  </span>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      a.priority === "Critical"
                        ? "bg-red-500 text-white"
                        : a.priority === "High"
                        ? "bg-orange-500 text-white"
                        : a.priority === "Medium"
                        ? "bg-yellow-400 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {a.priority}
                  </span>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}