import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 5;

  const defaultAlerts = [
    {
      id: 1,
      title: "Water Supply Maintenance",
      message: "Temporary shutdown due to pipeline repair work.",
      category: "WATER",
      priority: "High",
      image:
        "https://images.unsplash.com/photo-1587502537745-84b86da1204f",
    },
    {
      id: 2,
      title: "Severe Weather Warning",
      message: "Heavy rainfall expected. Avoid travel if possible.",
      category: "WEATHER",
      priority: "Critical",
      image:
        "https://images.unsplash.com/photo-1500674425229-f692875b0ab7",
    },
    {
      id: 3,
      title: "Power Grid Maintenance",
      message: "Electricity shutdown in selected zones.",
      category: "POWER",
      priority: "Medium",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
    },
    {
      id: 4,
      title: "Traffic Congestion Alert",
      message: "Heavy traffic expected in city center.",
      category: "TRAFFIC",
      priority: "Low",
      image:
        "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7",
    },
  ];

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const res = await API.get("/api/alerts");
      const filtered = res.data.filter((a) => a.title && a.message);
      setAlerts(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAlert = async (id) => {
    try {
      await API.delete(`/api/alerts/${id}`);
      setAlerts((prev) =>
        prev.filter((a) => (a.id || a._id) !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  // pagination
  const allAlerts = [...defaultAlerts, ...alerts];

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAlerts = allAlerts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(allAlerts.length / itemsPerPage);

  const AlertCard = ({ a }) => (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      <div className="relative w-full aspect-[16/9] bg-gray-200">
        <img
          src={a.image || "https://via.placeholder.com/400"}
          alt="alert"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <h3 className="absolute bottom-3 left-4 text-white font-semibold text-lg">
          {a.title}
        </h3>
      </div>

      <div className="p-5">
        <p className="text-gray-600 text-sm">{a.message}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
            {a.category}
          </span>

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              a.priority === "Critical"
                ? "bg-red-500 text-white"
                : a.priority === "High"
                ? "bg-orange-500 text-white"
                : a.priority === "Medium"
                ? "bg-yellow-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {a.priority}
          </span>
        </div>

        <button
          onClick={() => deleteAlert(a.id || a._id)}
          className="mt-4 text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar (fixed, NO scroll) */}
      <div className="w-64 h-screen fixed left-0 top-0 bg-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* CONTENT (ONLY this scrolls) */}
      <div className="flex-1 ml-64 h-screen overflow-y-auto px-8 py-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              City Alert Center
            </h2>

            <button
              onClick={() => navigate("/create-alert")}
              className="bg-green-500 text-white px-6 py-2 rounded-xl"
            >
              + New Alert
            </button>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentAlerts.map((a) => (
              <AlertCard key={a.id || a._id} a={a} />
            ))}
          </div>

          {/* Pagination (bottom-right) */}
          <div className="flex justify-end items-center mt-8 gap-4 pb-10">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <div className="text-gray-700 font-medium">
              Page <span className="font-bold">{currentPage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}