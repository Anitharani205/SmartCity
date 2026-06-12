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
}, []);

  // ONLY "Closed" COMPLAINTS GO TO RESOLVED
 const pendingComplaints = complaints.filter(
  (c) => c.status?.toLowerCase() !== "closed"
);

const resolvedComplaints = complaints.filter(
  (c) => c.status?.toLowerCase() === "closed"
);

  // Pagination
  const allComplaints = [
    ...pendingComplaints,
    ...resolvedComplaints
  ];

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentComplaints = allComplaints.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    allComplaints.length / itemsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-8 bg-gray-100 min-h-screen w-full">
        <h1 className="text-4xl font-bold mb-6">
          Complaint History
        </h1>

        {/* PENDING COMPLAINTS */}
        <h2 className="text-2xl text-red-600 mb-4">
          Pending Complaints
        </h2>

        {pendingComplaints.length === 0 ? (
          <div className="bg-white p-6 rounded shadow mb-4">
            No pending complaints found.
          </div>
        ) : (
          pendingComplaints.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded shadow mb-4"
            >
              <h3 className="text-xl font-bold">
                {c.title}
              </h3>

              <p>
                <strong>Category:</strong> {c.category}
              </p>

              <p>
                <strong>Priority:</strong> {c.priority}
              </p>

              <p>
                <strong>Status:</strong> {c.status}
              </p>

              {c.description && (
                <p>
                  <strong>Description:</strong>{" "}
                  {c.description}
                </p>
              )}
            </div>
          ))
        )}

        {/* RESOLVED COMPLAINTS */}
        <h2 className="text-2xl text-green-600 mt-8 mb-4">
          Resolved Complaints
        </h2>

        {resolvedComplaints.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No resolved complaints found.
          </div>
        ) : (
          resolvedComplaints.map((c) => (
            <div
              key={c.id}
              className="bg-green-50 border border-green-300 p-6 rounded shadow mb-4"
            >
              <h3 className="text-xl font-bold">
                {c.title}
              </h3>

              <p>
                <strong>Category:</strong> {c.category}
              </p>

              <p>
                <strong>Priority:</strong> {c.priority}
              </p>

              <p className="text-green-700 font-semibold">
                <strong>Status:</strong> {c.status}
              </p>

              {c.description && (
                <p>
                  <strong>Description:</strong>{" "}
                  {c.description}
                </p>
              )}
            </div>
          ))
        )}

        {/* PAGINATION */}
        <div className="flex justify-end items-center mt-10 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <div className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages || 1}
          </div>

          <button
            disabled={
              currentPage === totalPages || totalPages === 0
            }
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