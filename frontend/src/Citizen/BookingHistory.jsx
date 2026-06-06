import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";

export default function BookingHistory() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const loadServices = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await API.get(`/services/citizen/${email}`);
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadServices();

    const interval = setInterval(() => {
      loadServices();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= FILTER =================
  const pendingServices = services.filter((s) => s.status !== "Resolved");
  const resolvedServices = services.filter((s) => s.status === "Resolved");

  const allServices = [...pendingServices, ...resolvedServices];

  // ================= PAGINATION =================
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentServices = allServices.slice(indexOfFirst, indexOfLast);

  const totalPages = 5; // fixed

  return (
    <div className="bg-gray-100 min-h-screen flex">

      <Sidebar />

      <div className="ml-64 p-8 w-full h-screen overflow-y-auto">

        <h1 className="text-4xl font-bold mb-10">
          Service Booking History
        </h1>

        {/* ================= PENDING ================= */}
        <h2 className="text-2xl font-semibold mb-5 text-yellow-600">
          Pending Services
        </h2>

        {pendingServices.map((s) => (
          <div key={s.id || s._id} className="bg-white p-6 rounded-xl shadow mb-4">
            <h3 className="text-xl font-bold">{s.service}</h3>
            <p>Date: {s.date}</p>
            <p>Status: {s.status}</p>
          </div>
        ))}

        {/* ================= RESOLVED ================= */}
        <h2 className="text-2xl font-semibold mt-10 mb-5 text-green-600">
          Resolved Services
        </h2>

        {resolvedServices.map((s) => (
          <div key={s.id || s._id} className="bg-green-50 p-6 rounded-xl shadow mb-4">
            <h3 className="text-xl font-bold">{s.service}</h3>
            <p>Date: {s.date}</p>
            <p>Status: Resolved</p>
          </div>
        ))}

        {/* ================= PAGINATION (NO NUMBERS) ================= */}
        <div className="flex justify-end items-center mt-10 gap-4">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <div className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}