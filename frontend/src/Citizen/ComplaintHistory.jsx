import React, { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "./components/Sidebar";

export default function ComplaintHistory() {

  const [complaints, setComplaints] = useState([]);

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

  const pendingComplaints = complaints.filter(
    (c) => c.status !== "Resolved"
  );

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  );

  return (
    <div>

      {/* ✅ FIXED SIDEBAR */}
      <Sidebar />

      {/* ✅ CONTENT SHIFTED RIGHT */}
      <div className="ml-64 p-8 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-6">
          Complaint History
        </h1>

        {/* Pending */}
        <h2 className="text-2xl text-red-600 mb-4">
          Pending Complaints
        </h2>

        {pendingComplaints.length === 0 ? (
          <div className="bg-white p-4 rounded shadow">
            No Pending Complaints
          </div>
        ) : (
          pendingComplaints.map((c) => (
            <div key={c._id} className="bg-white p-6 rounded shadow mb-4">

              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded">
                  {c.status}
                </span>
              </div>

              <p>{c.category}</p>
              <p><b>Priority:</b> {c.priority}</p>
              <p><b>Address:</b> {c.address}</p>
              <p><b>Staff:</b> {c.assignedStaffName || "Not Assigned"}</p>

            </div>
          ))
        )}

        {/* Resolved */}
        <h2 className="text-2xl text-green-600 mt-8 mb-4">
          Resolved Complaints
        </h2>

        {resolvedComplaints.length === 0 ? (
          <div className="bg-white p-4 rounded shadow">
            No Resolved Complaints
          </div>
        ) : (
          resolvedComplaints.map((c) => (
            <div key={c._id} className="bg-green-50 p-6 rounded shadow mb-4">

              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded">
                  Resolved
                </span>
              </div>

              <p>{c.category}</p>
              <p><b>Priority:</b> {c.priority}</p>
              <p><b>Address:</b> {c.address}</p>
              <p><b>Resolved By:</b> {c.assignedStaffName}</p>

            </div>
          ))
        )}

      </div>

    </div>
  );
}