import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";

export default function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const loadComplaints = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await API.get(`/complaints/citizen/${email}`);
      setComplaints(res.data);
    } catch (err) {
      console.log("Error loading complaints:", err);
    }
  };

  useEffect(() => {
    loadComplaints();

    const interval = setInterval(() => {
      loadComplaints();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= FILTER =================
  const pendingComplaints = complaints.filter(
    (c) => c.status !== "Resolved"
  );

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  );

  const allComplaints = [...pendingComplaints, ...resolvedComplaints];

  // ================= PAGINATION =================
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentComplaints = allComplaints.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = 5; // fixed 5 pages UI

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 p-8 bg-gray-100 min-h-screen w-full">

        <h1 className="text-4xl font-bold mb-6">
          Complaint History
        </h1>

        {/* ================= PENDING ================= */}
        <h2 className="text-2xl text-red-600 mb-4">
          Pending Complaints
        </h2>

        {pendingComplaints.map((c) => (
          <div key={c._id} className="bg-white p-6 rounded shadow mb-4">
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p>{c.category}</p>
            <p>Priority: {c.priority}</p>
            <p>Status: {c.status}</p>
          </div>
        ))}

        {/* ================= RESOLVED ================= */}
        <h2 className="text-2xl text-green-600 mt-8 mb-4">
          Resolved Complaints
        </h2>

        {resolvedComplaints.map((c) => (
          <div key={c._id} className="bg-green-50 p-6 rounded shadow mb-4">
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p>{c.category}</p>
            <p>Priority: {c.priority}</p>
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
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}