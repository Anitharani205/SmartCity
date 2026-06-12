import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const res = await API.get("/api/alerts");
      const filtered = res.data.filter(
        (a) => a.title && a.message
      );
      setAlerts(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAlert = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this alert?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/alerts/${id}`);

      setAlerts((prev) =>
        prev.filter((a) => (a.id || a._id) !== id)
      );

      alert("Alert deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentAlerts = alerts.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages =
    alerts.length === 0
      ? 1
      : Math.ceil(alerts.length / itemsPerPage);

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
        <p className="text-gray-600 text-sm">
          {a.message}
        </p>

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
      {/* Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0 bg-white shadow-lg">
        <AdminSidebar />
      </div>

      {/* Content */}
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

          {/* Empty State */}
          {alerts.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
              No alerts available.
              <br />
              Create your first alert using the
              "New Alert" button.
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentAlerts.map((a) => (
                  <AlertCard
                    key={a.id || a._id}
                    a={a}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center mt-8 gap-4 pb-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) => p - 1)
                  }
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <div className="text-gray-700 font-medium">
                  Page{" "}
                  <span className="font-bold">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold">
                    {totalPages}
                  </span>
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => p + 1)
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}