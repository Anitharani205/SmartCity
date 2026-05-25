import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function ComplaintHistory() {

  const [complaints, setComplaints] = useState([]);

  // LOAD COMPLAINTS
  const loadComplaints = async () => {

    try {

      const email = localStorage.getItem("email");

      const res = await API.get(
        `/complaints/citizen/${email}`
      );

      console.log("COMPLAINT HISTORY:", res.data);

      setComplaints(res.data);

    } catch (err) {

      console.log("Error loading complaints:", err);
    }
  };

  // AUTO REFRESH
  useEffect(() => {

    loadComplaints();

    // refresh every 5 sec
    const interval = setInterval(() => {
      loadComplaints();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // FILTERS
  const pendingComplaints = complaints.filter(
    (c) => c.status !== "Resolved"
  );

  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Complaint History
      </h1>

      {/* PENDING */}
      <h2 className="text-2xl font-semibold mb-4">
        Pending Complaints
      </h2>

      <div className="space-y-4 mb-10">

        {pendingComplaints.length === 0 ? (

          <div className="bg-white p-5 rounded shadow">
            No Pending Complaints
          </div>

        ) : (

          pendingComplaints.map((c) => (

            <div
              key={c.id || c._id}
              className="bg-white p-5 rounded shadow"
            >

              <h3 className="text-xl font-bold mb-2">
                {c.title}
              </h3>

              <p className="mb-1">
                <strong>Location:</strong>
                {" "} {c.location}
              </p>

              <p className="mb-1">
                <strong>Category:</strong>
                {" "} {c.category}
              </p>

              <p className="mb-1">
                <strong>Priority:</strong>
                {" "} {c.priority}
              </p>

              <p className="mb-1">
                <strong>Status:</strong>
                {" "} {c.status}
              </p>

            </div>
          ))
        )}

      </div>

      {/* RESOLVED */}
      <h2 className="text-2xl font-semibold mb-4">
        Resolved Complaints
      </h2>

      <div className="space-y-4">

        {resolvedComplaints.length === 0 ? (

          <div className="bg-white p-5 rounded shadow">
            No Resolved Complaints
          </div>

        ) : (

          resolvedComplaints.map((c) => (

            <div
              key={c.id || c._id}
              className="bg-green-50 p-5 rounded shadow"
            >

              <h3 className="text-xl font-bold mb-2">
                {c.title}
              </h3>

              <p className="mb-1">
                <strong>Location:</strong>
                {" "} {c.location}
              </p>

              <p className="mb-1">
                <strong>Category:</strong>
                {" "} {c.category}
              </p>

              <p className="mb-1">
                <strong>Priority:</strong>
                {" "} {c.priority}
              </p>

              <p className="mb-1">
                <strong>Status:</strong>
                {" "} {c.status}
              </p>

              {/* STAFF NOTE */}
              {c.progressNote && (

                <div className="bg-white p-3 rounded mt-4">

                  <strong>Staff Note:</strong>

                  <p>{c.progressNote}</p>

                </div>
              )}

              {/* PROOF */}
              {c.proofImage && (

                <a
                  href={c.proofImage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline block mt-3"
                >
                  View Proof Image
                </a>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}